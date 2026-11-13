# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# APLIKASI PEMBELAJARAN GEOMETRI INTERAKTIF BERBASIS AUGMENTED REALITY

**Nama Produk:** AR Geometri  
**Tema:** Pembelajaran Geometri Interaktif Berbasis Augmented Reality  
**Hook:** Scan, Explore, and Learn!  
**Platform:** Web Application (WebAR)  
**Versi Dokumen:** 1.0  
**Status:** Draft – Product Definition

---

# 1. Ringkasan Produk

## 1.1 Latar Belakang

Geometri merupakan salah satu materi matematika yang mempelajari bentuk, ukuran, posisi, serta karakteristik suatu objek. Salah satu materi yang membutuhkan pemahaman visual adalah bangun ruang atau geometri tiga dimensi. Dalam pembelajarannya, peserta didik perlu memahami bentuk bangun ruang, jumlah sisi, rusuk, titik sudut, dimensi, serta cara menghitung volume dan luas permukaannya.

Namun, penyampaian materi bangun ruang sering kali masih mengandalkan gambar dua dimensi pada buku atau media pembelajaran konvensional. Pendekatan tersebut dapat membuat peserta didik kesulitan membayangkan bentuk objek secara utuh, terutama ketika harus memahami karakteristik bangun ruang dari berbagai sudut pandang.

Untuk mengatasi permasalahan tersebut, dikembangkan aplikasi pembelajaran geometri berbasis Augmented Reality (AR) yang memungkinkan pengguna melihat representasi bangun ruang tiga dimensi melalui kamera perangkat. Aplikasi menggunakan pendekatan Marker-Based Augmented Reality, yaitu teknologi yang mendeteksi gambar marker untuk menampilkan objek virtual pada lingkungan nyata.

Melalui aplikasi ini, pengguna dapat memindai marker untuk menampilkan model bangun ruang tiga dimensi, melakukan interaksi terhadap objek, serta mempelajari informasi dan rumus matematika yang berkaitan dengan objek tersebut.

## 1.2 Deskripsi Produk

AR Geometri merupakan aplikasi pembelajaran berbasis web yang memanfaatkan teknologi Augmented Reality untuk memvisualisasikan tujuh jenis bangun ruang, yaitu kubus, balok, prisma, limas, tabung, kerucut, dan bola.

Pengguna dapat mengakses aplikasi melalui browser, memilih atau memindai marker bangun ruang menggunakan kamera perangkat, kemudian melihat model tiga dimensi yang muncul secara langsung di atas marker.

Setiap model dilengkapi fitur interaksi berupa rotasi dan pengaturan ukuran tampilan. Selain visualisasi, aplikasi menyediakan informasi mengenai nama bangun ruang, karakteristik, dimensi, rumus volume, rumus luas permukaan, serta penjelasan variabel yang digunakan dalam rumus.

Aplikasi dikembangkan menggunakan Next.js sebagai framework utama, MindAR.js untuk mendeteksi dan melacak image marker, serta Three.js untuk merender dan mengelola objek tiga dimensi yang dibuat menggunakan Blender.

## 1.3 Tujuan Produk

1. Menyediakan media pembelajaran geometri yang interaktif melalui teknologi Augmented Reality.
2. Membantu pengguna memahami bentuk bangun ruang dalam representasi tiga dimensi.
3. Mempermudah pengguna dalam mengidentifikasi karakteristik setiap bangun ruang.
4. Membantu pengguna memahami konsep perhitungan volume dan luas permukaan.
5. Menghadirkan pengalaman belajar yang lebih menarik melalui interaksi langsung dengan objek virtual.
6. Menyediakan media pembelajaran yang dapat diakses melalui browser tanpa harus memasang aplikasi Android khusus.

## 1.4 Sasaran Pengguna

Target pengguna awal aplikasi adalah:

- Peserta didik yang sedang mempelajari materi bangun ruang.
- Guru atau tenaga pendidik yang membutuhkan media pembelajaran visual.
- Pengguna umum yang ingin mempelajari konsep dasar geometri tiga dimensi.

**Catatan:** Jenjang pendidikan dan rentang usia pengguna belum ditentukan. Konten awal dirancang menggunakan bahasa Indonesia yang sederhana dan mudah dipahami.

---

# 2. Ruang Lingkup Produk

## 2.1 Cakupan Utama

Versi pertama aplikasi (MVP) mencakup:

1. Halaman utama aplikasi.
2. Katalog tujuh jenis bangun ruang.
3. Halaman detail informasi setiap bangun ruang.
4. Fitur pemindaian image marker menggunakan kamera.
5. Deteksi marker menggunakan MindAR.js.
6. Visualisasi model 3D menggunakan Three.js.
7. Pemuatan model 3D berekstensi GLB.
8. Interaksi rotasi dan zoom model 3D.
9. Informasi karakteristik bangun ruang.
10. Informasi rumus volume dan luas permukaan.
11. Penjelasan variabel dalam rumus.
12. Panduan penggunaan aplikasi.

## 2.2 Di Luar Cakupan MVP

Fitur berikut tidak menjadi prioritas pada versi pertama:

