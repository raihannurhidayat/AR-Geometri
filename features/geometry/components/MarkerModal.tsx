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
            <Badge variant="violet" className="gap-1.5 uppercase tracking-wider">
              <QrCode className="size-3" strokeWidth={2.5} />
              <span>Katalog Kartu Marker</span>
            </Badge>
          </div>
          <DialogTitle className="mt-2 text-2xl font-extrabold text-foreground">
            Cetak atau Tampilkan Kartu Pola 🎯
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
            Pindai gambar kartu di bawah menggunakan kamera WebAR untuk memunculkan model 3D interaktif. Anda dapat mencetaknya di kertas atau menampilkannya di layar HP / laptop teman.
          </DialogDescription>
        </DialogHeader>

        {/* Tips Box Styled as a Sticker Note */}
        <div className="mt-2 flex items-start gap-3 rounded-2xl border-2 border-border bg-[#FEF3C7] p-4 text-xs text-foreground shadow-[3px_3px_0px_#1E293B]">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl border-2 border-border bg-[#FBBF24] text-foreground shadow-[2px_2px_0px_#1E293B]">
            <Lightbulb className="size-4.5" strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-foreground">Tips Pemindaian Terbaik:</p>
            <p className="text-muted-foreground leading-relaxed">
              Pastikan cahaya ruangan terang dan tidak silau. Arahkan kamera tegak lurus dengan jarak sekitar 15–30 cm agar pola terdeteksi seketika!
            </p>
          </div>
          <Button
            size="xs"
            variant="candySecondary"
            onClick={handleDownloadAll}
            className="ml-auto shrink-0 hidden sm:inline-flex text-[11px]"
            title="Unduh seluruh kartu marker sekaligus"
          >
            <Download className="size-3" strokeWidth={2.5} />
            <span>Unduh Semua</span>
          </Button>
        </div>

        {/* Responsive Grid of 7 Markers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[55vh] overflow-y-auto pr-1">
          {GEOMETRIES.map((item, index) => {
            const shadowStyles = [
              "shadow-[4px_4px_0px_#8B5CF6]",
              "shadow-[4px_4px_0px_#F472B6]",
              "shadow-[4px_4px_0px_#FBBF24]",
              "shadow-[4px_4px_0px_#34D399]",
            ];
            const shadowClass = shadowStyles[index % shadowStyles.length];

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col items-center rounded-2xl border-2 border-border bg-white p-3.5 transition-all duration-200 hover:-translate-y-1 ${shadowClass}`}
              >
                {/* Marker Image Container */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-border bg-slate-900 flex items-center justify-center p-3">
                  <Image
                    src={item.markerPreviewPath}
                    alt={`Marker ${item.name}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded-lg border border-white/20 bg-black/80 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-xs">
                    #{item.targetIndex}
                  </span>
                </div>

                {/* Marker Info & Action */}
                <div className="mt-3 flex w-full items-center justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                      Target {item.id}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={item.markerPreviewPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-8 items-center justify-center rounded-full border-2 border-border bg-white text-foreground shadow-[2px_2px_0px_#1E293B] hover:bg-muted hover:scale-105 transition-all"
                      title="Buka gambar di tab baru"
                    >
                      <ExternalLink className="size-3.5" strokeWidth={2.5} />
                    </a>

                    <Button
                      size="icon-xs"
                      variant="candyMint"
                      onClick={() => handleDownload(item.markerPreviewPath, item.name)}
                      title={`Unduh kartu ${item.name}`}
                      className="size-8"
                    >
                      {downloadedId === item.name ? (
                        <Check className="size-3.5 text-foreground" strokeWidth={3} />
                      ) : (
                        <Download className="size-3.5" strokeWidth={2.5} />
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
