
## 5. Spesifikasi teknis dan teknologi

### 5.1 Stack yang ditetapkan

| Lapisan | Teknologi |
|---|---|
| Backend | Laravel, versi stabil yang kompatibel saat implementasi |
| Frontend | Blade, Tailwind CSS, JavaScript modular |
| Interaksi admin | Livewire |
| Animasi 3D | Three.js, dimuat sesuai kebutuhan halaman |
| Database | MySQL dengan InnoDB |
| Build assets | Vite |
| Autentikasi | Laravel authentication, session, password hashing |
| Email | SMTP atau penyedia email transaksional |
| Testing | PHPUnit atau Pest, ditambah browser testing |
| Version control | Git |
| Production | Hosting atau VPS yang mendukung versi PHP dan ekstensi Laravel |

Versi framework dan dependency harus dikunci melalui `composer.lock` dan lockfile npm. Sebelum implementasi, pilih versi Laravel yang masih mendapat dukungan keamanan dan sesuai dengan lingkungan hosting.

### 5.2 Prinsip arsitektur

1. Laravel menjadi sumber kebenaran untuk semua data, otorisasi, validasi, dan perubahan status.
2. Blade digunakan untuk halaman publik yang SEO-friendly.
3. Livewire digunakan pada antarmuka admin dan interaksi yang cocok dengan pola server-driven.
4. Three.js hanya dipakai untuk komponen yang memang membutuhkan 3D.
5. Data portofolio, artikel, layanan, dan pengaturan tidak ditulis langsung di template.
6. AI tidak menjadi dependensi wajib versi pertama.
7. Seluruh integrasi eksternal memiliki konfigurasi, penanganan error, dan fallback.

### 5.3 Struktur direktori yang direkomendasikan

<CodeBlock language="text" editable>
brain-waves/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── ServiceController.php
│   │   │   ├── InsightController.php
│   │   │   └── ProjectInquiryController.php
│   │   ├── Requests/
│   │   └── Middleware/
│   ├── Livewire/
│   │   └── Admin/
│   ├── Models/
│   ├── Policies/
│   ├── Services/
│   ├── Jobs/
│   └── Mail/
├── database/
│   ├── migrations/
│   ├── factories/
│   └── seeders/
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── app.js
│   │   └── three/
│   └── views/
│       ├── layouts/
│       ├── components/
│       ├── pages/
│       ├── projects/
│       ├── services/
│       ├── insights/
│       └── livewire/admin/
├── routes/
│   ├── web.php
│   └── console.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── public/
│   └── build/
└── storage/
</CodeBlock>

Struktur ini merupakan panduan arsitektur, bukan kewajiban membuat semua file sekaligus. Controller harus tetap tipis; validasi berada di Form Request, aturan akses di Policy, dan logika bisnis yang dapat digunakan kembali ditempatkan pada service class bila memang diperlukan.

### 5.4 Rancangan alur permintaan proyek

<CodeBlock language="mermaid" editable>
flowchart TD
    A["Pengunjung membuka Project Lab"] --> B["Memilih layanan dan kebutuhan"]
    B --> C["Validasi frontend"]
    C --> D["POST ke Laravel"]
    D --> E["Validasi server dan anti-spam"]
    E --> F{"Valid?"}
    F -- "Tidak" --> G["Kembalikan pesan validasi"]
    G --> B
    F -- "Ya" --> H["Simpan inquiry ke MySQL"]
    H --> I["Buat nomor referensi"]
    I --> J["Dispatch notifikasi email"]
    J --> K["Tampilkan konfirmasi"]
    H --> L["Inquiry muncul di Admin CMS"]
</CodeBlock>

Penyimpanan inquiry harus berhasil secara independen dari pengiriman email. Kegagalan SMTP tidak boleh menghapus data calon klien yang sudah tersimpan.

### 5.5 Route publik dan admin

<CodeBlock language="php" editable>
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InsightController;
use App\Http\Controllers\ProjectInquiryController;

Route::get('/', HomeController::class)->name('home');

Route::get('/about', fn () =>
    view('pages.about')
)->name('about');

