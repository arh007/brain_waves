
## 3. Rancangan UI/UX lengkap per halaman

### 3.1 Home — cinematic landing page

<AsyncImageGroup query={["dark futuristic digital agency landing page oversized typography neon cyan purple 3D sphere black web design","futuristic portfolio agency website dark grid neon purple cyan featured work cards editorial layout"]} layout="bento" aspectRatio="5:4" size="lg"/>

<box gap={2}>
  {#each [{n:"01",name:"Navigation",desc:"Logo neural, menu Work / Services / Studio / Insights, CTA Start a Project, serta menu mobile."},{n:"02",name:"Hero Experience",desc:"Headline besar, subheadline, CTA utama, CTA sekunder, objek 3D interaktif, dan indikator scroll."},{n:"03",name:"Capabilities Marquee",desc:"Ticker bergerak berisi BRAND STRATEGY · DIGITAL PRODUCTS · CREATIVE TECHNOLOGY."},{n:"04",name:"Featured Works",desc:"Tiga sampai enam proyek unggulan, thumbnail besar, kategori, judul, dan hover motion."},{n:"05",name:"Services Overview",desc:"Layanan ditampilkan dalam kartu modular dengan deskripsi singkat dan tautan ke detail."},{n:"06",name:"Creative Manifesto",desc:"Narasi filosofi BRAIN WAVES dengan visual gelombang dan tipografi editorial."},{n:"07",name:"Our Process",desc:"Discover → Strategize → Create → Launch → Evolve."},{n:"08",name:"Testimonials & CTA",desc:"Testimoni yang telah disetujui klien, ajakan konsultasi, dan footer."}] as s}
    <row align="start" gap={3}>
      <box size="36px" radius="md" background="#171A2C" align="center" justify="center">
        <text color="#65F5FF" weight="medium">{s.n}</text>
      </box>
      <box flex="1" gap={1}>
        **{s.name}**
        <text color="secondary" size="sm">{s.desc}</text>
      </box>
    </row>
  {/each}
</box>

**Interaksi:** hero merespons gerakan pointer dengan batas gerak yang kecil; kartu proyek mempunyai hover state; CTA mengarah ke halaman proyek; animasi tidak boleh menghalangi klik, navigasi keyboard, atau pembacaan konten.

### 3.2 Our Universe — halaman tentang studio

- Hero dengan pernyataan visi dan visual abstrak.
- Cerita dan filosofi studio.
- Nilai inti: Curiosity, Precision, Originality, Collaboration, Evolution.
- Kapabilitas dan bidang keahlian.
- Tim kreatif, hanya ditampilkan jika datanya tersedia.
- CTA menuju Project Lab.

### 3.3 Services — katalog layanan

<box gap={2}>
  {#each [{name:"Brand Strategy & Identity",icon:"fingerprint",desc:"Riset brand, positioning, strategi komunikasi, logo, visual identity, dan brand guidelines."},{name:"Digital Product Design",icon:"panels-top-left",desc:"User research, information architecture, user flow, wireframe, UI/UX, dan prototyping."},{name:"Web & Application Development",icon:"code-2",desc:"Website bisnis, landing page, portal, dashboard, CMS, dan aplikasi web."},{name:"Creative Campaigns",icon:"megaphone",desc:"Konsep kampanye digital, visual storytelling, materi promosi, dan konten kreatif."},{name:"Motion & 3D Experiences",icon:"orbit",desc:"Motion graphics, visual 3D, interactive storytelling, dan pengalaman imersif."},{name:"AI & Creative Innovation",icon:"brain-circuit",desc:"Eksperimen AI, workflow kreatif, dan integrasi AI berdasarkan kebutuhan proyek."}] as s}
    <row align="start" gap={3}>
      <box background="#15182A" radius="lg" size="48px" align="center" justify="center">
        <icon name={s.icon} color="#65F5FF" size="xl"/>
      </box>
      <box flex="1" gap={1}>
        **{s.name}**
        <text color="secondary" size="sm">{s.desc}</text>
      </box>
    </row>
  {/each}
</box>

Setiap layanan memiliki halaman atau detail dinamis yang memuat deskripsi, ruang lingkup, proses kerja, deliverables, FAQ, proyek terkait, dan CTA. Harga bersifat opsional dan hanya ditampilkan jika telah dikonfigurasi admin.

### 3.4 Selected Works — portofolio

<AsyncImageGroup query={["premium dark creative agency portfolio project cards neon blue branding mockup","modern futuristic fintech dashboard design mockup dark interface purple cyan","minimal premium brand identity packaging design editorial portfolio"]} layout="bento" aspectRatio="5:4" size="lg"/>

Fitur wajib:

- Filter kategori tanpa reload halaman jika memungkinkan.
- Search berdasarkan judul, ringkasan, atau tag.
- Grid responsif dengan gambar berkualitas.
- Detail studi kasus dengan konteks, tantangan, solusi, deliverables, teknologi, dan hasil.
- Navigasi proyek sebelumnya/berikutnya.
- SEO metadata unik dan Open Graph.
- Media dengan lazy loading dan fallback bila gagal dimuat.

**Aturan data:** angka peningkatan penjualan, conversion rate, atau metrik keberhasilan tidak boleh dibuat-buat. Hanya tampilkan hasil yang memiliki dasar dan persetujuan publikasi.

### 3.5 Project Lab — Project Builder

Halaman ini memandu calon klien melalui wizard lima langkah.

<box border radius="xl" padding={3} gap={3}>
  {#each [{n:"01",title:"Choose your mission",desc:"Pilih satu atau beberapa layanan yang dibutuhkan."},{n:"02",title:"Define your vision",desc:"Jelaskan tujuan, target pengguna, tantangan, dan kebutuhan."},{n:"03",title:"Set your parameters",desc:"Pilih rentang anggaran dan target penyelesaian."},{n:"04",title:"Tell us about yourself",desc:"Isi nama, email, perusahaan opsional, dan cara dihubungi."},{n:"05",title:"Review & submit",desc:"Tinjau ringkasan, setujui pemberitahuan privasi, dan kirim."}] as s}
    <row align="start" gap={3}>
      <box background="#171A2C" radius="md" size="40px" align="center" justify="center">
        <title color="#65F5FF" size="md">{s.n}</title>
      </box>
      <box flex="1" gap={1}>
        <title size="md">{s.title}</title>
        <text color="secondary" size="sm">{s.desc}</text>
      </box>
    </row>
  {/each}
</box>

Perilaku sistem:

- Pengguna dapat kembali ke langkah sebelumnya tanpa kehilangan isian.
- Validasi dilakukan di frontend dan backend.
- Setelah berhasil, tampilkan nomor referensi dan halaman konfirmasi.
- Kirim notifikasi kepada tim melalui email apabila layanan email tersedia.
- Jangan menjanjikan harga atau jadwal final secara otomatis.
- Cegah spam menggunakan rate limiting, honeypot, dan proteksi tambahan bila dibutuhkan.

### 3.6 Insights — editorial dan SEO

- Daftar artikel dengan kategori, tanggal, penulis, gambar sampul, dan estimasi waktu baca.
- Pencarian, filter kategori, pagination, dan artikel terkait.
- Halaman artikel dengan daftar isi opsional, gambar, kutipan, serta CTA.
- Slug, meta title, meta description, canonical URL, Open Graph.
- Sitemap otomatis hanya memuat artikel publik.

### 3.7 Contact — konsultasi

Halaman Contact memuat formulir ringkas, alamat email bisnis yang telah diverifikasi, tautan media sosial, jam respons jika ditetapkan, serta CTA menuju Project Lab. Informasi alamat fisik atau nomor telepon tidak boleh ditampilkan sebelum dikonfirmasi oleh pemilik bisnis.

### 3.8 Privacy Policy & Terms

Halaman legal harus menjelaskan data yang dikumpulkan, tujuan pemrosesan, penyimpanan, penggunaan cookies jika ada, pihak ketiga, hak pengguna, dan kontak untuk permintaan privasi. Isi final harus disesuaikan dengan operasional bisnis sebenarnya.

### 3.9 Admin CMS

<box border radius="xl" padding={3} gap={3}>
  <row align="center" gap={2}>
    <icon name="layout-dashboard" size="xl" color="#65F5FF"/>
    <box flex="1" gap={1}>
      <title size="lg">Admin Control Center</title>
      <text color="secondary" size="sm">Panel privat untuk tim BRAIN WAVES</text>
    </box>
    <badge>Protected</badge>
  </row>
  <grid columns={2} gap={2}>
    <grid-item>
      <box background="#11121E" radius="lg" padding={3} gap={1}>
        <icon name="briefcase-business" color="#65F5FF" size="lg"/>
        <text color="secondary" size="xs">Portfolio</text>
        <title size="lg">Projects</title>
      </box>
    </grid-item>
    <grid-item>
      <box background="#11121E" radius="lg" padding={3} gap={1}>
        <icon name="inbox" color="#9B6BFF" size="lg"/>
        <text color="secondary" size="xs">Sales pipeline</text>
        <title size="lg">Inquiries</title>
      </box>
    </grid-item>
    <grid-item>
      <box background="#11121E" radius="lg" padding={3} gap={1}>
        <icon name="file-text" color="#65F5FF" size="lg"/>
        <text color="secondary" size="xs">Publishing</text>
        <title size="lg">Insights</title>
      </box>
    </grid-item>
    <grid-item>
      <box background="#11121E" radius="lg" padding={3} gap={1}>
        <icon name="settings-2" color="#9B6BFF" size="lg"/>
        <text color="secondary" size="xs">Configuration</text>
        <title size="lg">Settings</title>
      </box>
    </grid-item>
  </grid>
</box>

Panel admin mencakup dashboard, manajemen proyek dan media, layanan, kategori, artikel, testimoni, inquiry, akun dan role, konfigurasi website, serta log aktivitas. Semua operasi sensitif harus dilindungi oleh autentikasi dan authorization di server, bukan hanya dengan menyembunyikan menu di UI.

## 4. Design system

### 4.1 Warna dan token

<box border radius="xl" padding={3} gap={3}>
  {#each [{name:"Void Black",hex:"#080910",usage:"Latar utama"},{name:"Surface Dark",hex:"#11121E",usage:"Kartu dan panel"},{name:"Elevated Surface",hex:"#191B2B",usage:"Modal dan menu"},{name:"Neon Cyan",hex:"#65F5FF",usage:"CTA dan aksen utama"},{name:"Electric Violet",hex:"#9B6BFF",usage:"Aksen sekunder"},{name:"Stellar White",hex:"#F5F5F7",usage:"Teks utama"}] as c}
    <row align="center" gap={3}>
      <box background={c.hex} border={{size:1,color:"#44465B"}} radius="md" size="42px"/>
      <box flex="1" gap={1}>
        <text weight="medium">{c.name}</text>
        <text color="secondary" size="xs">{c.hex} · {c.usage}</text>
      </box>
    </row>
  {/each}
</box>

Token tambahan:

- `--text-secondary: #B8BACC`
- `--border-subtle: #292B3C`
- `--success: #43D9A3`
- `--warning: #FFC66D`
- `--danger: #FF6B83`

Gunakan warna status secara konsisten. Pastikan kontras teks sesuai WCAG 2.2 AA; warna neon untuk teks kecil harus diuji terhadap latar sebenarnya.

### 4.2 Tipografi

| Peran | Rekomendasi |
|---|---|
| Display | Space Grotesk atau font display serupa |
| Body | Inter atau font sans-serif serupa |
| Label teknis | JetBrains Mono |
| H1 desktop | 72–112 px, fluid |
| H1 mobile | 40–56 px |
| H2 | 36–64 px, fluid |
| Body | 16–18 px |
| Caption | Minimum 12–14 px |

Gunakan `clamp()` untuk ukuran yang fleksibel dan batasi lebar teks panjang agar tetap nyaman dibaca.

### 4.3 Layout dan komponen

- Container maksimal sekitar 1440 px.
- Grid desktop 12 kolom, tablet 8 kolom, mobile 4 kolom.
- Spacing berbasis kelipatan 4 atau 8 px.
- Radius kartu 12–20 px, tombol pill untuk CTA utama.
- Border tipis, glow selektif, dan glassmorphism terbatas.
- Komponen standar: Button, Navigation, ProjectCard, ServiceCard, ArticleCard, Badge, Modal, FormField, Toast, Pagination, EmptyState, LoadingState.
- Semua komponen memiliki default, hover, focus, active, disabled, dan error state yang relevan.

### 4.4 Motion system

| Interaksi | Durasi target |
|---|---:|
| Hover / focus | 150–220 ms |
| Dropdown / modal | 200–300 ms |
| Section reveal | 400–700 ms |
| Route transition | 250–450 ms |
| Ambient 3D | Berulang dengan gerak halus |

Durasi di atas merupakan acuan desain, bukan jaminan performa. Hormati `prefers-reduced-motion`, hentikan animasi yang tidak terlihat bila memungkinkan, dan jangan menggunakan efek flash atau pergerakan yang mengganggu.


