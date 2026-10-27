
## 7. Rekomendasi teknologi

Untuk implementasi BRAIN WAVES, saya merekomendasikan Laravel sebagai backend agar website agency, CMS, formulir proyek, dan dashboard admin dapat dikembangkan dalam satu sistem.

<box border radius="xl" padding={3} gap={0}>
  {#each [{name:"Frontend",tech:"HTML, Tailwind CSS, JavaScript",desc:"Layout responsif, desain visual, dan animasi antarmuka."},{name:"3D & Motion",tech:"Three.js / React Three Fiber",desc:"Objek 3D, shader, partikel, dan interaksi visual; digunakan sesuai kebutuhan."},{name:"Backend",tech:"Laravel",desc:"Routing, validasi, formulir, API, autentikasi, dan logika bisnis."},{name:"Database",tech:"MySQL",desc:"Penyimpanan proyek, kategori, artikel, pesan, pengguna, dan konfigurasi."},{name:"Admin UI",tech:"Livewire + Tailwind CSS",desc:"Panel pengelolaan konten tanpa perlu membangun dashboard terpisah."},{name:"Deployment",tech:"Git, hosting/VPS, HTTPS",desc:"Lingkungan staging, deployment produksi, backup, dan monitoring."}] as t}
    <box padding={3} gap={1}>
      <text color="secondary" size="xs">{t.name}</text>
      <title size="md">{t.tech}</title>
      <text size="sm">{t.desc}</text>
    </box>
    <divider color="subtle"/>
  {/each}
</box>

Rekomendasi arsitektur: **Laravel + MySQL sebagai fondasi, dengan JavaScript dan Three.js untuk pengalaman visual futuristik.** Tidak perlu memaksakan React pada seluruh frontend apabila animasi dan interaksi dapat dibangun secara efisien tanpa itu.

## 8. Rancangan database

| Tabel | Fungsi |
|---|---|
| `users` | Pengguna admin dan tim |
| `services` | Daftar layanan agency |
| `projects` | Data proyek dan studi kasus |
| `project_categories` | Kategori portofolio |
| `project_media` | Gambar, video, dan media proyek |
| `articles` | Artikel dan insights |
| `testimonials` | Testimoni klien terverifikasi |
| `project_inquiries` | Brief dan permintaan calon klien |
| `inquiry_services` | Relasi permintaan dengan layanan |
| `site_settings` | Logo, identitas, kontak, SEO, dan konfigurasi |
| `activity_logs` | Catatan aktivitas admin |

Gunakan slug unik untuk halaman proyek dan artikel, validasi server-side, pembatasan unggahan file, serta otorisasi berbasis peran untuk seluruh fitur administrasi.

## 9. Fitur panel admin

- Dashboard ringkasan proyek, artikel, dan pesan masuk.
- CRUD layanan dan kategori.
- CRUD portofolio dengan galeri media dan status publikasi.
- Editor artikel dengan slug, metadata SEO, dan gambar sampul.
- Pengelolaan permintaan proyek dengan status *New, Contacted, Proposal, In Progress,* dan *Closed*.
- Pengelolaan testimoni dan pengaturan website.
- Pengelolaan akun admin, keamanan login, dan audit aktivitas.

## 10. Standar kualitas dan keamanan

<box gap={2}>
  {#each [{title:"Responsive-first",desc:"Tampilan optimal pada desktop, tablet, dan smartphone."},{title:"Performance",desc:"Target Core Web Vitals yang baik; kompresi gambar, lazy loading, pemisahan aset, dan pemuatan 3D secara bertahap."},{title:"Accessibility",desc:"Kontras yang cukup, navigasi keyboard, teks alternatif, dan dukungan prefers-reduced-motion."},{title:"SEO",desc:"Metadata unik, sitemap XML, robots.txt, canonical URL, Open Graph, dan structured data yang relevan."},{title:"Security",desc:"CSRF protection, validasi input, rate limiting, proteksi spam, autentikasi admin, dan penyimpanan rahasia di environment."}] as q}
    <row align="start" gap={2}>
      <icon name="check-circle-2" color="#22A06B" size="lg"/>
      <box flex="1" gap={1}>
        **{q.title}**
        <text color="secondary" size="sm">{q.desc}</text>
      </box>
    </row>
  {/each}
</box>

## 11. Tahapan pengembangan

<list connector="solid" marker="number" gap={3}>
  <list-item>
    **Tahap 1 — Brand & UI/UX**

    <text color="secondary" size="sm">Menetapkan identitas visual, desain halaman, tipografi, sistem warna, dan prototipe interaktif.</text>
  </list-item>
  <list-item>
    **Tahap 2 — Frontend Experience**

    <text color="secondary" size="sm">Membangun homepage, halaman layanan, portofolio, animasi, responsivitas, dan navigasi.</text>
  </list-item>
  <list-item>
    **Tahap 3 — Backend & CMS**

    <text color="secondary" size="sm">Membangun database, autentikasi admin, manajemen konten, formulir proyek, dan notifikasi.</text>
  </list-item>
  <list-item>
    **Tahap 4 — Integrasi & Optimasi**

    <text color="secondary" size="sm">Pengujian keamanan, SEO, performa, browser, perangkat seluler, dan aksesibilitas.</text>
  </list-item>
  <list-item>
    **Tahap 5 — Launch**

    <text color="secondary" size="sm">Deployment produksi, konfigurasi domain dan HTTPS, backup, serta monitoring.</text>
  </list-item>
</list>

## 12. Kriteria penerimaan proyek

Website dinyatakan siap diluncurkan jika:

- Seluruh halaman utama dapat diakses dan berfungsi pada desktop serta smartphone.
- Navigasi, animasi, filter portofolio, dan formulir proyek berjalan dengan benar.
- Data portofolio, artikel, layanan, dan pesan dapat dikelola melalui dashboard.
- Formulir tervalidasi di server dan data tersimpan dengan benar.
- Tidak ada konten contoh atau testimoni fiktif yang tampil sebagai data nyata.
- Website memenuhi pengujian keamanan dasar dan memiliki konfigurasi HTTPS.
- Animasi berat memiliki fallback sehingga konten utama tetap dapat digunakan saat perangkat tidak mendukung 3D.

## 13. Keputusan produk yang direkomendasikan

{@body const [style,setStyle] = DIL.useState("Neon Futuristic")}
{@body const [scope,setScope] = DIL.useState("Full Agency")}
{@body const [motion,setMotion] = DIL.useState("Immersive 3D")}
{@body const [backend,setBackend] = DIL.useState("Laravel + MySQL")}
{@body const [ai,setAi] = DIL.useState("Phase 2")}
<box border radius="xl" padding={4} gap={4}>
  <title size="lg">Konfigurasi final BRAIN WAVES</title>
  <text color="secondary" size="sm">Pilih arah produk untuk dijadikan acuan rancangan UI dan spesifikasi implementasi berikutnya.</text>
  <box gap={2}>
    <label>Gaya desain</label>
    <radio-group value={style} onChange={setStyle} direction="col">
      <radio value="Neon Futuristic">Neon Futuristic — hitam, cyan, violet</radio>
      <radio value="Cyber Luxury">Cyber Luxury — gelap, chrome, premium</radio>
      <radio value="Experimental Digital">Experimental Digital — berani, artistik, eksperimental</radio>
    </radio-group>
  </box>
  <divider color="subtle"/>
  <box gap={2}>
    <label>Cakupan website</label>
    <radio-group value={scope} onChange={setScope} direction="col">
      <radio value="Landing Page">Landing page premium</radio>
      <radio value="Full Agency">Full agency — semua halaman + CMS admin</radio>
      <radio value="Agency + Client Portal">Full agency + portal klien dan pelacakan proyek</radio>
    </radio-group>
  </box>
  <divider color="subtle"/>
  <box gap={2}>
    <label>Level animasi</label>
    <radio-group value={motion} onChange={setMotion} direction="col">
      <radio value="Premium Motion">Premium motion — ringan dan cepat</radio>
      <radio value="Immersive 3D">Immersive 3D — interaktif, sinematik, futuristik</radio>
    </radio-group>
  </box>
  <divider color="subtle"/>
  <box gap={2}>
    <label>Teknologi</label>
    <radio-group value={backend} onChange={setBackend} direction="col">
      <radio value="Laravel + MySQL">Laravel + MySQL</radio>
      <radio value="Next.js + PostgreSQL">Next.js + PostgreSQL</radio>
    </radio-group>
  </box>
  <divider color="subtle"/>
  <box gap={2}>
    <label>AI Creative Assistant</label>
    <radio-group value={ai} onChange={setAi} direction="col">
      <radio value="Phase 1">Termasuk versi pertama</radio>
      <radio value="Phase 2">Tahap kedua setelah website utama</radio>
      <radio value="No AI">Tidak diperlukan</radio>
    </radio-group>
  </box>
  <button block onClick={()=>GenUI.issueNewTurn("Tetapkan konfigurasi final PRD website BRAIN WAVES dengan gaya desain "+style+", cakupan "+scope+", level animasi "+motion+", teknologi "+backend+", dan AI Creative Assistant "+ai+". Lanjutkan dengan rancangan UI/UX lengkap per halaman, design system, spesifikasi teknis, arsitektur backend, skema database, serta acceptance criteria yang siap digunakan sebagai acuan pembangunan website.")}>Tetapkan konfigurasi & lanjutkan ke rancangan UI/UX <icon name="arrow-right" inline size="sm"/></button>
</box>

**Visi akhirnya:** BRAIN WAVES harus terasa seperti studio kreatif dari masa depan—bukan template agency biasa. Visual yang spektakuler menjadi daya tarik pertama, portofolio membangun kepercayaan, dan pengalaman Project Builder mengubah pengunjung menjadi calon klien.


