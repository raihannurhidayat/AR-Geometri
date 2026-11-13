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
  Compass,
  Shapes,
  Star,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GEOMETRIES } from "@/features/geometry/data/geometries";
import { MarkerModal } from "@/features/geometry/components/MarkerModal";

export default function Home() {
  const [isMarkerModalOpen, setIsMarkerModalOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent selection:text-white relative overflow-x-hidden">
      {/* Decorative Memphis Background Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
      >
        {/* Massive Yellow Sun Circle */}
        <div className="absolute -top-24 -left-24 size-80 sm:size-96 rounded-full bg-[#FBBF24]/30 border-2 border-border blur-xs" />

        {/* Floating Pink Oval */}
        <div className="absolute top-1/3 -right-20 size-72 rounded-full bg-[#F472B6]/25 border-2 border-border" />

        {/* Mint Pill Blob */}
        <div className="absolute top-2/3 -left-16 w-56 h-32 rounded-full bg-[#34D399]/25 border-2 border-border rotate-12" />

        {/* Floating geometric confetti */}
        <div className="absolute top-28 right-[15%] hidden md:block text-[#8B5CF6] font-black text-2xl rotate-12 select-none">
          ✦
        </div>
        <div className="absolute top-72 left-[8%] hidden md:block text-[#F472B6] font-black text-xl -rotate-12 select-none">
          ▲
        </div>
        <div className="absolute top-96 right-[8%] hidden md:block text-[#FBBF24] font-black text-3xl rotate-45 select-none">
          ■
        </div>
        <div className="absolute bottom-48 left-[12%] hidden md:block text-[#34D399] font-black text-2xl -rotate-6 select-none">
          ●
        </div>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-border bg-[#FFFDF5]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-10 items-center justify-center rounded-2xl border-2 border-border bg-accent text-white shadow-[3px_3px_0px_#1E293B] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_#1E293B] transition-all">
              <Box className="size-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-foreground">
                AR Geometri
              </span>
              <Badge variant="mint" size="sm" className="w-fit">
                WebAR 3D
              </Badge>
            </div>
          </Link>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="candySecondary"
              size="sm"
              onClick={() => setIsMarkerModalOpen(true)}
              className="gap-1.5 hidden sm:inline-flex text-xs"
              title="Buka Katalog Kartu Marker"
            >
              <Layers className="size-3.5 text-accent" strokeWidth={2.5} />
              <span>Katalog Marker</span>
            </Button>

            {/* Mobile icon only for marker catalog */}
            <Button
              variant="candySecondary"
              size="icon-sm"
              onClick={() => setIsMarkerModalOpen(true)}
              className="sm:hidden"
              title="Katalog Marker"
            >
              <Layers className="size-4 text-accent" strokeWidth={2.5} />
            </Button>

            <Link
              href="/scan"
              className={cn(
                buttonVariants({ variant: "candy", size: "sm" }),
                "gap-1.5 text-xs sm:text-sm"
              )}
            >
              <Camera className="size-3.5 sm:size-4" strokeWidth={2.5} />
              <span>Mulai Pindai AR</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headline, Copy & CTAs */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Playful Pill Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-white px-3.5 py-1 text-xs font-bold text-foreground shadow-[3px_3px_0px_#1E293B] mb-5">
                  <span className="flex size-2 rounded-full bg-quaternary animate-pulse" />
                  <Sparkles className="size-3.5 text-accent" strokeWidth={2.5} />
                  <span>Media Belajar Geometri WebAR</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.15]">
                  Eksplorasi Bangun Ruang Nyata Lewat{" "}
                  <span className="relative inline-block text-accent">
                    Kamera Interaktif
                    {/* Hand-drawn squiggly underline SVG */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full text-tertiary overflow-visible"
                      height="12"
                      viewBox="0 0 240 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 8C30 3 60 12 90 7C120 2 150 11 180 6C205 2 225 9 238 7"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Pelajari 7 bangun ruang secara visual dan taktil. Cukup arahkan kamera ponsel ke kartu pola marker, saksikan model 3D muncul di meja Anda, dan pahami rumus volume serta luas permukaannya dengan gampang!
                </p>

                {/* Candy CTA Button Stack */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                  <Link
                    href="/scan"
                    className={cn(
                      buttonVariants({ variant: "candy", size: "lg" }),
                      "w-full sm:w-auto h-12 sm:h-13 px-6 text-sm sm:text-base gap-3"
                    )}
                  >
                    <Camera className="size-5" strokeWidth={2.5} />
                    <span>Mulai Pindai AR Sekarang</span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-white text-accent">
                      <ArrowRight className="size-4" strokeWidth={3} />
                    </span>
                  </Link>

                  <Button
                    variant="candySecondary"
                    size="lg"
                    onClick={() => setIsMarkerModalOpen(true)}
                    className="w-full sm:w-auto h-12 sm:h-13 px-5 text-sm sm:text-base gap-2"
                  >
                    <Layers className="size-4.5 text-accent" strokeWidth={2.5} />
                    <span>Lihat & Unduh Kartu Marker</span>
                  </Button>
                </div>

                {/* Trust/Feature Badges */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg">
                  <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-white px-3 py-2 text-xs font-bold text-foreground shadow-[2px_2px_0px_#1E293B]">
                    <CheckCircle2 className="size-4 text-quaternary shrink-0" strokeWidth={2.5} />
                    <span>100% Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-white px-3 py-2 text-xs font-bold text-foreground shadow-[2px_2px_0px_#1E293B]">
                    <ShieldCheck className="size-4 text-accent shrink-0" strokeWidth={2.5} />
                    <span>Tanpa Pasang Aplikasi</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-white px-3 py-2 text-xs font-bold text-foreground shadow-[2px_2px_0px_#1E293B]">
                    <Compass className="size-4 text-secondary shrink-0" strokeWidth={2.5} />
                    <span>7 Bangun Ruang</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Playful Sticker Showcase Container */}
              <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
                {/* Main Sticker Card Frame */}
                <div className="relative w-full max-w-sm rounded-3xl border-2 border-border bg-white p-5 shadow-[8px_8px_0px_#1E293B] bg-dot-pattern">
                  {/* Floating Top Badge */}
                  <div className="absolute -top-3.5 left-6">
                    <Badge variant="yellow" size="default" className="shadow-[2px_2px_0px_#1E293B]">
                      <Star className="size-3 fill-current" strokeWidth={2.5} />
                      <span>WebAR Demo</span>
                    </Badge>
                  </div>

                  {/* Central Visual Playground Area */}
                  <div className="relative aspect-square w-full rounded-2xl border-2 border-border bg-gradient-to-br from-[#FFFDF5] to-[#F1F5F9] p-4 flex flex-col items-center justify-center overflow-hidden">
                    {/* Background concentric circles */}
                    <div className="absolute size-48 rounded-full border-2 border-dashed border-border/40 pointer-events-none" />
                    <div className="absolute size-32 rounded-full border-2 border-border/30 bg-[#FFFDF5] pointer-events-none" />

                    {/* Central 3D Shape Preview (Cube) */}
                    <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform">
                      <div className="size-28 rounded-2xl border-2 border-border bg-gradient-to-tr from-accent to-[#A78BFA] p-3 text-white shadow-[4px_4px_0px_#1E293B] flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-300">
                        <Box className="size-16" strokeWidth={2.5} />
                      </div>
                      <span className="mt-3 font-heading font-extrabold text-sm text-foreground bg-white border-2 border-border rounded-full px-3 py-0.5 shadow-[2px_2px_0px_#1E293B]">
                        Kubus 3D
                      </span>
                    </div>

                    {/* Floating Pill Mini-Badges */}
                    <div className="absolute top-4 left-3 rounded-full border-2 border-border bg-[#F472B6] text-white px-2.5 py-0.5 text-[10px] font-bold shadow-[2px_2px_0px_#1E293B] -rotate-6">
                      V = s³
                    </div>

                    <div className="absolute bottom-5 right-3 rounded-full border-2 border-border bg-[#34D399] text-foreground px-2.5 py-0.5 text-[10px] font-bold shadow-[2px_2px_0px_#1E293B] rotate-6">
                      L = 6 × s²
                    </div>

                    <div className="absolute top-6 right-3 rounded-full border-2 border-border bg-[#FBBF24] text-foreground px-2 py-0.5 text-[10px] font-bold shadow-[2px_2px_0px_#1E293B] rotate-12">
                      Target #0
                    </div>
                  </div>

                  {/* Bottom Action inside preview card */}
                  <div className="mt-4 pt-3 border-t-2 border-border flex items-center justify-between">
                    <div>
                      <p className="font-heading font-bold text-xs text-foreground">
                        Kamera AR Real-time
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Sentuh & putar 360 derajat
                      </p>
                    </div>

                    <Link
                      href="/scan"
                      className={cn(
                        buttonVariants({ variant: "candyMint", size: "xs" }),
                        "text-[11px] gap-1"
                      )}
                    >
                      <span>Coba</span>
                      <ArrowRight className="size-3" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>

                {/* Decorative Sticker Pin Outside Card */}
                <div className="absolute -bottom-3 -right-3 hidden sm:flex size-14 items-center justify-center rounded-2xl border-2 border-border bg-secondary text-white shadow-[4px_4px_0px_#1E293B] rotate-12 select-none">
                  <Sparkles className="size-7" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Geometric Ribbon / Marquee Banner */}
        <div className="w-full border-y-2 border-border bg-tertiary py-3 overflow-hidden select-none">
          <div className="animate-marquee whitespace-nowrap text-xs sm:text-sm font-heading font-black text-foreground tracking-wider flex items-center gap-8">
            <span>✦ KUBUS 3D</span>
            <span>★ BALOK</span>
            <span>✦ PRISMA SEGITIGA</span>
            <span>★ LIMAS SEGIEMPAT</span>
            <span>✦ TABUNG</span>
            <span>★ KERUCUT</span>
            <span>✦ BOLA</span>
            <span>★ TANPA INSTALL APLIKASI</span>
            <span>✦ AUGMENTED REALITY BELAJAR SERU</span>
            <span>★ KUBUS 3D</span>
            <span>✦ BALOK</span>
            <span>★ PRISMA SEGITIGA</span>
            <span>✦ LIMAS SEGIEMPAT</span>
            <span>★ TABUNG</span>
            <span>✦ KERUCUT</span>
            <span>★ BOLA</span>
            <span>✦ WEBAR GRATIS</span>
          </div>
        </div>

        {/* 3. Three-Step Guided Flow Section */}
        <section className="py-14 sm:py-20 bg-[#FFFDF5] relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="violet" size="default" className="mb-3">
                <Compass className="size-3" strokeWidth={2.5} />
                <span>PANDUAN MULAI</span>
              </Badge>
              <h2 className="font-heading text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                3 Langkah Super Gampang 🚀
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tidak butuh akun, tidak perlu unduh aplikasi besar. Cukup siapkan marker dan buka kamera!
              </p>
            </div>

            {/* 3 Steps Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
              {/* Step 1 */}
              <div className="relative rounded-2xl border-2 border-border bg-white p-6 shadow-[6px_6px_0px_#8B5CF6] flex flex-col justify-between">
                {/* Floating Number Badge sitting on the top border */}
                <div className="absolute -top-5 left-6 size-10 rounded-xl border-2 border-border bg-accent text-white font-heading font-black text-base shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
                  1
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="size-4 text-accent" strokeWidth={2.5} />
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Siapkan Kartu Marker
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Buka katalog marker, cetak di kertas, atau cukup buka gambar polanya di layar ponsel/laptop teman Anda.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-muted">
                  <Button
                    variant="candySecondary"
                    size="xs"
                    onClick={() => setIsMarkerModalOpen(true)}
                    className="w-full text-xs"
                  >
                    <span>Buka Katalog Kartu</span>
                    <ArrowRight className="size-3 ml-auto" strokeWidth={2.5} />
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl border-2 border-border bg-white p-6 shadow-[6px_6px_0px_#F472B6] flex flex-col justify-between">
                <div className="absolute -top-5 left-6 size-10 rounded-xl border-2 border-border bg-secondary text-white font-heading font-black text-base shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
                  2
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="size-4 text-secondary" strokeWidth={2.5} />
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Izinkan Akses Kamera
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Masuk ke halaman scanner dan pilih <strong>Izinkan</strong> saat browser meminta izin kamera belakang Anda.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-muted flex items-center text-[11px] font-bold text-secondary">
                  <span>Aman, privasi 100% lokal</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl border-2 border-border bg-white p-6 shadow-[6px_6px_0px_#34D399] flex flex-col justify-between">
                <div className="absolute -top-5 left-6 size-10 rounded-xl border-2 border-border bg-quaternary text-foreground font-heading font-black text-base shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
                  3
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Shapes className="size-4 text-quaternary" strokeWidth={2.5} />
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Arahkan & Eksplorasi 3D
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Sorot kamera ke kartu marker! Objek 3D seketika muncul terapung. Putar, perbesar, dan pelajari rumus geometri.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-muted">
                  <Link
                    href="/scan"
                    className={cn(
                      buttonVariants({ variant: "candyMint", size: "xs" }),
                      "w-full text-xs"
                    )}
                  >
                    <span>Mulai Pindai Sekarang</span>
                    <ArrowRight className="size-3 ml-auto" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 7 Bangun Ruang Showcase (Features Grid) */}
        <section className="py-14 sm:py-20 bg-muted/40 border-t-2 border-border relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <Badge variant="yellow" size="default" className="mb-2">
                  <Shapes className="size-3" strokeWidth={2.5} />
                  <span>KURIKULUM MATEMATIKA</span>
                </Badge>
                <h2 className="font-heading text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                  Koleksi 7 Bangun Ruang 📦
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Pilih kartu yang ingin kamu pelajari atau langsung pindai semuanya lewat kamera.
                </p>
              </div>

              <Link
                href="/scan"
                className={cn(
                  buttonVariants({ variant: "candy", size: "sm" }),
                  "self-start md:self-auto gap-1.5"
                )}
              >
                <Camera className="size-3.5" strokeWidth={2.5} />
                <span>Buka Kamera Scan</span>
              </Link>
            </div>

            {/* Geometry Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {GEOMETRIES.map((item, index) => {
                const shadowColors = [
                  "shadow-[5px_5px_0px_#8B5CF6]",
                  "shadow-[5px_5px_0px_#F472B6]",
                  "shadow-[5px_5px_0px_#FBBF24]",
                  "shadow-[5px_5px_0px_#34D399]",
                ];
                const shadowStyle = shadowColors[index % shadowColors.length];

                return (
                  <div
                    key={item.id}
                    className={`group relative flex flex-col rounded-2xl border-2 border-border bg-white p-4 transition-all duration-200 hover:-translate-y-1 ${shadowStyle}`}
                  >
                    {/* Thumbnail Preview */}
                    <div className="relative aspect-video sm:aspect-square w-full rounded-xl border-2 border-border bg-slate-900 flex items-center justify-center p-3 overflow-hidden">
                      <Image
                        src={item.markerPreviewPath}
                        alt={`Marker ${item.name}`}
                        width={180}
                        height={180}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 rounded-lg border border-white/20 bg-black/80 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-xs">
                        Target #{item.targetIndex}
                      </span>
                    </div>

                    {/* Geometry Info */}
                    <div className="mt-3.5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-extrabold text-base text-foreground">
                          {item.name}
                        </h3>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-full border border-border/40">
                          {item.characteristics.length} Ciri
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Formula Mini Badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-lg border-2 border-border bg-accent/10 px-2 py-0.5 text-[10px] font-mono font-bold text-accent">
                          {item.formulaVolume.formula}
                        </span>
                        <span className="inline-flex items-center rounded-lg border-2 border-border bg-secondary/15 px-2 py-0.5 text-[10px] font-mono font-bold text-secondary">
                          {item.formulaSurface.formula}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-4 pt-3 border-t-2 border-border flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setIsMarkerModalOpen(true)}
                        className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                      >
                        <Layers className="size-3 text-accent" strokeWidth={2.5} />
                        <span>Lihat Kartu</span>
                      </button>

                      <Link
                        href="/scan"
                        className={cn(
                          buttonVariants({ variant: "candyMint", size: "xs" }),
                          "text-[11px] gap-1 font-bold"
                        )}
                      >
                        <Camera className="size-3" strokeWidth={2.5} />
                        <span>Pindai</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border bg-[#FFFDF5] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg border-2 border-border bg-accent text-white shadow-[2px_2px_0px_#1E293B]">
              <Box className="size-4" strokeWidth={2.5} />
            </div>
            <span className="font-heading font-extrabold text-sm text-foreground">
              AR Geometri WebAR
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 AR Geometri • Media Pembelajaran Bangun Ruang Tiga Dimensi Berbasis WebAR.
          </p>

          <Button
            size="xs"
            variant="candySecondary"
            onClick={() => setIsMarkerModalOpen(true)}
            className="text-[11px]"
          >
            <span>Katalog Pola Marker</span>
          </Button>
        </div>
      </footer>

      {/* Marker Catalog Modal */}
      <MarkerModal
        open={isMarkerModalOpen}
        onOpenChange={setIsMarkerModalOpen}
      />
    </div>
  );
}
