
## 8. Spesifikasi AI Creative Assistant — Phase 2

AI sengaja dipisahkan dari peluncuran awal agar biaya, privasi, dan kualitas website utama dapat dikendalikan.

### Fitur Phase 2

<box gap={3}>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="44px" align="center" justify="center">
      <icon name="messages-square" color="#65F5FF" size="xl"/>
    </box>
    <box flex="1" gap={1}>
      **Conversational Project Discovery**

      <text color="secondary" size="sm">Membantu calon klien memperjelas masalah, target pengguna, kebutuhan fitur, dan ruang lingkup proyek melalui percakapan.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="44px" align="center" justify="center">
      <icon name="file-text" color="#9B6BFF" size="xl"/>
    </box>
    <box flex="1" gap={1}>
      **Brief Generator**

      <text color="secondary" size="sm">Mengubah jawaban pengguna menjadi ringkasan kebutuhan yang terstruktur dan dapat ditinjau sebelum dikirim.</text>
    </box>
  </row>
  <row align="start" gap={3}>
    <box background="#171A2C" radius="lg" size="44px" align="center" justify="center">
      <icon name="route" color="#65F5FF" size="xl"/>
    </box>
    <box flex="1" gap={1}>
      **Service Recommendation**

      <text color="secondary" size="sm">Merekomendasikan layanan berdasarkan kebutuhan yang dinyatakan pengguna, bukan berdasarkan asumsi tentang anggaran atau profilnya.</text>
    </box>
  </row>
</box>

### Arsitektur AI

<CodeBlock language="mermaid" editable>
flowchart TD
    A["Project Builder"] --> B["Laravel AI Service"]
    B --> C["Validate Input & Rate Limit"]
    C --> D["Approved AI Provider API"]
    D --> E["Structured Response"]
    E --> F["Validate Response Schema"]
    F --> G["Display Brief to User"]
    G --> H["User Reviews & Approves"]
    H --> I["Existing Inquiry Workflow"]
</CodeBlock>

Ketentuan wajib:

- API key disimpan di environment server, tidak pernah di JavaScript publik.
- Data dikirim ke penyedia AI seminimal mungkin.
- Pengguna dapat melanjutkan Project Builder tanpa AI.
- AI tidak boleh mengarang harga, jaminan hasil, portofolio, atau jadwal resmi.
- Respons harus divalidasi sebelum digunakan.
- Sediakan batas penggunaan, penanganan timeout, fallback, dan pemantauan biaya.
- Pengiriman brief kepada tim tetap memerlukan persetujuan eksplisit pengguna.

## 9. Keamanan, privasi, dan operasional

### Kontrol keamanan wajib

- HTTPS untuk seluruh halaman.
- Hash password menggunakan mekanisme bawaan Laravel.
- CSRF protection pada formulir berbasis session.
- Validasi input server-side dan escaping output.
- Policy atau middleware untuk setiap operasi admin yang sensitif.
- Rate limiting pada login, inquiry, dan endpoint yang berisiko disalahgunakan.
- MFA untuk administrator bila memungkinkan.
- Audit log untuk perubahan penting.
- Pembatasan tipe dan ukuran file unggahan.
- Secret management melalui environment, bukan source code.
- Backup database dan media secara berkala serta pengujian pemulihan.
- Error produksi tidak menampilkan stack trace atau informasi rahasia.

### Privasi

Data calon klien harus dikumpulkan sesuai kebutuhan. Akses inquiry dibatasi untuk personel yang berwenang. Masa retensi data, mekanisme penghapusan, persetujuan pemrosesan, dan prosedur penanganan permintaan pengguna harus ditetapkan sebelum peluncuran.

### Operasional produksi

- Lingkungan development, staging, dan production terpisah.
- Deploy melalui proses yang dapat diulang.
- Jalankan migration secara terkendali.
- Konfigurasi queue dan scheduler bila fitur terkait digunakan.
- Pantau error aplikasi, performa, penggunaan storage, dan kegagalan email.
- Simpan backup di lokasi terpisah dari server utama.
- Dokumentasikan prosedur rollback dan pemulihan.

## 10. Non-functional requirements

| Aspek | Target penerimaan |
|---|---|
| Responsive | Berfungsi pada viewport 360 px hingga desktop lebar |
| Performance | Target Core Web Vitals: LCP ≤ 2,5 detik, INP ≤ 200 ms, CLS ≤ 0,1 pada persentil ke-75 |
| 3D loading | Tidak menghalangi konten utama; tersedia fallback statis |
| Accessibility | Target WCAG 2.2 AA untuk halaman dan alur utama |
| SEO | Metadata, canonical, sitemap, dan status publikasi benar |
| Reliability | Error ditangani dengan pesan yang jelas; inquiry tersimpan secara andal |
| Security | Tidak ada akses admin tanpa otorisasi; pengujian input dan upload lulus |
| Maintainability | Migration, kode, konfigurasi, dan proses deployment terdokumentasi |