- Sistem autentikasi dan akun pengguna.
- Penyimpanan progres belajar pengguna.
- Dashboard administrasi.
- Pengelolaan materi melalui CMS.
- Database dan backend khusus.
- Kuis, ujian, dan penilaian otomatis.
- Multiplayer atau interaksi AR antarperangkat.
- Pengenalan objek selain image marker.
- Fitur plane tracking dan environment mapping.
- Pengunduhan aplikasi melalui Play Store.

Arsitektur awal menggunakan data dan aset statis yang disimpan di dalam project sehingga backend belum diperlukan.

---

# 3. Konsep dan Mekanisme Aplikasi

## 3.1 Konsep Augmented Reality

Aplikasi menggunakan pendekatan **Marker-Based Augmented Reality dengan Image Tracking**.

Dalam pendekatan ini, kamera perangkat digunakan untuk mendeteksi gambar marker yang telah didaftarkan sebelumnya. Ketika gambar berhasil dikenali, sistem menampilkan objek tiga dimensi pada posisi dan orientasi marker yang terdeteksi.

Setiap marker memiliki keterkaitan dengan satu jenis bangun ruang.

Contoh:
- Marker kubus menampilkan model 3D kubus.
- Marker balok menampilkan model 3D balok.
- Marker prisma menampilkan model 3D prisma.
- Marker limas menampilkan model 3D limas.
- Marker tabung menampilkan model 3D tabung.
- Marker kerucut menampilkan model 3D kerucut.
- Marker bola menampilkan model 3D bola.

## 3.2 Alur Utama Penggunaan

1. Pengguna membuka aplikasi melalui browser.
2. Pengguna masuk ke halaman katalog bangun ruang.
3. Pengguna memilih bangun ruang yang ingin dipelajari atau membuka halaman pemindaian.
4. Aplikasi meminta izin penggunaan kamera.
5. Setelah izin diberikan, kamera menampilkan lingkungan secara langsung.
6. Pengguna mengarahkan kamera ke image marker.
7. MindAR.js mendeteksi marker dan mengidentifikasi target yang cocok.
8. Sistem memetakan indeks target ke model GLB yang sesuai.
9. Three.js memuat dan menampilkan model 3D pada anchor marker.
10. Pengguna dapat memutar atau memperbesar dan memperkecil model.
11. Pengguna membuka panel informasi untuk mempelajari karakteristik serta rumus bangun ruang.
12. Pengguna dapat mengganti marker untuk mempelajari bangun ruang lainnya.
13. Pengguna mengakhiri sesi pemindaian dengan menutup kamera.

## 3.3 Alur Teknis AR

Proses teknis dibagi menjadi beberapa bagian:

**A. Persiapan aset**

- Model dibuat menggunakan Blender.
- Model diekspor ke format GLB.
- Gambar marker disiapkan dalam format PNG atau JPG.
- Seluruh gambar marker dikompilasi menggunakan MindAR Image Target Compiler.
- Hasil kompilasi menghasilkan satu file `.mind` yang berisi data target gambar.

**B. Deteksi marker**

- Browser mengakses kamera perangkat.
- MindAR membaca frame kamera.
- MindAR mencocokkan fitur visual gambar dengan target pada file `.mind`.
- Ketika target terdeteksi, MindAR menyediakan anchor dan indeks target.

**C. Pemetaan model**

Aplikasi memiliki konfigurasi pemetaan indeks marker dengan model 3D.

| Target Index | Jenis Bangun Ruang | File Model |
|---|---|---|
| 0 | Kubus | cube.glb |
| 1 | Balok | cuboid.glb |
| 2 | Prisma | prism.glb |
| 3 | Limas | pyramid.glb |
| 4 | Tabung | cylinder.glb |
| 5 | Kerucut | cone.glb |
| 6 | Bola | sphere.glb |

Urutan indeks harus disesuaikan dengan urutan target yang benar-benar dihasilkan oleh proses kompilasi. Pemetaan tidak boleh hanya mengandalkan asumsi urutan nama file.

**D. Rendering objek**

- Three.js menyediakan scene, kamera virtual, dan renderer.
- GLTFLoader memuat model GLB.
- Model ditempatkan sebagai child dari grup anchor MindAR.
- Transformasi model mengikuti posisi dan orientasi marker.
- Ketika marker tidak lagi terdeteksi, model disembunyikan atau tidak dirender sebagai objek yang sedang dilacak.

**E. Interaksi**

- Pengguna dapat memutar model.
- Pengguna dapat memperbesar dan memperkecil model.
- Pengguna dapat mengembalikan model ke orientasi awal.
- Pengguna dapat membuka dan menutup informasi pembelajaran.

---

# 4. Jenis Bangun Ruang

Aplikasi menyediakan tujuh jenis bangun ruang sebagai materi pembelajaran utama.

## 4.1 Kubus

Karakteristik:
- Memiliki 6 sisi berbentuk persegi.
- Memiliki 12 rusuk dengan panjang sama.
- Memiliki 8 titik sudut.
- Memiliki panjang, lebar, dan tinggi yang sama.

Rumus volume:

V = s³

Rumus luas permukaan:

L = 6s²

Keterangan:
- V = Volume.
- L = Luas permukaan.
- s = Panjang rusuk.

## 4.2 Balok

Karakteristik:
- Memiliki 6 sisi berbentuk persegi panjang.
- Memiliki 12 rusuk.
- Memiliki 8 titik sudut.
- Sisi yang berhadapan memiliki ukuran dan bentuk yang sama.

Rumus volume:

V = p × l × t

