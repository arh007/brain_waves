# BRAIN WAVES — Independent Digital Creative Studio

> **"IDEAS ARE JUST THE BEGINNING. WE CREATE WHAT'S NEXT."**  
> *Baseline Product Requirements Document (PRD) Implementation v1.0*

A futuristic, high-octane digital agency platform engineered with **Neon Futuristic / Cyber-Luxury** aesthetics, interactive 3D WebGL neural simulation, responsive client portfolio, 5-step Smart Project Builder wizard with reference generation, and a protected Admin CMS control center with real-time lead pipeline management.

---

## ⚡ Quick Start (Zero Dependencies)

The application is built on top of Node.js 22 Native HTTP and built-in SQLite engine, requiring **zero external npm modules or registry dependencies**:

```bash
# Start the production-grade application server
npm start
# or directly:
node server.js
```

Then visit in your browser:
- **Public Experience**: [http://localhost:3000](http://localhost:3000)
- **Admin CMS Portal**: [http://localhost:3000/#admin](http://localhost:3000/#admin)

### 🔐 Default Administrative Credentials
- **Email**: `admin@brainwaves.studio`
- **Password**: `admin123`
- **Role**: Creative Director (Full CRUD, Pipeline Status Updates, Internal Notes, Settings)

---

## 🚀 Key Features & PRD Compliance

### 1. Visual Identity & Art Direction (Neon Futuristic)
- **Void Black** (`#080910`), **Surface Dark** (`#11121E`), **Neon Cyan** (`#65F5FF`), **Electric Violet** (`#9B6BFF`), and **Stellar White** (`#F5F5F7`).
- Interactive fluid typography (`Space Grotesk`, `Inter`, `JetBrains Mono`).
- Ambient cursor glow tracker and kinetic marquee ticker.

### 2. Interactive 3D Neural Sphere & Web Audio Synthesizer
- **3D Fibonacci Neural Lattice**: 130+ spherical nodes rendered via GPU canvas with 3D projection, mouse torque tilt, synaptic energy pulses, and auto-pause optimization.
- **Web Audio Procedural FX**: Real-time synthesized cyber blips, chords, and a 4Hz binaural Theta drone with audio mute control.

### 3. Complete Page Structure & Public Experience
- **Cinematic Hero**: Status badge with live beacon, oversized headline, and 3 core pillars.
- **Selected Works**: Category filtering (`Brand Architecture`, `Digital Products`, `Web & 3D`, `AI Tech`), instant search, and rich Case Study modal (Challenge, Solution, Results, Metrics).
- **Studio Capabilities**: 6 services with Deep Dive modal detailing deliverables, process steps, and FAQs.
- **Creative Manifesto**: Highlighting 4 core tenets with glowing ambient aura.
- **5-Stage Process**: Discover → Strategize → Create → Launch → Evolve.
- **Our Universe (About)**: Studio philosophy, 4 key metrics, and leadership team cards.
- **Insights (Editorial)**: Articles with read times, author meta, and reader modal.
- **Client Endorsements**: Verified testimonials with ratings.
- **Direct Consultation**: Rapid contact form with studio status and timezone indicator (`Jakarta WIB / UTC+7`).

### 4. Smart Project Builder (Project Lab Wizard)
- **5-Step Interactive Wizard**:
  1. *Choose Mission* (Services multi-selection)
  2. *Project Vision* (Brief & challenge)
  3. *Parameters* (Budget range pills & timeline pills)
  4. *Identity* (Client contact & anti-spam honeypot)
  5. *Review & Transmit* (Live dossier preview card)
- **Automatic Reference Generation**: Assigns unique dossier codes (e.g. `BW-2026-8942`).
- **Confirmation Receipt Modal**: Immediate copyable reference and timestamp.

### 5. Admin CMS Control Center (`#admin`)
- **Protected Session Login** with salted SHA-256 password hashing.
- **Overview & KPI Dashboard**: Total inquiries, new leads, active services, projects.
- **Inquiries Sales Pipeline**: Filter by status (`New`, `Contacted`, `Proposal`, `In Progress`, `Closed`), live status updater, and internal follow-up notes drawer (`inquiry_notes`).
- **Projects Manager**: Add new portfolio works with live preview and deletion.
- **Activity Audit Logs**: Chronological log of administrative actions.
- **Studio Settings Editor**: Global site metadata, contact emails, and office locations.

---

## 🗄️ Relational Database Schema (SQLite / MySQL)

The system automatically creates and seeds `database.sqlite` on first boot:
- `users`: Administrator credentials and roles
- `project_categories`: Portfolio classification
- `services`: Agency capabilities, deliverables, and process steps
- `projects`: Detailed case studies, challenges, solutions, and metrics
- `articles`: Editorial thought leadership articles
- `testimonials`: Client endorsements and ratings
- `project_inquiries`: Sales pipeline leads generated via Project Lab
- `inquiry_services`: Many-to-many relationship mapping inquiries to services
- `inquiry_notes`: Internal follow-up notes written by studio team
- `site_settings`: Global studio configuration
- `activity_logs`: Immutable security audit trail

---

## 📦 Laravel Production Specifications

For teams deploying to a PHP/Laravel infrastructure as outlined in PRD Section 5:
- Migrations: `laravel-specs/database/migrations/2026_10_26_000001_create_brain_waves_tables.php`
- Models: `laravel-specs/app/Models/ProjectInquiry.php`, `Project.php`, `Service.php`
- Web Routes: `laravel-specs/routes/web.php`
- Architecture Documentation: `laravel-specs/README.md`