Target performa harus diukur pada staging dan produksi. Kinerja dipengaruhi perangkat, jaringan, hosting, ukuran media, serta implementasi aktual, sehingga angka di atas merupakan kriteria pengujian, bukan jaminan otomatis.

## 11. Acceptance criteria — kriteria penerimaan

Bagian ini menjadi checklist QA sebelum website disetujui untuk rilis.

{@body const criteria = [
{group:"Public website",items:[
"Homepage menampilkan hero, layanan, proyek unggulan, CTA, dan footer.",
"Semua navigasi dan URL detail bekerja tanpa tautan rusak.",
"Halaman Services, Works, Insights, About, Contact, dan Legal dapat diakses.",
"Halaman publik hanya menampilkan konten yang berstatus published.",
"Layout berfungsi pada perangkat mobile, tablet, dan desktop."
]},
{group:"UI/UX & motion",items:[
"Efek 3D dapat dimuat tanpa memblokir teks dan navigasi utama.",
"Interaksi keyboard dan focus state tersedia untuk elemen interaktif.",
"prefers-reduced-motion dihormati dan terdapat fallback untuk 3D.",
"Form, modal, dropdown, dan menu mobile memiliki state loading, error, dan sukses yang relevan."
]},
{group:"Project Builder",items:[
"Pengguna dapat memilih beberapa layanan dan mengisi brief.",
"Validasi field wajib dan format email bekerja di frontend serta backend.",
"Data inquiry tersimpan di MySQL dan memiliki reference unik.",
"Data yang tersimpan muncul di admin dan dapat ditelusuri.",
"Kegagalan email tidak menghapus inquiry yang sudah tersimpan.",
"Spam dan permintaan berulang dibatasi."
]},
{group:"Admin CMS",items:[
"Pengguna yang tidak terautentikasi tidak dapat mengakses halaman admin.",
"Pengguna tanpa izin tidak dapat melakukan operasi terlarang melalui URL atau API.",
"Admin berwenang dapat membuat, mengedit, memublikasikan, dan mengarsipkan konten.",
"Upload media memvalidasi tipe file, ukuran, dan akses penyimpanan.",
"Perubahan status inquiry dan operasi sensitif dicatat di audit log."
]},
{group:"SEO & security",items:[
"Slug unik dan metadata halaman dapat dikelola dengan benar.",
"Sitemap tidak memasukkan draft atau halaman privat.",
"CSRF, validasi input, output escaping, dan rate limiting telah diuji.",
"Error produksi tidak membocorkan stack trace atau secret.",
"Backup berhasil dibuat dan prosedur restore telah diuji."
]},
{group:"Release readiness",items:[
"Automated tests untuk model, route, authorization, dan inquiry lulus.",
"Browser tests untuk alur kritis lulus.",
"Target Core Web Vitals dan aksesibilitas telah diuji.",
"Environment, deployment, rollback, dan konfigurasi email terdokumentasi.",
"AI Creative Assistant tidak dibutuhkan agar versi pertama berfungsi."
]}
]}
{@body const [checked,setChecked] = DIL.useState([])}
<box border radius="xl" padding={3} gap={3}>
  <row align="center" justify="between">
    <title size="lg">QA release checklist</title>
    <badge color={checked.length===criteria.reduce((n,g)=>n+g.items.length,0)?"success":"secondary"}>{checked.length}/{criteria.reduce((n,g)=>n+g.items.length,0)}</badge>
  </row>
  <box background="#202132" height="6px" radius="full" clip>
    <box background="#65F5FF" height="6px" radius="full" width={`${checked.length/criteria.reduce((n,g)=>n+g.items.length,0)*100}%`}/>
  </box>
  {#each criteria as group}
    <box gap={2}>
      <title size="md">{group.group}</title>
      {#each group.items as item}
        <checkbox key={item} checked={checked.includes(item)} onChange={v=>setChecked(old=>v?[...old,item]:old.filter(x=>x!==item))} lineThrough={false}>{item}</checkbox>
      {/each}
    </box>
    <divider color="subtle"/>
  {/each}
  <row gap={2}>
    <button variant="outline" color="secondary" onClick={()=>setChecked([])}>Reset checklist</button>
    <button block onClick={()=>GenUI.copy(criteria.map(g=>g.group+"\n"+g.items.map(item=>(checked.includes(item)?"[x] ":"[ ] ")+item).join("\n")).join("\n\n"))}>Salin checklist QA</button>
  </row>
</box>

**Aturan rilis:** seluruh kriteria kritis untuk keamanan, penyimpanan inquiry, authorization, dan alur navigasi wajib lulus. Temuan nonkritis harus dicatat, diberi prioritas, dan disetujui sebelum peluncuran.


