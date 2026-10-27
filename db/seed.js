// ========================================================
// BRAIN WAVES SEEDER SCRIPT
// ========================================================

const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'brain_waves_salt_2026').digest('hex');
}

function seedDatabase(dbPath) {
  const db = new DatabaseSync(dbPath);

  // Read schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);

  console.log('[DB] Schema verified.');

  // Check if already seeded
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) {
    console.log('[DB] Database already seeded. Skipping.');
    return;
  }

  console.log('[DB] Seeding initial BRAIN WAVES content...');

  // 1. Admin User
  const insertUser = db.prepare(`
    INSERT INTO users (name, email, password_hash, role, is_active)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertUser.run('Elena Vance', 'admin@brainwaves.studio', hashPassword('admin123'), 'creative_director', 1);

  // 2. Project Categories
  const insertCategory = db.prepare(`
    INSERT INTO project_categories (name, slug, description)
    VALUES (?, ?, ?)
  `);
  const catBranding = insertCategory.run('Brand Architecture', 'branding', 'Brand identity, verbal systems, and global guidelines').lastInsertRowid;
  const catProduct = insertCategory.run('Digital Product Design', 'digital-product', 'Enterprise software, mobile ecosystems, and UI/UX engineering').lastInsertRowid;
  const catWeb3D = insertCategory.run('Web & Immersive 3D', 'web-3d', 'WebGL experiences, three.js interactions, and next-gen websites').lastInsertRowid;
  const catAI = insertCategory.run('AI & Creative Tech', 'ai-tech', 'Custom intelligence models, generative workflows, and agentic UX').lastInsertRowid;

  // 3. Services (All 6 from PRD)
  const insertService = db.prepare(`
    INSERT INTO services (name, slug, icon, summary, description, deliverables, process_steps, faq_json, sort_order, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertService.run(
    'Brand Strategy & Visual Identity',
    'brand-strategy-identity',
    'fingerprint',
    'Brand audit, market positioning, verbal identity, dynamic logo systems, and comprehensive brand bibles.',
    'We define the conceptual core of visionary brands. By blending cultural anthropology, deep market intelligence, and experimental typography, we forge brand identities that cut through algorithmic noise and build lasting emotional equity.',
    JSON.stringify(['Market & Competitor Positioning Report', 'Visual Identity Architecture & Dynamic Mark', 'Interactive Digital Brand Book', 'Editorial Typography Guidelines', 'Packaging & Physical Collateral']),
    JSON.stringify(['01 Cultural Archaeology & Market Deconstruction', '02 Verbal Identity & Core Narrative', '03 Visual Exploration & Generative Concepts', '04 Design System Assembly & Guidelines']),
    JSON.stringify([
      { q: 'What is the typical timeframe for a full rebrand?', a: 'Comprehensive brand transformations generally take 4 to 8 weeks depending on organisational complexity.' },
      { q: 'Do you provide print and packaging production specs?', a: 'Yes, we provide end-to-end production-ready print vectors, material curation, and Pantone color separation.' }
    ]),
    1,
    1
  );

  insertService.run(
    'Digital Product Design (UI/UX)',
    'digital-product-design',
    'panels-top-left',
    'User journey mapping, cognitive ergonomics, high-velocity wireframing, enterprise design systems, and clickable prototypes.',
    'We craft digital products that balance aesthetic grandeur with ruthless usability. From complex multi-tenant SaaS dashboards to bespoke mobile consumer applications, we engineer experiences that turn first-time visitors into evangelists.',
    JSON.stringify(['Cognitive UX Audits & Heatmap Analysis', 'Interactive Figma Design Systems with Tokens', 'Clickable Micro-interaction Prototypes', 'WCAG 2.2 AA Accessibility Compliance Docs', 'Developer Handover Specs with Zero Ambiguity']),
    JSON.stringify(['01 Behavioral Discovery & User Journey Mapping', '02 Information Architecture & Wireframing', '03 High-Fidelity UI Craftsmanship', '04 Usability Stress-Testing & Token Handoff']),
    JSON.stringify([
      { q: 'How do you handle collaboration with our internal engineering team?', a: 'We work inside unified design tokens, inspectable Figma variables, and participate in sprint ceremonies to ensure 100% fidelity.' }
    ]),
    2,
    1
  );

  insertService.run(
    'Web & Application Engineering',
    'web-application-engineering',
    'code-2',
    'Bespoke web applications, reactive client portals, custom headless CMS engines, and ultra-optimized architectures.',
    'We engineer the digital frontlines. Utilizing modern frameworks, server-driven architectures, and lightweight micro-services, we guarantee lightning-fast load times (<0.4s), bulletproof security, and seamless API integrations.',
    JSON.stringify(['Custom Full-Stack Application Repository', 'Integrated Headless Content Management Engine', 'Automated CI/CD Deployment Pipelines', 'Core Web Vitals Optimization (100% Score)', 'Full API Documentation & Postman Suites']),
    JSON.stringify(['01 Technical Architecture & Database Modeling', '02 API Contract & Schema Definition', '03 Component-Driven Frontend & Backend Build', '04 Penetration Testing & Production Launch']),
    JSON.stringify([
      { q: 'What tech stacks do you support?', a: 'We specialize in modern Laravel/PHP, Node.js/TypeScript, Vite, and high-performance relational databases with Redis caching.' }
    ]),
    3,
    1
  );

  insertService.run(
    'Creative Campaigns & Visual Direction',
    'creative-campaigns-visual-direction',
    'megaphone',
    'High-voltage digital launch campaigns, viral storytelling, generative visual assets, and cross-platform art direction.',
    'We manufacture cultural moments. We construct integrated campaigns that arrest attention across organic social channels, interactive billboard activations, and immersive microsites.',
    JSON.stringify(['Campaign Narrative & Strategic Key Visuals', 'Multi-Format Social Kinetic Video Assets', 'Interactive Microsite Strategy & Art Direction', 'Influencer & Creator Media Kits']),
    JSON.stringify(['01 Strategic Spark & Cultural Hook', '02 Narrative Scriptwriting & Storyboarding', '03 Multidisciplinary Asset Production', '04 Omnichannel Rollout & Telemetry']),
    JSON.stringify([
      { q: 'Can you handle production of 3D motion graphics for social ads?', a: 'Yes, our in-house motion lab renders cinematic 4K assets formatted across 9:16, 1:1, and anamorphic displays.' }
    ]),
    4,
    1
  );

  insertService.run(
    'Motion & 3D Web Experiences',
    'motion-3d-web-experiences',
    'orbit',
    'Real-time WebGL, interactive 3D product configurators, kinetic typography, particle physics, and spatial narratives.',
    'We bridge the gap between cinema and code. Leveraging Three.js, custom GLSL shaders, and GPU-accelerated canvas simulations, we create living digital environments that respond intimately to every mouse coordinate and scroll gesture.',
    JSON.stringify(['Custom GLSL Shaders & WebGL Canvas Components', 'Optimized Low-Poly 3D Model Assets (GLTF/GLB)', 'Lottie & CSS Fluid Micro-Animations', 'Hardware-Adaptive Fallback Runtimes']),
    JSON.stringify(['01 3D Spatial Concept Art & Low-Poly Modeling', '02 Shader Prototyping & Physics Simulation', '03 WebGL Integration & FPS Frame Optimization', '04 Touch & Reduced-Motion Ergonomic Tuning']),
    JSON.stringify([
      { q: 'Will 3D animations slow down mobile devices?', a: 'No. We implement dynamic LOD (Level of Detail) scaling, framerate throttling, and static WebP fallbacks for low-power devices.' }
    ]),
    5,
    1
  );

  insertService.run(
    'AI & Creative Innovation',
    'ai-creative-innovation',
    'brain-circuit',
    'Generative intelligence pipelines, automated creative workflows, bespoke LLM assistants, and intelligent agentic tools.',
    'We pioneer the symbiotic frontier of human intuition and synthetic cognition. We design private, enterprise-grade AI assistants, automated brief parsers, and custom vision models that amplify creative velocity.',
    JSON.stringify(['Bespoke LLM Agent Architecture & System Prompts', 'Secure API Middleware with Rate-Limiting & Guardrails', 'Automated Content & Asset Generation Pipelines', 'Conversational Onboarding UX Interfaces']),
    JSON.stringify(['01 Feasibility Assessment & Risk Audit', '02 Prompt Engineering & RAG Architecture', '03 Backend Gateway & Data Sanitization', '04 Adaptive UI & Model Fine-Tuning']),
    JSON.stringify([
      { q: 'Is our corporate data sent to public AI models?', a: 'Never. We deploy zero-data-retention APIs and self-hosted open-weights models ensuring 100% intellectual property confidentiality.' }
    ]),
    6,
    1
  );

  // 4. Projects (Featured Works)
  const insertProject = db.prepare(`
    INSERT INTO projects (title, slug, client, year, category_id, summary, challenge, solution, results, technologies, deliverables, featured_image, metrics_json, status, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProject.run(
    'AETHER Neural Trading Terminal',
    'aether-neural-trading-terminal',
    'Aether Quant AG (Zurich)',
    '2026',
    catProduct,
    'Institutional algorithmic trading platform featuring real-time WebGL orderbook topography and sub-millisecond execution telemetry.',
    'Aether Quant required a trading interface that could visualize massive multi-asset liquidity pools in real time without cognitive fatigue or latency bottlenecks.',
    'We designed a high-contrast cyber-ergonomic dashboard with custom GPU-accelerated volumetric depth maps, enabling quant traders to perceive dark pool movements intuitively.',
    'Achieved 42% faster anomaly detection, 0 dropped frames during peak volatility, and facilitated over $4.2B in volume within the first quarter post-launch.',
    JSON.stringify(['WebGL', 'Three.js', 'WebSockets', 'Design System', 'Custom GLSL']),
    'Complete Web Terminal, Mobile Companion App, Design System Tokens',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    JSON.stringify([{ label: 'Execution Speed', value: '1.2ms' }, { label: 'Active Volume', value: '$4.2B+' }, { label: 'UX Satisfaction', value: '99.4%' }]),
    'published',
    1
  );

  insertProject.run(
    'KAIROS Autonomous Horology',
    'kairos-autonomous-horology',
    'Kairos Atelier (Geneva / Tokyo)',
    '2026',
    catWeb3D,
    'Interactive 3D digital flagship and timepiece customizer allowing collectors to dissect mechanical micro-calibers in real time.',
    'Kairos wanted to launch a $65,000 limited mechanical wristwatch strictly online to a global discerning audience, requiring unprecedented tactile fidelity on web browsers.',
    'We created an interactive 3D ray-traced web showcase where collectors can manipulate the escapement mechanism, switch dial alloys, and hear authentic acoustic ticking calibrated to the escapement frequency.',
    'Sold out all 100 limited units in 14 minutes, generating $6.5M in revenue with over 450,000 organic interactive sessions worldwide.',
    JSON.stringify(['Three.js', 'Web Audio API', 'PBR Shaders', 'Vite', 'Stripe Global']),
    '3D Timepiece Configurator, E-Commerce Flagship, Global Brand Campaign',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    JSON.stringify([{ label: 'Sellout Velocity', value: '14 Mins' }, { label: 'Gross Revenue', value: '$6.5M' }, { label: 'Global Press', value: '80+ Outlets' }]),
    'published',
    1
  );

  insertProject.run(
    'VORTEX Hyper-Mobility Brand Architecture',
    'vortex-hyper-mobility-brand',
    'Vortex Dynamics (Stockholm)',
    '2025',
    catBranding,
    'Complete strategic rebranding, bespoke kinetic typography, and digital presence for an electric supersonic aviation pioneer.',
    'Vortex was transitioning from a classified aerospace skunkworks to a publicly traded commercial aviation entity, needing a brand identity that projected unassailable authority and ecological stewardship.',
    'We developed a minimalist yet aggressive brand identity system based on aerodynamic wind tunnel visualizations and Mach shockwave geometry, accompanied by an editorial digital manifesto.',
    'Attracted $180M in Series B venture capital, increased qualified talent applications by 340%, and won Red Dot Brand of the Year.',
    JSON.stringify(['Brand Strategy', 'Typography Design', '3D Motion', 'Web Architecture']),
    'Brand Bible (320 Pages), Custom Display Font, Investor Microsite',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    JSON.stringify([{ label: 'Capital Raised', value: '$180M' }, { label: 'Talent Inflow', value: '+340%' }, { label: 'Accolades', value: 'Red Dot 2025' }]),
    'published',
    1
  );

  insertProject.run(
    'SYNAPSE Generative Workflow Studio',
    'synapse-generative-workflow-studio',
    'Synapse Labs (San Francisco)',
    '2026',
    catAI,
    'Agentic canvas and visual programming interface empowering creative directors to orchestrate multimodal generative AI models.',
    'Visual artists struggled with fragmented CLI tools and rigid text prompt boxes to generate cohesive film storyboards and video animations.',
    'We engineered an infinite node-based creative canvas with real-time latent diffusion interpolation and voice-guided prompt refinement, making generative AI as intuitive as pencil and paper.',
    'Adopted by 38 Fortune 500 creative departments, cutting concept pre-visualization timelines from 2 weeks to 4 hours.',
    JSON.stringify(['React / Vite', 'Canvas API', 'PyTorch Gateway', 'FastAPI', 'Node.js']),
    'Web Canvas Application, API Gateway, Developer SDK, Enterprise CMS',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    JSON.stringify([{ label: 'Workflow Acceleration', value: '85%' }, { label: 'Enterprise Teams', value: '38+' }, { label: 'Weekly Active Users', value: '92K' }]),
    'published',
    1
  );

  // 5. Articles (Insights)
  const insertArticle = db.prepare(`
    INSERT INTO articles (title, slug, author, category, excerpt, body, cover_image, read_time, tags, status, views_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertArticle.run(
    'Beyond the Flat Web: Designing for Spatial Cognition and Living Interfaces',
    'beyond-the-flat-web-spatial-cognition',
    'Elena Vance',
    'Design Philosophy',
    'Why the next epoch of digital product design demands depth, tactile responsiveness, and visceral physical metaphors.',
    `For the past decade, web design has been suffocated by uniform SaaS minimalism. Every landing page looks like an indistinguishable assembly of white cards, generic rounded buttons, and bland vector illustrations.

At BRAIN WAVES, we argue that humans are spatial, sensory beings. When software reflects organic tension, dynamic lighting, and real-time physical reaction, cognition speeds up and emotional resonance skyrockets.

1. The Fallacy of Pure Flatness:
Flat design emerged to clean up the skeuomorphic excesses of early mobile operating systems. However, in stripping away shadows, depth, and tactile response, flat design also stripped away perceptual hierarchy.

2. Living Motion as Information:
Motion should never be decorative confetti. In our design language, motion is an acoustic radar. When a cursor passes over an interactive surface, the subtle gravitational warping informs the user of affordances before a single click is registered.

3. Cyber-Luxury and the Power of Void:
By utilizing deep Void Black (#080910) paired with targeted spectral cyan and violet accents, we focus human attention with surgical accuracy. The interface ceases to be a noisy screen—it becomes a high-fidelity instrument.`,
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    '6 min read',
    'UI/UX, 3D Web, Spatial Computing, Future of Web',
    'published',
    1420
  );

  insertArticle.run(
    'Engineering Zero-Latency 3D on the Web: WebGL, Shaders, and Frame Budgets',
    'engineering-zero-latency-3d-webgl-shaders',
    'Marcus Thorne',
    'Creative Engineering',
    'A technical breakdown of how we render 120 FPS interactive particle meshes and custom GLSL noise without crashing mobile GPUs.',
    `Achieving cinematic visual fidelity on consumer devices requires ruthless optimization and direct GPU command pipelines.

1. Bypassing the DOM for Intensive Math:
When dealing with tens of thousands of particles or fluid dynamic meshes, manipulating DOM elements or relying on high-level canvas abstractions will inevitably trigger layout thrashing. We write custom vertex and fragment shaders directly in GLSL.

2. Adaptive LOD and Device Fingerprinting:
Not every user visits your website on an M3 Max MacBook. We measure GPU hardware capabilities on initialization. Devices with restricted thermal envelopes receive lightweight point-cloud simulations, while high-performance desktop rigs receive full ray-marched refractive surfaces.

3. The 16-Millisecond Sacred Budget:
To maintain 60 to 120 frames per second, the JavaScript main thread must never spend more than 8ms per frame on calculation, leaving the rest for GPU rendering. We offload heavy vertex computations into Web Workers and use SharedArrayBuffers where available.`,
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    '8 min read',
    'WebGL, Performance, Shaders, Three.js, Engineering',
    'published',
    2150
  );

  insertArticle.run(
    'The AI Brand Dilemma: Maintaining Soul in an Era of Algorithmic Abundance',
    'ai-brand-dilemma-maintaining-soul',
    'Elena Vance',
    'Strategic Branding',
    'When anyone can generate endless synthetic assets in seconds, human intentionality, taste, and provocation become the only true currencies.',
    `Generative AI has solved the problem of asset volume. Today, an algorithm can create 500 logo variations or 10,000 product mockups in an afternoon.

Yet paradoxically, the more assets flood the world, the less value they possess.

True brand equity has never been about volume; it is about stance, point of view, and uncompromised curation. AI is an astounding collaborator for rapid conceptual divergence, but human discernment is the singular filter that creates distinction.

We use AI to accelerate our exploration, but every final line, curve, and word is carved with deliberate human conviction.`,
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    '5 min read',
    'AI, Strategy, Culture, Creative Direction',
    'published',
    980
  );

  // 6. Testimonials
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (client_name, client_title, company, quote, rating, is_published, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertTestimonial.run(
    'Dr. Aris Thorne',
    'Chief Technology Officer',
    'Aether Quant AG',
    'BRAIN WAVES did not merely redesign our trading terminal; they transformed how our quants perceive market liquidity. Their execution velocity and artistic fearlessness are unmatched in the global agency landscape.',
    5,
    1,
    1
  );

  insertTestimonial.run(
    'Sora Takahashi',
    'Founder & Master Horologist',
    'Kairos Atelier Tokyo',
    'The 3D web experience engineered by BRAIN WAVES felt like holding a real mechanical tourbillon in the palm of your hand. Selling out our limited allocation in under fifteen minutes proved their digital experience was worth every yen.',
    5,
    1,
    2
  );

  insertTestimonial.run(
    'Astrid Lindqvist',
    'VP of Brand Strategy',
    'Vortex Dynamics',
    'They challenged our internal assumptions from day one. The result was a brand identity and investor portal that helped us close our $180M Series B ahead of schedule. Truly visionary partners.',
    5,
    1,
    3
  );

  // 7. Site Settings
  const insertSetting = db.prepare(`
    INSERT INTO site_settings (key, value, type)
    VALUES (?, ?, ?)
  `);

  insertSetting.run('studio_name', 'BRAIN WAVES', 'string');
  insertSetting.run('brand_tagline', 'WE TURN IDEAS INTO DIGITAL EXPERIENCES', 'string');
  insertSetting.run('primary_email', 'hello@brainwaves.studio', 'string');
  insertSetting.run('inquiries_email', 'projects@brainwaves.studio', 'string');
  insertSetting.run('office_location', 'Jakarta · Tokyo · Zurich (Global Remote Studio)', 'string');
  insertSetting.run('timezone_display', 'WIB (UTC+7) · Active Hub', 'string');
  insertSetting.run('seo_title', 'BRAIN WAVES — Independent Digital Creative Studio', 'string');
  insertSetting.run('seo_description', 'A futuristic digital agency turning bold ideas into brands, products, and immersive experiences.', 'string');
  insertSetting.run('availability_status', 'AVAILABLE FOR Q4 / 2026 ENGAGEMENTS', 'string');

  // 8. Demo Inquiries for the Admin Sales Pipeline
  const insertInquiry = db.prepare(`
    INSERT INTO project_inquiries (reference, name, email, company, preferred_contact, budget_range, timeline, brief, status, assigned_to)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const inq1 = insertInquiry.run(
    'BW-2026-8912',
    'Alexander Wright',
    'alex@hyperion-energy.com',
    'Hyperion Next-Gen Fusion',
    'email',
    'Rp25–50 juta',
    '1–2 bulan',
    'We require an interactive 3D website and brand identity for our magnetic confinement fusion project. Need to display 3D plasma chambers and interactive investor whitepapers.',
    'proposal',
    'Elena Vance'
  ).lastInsertRowid;

  const inq2 = insertInquiry.run(
    'BW-2026-9431',
    'Maya Putri',
    'maya@serenamind.co.id',
    'Serena Wellness Ecosystem',
    'whatsapp',
    'Rp10–25 juta',
    '3–6 bulan',
    'Redesigning our mobile and web app for digital mental health therapeutics with spatial soundscape immersion and neural biofeedback tracking.',
    'new',
    'Elena Vance'
  ).lastInsertRowid;

  // Link services to inquiries
  const insertInqService = db.prepare('INSERT INTO inquiry_services (inquiry_id, service_id) VALUES (?, ?)');
  insertInqService.run(inq1, 1);
  insertInqService.run(inq1, 3);
  insertInqService.run(inq1, 5);
  insertInqService.run(inq2, 2);
  insertInqService.run(inq2, 6);

  // Add inquiry follow-up note
  const insertNote = db.prepare('INSERT INTO inquiry_notes (inquiry_id, author, note) VALUES (?, ?, ?)');
  insertNote.run(inq1, 'Elena Vance', 'Initial discovery call completed on Oct 24. Prepared technical architecture outline; sending formal proposal deck by Friday.');

  // 9. Initial Activity Logs
  const insertLog = db.prepare(`
    INSERT INTO activity_logs (action, entity_type, entity_id, user_email, metadata)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertLog.run('SYSTEM_INIT', 'system', '0', 'system@brainwaves.studio', 'BRAIN WAVES database initialized with baseline PRD specs');
  insertLog.run('INQUIRY_RECEIVED', 'inquiry', 'BW-2026-9431', 'maya@serenamind.co.id', 'New inquiry generated via Project Lab');
  insertLog.run('PROPOSAL_DISPATCHED', 'inquiry', 'BW-2026-8912', 'alex@hyperion-energy.com', 'Proposal stage entered for Hyperion Next-Gen Fusion');

  console.log('[DB] Seeding completed successfully!');
}

module.exports = { seedDatabase, hashPassword };

if (require.main === module) {
  const dbPath = path.join(__dirname, '..', 'database.sqlite');
  seedDatabase(dbPath);
}
