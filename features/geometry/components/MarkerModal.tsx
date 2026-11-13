"use client";

import * as React from "react";
import Image from "next/image";
import { Download, ExternalLink, QrCode, Lightbulb, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GEOMETRIES } from "../data/geometries";

interface MarkerModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MarkerModal({ open, onOpenChange }: MarkerModalProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleDownload = (path: string, name: string) => {
    const link = document.createElement("a");
    link.href = path;
    link.download = `marker-${name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs tracking-wider uppercase">
            <QrCode className="size-4" />
            <span>Katalog Kartu Marker WebAR</span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Kartu Marker Bangun Ruang
          </DialogTitle>
          <DialogDescription className="text-xs">
            Pindai gambar di bawah ini menggunakan kamera AR untuk memunculkan model 3D interaktif. Anda dapat mencetak kartu ini atau menampilkannya di layar HP lain.
          </DialogDescription>
        </DialogHeader>

        {/* Tips Box */}
        <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-amber-500/10 p-3 text-[11px] text-amber-900 dark:text-amber-200 border border-amber-500/20">
          <Lightbulb className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold">Tips Pemindaian:</p>
            <p className="text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
              Pastikan pencahayaan cukup dan arahkan kamera tegak lurus dengan jarak sekitar 15–30 cm dari kartu.
            </p>
          </div>
        </div>

        {/* List of 7 Markers */}
        <div className="mt-4 flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
          {GEOMETRIES.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-3.5 transition-all hover:border-indigo-500/50 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center p-2">
                <Image
                  src={item.markerPreviewPath}
                  alt={`Marker ${item.name}`}
                  width={220}
                  height={220}
                  className="h-full w-full object-contain transition-transform group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono font-medium text-white backdrop-blur-xs">
                  Target #{item.targetIndex}
                </span>
              </div>

              <div className="mt-3 flex w-full items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {item.id}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={item.markerPreviewPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title="Buka di tab baru"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                  <Button
                    size="icon-xs"
                    variant="outline"
                    onClick={() => handleDownload(item.markerPreviewPath, item.name)}
                    title="Unduh file marker"
                  >
                    {copiedId === item.name ? (
                      <Check className="size-3 text-emerald-600" />
                    ) : (
                      <Download className="size-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