Rumus luas permukaan:

L = 2(pl + pt + lt)

Keterangan:
- p = Panjang.
- l = Lebar.
- t = Tinggi.
- V = Volume.
- L = Luas permukaan.

## 4.3 Prisma

Jenis awal: Prisma segitiga.

Karakteristik:
- Memiliki dua bidang alas dan tutup yang kongruen dan sejajar.
- Memiliki sisi tegak berbentuk persegi panjang pada prisma tegak.
- Memiliki rusuk dan titik sudut sesuai bentuk alas.

Rumus volume:

V = Lₐ × t

Rumus luas permukaan prisma tegak:

L = 2Lₐ + Kₐ × t

Keterangan:
- Lₐ = Luas alas.
- Kₐ = Keliling alas.
- t = Tinggi prisma.
- V = Volume.
- L = Luas permukaan.

## 4.4 Limas

Jenis awal: Limas segiempat beraturan dengan alas persegi.

Karakteristik:
- Memiliki satu alas berbentuk segiempat.
- Memiliki sisi tegak berbentuk segitiga.
- Memiliki satu titik puncak.
- Jumlah sisi, rusuk, dan titik sudut mengikuti bentuk alas.

Rumus volume:

V = ⅓ × Lₐ × t

Rumus luas permukaan:

L = Lₐ + jumlah luas seluruh sisi tegak

Keterangan:
- Lₐ = Luas alas.
- t = Tinggi tegak lurus limas.
- V = Volume.
- L = Luas permukaan.

## 4.5 Tabung

Karakteristik:
- Memiliki dua bidang lingkaran yang sejajar dan kongruen.
- Memiliki satu sisi lengkung.
- Tidak memiliki titik sudut.
- Memiliki jari-jari dan tinggi.

Rumus volume:

V = π × r² × t

Rumus luas permukaan:

L = 2πr(r + t)

Keterangan:
- r = Jari-jari alas.
- t = Tinggi tabung.
- π = Konstanta pi.
- V = Volume.
- L = Luas permukaan.

## 4.6 Kerucut

Karakteristik:
- Memiliki satu alas berbentuk lingkaran.
- Memiliki satu sisi lengkung.
- Memiliki satu titik puncak.
- Memiliki jari-jari, tinggi, dan garis pelukis.

Rumus volume:

V = ⅓ × π × r² × t

Rumus luas permukaan:

L = πr(r + g)

Keterangan:
- r = Jari-jari alas.
- t = Tinggi kerucut.
- g = Garis pelukis.
- π = Konstanta pi.
- V = Volume.
- L = Luas permukaan.

## 4.7 Bola

Karakteristik:
- Memiliki satu sisi lengkung.
- Tidak memiliki rusuk.
- Tidak memiliki titik sudut.
- Memiliki satu titik pusat dan jari-jari.

Rumus volume:

V = ⁴⁄₃ × π × r³

Rumus luas permukaan:

L = 4πr²

Keterangan:
- r = Jari-jari bola.
- π = Konstanta pi.
- V = Volume.
- L = Luas permukaan.

---

# 5. Kebutuhan Fungsional

## 5.1 Modul Halaman Utama

**FR-001 – Menampilkan halaman utama**

Sistem harus menyediakan halaman utama yang berisi:
- Identitas aplikasi.
- Deskripsi singkat aplikasi.
- Tujuan pembelajaran.
- Tombol menuju katalog bangun ruang.
- Tombol untuk memulai pengalaman AR.
- Petunjuk singkat penggunaan aplikasi.

**FR-002 – Navigasi aplikasi**

Sistem harus menyediakan navigasi menuju:
- Beranda.
- Katalog geometri.
- Panduan penggunaan.

## 5.2 Modul Katalog Geometri

**FR-003 – Menampilkan daftar bangun ruang**

Sistem harus menampilkan tujuh jenis bangun ruang dalam bentuk kartu informasi.

**FR-004 – Menampilkan detail bangun ruang**

Ketika pengguna memilih suatu bangun ruang, sistem harus menampilkan:
- Nama bangun ruang.
- Ilustrasi atau preview model.
- Deskripsi.
- Karakteristik.
- Rumus volume.
- Rumus luas permukaan.
- Penjelasan setiap variabel.
- Tombol untuk membuka fitur AR.

## 5.3 Modul Augmented Reality

**FR-005 – Mengakses kamera perangkat**

Sistem harus meminta izin penggunaan kamera sebelum memulai sesi AR.

**FR-006 – Memulai pemindaian marker**

Sistem harus dapat mengaktifkan kamera dan menjalankan proses image tracking.

**FR-007 – Mendeteksi marker**

Sistem harus mengenali marker yang telah didaftarkan dalam file `.mind`.

**FR-008 – Memetakan marker ke objek 3D**

Sistem harus menampilkan model GLB yang sesuai berdasarkan target index marker.

**FR-009 – Menampilkan objek pada anchor**

Sistem harus menempatkan model 3D pada anchor marker sehingga objek mengikuti posisi dan orientasi marker.

**FR-010 – Menangani marker tidak terdeteksi**

Jika marker tidak ditemukan, sistem harus menampilkan instruksi agar pengguna mengarahkan kamera ke marker.

Jika marker hilang dari pandangan, objek tidak boleh tetap tampil seolah-olah masih terikat pada marker.

**FR-011 – Menghentikan sesi AR**

