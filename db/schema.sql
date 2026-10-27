-- ========================================================
-- BRAIN WAVES DATABASE SCHEMA
-- Compatible with SQLite & MySQL InnoDB
-- ========================================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    icon VARCHAR(60) NOT NULL DEFAULT 'brain-circuit',
    summary VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    deliverables TEXT, -- JSON array string
    process_steps TEXT, -- JSON array string
    faq_json TEXT, -- JSON array string
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(180) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    client VARCHAR(120) NOT NULL,
    year VARCHAR(10) NOT NULL DEFAULT '2026',
    category_id INTEGER REFERENCES project_categories(id) ON DELETE SET NULL,
    summary VARCHAR(255) NOT NULL,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results TEXT NOT NULL,
    technologies TEXT, -- JSON or comma-separated
    deliverables TEXT,
    featured_image TEXT NOT NULL,
    gallery_images TEXT, -- JSON array
    metrics_json TEXT, -- e.g. [{"label":"Conversion","value":"+184%"}, {"label":"Speed Index","value":"0.4s"}]
    status VARCHAR(30) NOT NULL DEFAULT 'published', -- published, draft, archived
    is_featured INTEGER NOT NULL DEFAULT 0,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    media_type VARCHAR(30) NOT NULL DEFAULT 'image', -- image, video
    alt_text VARCHAR(255),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(191) NOT NULL UNIQUE,
    author VARCHAR(100) NOT NULL DEFAULT 'BRAIN WAVES Studio',
    category VARCHAR(80) NOT NULL DEFAULT 'Design Engineering',
    excerpt VARCHAR(300) NOT NULL,
    body TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    read_time VARCHAR(30) NOT NULL DEFAULT '5 min read',
    tags TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'published',
    views_count INTEGER NOT NULL DEFAULT 0,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name VARCHAR(120) NOT NULL,
    client_title VARCHAR(120) NOT NULL,
    company VARCHAR(120) NOT NULL,
    company_logo TEXT,
    quote TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    is_published INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference VARCHAR(32) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL,
    company VARCHAR(160),
    preferred_contact VARCHAR(50) DEFAULT 'email',
    budget_range VARCHAR(50) NOT NULL,
    timeline VARCHAR(50) NOT NULL,
    brief TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new', -- new, contacted, proposal, in_progress, closed
    assigned_to VARCHAR(120) DEFAULT 'Creative Director',
    contacted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiry_services (
    inquiry_id INTEGER NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    PRIMARY KEY (inquiry_id, service_id)
);

CREATE TABLE IF NOT EXISTS inquiry_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inquiry_id INTEGER NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
    author VARCHAR(120) NOT NULL,
    note TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key VARCHAR(80) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    type VARCHAR(30) NOT NULL DEFAULT 'string',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action VARCHAR(80) NOT NULL,
    entity_type VARCHAR(60) NOT NULL,
    entity_id VARCHAR(60),
    user_email VARCHAR(255),
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_ref ON project_inquiries(reference);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON project_inquiries(status);
