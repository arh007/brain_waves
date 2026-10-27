
# BRAIN WAVES — Final Product Requirements Document

<text color="secondary" size="sm">Versi 1.0 · 26 Oktober 2026 · Status: Baseline spesifikasi produk</text>

Konfigurasi final BRAIN WAVES ditetapkan sebagai acuan pembangunan website. Dokumen ini mencakup pengalaman pengguna, desain antarmuka, arsitektur Laravel, database MySQL, panel admin, keamanan, dan kriteria penerimaan yang dapat digunakan oleh developer sebagai spesifikasi implementasi.

<box background="#080910" theme="dark" radius="2xl" padding={4} gap={3}>
  <row align="center" gap={3}>
    <box background="#15192C" radius="xl" size="64px" align="center" justify="center">
      <icon name="brain-circuit" color="#65F5FF" size="3xl"/>
    </box>
    <box flex="1" gap={1}>
      <title size="2xl" color="#F5F5F7">BRAIN WAVES</title>
      <text color="#65F5FF" size="sm">INDEPENDENT DIGITAL CREATIVE STUDIO</text>
    </box>
  </row>
  <divider color="#35374A"/>
  <title size="2xl" color="#FFFFFF">IDEAS ARE JUST THE BEGINNING.</title>
  <title size="lg" color="#9B6BFF">WE CREATE WHAT'S NEXT.</title>
  <text color="#C7C9D9">A futuristic digital agency that transforms ideas into brands, products, and immersive experiences.</text>
  <row gap={2} wrap="wrap">
    <badge color="info">Neon Futuristic</badge>
    <badge>Immersive 3D</badge>
    <badge>Laravel + MySQL</badge>
    <badge>AI Phase 2</badge>
  </row>
</box>

## 1. Konfigurasi produk final

<box border radius="xl" padding={3} gap={3}>
  {#each [{icon:"palette",title:"Visual identity",value:"Neon Futuristic",desc:"Void Black, Neon Cyan, Electric Violet, dan tipografi ekspresif."},{icon:"layers-3",title:"Product scope",value:"Full Agency",desc:"Website publik, portofolio, layanan, insights, Project Builder, CMS, dan dashboard admin."},{icon:"orbit",title:"Motion experience",value:"Immersive 3D",desc:"Hero 3D interaktif, partikel neural, parallax, transisi, dan micro-interactions."},{icon:"database",title:"Technology stack",value:"Laravel + MySQL",desc:"Backend terintegrasi, autentikasi admin, database relasional, dan API internal."},{icon:"sparkles",title:"AI Creative Assistant",value:"Phase 2",desc:"Tidak menjadi dependensi peluncuran versi pertama; integrasi dilakukan setelah fondasi website stabil."}] as c}
    <row align="start" gap={3}>
      <box background="#171A2C" radius="lg" size="44px" align="center" justify="center">
        <icon name={c.icon} color="#65F5FF" size="xl"/>
      </box>
      <box flex="1" gap={1}>
        <text color="secondary" size="xs">{c.title}</text>
        <title size="md">{c.value}</title>
        <text size="sm">{c.desc}</text>
      </box>
    </row>
  {/each}
</box>

### Tujuan bisnis

1. Membangun kredibilitas BRAIN WAVES sebagai digital creative agency premium.
2. Menampilkan karya dalam format studi kasus yang meyakinkan.
3. Menghasilkan prospek melalui Project Builder dan formulir konsultasi.
4. Memungkinkan pengelolaan seluruh konten melalui CMS.
5. Menyiapkan arsitektur yang dapat dikembangkan menjadi portal klien dan layanan AI.

### Pengguna utama

- **Prospective clients:** mencari partner branding, website, aplikasi, dan digital experience.
- **Business decision makers:** membutuhkan solusi digital untuk bisnis atau organisasi.
- **Creative team:** mengelola portofolio, artikel, dan konten.
- **Administrator:** mengelola sistem, pengguna, pengaturan, dan prospek.

## 2. Sitemap dan struktur navigasi

<box border radius="xl" padding={3} gap={2} align="center">
  <box background="#171A2C" border={{size:1,color:"#65F5FF"}} radius="lg" padding={3} width="100%" align="center">
    <title size="md">PUBLIC WEBSITE</title>
    <text size="xs" color="secondary">brainwaves.example · domain ilustratif</text>
  </box>
  <icon name="arrow-down" color="#65F5FF" size="lg"/>
  <grid columns={2} gap={2}>
    {#each [{name:"Home",path:"/"},{name:"Our Universe",path:"/about"},{name:"Services",path:"/services"},{name:"Selected Works",path:"/works"},{name:"Project Lab",path:"/start-project"},{name:"Insights",path:"/insights"},{name:"Contact",path:"/contact"},{name:"Legal",path:"/privacy, /terms"}] as p}
      <grid-item>
        <box background="#11121E" border radius="md" padding={2} gap={1}>
          <text weight="medium" size="sm">{p.name}</text>
          <text color="secondary" size="xs">{p.path}</text>
        </box>
      </grid-item>
    {/each}
  </grid>
  <divider color="subtle"/>
  <box background="#171A2C" radius="lg" padding={3} width="100%" align="center" gap={1}>
    <title size="md">ADMIN CMS</title>
    <text size="sm" color="secondary">/admin · Protected access</text>
  </box>
  <grid columns={2} gap={2}>
    {#each ["Dashboard","Projects & Media","Services & Categories","Insights & SEO","Inquiries & Pipeline","Testimonials","Users & Roles","Site Settings & Logs"] as p}
      <grid-item>
        <box border radius="md" padding={2}>
          <text size="sm">{p}</text>
        </box>
      </grid-item>
    {/each}
  </grid>
</box>

URL halaman detail wajib memakai slug yang unik, misalnya `/works/neural-commerce-platform` dan `/insights/designing-for-the-next-web`.