Sistem harus menyediakan mekanisme untuk menghentikan kamera dan membersihkan resource AR ketika pengguna keluar dari halaman pemindaian.

**FR-012 – Menangani kesalahan kamera**

Sistem harus memberikan informasi yang sesuai apabila:
- Pengguna menolak izin kamera.
- Kamera tidak tersedia.
- Kamera sedang digunakan aplikasi lain.
- Browser tidak mendukung fitur yang dibutuhkan.

## 5.4 Modul Interaksi Model 3D

**FR-013 – Rotasi model**

Pengguna dapat memutar model 3D untuk melihat bentuk bangun ruang dari berbagai sudut.

**FR-014 – Zoom model**

Pengguna dapat memperbesar dan memperkecil model.

**FR-015 – Reset model**

Pengguna dapat mengembalikan orientasi dan skala model ke kondisi awal.

**FR-016 – Kontrol interaksi**

Sistem menyediakan kontrol yang mudah digunakan melalui layar sentuh maupun perangkat dengan mouse.

Kontrol yang disediakan:
- Rotate.
- Zoom In.
- Zoom Out.
- Reset.

Interaksi sentuh dapat mendukung drag dan pinch selama tidak mengganggu proses tracking kamera.

## 5.5 Modul Informasi Pembelajaran

**FR-017 – Menampilkan informasi karakteristik**

Sistem harus menampilkan informasi karakteristik berdasarkan jenis bangun ruang yang sedang dipelajari.

**FR-018 – Menampilkan rumus matematika**

Sistem harus menampilkan rumus volume dan luas permukaan.

**FR-019 – Menampilkan penjelasan variabel**

Sistem harus memberikan keterangan untuk setiap simbol matematika yang digunakan.

**FR-020 – Menampilkan panel informasi**

Pengguna dapat membuka dan menutup panel informasi tanpa harus mengakhiri sesi AR.

---

# 6. Kebutuhan Nonfungsional

## 6.1 Performa

- Aplikasi harus dapat memuat halaman utama dengan waktu respons yang wajar.
- Model 3D harus dioptimalkan agar dapat dimuat pada perangkat mobile.
- Ukuran file GLB harus diperhatikan untuk mengurangi waktu pemuatan.
- Proses tracking dan rendering tidak boleh menyebabkan aplikasi berhenti merespons dalam kondisi penggunaan normal.
- Aplikasi harus menangani kegagalan pemuatan aset dengan memberikan informasi yang jelas.

## 6.2 Kompatibilitas

- Aplikasi berbasis browser dan tidak membutuhkan instalasi aplikasi Android.
- Prioritas pengujian adalah smartphone Android menggunakan browser modern, terutama Chrome.
- Aplikasi juga perlu diuji pada browser desktop untuk memastikan fungsi katalog dan kompatibilitas dasar.
- Kamera harus dijalankan melalui HTTPS atau localhost.
- Perangkat harus mendukung akses kamera dan WebGL yang diperlukan oleh implementasi.

## 6.3 Usability

- Antarmuka harus sederhana dan mudah dipahami.
- Informasi pembelajaran harus menggunakan bahasa Indonesia.
- Tombol utama harus mudah dijangkau pada perangkat mobile.
- Pengguna harus mendapatkan petunjuk yang jelas ketika marker belum terdeteksi.
- Panel informasi tidak boleh menghalangi area penting kamera secara berlebihan.

## 6.4 Maintainability

- Struktur kode harus dipisahkan berdasarkan fitur.
- Data geometri dipisahkan dari komponen antarmuka.
- Konfigurasi marker dan pemetaan model harus dikelola secara terpusat.
- Komponen AR harus dipisahkan dari halaman Next.js.
- Library AR harus dijalankan di sisi client, bukan pada proses server-side rendering.

## 6.5 Security dan Privacy

- Aplikasi hanya meminta izin kamera ketika fitur AR digunakan.
- Kamera dihentikan ketika sesi AR berakhir.
- Aplikasi tidak menyimpan atau mengirim rekaman kamera ke server pada MVP.
- File model dan marker yang digunakan berasal dari aset aplikasi.
- Aplikasi harus menggunakan HTTPS pada lingkungan produksi.

---

# 7. Teknologi dan Arsitektur Sistem

## 7.1 Teknologi Utama

| Teknologi | Fungsi |
|---|---|
| Next.js | Framework utama aplikasi web |
| TypeScript | Bahasa pemrograman utama |
| React | Pengembangan komponen antarmuka |
| Tailwind CSS | Styling dan layout |
| shadcn/ui | Komponen antarmuka |
| MindAR.js | Image tracking dan marker detection |
| Three.js | Rendering dan pengelolaan objek 3D |
| GLTFLoader | Memuat model GLB |
| Blender | Pembuatan model 3D |
| GLB / glTF | Format aset model 3D |
| MindAR Compiler | Menghasilkan file target `.mind` |

## 7.2 Arsitektur Tingkat Tinggi

Alur komunikasi komponen:

1. Browser menjalankan aplikasi Next.js.
2. Halaman AR mengaktifkan kamera melalui MindAR.
3. MindAR membaca file target `.mind`.
4. MindAR mendeteksi gambar marker melalui kamera.
5. Aplikasi menerima informasi target dan anchor.
6. Aplikasi mencari model yang sesuai melalui konfigurasi geometri.
7. GLTFLoader memuat model GLB.
8. Three.js menampilkan model pada grup anchor.
9. React mengelola antarmuka, kontrol, dan panel informasi.

