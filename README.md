# AR Geometri

Aplikasi web pembelajaran geometri tiga dimensi (bangun ruang) interaktif berbasis **WebAR** dan **Three.js**. Dirancang dengan gaya visual *Playful Geometric / Candy* yang ramah bagi siswa dan guru, aplikasi ini memungkinkan pengguna memvisualisasikan 7 bangun ruang 3D langsung melalui browser tanpa perlu memasang aplikasi tambahan atau membuat akun.

---

## Fitur Utama

- **Landing Page & Panduan 3 Langkah (`/`)**: Pengenalan aplikasi, banner daftar bangun ruang, panduan penggunaan 3 langkah, dan *showcase* koleksi 7 bangun ruang.
- **Katalog Kartu Marker (`MarkerModal`)**: Menampilkan 7 pola kartu marker SVG (`Target #0` – `Target #6`) yang dapat dilihat langsung, dibuka di tab baru, atau diunduh satuan maupun sekaligus (*Unduh Semua*).
- **Scanner Kamera AR (`/scan`)**:
  - Mengakses kamera belakang perangkat secara lokal melalui WebRTC (`navigator.mediaDevices.getUserMedia`).
  - Dilengkapi *reticle* pemindai, tombol **Pindai Marker**, pemilih model bangun ruang (*Visual Geometry Picker*), serta penanganan *error* izin kamera/HTTPS.
- **Mode Simulasi 3D**: Mode alternatif yang memungkinkan pengguna mengeksplorasi seluruh model 3D bangun ruang tanpa memerlukan kamera atau kartu marker fisik.
- **Interaksi Model 3D Real-Time (Three.js)**:
  - Rotasi 360° dengan *drag* mouse atau geser 1 jari di layar sentuh.
  - Zoom (*pinch-to-zoom*, *scroll wheel*, atau tombol `+`/`-`) dengan rentang skala `0.4`–`3.0`.
  - Tombol *auto-rotate* dan *reset* orientasi/skala.
- **Panel Rumus & Karakteristik**: *Bottom drawer* interaktif yang menampilkan rumus volume, rumus luas permukaan, ciri-ciri bangun ruang, serta keterangan setiap variabel rumus.

---

## Koleksi 7 Bangun Ruang

Data bangun ruang didefinisikan secara terpusat di `features/geometry/data/geometries.ts`:

| Target | Bangun Ruang | Rumus Volume | Rumus Luas Permukaan | Preview Marker |
| :---: | :--- | :--- | :--- | :--- |
| `#0` | **Kubus** | `V = s³` | `L = 6 × s²` | `/markers/previews/cube.svg` |
| `#1` | **Balok** | `V = p × l × t` | `L = 2 × (p·l + p·t + l·t)` | `/markers/previews/cuboid.svg` |
| `#2` | **Prisma Segitiga** | `V = Luas Alas × t` | `L = 2 × Luas Alas + Keliling Alas × t` | `/markers/previews/prism.svg` |
| `#3` | **Limas Segiempat** | `V = ⅓ × Luas Alas × t` | `L = Luas Alas + Jumlah Luas Sisi Tegak` | `/markers/previews/pyramid.svg` |
| `#4` | **Tabung** | `V = π × r² × t` | `L = 2 × π × r × (r + t)` | `/markers/previews/cylinder.svg` |
| `#5` | **Kerucut** | `V = ⅓ × π × r² × t` | `L = π × r × (r + s)` | `/markers/previews/cone.svg` |
| `#6` | **Bola** | `V = ⁴⁄₃ × π × r³` | `L = 4 × π × r²` | `/markers/previews/sphere.svg` |

---

## Tech Stack

| Kategori | Teknologi | Versi (di `package.json`) |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack, `cacheComponents`, `partialPrefetching`) | `16.4.6` |
| **UI Library** | React & React DOM | `19.3.0` |
| **Bahasa** | TypeScript | `5.9.3` |
| **Styling** | Tailwind CSS + `@tailwindcss/turbopack` + `tw-animate-css` | `4.3.3` |
| **Komponen UI** | shadcn/ui (`base-mira` style berbasis `@base-ui/react`) + `lucide-react` | `^4.23.0` / `^1.9.0` |
| **Grafis 3D** | Three.js (`WebGLRenderer`, `MeshPhysicalMaterial`, `EdgesGeometry`) | `^0.187.0` |
| **Linting** | ESLint + `eslint-config-next` | `^9` / `16.4.6` |

