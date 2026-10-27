
# PRD Website Digital Creative Agency — BRAIN WAVES

<AsyncImageGroup query={["futuristic creative digital agency website dark mode neon cyan purple 3D abstract brain design","award winning digital agency website futuristic typography dark background interactive 3D graphics","digital creative studio website cyberpunk neon violet cyan glassmorphism landing page"]} layout="bento" aspectRatio="5:4" size="lg" numPerQuery={1}/>

**BRAIN WAVES** adalah konsep digital creative agency dengan identitas futuristik, berani, premium, dan berorientasi pada inovasi. Website ini bukan sekadar company profile, tetapi sebuah *digital experience* yang menampilkan kreativitas, teknologi, branding, dan pengembangan produk digital dalam satu ekosistem interaktif.

<box border radius="xl" padding={4} gap={3}>
  <row align="center" gap={3}>
    <box background="#10111D" radius="lg" size="56px" align="center" justify="center">
      <icon name="brain-circuit" color="#65F5FF" size="2xl"/>
    </box>
    <box flex="1" gap={1}>
      <title size="xl">BRAIN WAVES</title>
      <text color="secondary" size="sm">Digital Creative Agency · Product & Experience Studio</text>
      <badge color="success">Project Vision</badge>
    </box>
  </row>
  <divider color="#34354B"/>
  <text color="secondary" size="sm">Brand statement</text>
  <title size="2xl">WE TURN IDEAS INTO DIGITAL EXPERIENCES.</title>
  Mengubah ide menjadi identitas, produk digital, dan pengalaman visual yang berani, cerdas, serta berkesan.
  <row gap={2} wrap="wrap">
    <badge>Futuristic UI/UX</badge>
    <badge>Creative Technology</badge>
    <badge>Immersive 3D</badge>
    <badge>AI-Ready</badge>
  </row>
</box>

## 1. Visi dan tujuan website

- Membangun citra BRAIN WAVES sebagai creative agency modern berstandar global.
- Memamerkan portofolio melalui pengalaman visual interaktif.
- Mendapatkan calon klien melalui formulir proyek dan konsultasi.
- Menjelaskan layanan kreatif, branding, pengembangan website, aplikasi, motion design, dan solusi berbasis AI.
- Menyediakan CMS agar tim dapat memperbarui portofolio, artikel, layanan, dan studi kasus tanpa mengubah kode.

Target pengguna: startup, perusahaan, institusi, UMKM modern, personal brand, dan organisasi yang membutuhkan transformasi digital.

## 2. Konsep visual dan art direction

<box gap={3}>
  <row align="start" gap={3}>
    <AsyncImage query="abstract glowing cyan neural brain network 3D dark background futuristic digital art" aspectRatio="3:4" maxWidth="124px"/>
    <box flex="1" gap={1}>
      **Neural Future**

      <text color="secondary" size="sm">Visual utama berupa jaringan saraf digital, gelombang energi, partikel, dan objek 3D abstrak yang menggambarkan kecerdasan serta kreativitas.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <AsyncImage query="minimal futuristic dark web design neon cyan electric violet typography glassmorphism interface" aspectRatio="3:4" maxWidth="124px"/>
    <box flex="1" gap={1}>
      **Cyber-Luxury Interface**

      <text color="secondary" size="sm">Latar hitam pekat, tipografi besar, aksen neon, panel transparan, garis tipis, dan layout editorial yang terasa eksklusif.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <AsyncImage query="abstract iridescent chrome liquid orb purple blue holographic 3D render on black background" aspectRatio="3:4" maxWidth="124px"/>
    <box flex="1" gap={1}>
      **Living Motion**

      <text color="secondary" size="sm">Gerakan halus, objek yang merespons kursor, transisi antarhalaman, efek parallax, dan interaksi mikro tanpa mengorbankan performa.</text>
    </box>
  </row>
</box>

Palet warna yang direkomendasikan:

<grid columns={4} gap={2}>
  <grid-item>
    <box background="#080910" radius="lg" height="58px" border={{size:1,color:"#34354B"}}/>
    <text weight="medium" size="sm">Void Black</text>
    <text color="secondary" size="xs">#080910</text>
  </grid-item>
  <grid-item>
    <box background="#65F5FF" radius="lg" height="58px"/>
    <text weight="medium" size="sm">Neon Cyan</text>
    <text color="secondary" size="xs">#65F5FF</text>
  </grid-item>
  <grid-item>
    <box background="#9B6BFF" radius="lg" height="58px"/>
    <text weight="medium" size="sm">Electric Violet</text>
    <text color="secondary" size="xs">#9B6BFF</text>
  </grid-item>
  <grid-item>
    <box background="#F5F5F7" radius="lg" height="58px"/>
    <text weight="medium" size="sm">Stellar White</text>
    <text color="secondary" size="xs">#F5F5F7</text>
  </grid-item>
</grid>

## 3. Struktur halaman website