## 7.3 Arsitektur Data

Versi pertama tidak memerlukan database.

Data disimpan dalam konfigurasi TypeScript atau JSON yang memuat:

- ID geometri.
- Nama geometri.
- Slug.
- Deskripsi.
- Karakteristik.
- Rumus volume.
- Rumus luas permukaan.
- Keterangan variabel.
- Target index.
- Lokasi file GLB.
- Lokasi gambar marker atau ilustrasi.

## 7.4 Arsitektur Marker

Satu file `.mind` dapat berisi beberapa target gambar.

Setiap target memiliki indeks yang digunakan untuk menghubungkan marker dengan model 3D.

Pemetaan target harus menjadi konfigurasi terpusat agar mudah diperbarui apabila marker dikompilasi ulang atau urutannya berubah.

Contoh:

| ID | Target Index | Model |
|---|---:|---|
| cube | 0 | cube.glb |
| cuboid | 1 | cuboid.glb |
| prism | 2 | prism.glb |
| pyramid | 3 | pyramid.glb |
| cylinder | 4 | cylinder.glb |
| cone | 5 | cone.glb |
| sphere | 6 | sphere.glb |

## 7.5 Pendekatan Instalasi MindAR

MindAR menyediakan distribusi melalui npm dan HTML script/import map.

Untuk menghindari masalah instalasi dependency `canvas` yang muncul pada lingkungan Node.js 24.22.1 dan `canvas@2.11.2`, pengembangan awal dapat menggunakan CDN atau distribusi library lokal.

Pilihan pendekatan:

- CDN dengan import map untuk proof of concept.
- File distribusi lokal apabila ingin mengurangi ketergantungan pada CDN saat runtime.
- npm apabila kompatibilitas dependency sudah dipastikan.

Pemilihan metode instalasi tidak mengubah konsep utama integrasi MindAR dengan Three.js.

**Catatan implementasi:** Pastikan versi MindAR dan Three.js kompatibel. Integrasi Three.js MindAR versi 1.2.x mendukung Three.js minimal r137. Pada Next.js, kode kamera dan WebGL harus dijalankan di Client Component dengan SSR dinonaktifkan untuk komponen yang membutuhkan browser API.

---

# 8. Struktur Project

Struktur project yang direkomendasikan menggunakan pendekatan feature-based architecture.

```text
src/
├── app/
│   ├── page.tsx
│   ├── geometri/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── ar/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── panduan/
│       └── page.tsx
│
├── features/
│   ├── geometry/
│   │   ├── components/
│   │   │   ├── GeometryCard.tsx
│   │   │   ├── GeometryInfo.tsx
│   │   │   └── FormulaPanel.tsx
│   │   ├── data/
│   │   │   └── geometries.ts
│   │   └── types/
│   │       └── geometry.ts
│   │
│   └── ar/
│       ├── components/
│       │   ├── ARViewer.tsx
│       │   ├── ARControls.tsx
│       │   ├── ARStatus.tsx
│       │   └── ARInformationPanel.tsx
│       ├── hooks/
│       │   └── useARSession.ts
│       └── lib/
│           ├── mindar.ts
│           ├── model-loader.ts
│           └── marker-mapping.ts
│
├── components/
│   ├── layout/
│   └── ui/
│
└── lib/
    └── utils.ts

public/
├── models/
│   ├── cube.glb
│   ├── cuboid.glb
│   ├── prism.glb
│   ├── pyramid.glb
│   ├── cylinder.glb
│   ├── cone.glb
│   └── sphere.glb
│
├── markers/
│   ├── geometry-targets.mind
│   └── previews/
│       ├── cube.png
│       ├── cuboid.png
│       ├── prism.png
│       ├── pyramid.png
│       ├── cylinder.png
│       ├── cone.png
│       └── sphere.png
│
└── images/
```

---

# 9. Spesifikasi Aset 3D dan Marker

## 9.1 Model 3D

Seluruh model dibuat menggunakan Blender.

Ketentuan:
- Setiap bangun ruang memiliki file GLB tersendiri.
- Model harus memiliki origin yang sesuai untuk penempatan pada anchor.
- Transformasi objek harus diperiksa sebelum ekspor.
- Material dan tekstur harus ikut diekspor apabila digunakan.
- Ukuran model harus konsisten agar pengalaman visual antarmodel tidak berbeda jauh.
- Model harus dioptimalkan agar tidak terlalu berat untuk perangkat mobile.
- Model harus diuji kembali setelah diekspor ke GLB.

## 9.2 Image Marker

Setiap bangun ruang memiliki satu gambar marker.

Ketentuan:
- Marker disiapkan dalam format PNG atau JPG.
- Setiap marker harus memiliki fitur visual yang cukup untuk dideteksi.
- Hindari gambar yang terlalu polos atau memiliki sedikit detail.
- Marker sebaiknya memiliki kontras dan variasi visual yang memadai.
- Gambar marker dikompilasi menggunakan MindAR Image Target Compiler.
- Hasil kompilasi disimpan sebagai satu file `.mind`.
- Gambar marker asli tetap disimpan untuk dicetak atau ditampilkan kepada pengguna.

## 9.3 Hubungan Antarfile

