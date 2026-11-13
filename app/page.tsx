import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Box,
  Compass,
  Eye,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GEOMETRIES } from "@/features/geometry/data/geometries";
import { MarkerModal } from "@/features/geometry/components/MarkerModal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Box className="size-5" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                AR Geometri
              </span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                WebAR 3D
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <MarkerModal>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1.5 text-xs">
                <Layers className="size-3.5" />
                <span>Katalog Marker</span>
              </Button>
            </MarkerModal>

            <Link
              href="/scan"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 rounded-xl px-4 flex items-center gap-1.5"
              )}
            >
              <Camera className="size-4" />
              <span className="font-semibold">Buka Kamera AR</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
          {/* Subtle Background Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="aspect-[1155/678] w-[40rem] sm:w-[68rem] bg-gradient-to-tr from-indigo-500/20 via-sky-500/20 to-emerald-500/10 opacity-60"
            />
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6">
              <Sparkles className="size-3.5" />
              <span>Media Pembelajaran Geometri Berbasis WebAR</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl max-w-3xl mx-auto leading-[1.15]">
              Eksplorasi Bangun Ruang Nyata Lewat{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Kamera Interaktif
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pelajari 7 bangun ruang tiga dimensi secara visual dan nyata. Cukup arahkan kamera ke kartu marker, amati bentuk 3D dari berbagai sudut, dan pahami rumus volume serta luas permukaannya.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <Link
                href="/scan"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold shadow-lg shadow-indigo-500/25 gap-2 px-6 flex items-center justify-center"
                )}
              >
                <Camera className="size-5" />
                <span>Mulai Pindai AR Sekarang</span>
                <ArrowRight className="size-4 ml-1" />
              </Link>

              <MarkerModal>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 rounded-2xl border-border bg-background/80 hover:bg-muted text-base font-medium gap-2 px-5"
                >
                  <Layers className="size-4 text-indigo-500" />
                  <span>Lihat & Unduh Marker</span>
                </Button>
              </MarkerModal>
            </div>

            {/* Trust / Benefit Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                <span>Tanpa Perlu Unduh Aplikasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-blue-500" />
                <span>Akses Publik Instan (No Login)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="size-3.5 text-amber-500" />
                <span>Didukung 7 Bangun Ruang Lengkap</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Guided Flow Section */}
        <section className="border-y border-border/50 bg-muted/30 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Alur Penggunaan Mudah
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                3 Langkah Memulai Pembelajaran AR
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Pengalaman belajar interaktif yang dirancang langsung siap pakai di kelas maupun mandiri di rumah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative flex flex-col items-start rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-500/40 transition-colors">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-foreground">Siapkan Kartu Marker</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Buka atau cetak gambar pola marker bangun ruang. Anda juga bisa menampilkannya di layar HP lain atau layar monitor komputer.
                </p>
                <div className="mt-4 pt-3 border-t border-border/60 w-full">
                  <MarkerModal>
                    <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                      <span>Buka Katalog Marker</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </MarkerModal>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col items-start rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-500/40 transition-colors">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-foreground">Izinkan Akses Kamera</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Klik tombol <strong>Buka Kamera AR</strong> lalu pilih <em>Allow/Izinkan</em> saat peramban browser meminta izin pemakaian kamera belakang.
                </p>
                <div className="mt-4 pt-3 border-t border-border/60 w-full flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  <span>Kamera hanya aktif saat pemindaian</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col items-start rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-500/40 transition-colors">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-foreground">Arahkan & Eksplorasi</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Arahkan kamera ke kartu marker. Model 3D bangun ruang akan muncul seketika di atas kartu lengkap dengan rotasi dan rumus matematika!
                </p>
                <div className="mt-4 pt-3 border-t border-border/60 w-full">
                  <Link
                    href="/scan"
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>Coba Sekarang</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Bangun Ruang Showcase */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                  Materi Geometri Lengkap
                </h2>
                <p className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  7 Bangun Ruang Yang Dapat Dipindai
                </p>
              </div>
              <Link
                href="/scan"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-xl self-start sm:self-auto flex items-center gap-1.5"
                )}
              >
                <Eye className="size-3.5" />
                <span>Langsung Pindai</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GEOMETRIES.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-5 transition-all hover:border-indigo-500/40 hover:shadow-md"
                >
                  <div>
                    {/* Top Marker Image / Diagram */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900 p-3 flex items-center justify-center">
                      <Image
                        src={item.markerPreviewPath}
                        alt={`Preview ${item.name}`}
                        width={260}
                        height={195}
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                        Target #{item.targetIndex}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Formula Snippets */}
                    <div className="mt-4 space-y-1.5 rounded-xl bg-muted/50 p-2.5 text-[11px] font-mono">
                      <div className="flex justify-between items-center text-foreground">
                        <span className="text-muted-foreground font-sans">Volume:</span>
                        <span className="font-semibold">{item.formulaVolume.formula}</span>
                      </div>
                      <div className="flex justify-between items-center text-foreground">
                        <span className="text-muted-foreground font-sans">Luas Permukaan:</span>
                        <span className="font-semibold">{item.formulaSurface.formula}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">
                      {item.characteristics.length} Karakteristik
                    </span>
                    <Link
                      href="/scan"
                      className={cn(
                        buttonVariants({ size: "xs", variant: "secondary" }),
                        "rounded-lg text-xs font-semibold"
                      )}
                    >
                      <span>Scan AR</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-8">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Box className="size-4 text-indigo-500" />
            <span className="font-semibold text-foreground">AR Geometri</span>
            <span>— Media Pembelajaran Berbasis WebAR</span>
          </div>
          <p>© 2026 AR Geometri. Dibuat untuk pengalaman belajar visual interaktif.</p>
        </div>
      </footer>
    </div>
  );
}
