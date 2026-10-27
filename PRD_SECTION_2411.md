
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