Tiga jenis aset berikut memiliki fungsi yang berbeda:

| Aset | Fungsi |
|---|---|
| PNG/JPG | Gambar fisik yang dipindai kamera |
| `.mind` | Data target hasil kompilasi gambar marker |
| `.glb` | Model bangun ruang tiga dimensi |

---

# 10. Rancangan Halaman dan Antarmuka

## 10.1 Halaman Beranda

Konten:
- Header dan identitas aplikasi.
- Hero section berisi pengenalan AR Geometri.
- Deskripsi singkat manfaat aplikasi.
- Tombol mulai belajar.
- Preview bangun ruang.
- Ringkasan cara penggunaan.

## 10.2 Halaman Katalog Geometri

Konten:
- Judul dan deskripsi halaman.
- Kumpulan kartu tujuh bangun ruang.
- Ilustrasi atau preview setiap bangun ruang.
- Nama bangun ruang.
- Deskripsi singkat.
- Tombol lihat detail.
- Tombol mulai AR.

## 10.3 Halaman Detail Geometri

Konten:
- Nama bangun ruang.
- Visualisasi atau preview model.
- Deskripsi.
- Karakteristik.
- Rumus volume.
- Rumus luas permukaan.
- Keterangan variabel.
- Tombol pindai marker.

## 10.4 Halaman AR Viewer

Konten:
- Tampilan kamera.
- Area pemindaian marker.
- Indikator status tracking.
- Petunjuk pemindaian.
- Model 3D yang muncul pada marker.
- Tombol rotasi.
- Tombol zoom in.
- Tombol zoom out.
- Tombol reset.
- Tombol informasi.
- Tombol keluar.

Status yang perlu ditampilkan:
- Meminta izin kamera.
- Menyiapkan kamera.
- Mencari marker.
- Marker terdeteksi.
- Marker tidak terdeteksi.
- Model sedang dimuat.
- Model berhasil ditampilkan.
- Terjadi kesalahan.

## 10.5 Halaman Panduan

Konten:
- Cara membuka aplikasi.
- Cara memberikan izin kamera.
- Cara menggunakan marker.
- Cara memindai marker.
- Cara mengontrol model 3D.
- Cara membaca informasi dan rumus.
- Pemecahan masalah umum.

---

# 11. User Stories

| ID | User Story |
|---|---|
| US-01 | Sebagai pengguna, saya ingin melihat daftar bangun ruang agar dapat memilih materi yang ingin dipelajari. |
| US-02 | Sebagai pengguna, saya ingin melihat detail bangun ruang agar memahami karakteristiknya. |
| US-03 | Sebagai pengguna, saya ingin membuka kamera agar dapat memindai marker. |
| US-04 | Sebagai pengguna, saya ingin melihat model 3D ketika marker dikenali agar lebih mudah memahami bentuk bangun ruang. |
| US-05 | Sebagai pengguna, saya ingin memutar model agar dapat melihat berbagai sisi objek. |
| US-06 | Sebagai pengguna, saya ingin memperbesar dan memperkecil model agar dapat mengamati detail objek. |
| US-07 | Sebagai pengguna, saya ingin melihat rumus volume agar dapat mempelajari perhitungan bangun ruang. |
| US-08 | Sebagai pengguna, saya ingin melihat rumus luas permukaan agar memahami konsep perhitungannya. |
| US-09 | Sebagai pengguna, saya ingin mengetahui arti variabel dalam rumus agar tidak kesulitan memahami notasi matematika. |
| US-10 | Sebagai pengguna, saya ingin mendapatkan petunjuk ketika marker tidak terdeteksi agar dapat memperbaiki posisi kamera. |

---

# 12. Acceptance Criteria

Fitur dianggap memenuhi kebutuhan apabila kriteria berikut berhasil dipenuhi.

## 12.1 Katalog dan Informasi

- Ketujuh bangun ruang ditampilkan pada katalog.
- Setiap bangun ruang memiliki halaman detail.
- Informasi karakteristik sesuai dengan jenis geometri.
- Rumus volume dan luas permukaan ditampilkan dengan benar.
- Penjelasan variabel dapat dibaca dengan jelas.

## 12.2 Kamera dan Tracking

- Browser dapat meminta izin kamera.
- Kamera dapat diaktifkan setelah izin diberikan.
- File `.mind` berhasil dimuat.
- Marker yang telah didaftarkan dapat dikenali.
- Target index dapat dipetakan ke model yang benar.
- Model mengikuti transformasi anchor.
- Model menghilang atau tidak lagi dianggap terikat ketika target hilang.
- Kamera dapat dihentikan ketika pengguna keluar dari halaman AR.

## 12.3 Model 3D

- Semua file GLB berhasil dimuat.
- Model ditampilkan pada marker yang sesuai.
- Model tidak mengalami perubahan bentuk yang tidak diinginkan.
- Material dan tekstur ditampilkan dengan benar.
- Model dapat dirotasi.
- Model dapat di-zoom.
- Model dapat di-reset.

## 12.4 Pengalaman Pengguna

- Pengguna dapat berpindah halaman tanpa kesalahan.
- Pengguna mendapatkan informasi ketika kamera tidak dapat diakses.
- Pengguna mendapatkan instruksi ketika marker belum terdeteksi.
- Kontrol dapat digunakan pada layar sentuh.
- Panel informasi tidak mengganggu penggunaan kamera secara berlebihan.

