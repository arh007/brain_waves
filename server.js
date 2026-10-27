// ========================================================
// BRAIN WAVES APPLICATION SERVER
// Node.js Native HTTP & SQLite Engine (Zero Dependencies)
// ========================================================

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const { seedDatabase, hashPassword } = require('./db/seed');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.sqlite');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Initialize & Seed Database if needed
seedDatabase(DB_PATH);
const db = new DatabaseSync(DB_PATH);

// Persistent admin sessions in SQLite (survives server restarts)
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER,
    name TEXT,
    email TEXT,
    role TEXT,
    expires_at INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

function generateToken(user) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  db.prepare(`
    INSERT OR REPLACE INTO admin_sessions (token, user_id, name, email, role, expires_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(token, user.id, user.name, user.email, user.role, expiresAt);
  return token;
}

function verifyAuth(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;

  try {
    const session = db.prepare('SELECT * FROM admin_sessions WHERE token = ? AND expires_at > ?').get(token, Date.now());
    if (!session) return null;
    return {
      userId: session.user_id,
      name: session.name,
      email: session.email,
      role: session.role
    };
  } catch (e) {
    return null;
  }
}

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        // 2MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

// Helper to send JSON responses
function sendJSON(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN'
  });
  res.end(payload);
}

// Helper to serve static files
function serveStatic(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA client-side routing
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('Not Found');
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// Main HTTP request router
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  // ========================================================
  // API ROUTING
  // ========================================================
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Health check
      if (pathname === '/api/health' && method === 'GET') {
        return sendJSON(res, 200, { status: 'operational', timestamp: new Date().toISOString(), platform: 'BRAIN WAVES Engine 1.0' });
      }

      // 2. Services list
      if (pathname === '/api/services' && method === 'GET') {
        const rows = db.prepare('SELECT * FROM services WHERE is_published = 1 ORDER BY sort_order ASC').all();
        const formatted = rows.map(r => ({
          ...r,
          deliverables: r.deliverables ? JSON.parse(r.deliverables) : [],
          process_steps: r.process_steps ? JSON.parse(r.process_steps) : [],
          faq: r.faq_json ? JSON.parse(r.faq_json) : []
        }));
        return sendJSON(res, 200, formatted);
      }

      // 3. Projects list
      if (pathname === '/api/projects' && method === 'GET') {
        const categorySlug = parsedUrl.searchParams.get('category');
        let query = `
          SELECT p.*, c.name as category_name, c.slug as category_slug
          FROM projects p
          LEFT JOIN project_categories c ON p.category_id = c.id
          WHERE p.status = 'published'
        `;
        const params = [];
        if (categorySlug && categorySlug !== 'all') {
          query += ' AND c.slug = ?';
          params.push(categorySlug);
        }
        query += ' ORDER BY p.is_featured DESC, p.id DESC';
        const rows = db.prepare(query).all(...params);
        const formatted = rows.map(r => ({
          ...r,
          technologies: r.technologies ? JSON.parse(r.technologies) : [],
          metrics: r.metrics_json ? JSON.parse(r.metrics_json) : []
        }));
        return sendJSON(res, 200, formatted);
      }

      // 4. Project Single
      if (pathname.startsWith('/api/projects/') && method === 'GET') {
        const slug = pathname.replace('/api/projects/', '');
        const project = db.prepare(`
          SELECT p.*, c.name as category_name, c.slug as category_slug
          FROM projects p
          LEFT JOIN project_categories c ON p.category_id = c.id
          WHERE p.slug = ?
        `).get(slug);

        if (!project) return sendJSON(res, 404, { error: 'Project not found' });
        return sendJSON(res, 200, {
          ...project,
          technologies: project.technologies ? JSON.parse(project.technologies) : [],
          metrics: project.metrics_json ? JSON.parse(project.metrics_json) : []
        });
      }

      // 5. Articles (Insights)
      if (pathname === '/api/articles' && method === 'GET') {
        const rows = db.prepare("SELECT * FROM articles WHERE status = 'published' ORDER BY id DESC").all();
        return sendJSON(res, 200, rows);
      }

      if (pathname.startsWith('/api/articles/') && method === 'GET') {
        const slug = pathname.replace('/api/articles/', '');
        const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug);
        if (!article) return sendJSON(res, 404, { error: 'Article not found' });
        // increment view count
        db.prepare('UPDATE articles SET views_count = views_count + 1 WHERE id = ?').run(article.id);
        return sendJSON(res, 200, article);
      }

      // 6. Testimonials
      if (pathname === '/api/testimonials' && method === 'GET') {
        const rows = db.prepare('SELECT * FROM testimonials WHERE is_published = 1 ORDER BY sort_order ASC').all();
        return sendJSON(res, 200, rows);
      }

      // 7. Site Settings
      if (pathname === '/api/settings' && method === 'GET') {
        const rows = db.prepare('SELECT key, value FROM site_settings').all();
        const settings = {};
        rows.forEach(r => { settings[r.key] = r.value; });
        return sendJSON(res, 200, settings);
      }

      // 8. Project Inquiry Submission (Project Lab)
      if (pathname === '/api/inquiries' && method === 'POST') {
        const body = await parseBody(req);
        const { name, email, company, services = [], budget_range, timeline, brief, preferred_contact = 'email', honeypot } = body;

        // Anti-spam honeypot
        if (honeypot) {
          return sendJSON(res, 400, { error: 'Spam validation failed' });
        }

        // Required fields validation
        if (!name || !email || !brief || !budget_range || !timeline) {
          return sendJSON(res, 422, { error: 'Mohon lengkapi seluruh field wajib formulir (Nama, Email, Anggaran, Waktu, Brief).' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return sendJSON(res, 422, { error: 'Format email tidak valid.' });
        }

        // Generate unique reference ID (e.g. BW-2026-8942)
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const reference = `BW-2026-${randomNum}`;

        const insertInq = db.prepare(`
          INSERT INTO project_inquiries (reference, name, email, company, preferred_contact, budget_range, timeline, brief, status, assigned_to)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', 'Creative Lead')
        `);
        const result = insertInq.run(reference, name.trim(), email.trim(), company ? company.trim() : null, preferred_contact, budget_range, timeline, brief.trim());
        const inquiryId = result.lastInsertRowid;

        // Map selected services
        if (Array.isArray(services) && services.length > 0) {
          const insertServiceRel = db.prepare('INSERT OR IGNORE INTO inquiry_services (inquiry_id, service_id) VALUES (?, ?)');
          for (const sId of services) {
            insertServiceRel.run(inquiryId, parseInt(sId, 10));
          }
        }

        // Log audit activity
        db.prepare(`
          INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
          VALUES (?, ?, ?, ?, ?)
        `).run('INQUIRY_RECEIVED', 'project_inquiries', reference, email, `New brief received from ${name} (${company || 'Individual'})`);

        return sendJSON(res, 201, {
          success: true,
          reference,
          message: 'Project brief berhasil dikirim ke tim BRAIN WAVES.',
          details: {
            reference,
            name,
            email,
            status: 'new',
            timestamp: new Date().toISOString()
          }
        });
      }

      // 9. Auth Login (Admin CMS)
      if (pathname === '/api/auth/login' && method === 'POST') {
        const body = await parseBody(req);
        const { email, password } = body;

        if (!email || !password) {
          return sendJSON(res, 422, { error: 'Email dan password harus diisi.' });
        }

        const hashed = hashPassword(password);
        const user = db.prepare('SELECT * FROM users WHERE email = ? AND password_hash = ? AND is_active = 1').get(email.trim(), hashed);

        if (!user) {
          return sendJSON(res, 401, { error: 'Kredensial tidak valid atau akun dinonaktifkan.' });
        }

        const token = generateToken(user);
        db.prepare(`
          INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
          VALUES (?, ?, ?, ?, ?)
        `).run('USER_LOGIN', 'users', String(user.id), user.email, `Admin authenticated from IP`);

        return sendJSON(res, 200, {
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
      }

      // ========================================================
      // PROTECTED ADMIN ENDPOINTS
      // ========================================================
      if (pathname.startsWith('/api/admin/')) {
        const session = verifyAuth(req);
        if (!session) {
          return sendJSON(res, 401, { error: 'Unauthorized: Akses ditolak. Harap login terlebih dahulu.' });
        }

        // Admin Stats Overview
        if (pathname === '/api/admin/stats' && method === 'GET') {
          const inquiriesTotal = db.prepare('SELECT COUNT(*) as count FROM project_inquiries').get().count;
          const inquiriesNew = db.prepare("SELECT COUNT(*) as count FROM project_inquiries WHERE status = 'new'").get().count;
          const projectsTotal = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
          const servicesTotal = db.prepare('SELECT COUNT(*) as count FROM services WHERE is_published = 1').get().count;
          const articlesTotal = db.prepare('SELECT COUNT(*) as count FROM articles').get().count;

          const recentInquiries = db.prepare('SELECT * FROM project_inquiries ORDER BY id DESC LIMIT 5').all();
          const recentLogs = db.prepare('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 10').all();

          return sendJSON(res, 200, {
            stats: {
              inquiriesTotal,
              inquiriesNew,
              projectsTotal,
              servicesTotal,
              articlesTotal
            },
            recentInquiries,
            recentLogs
          });
        }

        // Admin Inquiries Pipeline
        if (pathname === '/api/admin/inquiries' && method === 'GET') {
          const status = parsedUrl.searchParams.get('status');
          let query = 'SELECT * FROM project_inquiries';
          const params = [];
          if (status && status !== 'all') {
            query += ' WHERE status = ?';
            params.push(status);
          }
          query += ' ORDER BY id DESC';
          const inquiries = db.prepare(query).all(...params);

          // attach services & notes
          const fullInquiries = inquiries.map(inq => {
            const servs = db.prepare(`
              SELECT s.id, s.name, s.slug
              FROM inquiry_services isr
              JOIN services s ON isr.service_id = s.id
              WHERE isr.inquiry_id = ?
            `).all(inq.id);

            const notes = db.prepare(`
              SELECT * FROM inquiry_notes WHERE inquiry_id = ? ORDER BY id DESC
            `).all(inq.id);

            return { ...inq, services: servs, notes };
          });

          return sendJSON(res, 200, fullInquiries);
        }

        // Update Inquiry Status
        if (pathname.match(/^\/api\/admin\/inquiries\/(\d+)\/status$/) && method === 'PATCH') {
          const inqId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { status, assigned_to } = body;

          const validStatuses = ['new', 'contacted', 'proposal', 'in_progress', 'closed'];
          if (!validStatuses.includes(status)) {
            return sendJSON(res, 422, { error: 'Status pipeline tidak valid.' });
          }

          db.prepare(`
            UPDATE project_inquiries
            SET status = ?, assigned_to = COALESCE(?, assigned_to), updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).run(status, assigned_to || null, inqId);

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('INQUIRY_STATUS_UPDATED', 'project_inquiries', String(inqId), session.email, `Status updated to [${status}] by ${session.name}`);

          return sendJSON(res, 200, { success: true, message: `Status berhasil diubah menjadi ${status}.` });
        }

        // Add Follow-up Note to Inquiry
        if (pathname.match(/^\/api\/admin\/inquiries\/(\d+)\/notes$/) && method === 'POST') {
          const inqId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { note } = body;
          if (!note || !note.trim()) {
            return sendJSON(res, 422, { error: 'Catatan tidak boleh kosong.' });
          }

          db.prepare(`
            INSERT INTO inquiry_notes (inquiry_id, author, note)
            VALUES (?, ?, ?)
          `).run(inqId, session.name, note.trim());

          return sendJSON(res, 201, { success: true, message: 'Catatan tersimpan.' });
        }

        // ----------------------------------------------------
        // Admin Projects CRUD (Create, Read, Update, Delete)
        // ----------------------------------------------------
        if (pathname === '/api/admin/projects' && method === 'GET') {
          const rows = db.prepare(`
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM projects p
            LEFT JOIN project_categories c ON p.category_id = c.id
            ORDER BY p.id DESC
          `).all();
          const formatted = rows.map(r => ({
            ...r,
            technologies: r.technologies ? JSON.parse(r.technologies) : [],
            metrics: r.metrics_json ? JSON.parse(r.metrics_json) : []
          }));
          return sendJSON(res, 200, formatted);
        }

        if (pathname.match(/^\/api\/admin\/projects\/(\d+)$/) && method === 'GET') {
          const pId = pathname.split('/')[4];
          const project = db.prepare(`
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM projects p
            LEFT JOIN project_categories c ON p.category_id = c.id
            WHERE p.id = ?
          `).get(pId);
          if (!project) return sendJSON(res, 404, { error: 'Project not found' });
          return sendJSON(res, 200, {
            ...project,
            technologies: project.technologies ? JSON.parse(project.technologies) : [],
            metrics: project.metrics_json ? JSON.parse(project.metrics_json) : []
          });
        }

        if (pathname === '/api/admin/projects' && method === 'POST') {
          const body = await parseBody(req);
          const { title, client, year, category_id, summary, challenge, solution, results, technologies, featured_image, status = 'published', is_featured = 0 } = body;

          const slug = (body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900);
          const techJson = Array.isArray(technologies) ? JSON.stringify(technologies) : JSON.stringify((technologies || '').split(',').map(s => s.trim()).filter(Boolean));

          const result = db.prepare(`
            INSERT INTO projects (title, slug, client, year, category_id, summary, challenge, solution, results, technologies, featured_image, status, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(title, slug, client || 'Client', year || '2026', category_id || 1, summary || '', challenge || '', solution || '', results || '', techJson, featured_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', status, is_featured ? 1 : 0);

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('PROJECT_CREATED', 'projects', String(result.lastInsertRowid), session.email, `Created project "${title}"`);

          return sendJSON(res, 201, { success: true, id: result.lastInsertRowid, message: 'Proyek berhasil dibuat!' });
        }

        if (pathname.match(/^\/api\/admin\/projects\/(\d+)$/) && method === 'PUT') {
          const pId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { title, client, year, category_id, summary, challenge, solution, results, technologies, featured_image, status, is_featured } = body;

          const techJson = technologies !== undefined ? (Array.isArray(technologies) ? JSON.stringify(technologies) : JSON.stringify((technologies || '').split(',').map(s => s.trim()).filter(Boolean))) : null;

          db.prepare(`
            UPDATE projects
            SET title = COALESCE(?, title),
                client = COALESCE(?, client),
                year = COALESCE(?, year),
                category_id = COALESCE(?, category_id),
                summary = COALESCE(?, summary),
                challenge = COALESCE(?, challenge),
                solution = COALESCE(?, solution),
                results = COALESCE(?, results),
                technologies = COALESCE(?, technologies),
                featured_image = COALESCE(?, featured_image),
                status = COALESCE(?, status),
                is_featured = COALESCE(?, is_featured),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).run(
            title ?? null,
            client ?? null,
            year ?? null,
            category_id ?? null,
            summary ?? null,
            challenge ?? null,
            solution ?? null,
            results ?? null,
            techJson ?? null,
            featured_image ?? null,
            status ?? null,
            is_featured !== undefined ? (is_featured ? 1 : 0) : null,
            pId
          );

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('PROJECT_UPDATED', 'projects', String(pId), session.email, `Updated project "${title || pId}"`);

          return sendJSON(res, 200, { success: true, message: 'Proyek berhasil diperbarui!' });
        }

        if (pathname.match(/^\/api\/admin\/projects\/(\d+)$/) && method === 'DELETE') {
          const pId = pathname.split('/')[4];
          db.prepare('DELETE FROM projects WHERE id = ?').run(pId);
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('PROJECT_DELETED', 'projects', String(pId), session.email, `Deleted project ID ${pId}`);
          return sendJSON(res, 200, { success: true, message: 'Proyek berhasil dihapus.' });
        }

        // ----------------------------------------------------
        // Admin Services CRUD (Create, Read, Update, Delete)
        // ----------------------------------------------------
        if (pathname === '/api/admin/services' && method === 'GET') {
          const rows = db.prepare('SELECT * FROM services ORDER BY sort_order ASC, id ASC').all();
          const formatted = rows.map(r => ({
            ...r,
            deliverables: r.deliverables ? JSON.parse(r.deliverables) : [],
            process_steps: r.process_steps ? JSON.parse(r.process_steps) : [],
            faq: r.faq_json ? JSON.parse(r.faq_json) : []
          }));
          return sendJSON(res, 200, formatted);
        }

        if (pathname.match(/^\/api\/admin\/services\/(\d+)$/) && method === 'GET') {
          const sId = pathname.split('/')[4];
          const service = db.prepare('SELECT * FROM services WHERE id = ?').get(sId);
          if (!service) return sendJSON(res, 404, { error: 'Service not found' });
          return sendJSON(res, 200, {
            ...service,
            deliverables: service.deliverables ? JSON.parse(service.deliverables) : [],
            process_steps: service.process_steps ? JSON.parse(service.process_steps) : [],
            faq: service.faq_json ? JSON.parse(service.faq_json) : []
          });
        }

        if (pathname === '/api/admin/services' && method === 'POST') {
          const body = await parseBody(req);
          const { name, icon = 'brain-circuit', summary = '', description = '', deliverables = [], process_steps = [], faq = [], sort_order = 0, is_published = 1 } = body;
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900);

          const delivJson = Array.isArray(deliverables) ? JSON.stringify(deliverables) : JSON.stringify((deliverables || '').split('\n').map(s => s.trim()).filter(Boolean));
          const stepsJson = Array.isArray(process_steps) ? JSON.stringify(process_steps) : JSON.stringify((process_steps || '').split('\n').map(s => s.trim()).filter(Boolean));
          const faqJson = Array.isArray(faq) ? JSON.stringify(faq) : JSON.stringify([]);

          const result = db.prepare(`
            INSERT INTO services (name, slug, icon, summary, description, deliverables, process_steps, faq_json, sort_order, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(name, slug, icon, summary, description, delivJson, stepsJson, faqJson, sort_order || 0, is_published ? 1 : 0);

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('SERVICE_CREATED', 'services', String(result.lastInsertRowid), session.email, `Created service "${name}"`);

          return sendJSON(res, 201, { success: true, id: result.lastInsertRowid, message: 'Layanan berhasil ditambahkan!' });
        }

        if (pathname.match(/^\/api\/admin\/services\/(\d+)$/) && method === 'PUT') {
          const sId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { name, icon, summary, description, deliverables, process_steps, faq, sort_order, is_published } = body;

          const delivJson = deliverables !== undefined ? (Array.isArray(deliverables) ? JSON.stringify(deliverables) : JSON.stringify((deliverables || '').split('\n').map(s => s.trim()).filter(Boolean))) : null;
          const stepsJson = process_steps !== undefined ? (Array.isArray(process_steps) ? JSON.stringify(process_steps) : JSON.stringify((process_steps || '').split('\n').map(s => s.trim()).filter(Boolean))) : null;
          const faqJson = faq !== undefined ? (Array.isArray(faq) ? JSON.stringify(faq) : JSON.stringify([])) : null;

          db.prepare(`
            UPDATE services
            SET name = COALESCE(?, name),
                icon = COALESCE(?, icon),
                summary = COALESCE(?, summary),
                description = COALESCE(?, description),
                deliverables = COALESCE(?, deliverables),
                process_steps = COALESCE(?, process_steps),
                faq_json = COALESCE(?, faq_json),
                sort_order = COALESCE(?, sort_order),
                is_published = COALESCE(?, is_published),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).run(
            name ?? null,
            icon ?? null,
            summary ?? null,
            description ?? null,
            delivJson ?? null,
            stepsJson ?? null,
            faqJson ?? null,
            sort_order ?? null,
            is_published !== undefined ? (is_published ? 1 : 0) : null,
            sId
          );

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('SERVICE_UPDATED', 'services', String(sId), session.email, `Updated service "${name || sId}"`);

          return sendJSON(res, 200, { success: true, message: 'Layanan berhasil diperbarui!' });
        }

        if (pathname.match(/^\/api\/admin\/services\/(\d+)$/) && method === 'DELETE') {
          const sId = pathname.split('/')[4];
          db.prepare('DELETE FROM services WHERE id = ?').run(sId);
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('SERVICE_DELETED', 'services', String(sId), session.email, `Deleted service ID ${sId}`);
          return sendJSON(res, 200, { success: true, message: 'Layanan berhasil dihapus.' });
        }

        // ----------------------------------------------------
        // Admin Articles CRUD (Create, Read, Update, Delete)
        // ----------------------------------------------------
        if (pathname === '/api/admin/articles' && method === 'GET') {
          const rows = db.prepare('SELECT * FROM articles ORDER BY id DESC').all();
          return sendJSON(res, 200, rows);
        }

        if (pathname.match(/^\/api\/admin\/articles\/(\d+)$/) && method === 'GET') {
          const aId = pathname.split('/')[4];
          const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(aId);
          if (!article) return sendJSON(res, 404, { error: 'Article not found' });
          return sendJSON(res, 200, article);
        }

        if (pathname === '/api/admin/articles' && method === 'POST') {
          const body = await parseBody(req);
          const { title, category = 'Design Engineering', author = 'BRAIN WAVES Studio', excerpt = '', body: articleBody = '', cover_image = '', read_time = '5 min read', status = 'published' } = body;
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900);

          const result = db.prepare(`
            INSERT INTO articles (title, slug, author, category, excerpt, body, cover_image, read_time, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).run(title, slug, author, category, excerpt, articleBody, cover_image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', read_time, status);

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('ARTICLE_CREATED', 'articles', String(result.lastInsertRowid), session.email, `Created article "${title}"`);

          return sendJSON(res, 201, { success: true, id: result.lastInsertRowid, message: 'Artikel berhasil diterbitkan!' });
        }

        if (pathname.match(/^\/api\/admin\/articles\/(\d+)$/) && method === 'PUT') {
          const aId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { title, category, author, excerpt, body: articleBody, cover_image, read_time, status } = body;

          db.prepare(`
            UPDATE articles
            SET title = COALESCE(?, title),
                category = COALESCE(?, category),
                author = COALESCE(?, author),
                excerpt = COALESCE(?, excerpt),
                body = COALESCE(?, body),
                cover_image = COALESCE(?, cover_image),
                read_time = COALESCE(?, read_time),
                status = COALESCE(?, status),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).run(
            title ?? null,
            category ?? null,
            author ?? null,
            excerpt ?? null,
            articleBody ?? null,
            cover_image ?? null,
            read_time ?? null,
            status ?? null,
            aId
          );

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('ARTICLE_UPDATED', 'articles', String(aId), session.email, `Updated article "${title || aId}"`);

          return sendJSON(res, 200, { success: true, message: 'Artikel berhasil diperbarui!' });
        }

        if (pathname.match(/^\/api\/admin\/articles\/(\d+)$/) && method === 'DELETE') {
          const aId = pathname.split('/')[4];
          db.prepare('DELETE FROM articles WHERE id = ?').run(aId);
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('ARTICLE_DELETED', 'articles', String(aId), session.email, `Deleted article ID ${aId}`);
          return sendJSON(res, 200, { success: true, message: 'Artikel berhasil dihapus.' });
        }

        // ----------------------------------------------------
        // Admin Testimonials CRUD (Create, Read, Update, Delete)
        // ----------------------------------------------------
        if (pathname === '/api/admin/testimonials' && method === 'GET') {
          const rows = db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id DESC').all();
          return sendJSON(res, 200, rows);
        }

        if (pathname.match(/^\/api\/admin\/testimonials\/(\d+)$/) && method === 'GET') {
          const tId = pathname.split('/')[4];
          const item = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(tId);
          if (!item) return sendJSON(res, 404, { error: 'Testimonial not found' });
          return sendJSON(res, 200, item);
        }

        if (pathname === '/api/admin/testimonials' && method === 'POST') {
          const body = await parseBody(req);
          const { client_name, client_title = '', company = '', quote = '', rating = 5, is_published = 1, sort_order = 0 } = body;

          const result = db.prepare(`
            INSERT INTO testimonials (client_name, client_title, company, quote, rating, is_published, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).run(client_name, client_title, company, quote, rating, is_published ? 1 : 0, sort_order || 0);

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('TESTIMONIAL_CREATED', 'testimonials', String(result.lastInsertRowid), session.email, `Created testimonial from "${client_name}"`);

          return sendJSON(res, 201, { success: true, id: result.lastInsertRowid, message: 'Testimonial berhasil ditambahkan!' });
        }

        if (pathname.match(/^\/api\/admin\/testimonials\/(\d+)$/) && method === 'PUT') {
          const tId = pathname.split('/')[4];
          const body = await parseBody(req);
          const { client_name, client_title, company, quote, rating, is_published, sort_order } = body;

          db.prepare(`
            UPDATE testimonials
            SET client_name = COALESCE(?, client_name),
                client_title = COALESCE(?, client_title),
                company = COALESCE(?, company),
                quote = COALESCE(?, quote),
                rating = COALESCE(?, rating),
                is_published = COALESCE(?, is_published),
                sort_order = COALESCE(?, sort_order)
            WHERE id = ?
          `).run(
            client_name ?? null,
            client_title ?? null,
            company ?? null,
            quote ?? null,
            rating ?? null,
            is_published !== undefined ? (is_published ? 1 : 0) : null,
            sort_order ?? null,
            tId
          );

          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('TESTIMONIAL_UPDATED', 'testimonials', String(tId), session.email, `Updated testimonial ID ${tId}`);

          return sendJSON(res, 200, { success: true, message: 'Testimonial berhasil diperbarui!' });
        }


        if (pathname.match(/^\/api\/admin\/testimonials\/(\d+)$/) && method === 'DELETE') {
          const tId = pathname.split('/')[4];
          db.prepare('DELETE FROM testimonials WHERE id = ?').run(tId);
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('TESTIMONIAL_DELETED', 'testimonials', String(tId), session.email, `Deleted testimonial ID ${tId}`);
          return sendJSON(res, 200, { success: true, message: 'Testimonial berhasil dihapus.' });
        }

        // ----------------------------------------------------
        // Admin Delete Inquiry
        // ----------------------------------------------------
        if (pathname.match(/^\/api\/admin\/inquiries\/(\d+)$/) && method === 'DELETE') {
          const inqId = pathname.split('/')[4];
          db.prepare('DELETE FROM project_inquiries WHERE id = ?').run(inqId);
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('INQUIRY_DELETED', 'project_inquiries', String(inqId), session.email, `Deleted inquiry ID ${inqId}`);
          return sendJSON(res, 200, { success: true, message: 'Inquiry berhasil dihapus.' });
        }

        // Admin Activity Logs
        if (pathname === '/api/admin/logs' && method === 'GET') {
          const logs = db.prepare('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 50').all();
          return sendJSON(res, 200, logs);
        }

        // Admin Settings Update
        if (pathname === '/api/admin/settings' && method === 'PUT') {
          const body = await parseBody(req);
          const updateSetting = db.prepare('INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=CURRENT_TIMESTAMP');
          for (const [key, value] of Object.entries(body)) {
            updateSetting.run(key, String(value));
          }
          db.prepare(`
            INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
            VALUES (?, ?, ?, ?, ?)
          `).run('SETTINGS_UPDATED', 'site_settings', 'global', session.email, 'Updated site settings & metadata');
          return sendJSON(res, 200, { success: true, message: 'Pengaturan studio berhasil diperbarui.' });
        }
      }

      // If no API matched
      return sendJSON(res, 404, { error: 'API endpoint not found' });
    } catch (apiError) {
      console.error('[API Error]', apiError);
      return sendJSON(res, 500, { error: 'Internal Server Error', message: 'Permintaan tidak dapat diproses secara internal.' });
    }
  }

  // ========================================================
  // STATIC ASSETS & SPA SERVING
  // ========================================================
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  } else if (safePath === '/login' || safePath === '\\login' || safePath === 'login') {
    safePath = '/login.html';
  } else if (safePath === '/admin' || safePath === '\\admin' || safePath === 'admin') {
    safePath = '/admin.html';
  }
  const fullPath = path.join(PUBLIC_DIR, safePath);

  serveStatic(req, res, fullPath);
});

server.listen(PORT, () => {
  console.log(`\n========================================================`);
  console.log(`  ⚡ BRAIN WAVES Studio Server Running on http://localhost:${PORT}`);
  console.log(`  🎨 Aesthetic: Neon Futuristic / Cyber-Luxury`);
  console.log(`  🗄️ Database: SQLite Native (Node 22 Built-in)`);
  console.log(`  🔐 Admin CMS: http://localhost:${PORT}/#admin`);
  console.log(`  Default Admin: admin@brainwaves.studio / admin123`);
  console.log(`========================================================\n`);
});