---

## Struktur Direktori

```text
ar-geometri/
├── app/
│   ├── globals.css                 # Tema Tailwind v4, token warna playful, animasi marquee/wiggle
│   ├── layout.tsx                  # Root layout, font Outfit & Plus Jakarta Sans, metadata & viewport
│   ├── page.tsx                    # Landing page (Hero, Marquee, 3 Langkah, Grid 7 Bangun Ruang)
│   └── scan/
│       └── page.tsx                # Halaman rute /scan yang merender ARScanner
├── components/
│   └── ui/                         # Komponen UI reusable (badge, button, card, dialog)
├── docs/
│   └── prd/                        # Dokumen Product Requirements Document (PRD)
│       ├── prd-itereation-1.md
│       └── prd-ui-landing-to-scan.md
├── features/
│   ├── ar/
│   │   └── components/
│   │       └── ARScanner.tsx       # Viewport kamera WebRTC, canvas Three.js, kontrol gestur, HUD & drawer rumus
│   └── geometry/
│       ├── components/
│       │   └── MarkerModal.tsx     # Modal katalog & unduh 7 kartu marker SVG
│       ├── data/
│       │   └── geometries.ts       # Data statis 7 bangun ruang, rumus, ciri, dan path aset
│       └── types/
│           └── geometry.ts         # Tipe TypeScript (GeometryItem, ScannerStatus, CameraErrorState)
├── lib/
│   └── utils.ts                    # Utility helper (cn)
├── public/
│   └── markers/
│       └── previews/               # 7 aset kartu marker SVG (cube, cuboid, prism, pyramid, cylinder, cone, sphere)
├── components.json                 # Konfigurasi shadcn/ui
├── next.config.ts                  # Konfigurasi Next.js (Turbopack, cacheComponents, partialPrefetching)
├── package.json
└── tsconfig.json
```

---

## Memulai di Lokal

### 1. Instalasi Dependensi

```bash
npm install
```

### 2. Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) melalui browser.

### 3. Perintah Lainnya

```bash
# Build untuk produksi
npm run build

# Menjalankan hasil build produksi
npm run start

# Menjalankan linter
npm run lint
```

> **Catatan Akses Kamera (HTTPS / Secure Context):**
> Berdasarkan spesifikasi `MediaDevices.getUserMedia()`, akses kamera browser hanya tersedia pada *Secure Context* (`https://` atau `http://localhost`). Jika mengakses aplikasi dari perangkat ponsel melalui IP jaringan lokal (mis. `http://192.168.x.x:3000`), browser akan menolak akses kamera dan menampilkan layar error dengan opsi beralih ke **Mode Simulasi 3D**.

---

## Status Implementasi & Catatan Arsitektur

- **Visualisasi 3D Saat Ini**: `ARScanner.tsx` merender seluruh 7 bangun ruang secara prosedural menggunakan geometri bawaan Three.js (`BoxGeometry`, `CylinderGeometry`, `ConeGeometry`, `SphereGeometry`) dengan `MeshPhysicalMaterial` dan garis tepi `EdgesGeometry`.
- **Deteksi Marker Saat Ini**: Pemindaian pada `/scan` menggunakan *live camera stream* WebRTC dengan tombol **Pindai Marker** (simulasi deteksi ~450 ms) dan pemilih bangun ruang manual, serta **Mode Simulasi 3D** tanpa kamera.
- **Rencana pada PRD (`docs/prd/`)**: Dokumen PRD merencanakan integrasi pelacakan gambar berbasis **MindAR.js** dan pemuatan model eksternal berformat `.glb` (`modelGlbPath` di `geometries.ts` mengarah ke `/models/*.glb`), yang saat ini belum terpasang di `package.json` maupun direktori `public/models/`.

---

## Referensi

- [Next.js Turbopack & Configuration Documentation](https://nextjs.org/docs/app/api-reference/turbopack)
- [Three.js Documentation (`WebGLRenderer`, `EdgesGeometry`)](https://threejs.org/docs/)
- [MDN Web Docs — `MediaDevices.getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