---

# 13. Strategi Pengujian

## 13.1 Pengujian Fungsional

Pengujian dilakukan untuk memastikan seluruh fitur berjalan sesuai spesifikasi.

| ID | Skenario Pengujian | Hasil yang Diharapkan |
|---|---|---|
| TC-01 | Membuka halaman utama | Halaman utama ditampilkan |
| TC-02 | Membuka katalog geometri | Tujuh bangun ruang ditampilkan |
| TC-03 | Memilih kubus | Detail kubus ditampilkan |
| TC-04 | Memulai sesi AR | Browser meminta izin kamera |
| TC-05 | Memberikan izin kamera | Kamera aktif |
| TC-06 | Memindai marker kubus | Marker terdeteksi |
| TC-07 | Marker kubus terdeteksi | Model cube.glb ditampilkan |
| TC-08 | Memindai marker balok | Model cuboid.glb ditampilkan |
| TC-09 | Mengarahkan kamera menjauh dari marker | Model tidak lagi tampil sebagai objek yang terlacak |
| TC-10 | Memutar model | Model dapat dirotasi |
| TC-11 | Melakukan zoom | Skala model berubah |
| TC-12 | Menekan reset | Model kembali ke kondisi awal |
| TC-13 | Membuka informasi | Panel informasi ditampilkan |
| TC-14 | Menolak izin kamera | Pesan penanganan izin ditampilkan |
| TC-15 | Keluar dari halaman AR | Kamera dan resource AR dihentikan |

Pengujian pemetaan marker harus dilakukan terhadap seluruh tujuh target.

## 13.2 Pengujian Kompatibilitas

Pengujian dilakukan pada:
- Smartphone Android dengan Chrome.
- Browser desktop Chrome.
- Perangkat dengan kemampuan WebGL yang berbeda.

## 13.3 Pengujian Usability

Pengujian dilakukan untuk menilai:
- Kemudahan memahami navigasi.
- Kemudahan melakukan pemindaian marker.
- Kemudahan menggunakan kontrol model.
- Kejelasan informasi pembelajaran.
- Kenyamanan penggunaan pada layar smartphone.

## 13.4 Pengujian Performa

Pengujian dilakukan untuk memeriksa:
- Waktu pemuatan model GLB.
- Responsivitas rotasi dan zoom.
- Stabilitas tracking marker.
- Penggunaan memori dan resource GPU.
- Performa aplikasi pada perangkat mobile.

---

# 14. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Marker sulit dideteksi | Model tidak muncul | Gunakan gambar dengan fitur visual yang memadai dan lakukan pengujian pencahayaan |
| Kamera tidak memperoleh izin | AR tidak dapat dijalankan | Sediakan instruksi izin kamera dan pesan kesalahan |
| Model GLB terlalu berat | Waktu loading lama | Optimalkan mesh, material, dan tekstur |
| Model tidak sesuai posisi marker | Pengalaman AR kurang baik | Sesuaikan origin, skala, rotasi, dan posisi model |
| Dependency MindAR gagal di-install | Pengembangan terhambat | Gunakan CDN atau file distribusi lokal sebagai alternatif |
| SSR menyebabkan error browser API | Halaman AR gagal dirender | Jalankan AR hanya pada Client Component |
| Marker hilang dari kamera | Tracking terputus | Tangani event targetFound dan targetLost |
| Perangkat tidak mendukung WebGL | AR tidak berjalan | Tampilkan pesan kompatibilitas |
| Kamera tetap aktif setelah keluar | Privasi dan penggunaan resource terganggu | Hentikan sesi dan stream kamera saat cleanup |
| CDN tidak dapat diakses | Library tidak dapat dimuat | Pertimbangkan distribusi library lokal |

---

# 15. Tahapan Pengembangan

Pengembangan dibagi menjadi beberapa fase agar proses implementasi lebih terstruktur.

## Fase 1 – Persiapan dan Perancangan

- Menetapkan kebutuhan aplikasi.
- Menentukan struktur halaman.
- Menyiapkan desain UI/UX.
- Menentukan jenis bangun ruang.
- Menentukan desain image marker.
- Menyiapkan struktur project Next.js.

**Output:** Dokumen kebutuhan, rancangan UI, dan struktur awal project.

## Fase 2 – Pembuatan Aset

- Membuat tujuh model bangun ruang menggunakan Blender.
- Melakukan optimasi model.
- Mengekspor model ke GLB.
- Menyiapkan tujuh gambar marker.
- Melakukan kompilasi marker menjadi file `.mind`.
- Memvalidasi hasil pemetaan target index.

**Output:** Tujuh model GLB dan satu file target `.mind`.

## Fase 3 – Implementasi Dasar Web

- Mengembangkan halaman beranda.
- Mengembangkan katalog geometri.
- Mengembangkan halaman detail.
- Menyiapkan data geometri.
- Mengembangkan navigasi.
- Mengimplementasikan komponen UI.

**Output:** Aplikasi web dengan informasi geometri yang dapat diakses.

## Fase 4 – Implementasi AR

- Mengintegrasikan MindAR.
- Mengintegrasikan Three.js.
- Mengimplementasikan akses kamera.
- Memuat file `.mind`.
- Mengimplementasikan anchor.
- Mengintegrasikan GLTFLoader.
- Memetakan marker dengan model GLB.
- Menangani marker ditemukan dan hilang.

