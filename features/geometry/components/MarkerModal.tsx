"use client";

import * as React from "react";
import Image from "next/image";
import { Download, ExternalLink, QrCode, Check, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GEOMETRIES } from "../data/geometries";

interface MarkerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MarkerModal({ open, onOpenChange }: MarkerModalProps) {
  const [downloadedId, setDownloadedId] = React.useState<string | null>(null);

  const handleDownload = (path: string, name: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = `marker-${name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadedId(name);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  const handleDownloadAll = () => {
    GEOMETRIES.forEach((item, index) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = item.markerPreviewPath;
        link.download = `marker-${item.name.toLowerCase().replace(/\s+/g, "-")}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="violet" size="sm" className="gap-1.5 uppercase tracking-wider">
              <QrCode className="size-3" strokeWidth={2.5} />
              <span>Katalog Kartu Marker</span>
            </Badge>
          </div>
          <DialogTitle className="mt-1.5 text-lg sm:text-2xl font-extrabold text-foreground">
            Cetak atau Tampilkan Kartu Pola 🎯
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Pindai gambar kartu di bawah menggunakan kamera WebAR untuk memunculkan model 3D interaktif. Anda dapat mencetaknya di kertas atau menampilkannya di layar HP / laptop teman.
          </DialogDescription>
        </DialogHeader>

        {/* Tips Box Styled as a Sticker Note */}
        <div className="mt-2 flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border-2 border-border bg-[#FEF3C7] p-3 sm:p-4 text-xs text-foreground shadow-[2px_2px_0px_#1E293B] sm:shadow-[3px_3px_0px_#1E293B]">
          <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border-2 border-border bg-[#FBBF24] text-foreground shadow-[1.5px_1.5px_0px_#1E293B]">
            <Lightbulb className="size-3.5 sm:size-4.5" strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5 flex-1 min-w-0">
            <p className="font-bold text-foreground text-[11px] sm:text-xs">Tips Pemindaian Terbaik:</p>
            <p className="text-muted-foreground leading-relaxed text-[11px] sm:text-xs">
              Pastikan cahaya terang. Arahkan kamera tegak lurus dengan jarak sekitar 15–30 cm agar pola langsung terdeteksi!
            </p>
          </div>
          <Button
            size="xs"
            variant="candySecondary"
            onClick={handleDownloadAll}
            className="ml-auto shrink-0 text-[10px] sm:text-[11px] h-7 px-2.5"
            title="Unduh seluruh kartu marker sekaligus"
          >
            <Download className="size-3" strokeWidth={2.5} />
            <span className="hidden sm:inline">Unduh Semua</span>
            <span className="sm:hidden">Semua</span>
          </Button>
        </div>

        {/* Responsive Grid of 7 Markers: 2 columns on mobile for compact layout */}
        <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto pr-1">
          {GEOMETRIES.map((item, index) => {
            const shadowStyles = [
              "shadow-[3px_3px_0px_#8B5CF6] sm:shadow-[4px_4px_0px_#8B5CF6]",
              "shadow-[3px_3px_0px_#F472B6] sm:shadow-[4px_4px_0px_#F472B6]",
              "shadow-[3px_3px_0px_#FBBF24] sm:shadow-[4px_4px_0px_#FBBF24]",
              "shadow-[3px_3px_0px_#34D399] sm:shadow-[4px_4px_0px_#34D399]",
            ];
            const shadowClass = shadowStyles[index % shadowStyles.length];

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col items-center rounded-xl sm:rounded-2xl border-2 border-border bg-white p-2.5 sm:p-3.5 transition-all duration-200 hover:-translate-y-0.5 ${shadowClass}`}
              >
                {/* Marker Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-xl border-2 border-border bg-slate-900 flex items-center justify-center p-2 sm:p-3">
                  <Image
                    src={item.markerPreviewPath}
                    alt={`Marker ${item.name}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-1.5 left-1.5 rounded border border-white/20 bg-black/80 px-1.5 py-0.2 text-[9px] sm:text-[10px] font-mono font-bold text-white shadow-xs">
                    #{item.targetIndex}
                  </span>
                </div>

                {/* Marker Info & Action */}
                <div className="mt-2 sm:mt-3 flex w-full items-center justify-between gap-1">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase truncate">
                      Target {item.id}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <a
                      href={item.markerPreviewPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-6.5 sm:size-8 items-center justify-center rounded-full border-2 border-border bg-white text-foreground shadow-[1.5px_1.5px_0px_#1E293B] hover:bg-muted transition-all"
                      title="Buka gambar di tab baru"
                    >
                      <ExternalLink className="size-3 sm:size-3.5" strokeWidth={2.5} />
                    </a>

                    <Button
                      size="icon-xs"
                      variant="candyMint"
                      onClick={() => handleDownload(item.markerPreviewPath, item.name)}
                      title={`Unduh kartu ${item.name}`}
                      className="size-6.5 sm:size-8"
                    >
                      {downloadedId === item.name ? (
                        <Check className="size-3 sm:size-3.5 text-foreground" strokeWidth={3} />
                      ) : (
                        <Download className="size-3 sm:size-3.5" strokeWidth={2.5} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
