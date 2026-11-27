import { ARScanner } from "@/features/ar/components/ARScanner";

export const metadata = {
  title: "Scanner Kamera AR | AR Geometri",
  description: "Pindai kartu pola marker untuk melihat visualisasi objek 3D bangun ruang dan rumus matematika.",
};

export default function ScanPage() {
  return <ARScanner />;
}