**Output:** Fitur AR yang mampu menampilkan model sesuai marker.

## Fase 5 – Interaksi dan Pembelajaran

- Mengimplementasikan rotasi model.
- Mengimplementasikan zoom.
- Mengimplementasikan reset.
- Mengembangkan panel informasi.
- Mengintegrasikan rumus dan karakteristik.
- Mengoptimalkan tampilan mobile.

**Output:** Pengalaman pembelajaran AR yang interaktif.

## Fase 6 – Pengujian dan Penyempurnaan

- Pengujian fungsional.
- Pengujian kompatibilitas.
- Pengujian marker.
- Pengujian model 3D.
- Pengujian performa.
- Perbaikan bug.
- Deployment aplikasi.

**Output:** Aplikasi AR Geometri yang siap digunakan.

---

# 16. Metrik Keberhasilan Produk

Keberhasilan MVP diukur melalui indikator berikut:

1. Seluruh tujuh bangun ruang tersedia pada katalog.
2. Seluruh tujuh model GLB berhasil ditampilkan.
3. Seluruh tujuh marker berhasil dikenali dalam kondisi pengujian yang ditentukan.
4. Setiap marker menampilkan model yang sesuai.
5. Seluruh model dapat dirotasi dan di-zoom.
6. Seluruh informasi karakteristik dan rumus tersedia.
7. Sesi kamera dapat dimulai dan dihentikan dengan benar.
8. Tidak terdapat kesalahan kritis yang menghalangi penggunaan fitur AR.
9. Aplikasi dapat digunakan pada perangkat Android yang mendukung browser dan WebGL.

---

# 17. Asumsi dan Keputusan yang Belum Ditetapkan

Bagian ini memuat hal-hal yang perlu dikonfirmasi sebelum implementasi final.

| Aspek | Keputusan Awal / Status |
|---|---|
| Nama aplikasi | AR Geometri (nama kerja) |
| Platform | Web Application |
| Metode AR | Marker-Based Image Tracking |
| Jumlah bangun ruang | 7 |
| Jenis prisma | Prisma segitiga |
| Jenis limas | Limas segiempat beraturan |
| Jumlah marker | 7 marker |
| Format model | GLB |
| Software model 3D | Blender |
| Framework | Next.js + TypeScript |
| Library AR | MindAR.js |
| Library 3D | Three.js |
| Instalasi MindAR | CDN/file lokal untuk prototipe; metode final belum ditetapkan |
| Database | Tidak diperlukan pada MVP |
| Autentikasi | Tidak diperlukan pada MVP |
| Target perangkat utama | Smartphone Android |
| Target jenjang pendidikan | Belum ditetapkan |
| Desain visual final | Belum ditetapkan |
| Hosting dan domain | Belum ditetapkan |
| Metode evaluasi pembelajaran | Belum ditetapkan |

---

# 18. Definisi Selesai (Definition of Done)

MVP AR Geometri dinyatakan selesai apabila:

- [ ] Halaman utama dan navigasi telah berfungsi.
- [ ] Katalog menampilkan tujuh jenis bangun ruang.
- [ ] Setiap bangun ruang memiliki informasi lengkap.
- [ ] Tujuh model 3D telah dibuat dan diekspor menjadi GLB.
- [ ] Tujuh gambar marker telah disiapkan.
- [ ] File `.mind` berhasil dibuat dan dimuat.
- [ ] Kamera dapat diakses melalui browser.
- [ ] MindAR dapat mendeteksi seluruh marker.
- [ ] Setiap marker menampilkan model GLB yang sesuai.
- [ ] Model 3D dapat diputar.
- [ ] Model 3D dapat diperbesar dan diperkecil.
- [ ] Model 3D dapat di-reset.
- [ ] Informasi karakteristik dan rumus dapat ditampilkan.
- [ ] Penanganan kesalahan kamera telah diterapkan.
- [ ] Kamera dihentikan saat sesi AR berakhir.
- [ ] Aplikasi telah melalui pengujian fungsional dan kompatibilitas.
- [ ] Aplikasi dapat dijalankan melalui deployment HTTPS.

---

# 19. Penutup

AR Geometri dirancang sebagai media pembelajaran berbasis web yang menggabungkan visualisasi tiga dimensi dan teknologi Augmented Reality untuk membantu pengguna memahami konsep bangun ruang secara lebih interaktif.

Dengan menggunakan pendekatan Marker-Based AR, pengguna dapat memindai gambar marker untuk menampilkan objek virtual yang sesuai dengan materi pembelajaran. Model tiga dimensi dibuat melalui Blender dan diekspor dalam format GLB, kemudian ditampilkan menggunakan Three.js dengan dukungan image tracking dari MindAR.js.

Selain visualisasi objek, aplikasi menyediakan fitur interaksi dan informasi pembelajaran yang mencakup karakteristik, rumus volume, rumus luas permukaan, serta penjelasan variabel matematika.

Pengembangan dilakukan secara bertahap dengan memprioritaskan fungsi inti AR sebagai fondasi utama sebelum memperluas fitur pembelajaran lainnya. Dengan demikian, aplikasi diharapkan dapat menjadi alternatif media pembelajaran geometri yang mudah diakses, interaktif, dan membantu pengguna memahami bentuk bangun ruang secara visual.
