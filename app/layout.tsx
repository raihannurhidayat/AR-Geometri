import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AR Geometri - Pembelajaran Bangun Ruang WebAR",
  description: "Eksplorasi bangun ruang tiga dimensi secara interaktif melalui kamera Augmented Reality.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-foreground selection:bg-indigo-500 selection:text-white">
        {/* Mobile-Only Device Viewport Container */}
        <div className="w-full max-w-md mx-auto min-h-screen bg-background relative shadow-2xl border-x border-border/30 flex flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
