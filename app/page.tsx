"use client";

import * as React from "react";
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
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GEOMETRIES } from "@/features/geometry/data/geometries";
import { MarkerModal } from "@/features/geometry/components/MarkerModal";

export default function Home() {
  const [isMarkerModalOpen, setIsMarkerModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar Mobile */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-xs">
              <Box className="size-4.5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight">AR Geometri</span>
              <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-600 dark:text-indigo-400">
                WebAR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsMarkerModalOpen(true)}
              className="rounded-full text-foreground/80 hover:text-foreground"
              title="Katalog Marker"
            >
              <Layers className="size-4 text-indigo-500" />
            </Button>

            <Link
              href="/scan"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs rounded-xl px-3 flex items-center gap-1 text-xs font-semibold"
              )}
            >
              <Camera className="size-3.5" />
              <span>Pindai AR</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content (Mobile Optimized) */}
      <main className="flex-1 flex flex-col px-4 py-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden text-center pb-8 pt-2">
          {/* Subtle Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl opacity-50"
          >
            <div className="size-64 rounded-full bg-gradient-to-tr from-indigo-500/30 to-cyan-400/20" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
            <Sparkles className="size-3 text-indigo-500" />
            <span>WebAR Geometri 3D Interaktif</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl font-black tracking-tight text-foreground leading-snug">
            Eksplorasi Bangun Ruang Nyata Lewat{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Kamera Interaktif
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
            Pelajari 7 bangun ruang secara visual. Arahkan kamera ke kartu marker, amati model 3D, dan pahami rumus volume serta luas permukaannya.
          </p>

          {/* Action Buttons Stack */}
          <div className="mt-6 flex flex-col gap-2.5 w-full">
            <Link
              href="/scan"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-500/20 gap-2 flex items-center justify-center"
              )}
            >
              <Camera className="size-4.5" />
              <span>Mulai Pindai AR Sekarang</span>
              <ArrowRight className="size-4 ml-auto" />
            </Link>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsMarkerModalOpen(true)}
              className="w-full h-11 rounded-2xl border-border bg-card hover:bg-muted text-xs font-semibold gap-2"
            >
              <Layers className="size-4 text-indigo-500" />
              <span>Lihat & Unduh Kartu Marker</span>
            </Button>
          </div>

          {/* Feature Badges */}
          <div className="mt-6 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground text-left">
            <div className="flex items-center gap-1.5 rounded-xl bg-muted/40 p-2">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
              <span>Tanpa install aplikasi</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-muted/40 p-2">
              <ShieldCheck className="size-3.5 text-blue-500 shrink-0" />
              <span>Akses langsung gratis</span>
            </div>
          </div>
        </section>

        {/* 3-Step Guided Flow */}
        <section className="border-t border-border/50 pt-8 pb-6">
          <div className="mb-4">
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Panduan Cepat
            </span>
            <h2 className="text-lg font-bold text-foreground">
              3 Langkah Memulai
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Step 1 */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-2xs">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-foreground">Siapkan Kartu Marker</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                  Buka atau cetak gambar kartu pola marker bangun ruang.
                </p>
                <button
                  onClick={() => setIsMarkerModalOpen(true)}
                  className="mt-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Buka Katalog Kartu</span>
                  <ArrowRight className="size-2.5" />
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-2xs">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-foreground">Izinkan Akses Kamera</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                  Pilih <em>Izinkan</em> saat peramban meminta izin kamera belakang.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-2xs">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-foreground">Arahkan & Eksplorasi 3D</h3>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                  Arahkan kamera ke kartu marker dan pelajari objek 3D serta rumusnya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Bangun Ruang Showcase */}
        <section className="border-t border-border/50 pt-8 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Materi Belajar
              </span>
              <h2 className="text-lg font-bold text-foreground">
                7 Bangun Ruang
              </h2>
            </div>
            <Link
              href="/scan"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Scan Semua</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3.5">
            {GEOMETRIES.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-3.5 transition-all shadow-2xs"
              >
                <div className="flex gap-3 items-center">
                  {/* Thumbnail Marker */}
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-900 p-1 flex items-center justify-center">
                    <Image
                      src={item.markerPreviewPath}
                      alt={`Preview ${item.name}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.2 text-[8px] font-mono text-white">
                      #{item.targetIndex}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-indigo-600 dark:text-indigo-400">
                      <span>V: {item.formulaVolume.formula}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-muted-foreground">
                    {item.characteristics.length} ciri utama
                  </span>
                  <Link
                    href="/scan"
                    className={cn(
                      buttonVariants({ size: "xs", variant: "secondary" }),
                      "rounded-lg text-[11px] font-semibold"
                    )}
                  >
                    <span>Pindai AR</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="border-t border-border bg-muted/20 py-4 px-4 text-center text-[10px] text-muted-foreground">
        <p>© 2026 AR Geometri • Media Pembelajaran Berbasis WebAR</p>
      </footer>

      {/* Marker Catalog Modal */}
      <MarkerModal
        open={isMarkerModalOpen}
        onOpenChange={setIsMarkerModalOpen}
      />
    </div>
  );
}