<box border radius="xl" gap={0}>
  {#each [{n:"01",name:"Home",desc:"Landing page sinematik, headline besar, animasi neural 3D, layanan unggulan, karya terbaik, dan CTA."},{n:"02",name:"Our Universe",desc:"Tentang BRAIN WAVES, filosofi, visi, nilai, tim kreatif, dan cara kerja studio."},{n:"03",name:"Services",desc:"Layanan branding, UI/UX, web development, mobile apps, creative campaigns, motion design, dan AI solutions."},{n:"04",name:"Selected Works",desc:"Galeri proyek dengan filter kategori, preview visual, dan studi kasus lengkap."},{n:"05",name:"Project Lab",desc:"Pengalaman interaktif untuk memilih layanan, menentukan kebutuhan, estimasi anggaran, dan mengirim brief."},{n:"06",name:"Insights",desc:"Artikel, tren desain, teknologi, kreativitas, dan studi pemikiran BRAIN WAVES."},{n:"07",name:"Contact",desc:"Formulir konsultasi, informasi kontak, tautan sosial, dan ajakan kolaborasi."}] as p}
    <row key={p.n} align="start" padding={3} gap={3}>
      <box background="#181A2A" radius="md" size="40px" align="center" justify="center">
        <title color="#65F5FF" size="md">{p.n}</title>
      </box>
      <box flex="1" gap={1}>
        <title size="md">{p.name}</title>
        <text color="secondary" size="sm">{p.desc}</text>
      </box>
    </row>
    <divider color="#272838"/>
  {/each}
</box>

## 4. Spesifikasi homepage

Homepage harus menjadi bagian paling impresif dari website.

<box background="#080910" theme="dark" radius="2xl" padding={4} gap={4}>
  <row align="center" justify="between">
    <row align="center" gap={2}>
      <icon name="brain-circuit" color="#65F5FF" size="xl"/>
      <title size="md" color="#FFFFFF">BRAIN WAVES<span style="display:none"> </span></title>
    </row>
    <icon name="menu" color="#F5F5F7" size="xl"/>
  </row>
  <divider color="#34354B"/>
  <box padding={{top:5,bottom:4}} gap={3}>
    <text color="#65F5FF" size="xs">INDEPENDENT DIGITAL CREATIVE STUDIO</text>
    <title size="2xl" color="#FFFFFF">IDEAS ARE JUST THE BEGINNING.</title>
    <title size="xl" color="#9B6BFF">WE CREATE WHAT'S NEXT.</title>
    <text color="#C3C5D5" size="sm">We build brands, digital products, and experiences for a world that never stops evolving.</text>
    <row align="center" gap={2} wrap="wrap">
      <box background="#65F5FF" radius="full" padding={{x:4,y:3}}>
        <row align="center" gap={2}>
          <text color="#080910" weight="medium" size="sm">Start a project</text>
          <icon name="arrow-up-right" color="#080910" size="sm"/>
        </row>
      </box>
      <box border={{size:1,color:"#45465D"}} radius="full" padding={{x:4,y:3}}>
        <text color="#F5F5F7" size="sm">Explore our work ↘</text>
      </box>
    </row>
  </box>
  <AsyncImage query="ultra futuristic glowing cyan violet 3D abstract neural sphere liquid chrome energy ribbons black void cinematic digital art" aspectRatio="16:9" width="100%" radius="xl"/>
  <grid columns={3} gap={2}>
    <grid-item>
      <title size="lg" color="#65F5FF">01.</title>
      <text size="xs" color="#C3C5D5">Think differently</text>
    </grid-item>
    <grid-item>
      <title size="lg" color="#65F5FF">02.</title>
      <text size="xs" color="#C3C5D5">Design boldly</text>
    </grid-item>
    <grid-item>
      <title size="lg" color="#65F5FF">03.</title>
      <text size="xs" color="#C3C5D5">Build the future</text>
    </grid-item>
  </grid>
  <text color="#85889F" size="xs">Konsep visual homepage — referensi arah desain, bukan situs produksi.</text>
</box>

Urutan section homepage:

1. **Cinematic hero** — headline, objek 3D, efek cahaya, dan CTA.
2. **Marquee ticker** — teks berjalan seperti `STRATEGY / DESIGN / TECHNOLOGY / EXPERIENCE`.
3. **Featured works** — proyek dalam kartu besar dengan hover interaktif.
4. **What we do** — daftar layanan dengan ikon dan animasi.
5. **Creative manifesto** — filosofi dan nilai BRAIN WAVES.
6. **Our process** — Discover, Strategize, Create, Launch, Evolve.
7. **Studio capabilities** — branding, development, digital experience, dan AI.
8. **Client testimonials** — testimoni klien yang telah diverifikasi.
9. **Contact CTA** — ajakan membuat sesuatu yang luar biasa.
10. **Footer** — navigasi, media sosial, email bisnis, dan copyright.

## 5. Fitur unggulan yang wajib direncanakan

<box gap={3}>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="48px" align="center" justify="center">
      <icon name="orbit" size="xl" color="#65F5FF"/>
    </box>
    <box flex="1" gap={1}>
      **Interactive 3D Hero**

      <text color="secondary" size="sm">Objek 3D merespons gerakan kursor, dengan partikel, efek cahaya, dan animasi berlapis. Sediakan versi ringan untuk perangkat seluler.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="48px" align="center" justify="center">
      <icon name="layers-3" size="xl" color="#9B6BFF"/>
    </box>
    <box flex="1" gap={1}>
      **Immersive Portfolio**

      <text color="secondary" size="sm">Filter berdasarkan kategori, galeri visual, detail studi kasus, tantangan proyek, solusi, hasil, dan teknologi yang digunakan.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="48px" align="center" justify="center">
      <icon name="sparkles" size="xl" color="#65F5FF"/>
    </box>
    <box flex="1" gap={1}>
      **AI Creative Assistant**

      <text color="secondary" size="sm">Asisten opsional yang membantu calon klien menyusun brief, mengidentifikasi kebutuhan, dan memilih layanan yang sesuai. Integrasi AI menggunakan API dan anggaran terpisah.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="48px" align="center" justify="center">
      <icon name="workflow" size="xl" color="#9B6BFF"/>
    </box>
    <box flex="1" gap={1}>
      **Smart Project Builder**

      <text color="secondary" size="sm">Wizard interaktif untuk memilih layanan, deskripsi kebutuhan, target penyelesaian, dan rentang anggaran, kemudian menghasilkan ringkasan brief.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="48px" align="center" justify="center">
      <icon name="layout-dashboard" size="xl" color="#65F5FF"/>
    </box>
    <box flex="1" gap={1}>
      **Admin CMS Dashboard**

      <text color="secondary" size="sm">Kelola proyek, kategori layanan, artikel, gambar, testimoni, pesan calon klien, SEO, dan pengaturan tampilan melalui satu panel admin.</text>
    </box>
  </row>
</box>

## 6. Detail halaman Project Builder

Fitur ini menjadi pembeda BRAIN WAVES dari website agency biasa.

{@body const [services,setServices] = DIL.useState(["Website & Web App"])}
{@body const [budget,setBudget] = DIL.useState("Rp10–25 juta")}
{@body const [timeline,setTimeline] = DIL.useState("1–2 bulan")}
{@body const [brief,setBrief] = DIL.useState("")}
<box border radius="xl" padding={4} gap={4}>
  <box gap={1}>
    <title size="lg">Let's build something extraordinary.</title>
    <text color="secondary" size="sm">Contoh interaksi awal Project Builder. Ini merupakan prototipe konseptual, belum mengirim data ke server.</text>
  </box>
  <text weight="medium">1. Layanan yang dibutuhkan</text>
  {#each ["Branding & Visual Identity","Website & Web App","Mobile Application","UI/UX Design","Motion & 3D Design","AI Solutions"] as service}
    <checkbox key={service} checked={services.includes(service)} onChange={v=>setServices(old=>v?[...old,service]:old.filter(s=>s!==service))} lineThrough={false}>{service}</checkbox>
  {/each}
  <divider/>
  <text weight="medium">2. Rentang anggaran</text>
  <radio-group value={budget} onChange={setBudget} direction="col">
    <radio value="Di bawah Rp10 juta">Di bawah Rp10 juta</radio>
    <radio value="Rp10–25 juta">Rp10–25 juta</radio>
    <radio value="Rp25–50 juta">Rp25–50 juta</radio>
    <radio value="Di atas Rp50 juta">Di atas Rp50 juta</radio>
    <radio value="Diskusi terlebih dahulu">Diskusi terlebih dahulu</radio>
  </radio-group>
  <divider/>
  <text weight="medium">3. Target penyelesaian</text>
  <radio-group value={timeline} onChange={setTimeline} direction="col">
    <radio value="Kurang dari 1 bulan">Kurang dari 1 bulan</radio>
    <radio value="1–2 bulan">1–2 bulan</radio>
    <radio value="3–6 bulan">3–6 bulan</radio>
    <radio value="Fleksibel">Fleksibel</radio>
  </radio-group>
  <text weight="medium">4. Ceritakan ide proyek</text>
  <textarea value={brief} onChange={setBrief} placeholder="Apa yang ingin Anda bangun? Siapa target penggunanya?" rows={3}/>
  <button block onClick={()=>GenUI.issueNewTurn("Susun ringkasan project brief BRAIN WAVES berdasarkan prototipe Project Builder berikut. Layanan: "+(services.join(", ")||"Belum dipilih")+". Anggaran: "+budget+". Target waktu: "+timeline+". Ide proyek: "+(brief||"Belum diisi")+". Buat ringkasan kebutuhan, ruang lingkup awal, dan pertanyaan klarifikasi tanpa menganggap estimasi biaya sebagai penawaran resmi.")}>Generate project brief <icon name="arrow-up-right" size="sm" inline/></button>
</box>

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