Route::get('/services', [ServiceController::class, 'index'])
    ->name('services.index');

Route::get('/services/{service:slug}', [ServiceController::class, 'show'])
    ->name('services.show');

Route::get('/works', [ProjectController::class, 'index'])
    ->name('projects.index');

Route::get('/works/{project:slug}', [ProjectController::class, 'show'])
    ->name('projects.show');

Route::get('/insights', [InsightController::class, 'index'])
    ->name('insights.index');

Route::get('/insights/{article:slug}', [InsightController::class, 'show'])
    ->name('insights.show');

Route::get('/start-project', fn () =>
    view('pages.project-builder')
)->name('project-builder');

Route::post('/project-inquiries', [ProjectInquiryController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('project-inquiries.store');

// Daftarkan seluruh route admin di grup terproteksi.
// Terapkan autentikasi, verifikasi akun bila diperlukan,
// serta middleware role/permission di sisi server.
</CodeBlock>

Contoh di atas adalah kerangka awal. Route admin belum didaftarkan karena implementasinya harus mengikuti konfigurasi autentikasi dan authorization yang benar. Endpoint publik juga harus menerapkan validasi, proteksi spam, dan pembatasan ukuran payload.

## 6. Arsitektur backend dan aturan bisnis

### 6.1 Modul backend

<box border radius="xl" padding={3} gap={3}>
  {#each [{name:"Content Management",items:"Projects, services, categories, articles, testimonials, media"},{name:"Lead Management",items:"Project inquiries, inquiry services, pipeline status, notes, follow-up"},{name:"Identity & Access",items:"Admin users, roles, permissions, password recovery"},{name:"Site Configuration",items:"Brand identity, contact details, social links, SEO defaults"},{name:"System Operations",items:"Activity logs, notifications, queue jobs, error reporting"}] as m}
    <box gap={1}>
      <title size="md">{m.name}</title>
      <text color="secondary" size="sm">{m.items}</text>
    </box>
    <divider color="subtle"/>
  {/each}
</box>

### 6.2 Status dan workflow inquiry

Status yang diizinkan:

- `new` — permintaan baru.
- `contacted` — calon klien telah dihubungi.
- `proposal` — proposal sedang dipersiapkan atau dikirim.
- `in_progress` — proyek telah disetujui dan dimulai.
- `closed` — proses selesai atau ditutup.

Perubahan status dilakukan oleh pengguna admin yang berwenang. Setiap perubahan status penting dicatat di activity log. Status bukan pengganti kontrak atau bukti bahwa pembayaran telah diterima.

### 6.3 Aturan publikasi konten

- Konten berstatus draft tidak boleh tampil pada halaman publik.
- Slug harus unik.
- Penghapusan konten harus mempertimbangkan tautan yang masih digunakan.
- Gambar harus memiliki batas ukuran, tipe MIME yang diizinkan, dan nama file yang aman.
- Artikel dan proyek yang diarsipkan harus ditangani dengan respons HTTP yang tepat.
- Metadata SEO dapat dikustomisasi per konten dan memiliki fallback ke pengaturan global.

### 6.4 Penanganan gambar dan video

- Gunakan WebP atau AVIF bila didukung pipeline aset.
- Simpan file di storage yang sesuai; database menyimpan path, metadata, dan relasinya.
- Buat variasi thumbnail dan ukuran gambar yang sesuai dengan komponen.
- Video hero menggunakan poster, pemuatan tertunda, dan fallback gambar.
- Jangan memaksa browser mengunduh semua aset 3D atau video saat halaman pertama kali dibuka.

## 7. Skema database MySQL

### 7.1 ERD konseptual

<CodeBlock language="mermaid" editable>
erDiagram
    USERS ||--o{ PROJECTS : creates
    USERS ||--o{ ARTICLES : authors
    USERS ||--o{ PROJECT_INQUIRIES : manages
    PROJECT_CATEGORIES ||--o{ PROJECT_CATEGORY_MAP : maps
    PROJECTS ||--o{ PROJECT_CATEGORY_MAP : categorized
    PROJECTS ||--o{ PROJECT_MEDIA : contains
    SERVICES ||--o{ INQUIRY_SERVICES : selected
    PROJECT_INQUIRIES ||--o{ INQUIRY_SERVICES : includes
    PROJECT_INQUIRIES ||--o{ INQUIRY_NOTES : has
    USERS ||--o{ ACTIVITY_LOGS : performs
    USERS ||--o{ INQUIRY_NOTES : writes
</CodeBlock>

### 7.2 Tabel dan kolom utama

| Tabel | Kolom utama | Catatan |
|---|---|---|
| `users` | id, name, email, password, role, is_active | Akun admin dan tim |
| `services` | id, name, slug, summary, description, is_published, sort_order | Katalog layanan |
| `project_categories` | id, name, slug | Kategori proyek |
| `projects` | id, title, slug, summary, challenge, solution, results, status, published_at | Studi kasus |
| `project_category_map` | project_id, category_id | Pivot kategori |
| `project_media` | id, project_id, path, media_type, alt_text, sort_order | Galeri media |
| `articles` | id, user_id, title, slug, excerpt, body, status, published_at | Insights |
| `testimonials` | id, client_name, company, quote, is_published | Testimoni |
| `project_inquiries` | id, reference, name, email, company, budget_range, timeline, brief, status, assigned_to | Prospek |
| `inquiry_services` | inquiry_id, service_id | Layanan pilihan |
| `inquiry_notes` | id, inquiry_id, user_id, note | Catatan tindak lanjut |
| `site_settings` | id, key, value, type | Konfigurasi situs |
| `activity_logs` | id, user_id, action, entity_type, entity_id, metadata | Audit aktivitas |

### 7.3 Tipe data, indeks, dan relasi

Ketentuan implementasi:

- Gunakan `BIGINT UNSIGNED` untuk primary key konvensional, atau ULID jika dibutuhkan identifier yang tidak mudah ditebak.
- Gunakan foreign key dengan kebijakan penghapusan yang eksplisit.
- Gunakan `VARCHAR(191)` atau ukuran yang sesuai untuk slug unik berdasarkan charset dan kebutuhan indeks.
- Gunakan `TEXT` atau `LONGTEXT` untuk isi artikel dan deskripsi panjang sesuai batas yang diperlukan.
- Gunakan `DECIMAL` hanya jika kelak ada nilai finansial terstruktur; untuk rentang anggaran awal, pilihan kategori lebih sederhana.
- Gunakan `JSON` untuk metadata yang benar-benar fleksibel, bukan untuk menggantikan relasi inti.
- Tambahkan indeks pada `slug`, `status`, `published_at`, `reference`, `email`, dan foreign key yang sering dicari.
- Gunakan `created_at` dan `updated_at`; gunakan `deleted_at` hanya pada entitas yang memang membutuhkan soft delete.

### 7.4 Contoh migration inquiry

<CodeBlock language="php" editable>
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('project_inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 32)->unique();
            $table->string('name', 120);
            $table->string('email', 254)->index();
            $table->string('company', 160)->nullable();
            $table->string('budget_range', 50)->nullable();
            $table->string('timeline', 50)->nullable();
            $table->text('brief');
            $table->string('status', 30)->default('new')->index();
            $table->foreignId('assigned_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('contacted_at')->nullable();
            $table->timestamps();
        });

        Schema::create('inquiry_services', function (Blueprint $table) {
            $table->foreignId('inquiry_id')
                ->constrained('project_inquiries')
                ->cascadeOnDelete();

            $table->foreignId('service_id')
                ->constrained('services')
                ->restrictOnDelete();

            $table->primary(['inquiry_id', 'service_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiry_services');
        Schema::dropIfExists('project_inquiries');
    }
};
</CodeBlock>

Migration ini adalah contoh inti, bukan keseluruhan migrasi. Sebelum dipakai, tambahkan tabel lain sesuai ERD, definisikan enum atau konstanta status pada layer aplikasi, dan sesuaikan tipe ID agar konsisten dengan seluruh model.


