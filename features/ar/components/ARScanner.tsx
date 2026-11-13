"use client";

import * as React from "react";
import Link from "next/link";
import * as THREE from "three";
import {
  ArrowLeft,
  RotateCw,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  BookOpen,
  HelpCircle,
  CameraOff,
  Sparkles,
  ChevronDown,
  X,
  Scan,
  RefreshCw,
  CheckCircle2,
  Move,
  Lightbulb,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GEOMETRIES } from "@/features/geometry/data/geometries";
import { GeometryItem, ScannerStatus } from "@/features/geometry/types/geometry";
import { MarkerModal } from "@/features/geometry/components/MarkerModal";

export function ARScanner() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  // Gesture refs for mouse and touch interactions
  const isPointerDownRef = React.useRef(false);
  const lastPointerPosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPinchDistanceRef = React.useRef<number | null>(null);

  // Three.js instances ref
  const threeRef = React.useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    activeMeshGroup: THREE.Group;
    animationFrameId: number;
  } | null>(null);

  const [status, setStatus] = React.useState<ScannerStatus>("requesting_permission");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [errorHelpTip, setErrorHelpTip] = React.useState<string | null>(null);
  const [activeGeometry, setActiveGeometry] = React.useState<GeometryItem>(GEOMETRIES[0]);
  const [isMarkerDetected, setIsMarkerDetected] = React.useState<boolean>(false);
  const [isScanning, setIsScanning] = React.useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = React.useState<boolean>(true);
  const isAutoRotateRef = React.useRef<boolean>(true);

  React.useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  const disableAutoRotate = React.useCallback(() => {
    if (isAutoRotateRef.current) {
      isAutoRotateRef.current = false;
      setIsAutoRotate(false);
    }
  }, []);

  const toggleAutoRotate = React.useCallback(() => {
    setIsAutoRotate((prev) => {
      const next = !prev;
      isAutoRotateRef.current = next;
      return next;
    });
  }, []);

  const [isFormulaDrawerOpen, setIsFormulaDrawerOpen] = React.useState<boolean>(false);
  const [scaleFactor, setScaleFactor] = React.useState<number>(1);
  const scaleFactorRef = React.useRef<number>(1);

  React.useEffect(() => {
    scaleFactorRef.current = scaleFactor;
  }, [scaleFactor]);

  const [isMarkerModalOpen, setIsMarkerModalOpen] = React.useState<boolean>(false);

  // 1. Camera Lifecycle & Initialization
  const requestCameraStream = React.useCallback(async (isMounted: () => boolean) => {
    if (typeof window !== "undefined" && !window.isSecureContext && window.location.hostname !== "localhost") {
      if (isMounted()) {
        setStatus("error");
        setErrorMessage("Koneksi Tidak Aman (Insecure HTTP)");
        setErrorHelpTip("Akses kamera pada browser mewajibkan koneksi HTTPS atau domain localhost.");
      }
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (isMounted()) {
        setStatus("error");
        setErrorMessage("Kamera Tidak Didukung");
        setErrorHelpTip("Browser Anda tidak mendukung WebRTC Camera API. Coba gunakan Google Chrome atau Safari terbaru.");
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (!isMounted()) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      // Default state: Camera ready, searching for marker
      setStatus("scanning");
      setIsMarkerDetected(false);
    } catch (err: unknown) {
      if (!isMounted()) return;
      console.error("Camera access error:", err);
      setStatus("error");
      const errorObj = err as { name?: string; message?: string };
      if (errorObj.name === "NotAllowedError" || errorObj.name === "PermissionDeniedError") {
        setErrorMessage("Izin Akses Kamera Ditolak");
        setErrorHelpTip("Silakan klik ikon gembok di sebelah bilah alamat URL browser Anda, aktifkan izin Kamera, lalu muat ulang halaman ini.");
      } else if (errorObj.name === "NotFoundError" || errorObj.name === "DevicesNotFoundError") {
        setErrorMessage("Kamera Tidak Ditemukan");
        setErrorHelpTip("Perangkat Anda tidak memiliki modul kamera yang aktif atau sedang digunakan aplikasi lain.");
      } else {
        setErrorMessage("Gagal Membuka Kamera");
        setErrorHelpTip(errorObj.message || "Terjadi kendala saat menghubungkan kamera perangkat.");
      }
    }
  }, []);

  const handleRetryCamera = React.useCallback(() => {
    setStatus("requesting_permission");
    setErrorMessage(null);
    setErrorHelpTip(null);
    void requestCameraStream(() => true);
  }, [requestCameraStream]);

  const stopCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // 2. Scan Marker Action
  const handleScanMarker = () => {
    if (isScanning) return;
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setIsMarkerDetected(true);
      setStatus("detected");
    }, 500);
  };

  const handleResetScan = () => {
    setIsMarkerDetected(false);
    setStatus("scanning");
    setIsFormulaDrawerOpen(false);
    setScaleFactor(1);
    setIsAutoRotate(true);
    isAutoRotateRef.current = true;
    if (threeRef.current?.activeMeshGroup) {
      threeRef.current.activeMeshGroup.rotation.set(0, 0, 0);
      threeRef.current.activeMeshGroup.scale.set(1, 1, 1);
    }
  };

  // 3. Three.js Procedural 3D Mesh Generator for Geometries
  const create3DMeshForGeometry = React.useCallback((geomId: string): THREE.Group => {
    const group = new THREE.Group();

    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      metalness: 0.1,
      roughness: 0.25,
      transmission: 0.25,
      transparent: true,
      opacity: 0.94,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      linewidth: 3,
    });

    let geometry: THREE.BufferGeometry;

    switch (geomId) {
      case "cube":
        geometry = new THREE.BoxGeometry(2, 2, 2);
        mainMaterial.color.setHex(0x8b5cf6); // Vivid Violet
        break;
      case "cuboid":
        geometry = new THREE.BoxGeometry(2.8, 1.6, 1.8);
        mainMaterial.color.setHex(0x06b6d4); // Cyan
        break;
      case "prism":
        geometry = new THREE.CylinderGeometry(1.6, 1.6, 2.4, 3);
        mainMaterial.color.setHex(0x34d399); // Mint / Emerald
        break;
      case "pyramid":
        geometry = new THREE.ConeGeometry(1.8, 2.4, 4);
        mainMaterial.color.setHex(0xfbbf24); // Amber / Yellow
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
        mainMaterial.color.setHex(0xf472b6); // Hot Pink
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(1.5, 2.6, 32);
        mainMaterial.color.setHex(0xf43f5e); // Rose
        break;
      case "sphere":
        geometry = new THREE.SphereGeometry(1.4, 32, 24);
        mainMaterial.color.setHex(0x3b82f6); // Sky Blue
        break;
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    const mesh = new THREE.Mesh(geometry, mainMaterial);
    group.add(mesh);

    // Chunky outline edges
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, wireframeMaterial);
    group.add(line);

    return group;
  }, []);

  // 4. Initialize Three.js Scene
  React.useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xfbbf24, 0.8);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const activeMeshGroup = new THREE.Group();
    activeMeshGroup.visible = false;
    scene.add(activeMeshGroup);

    threeRef.current = {
      scene,
      camera,
      renderer,
      activeMeshGroup,
      animationFrameId: 0,
    };

    // Render loop
    const animate = () => {
      if (threeRef.current) {
        if (isAutoRotateRef.current && threeRef.current.activeMeshGroup && threeRef.current.activeMeshGroup.visible) {
          threeRef.current.activeMeshGroup.rotation.y += 0.01;
        }
        threeRef.current.renderer.render(threeRef.current.scene, threeRef.current.camera);
        threeRef.current.animationFrameId = requestAnimationFrame(animate);
      }
    };
    animate();

    const handleResize = () => {
      if (!threeRef.current || !canvasContainerRef.current) return;
      const w = canvasContainerRef.current.clientWidth;
      const h = canvasContainerRef.current.clientHeight;
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (threeRef.current) {
        cancelAnimationFrame(threeRef.current.animationFrameId);
        threeRef.current.renderer.dispose();
      }
    };
  }, []);

  // 5. Update 3D Model: only render when isMarkerDetected is true
  React.useEffect(() => {
    if (!threeRef.current) return;
    const { activeMeshGroup } = threeRef.current;

    while (activeMeshGroup.children.length > 0) {
      activeMeshGroup.remove(activeMeshGroup.children[0]);
    }

    if (isMarkerDetected) {
      const newMesh = create3DMeshForGeometry(activeGeometry.id);
      activeMeshGroup.add(newMesh);
      activeMeshGroup.scale.set(
        scaleFactorRef.current,
        scaleFactorRef.current,
        scaleFactorRef.current
      );
      activeMeshGroup.visible = true;
    } else {
      activeMeshGroup.visible = false;
    }
  }, [activeGeometry, isMarkerDetected, create3DMeshForGeometry]);

  // Sync scale factor directly to Three.js activeMeshGroup without rebuilding mesh
  React.useEffect(() => {
    if (threeRef.current?.activeMeshGroup) {
      threeRef.current.activeMeshGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  }, [scaleFactor]);

  // 6. Camera Lifecycle on mount/unmount
  React.useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      void requestCameraStream(() => mounted);
    }, 0);

    return () => {
      mounted = false;
      clearTimeout(timer);
      stopCamera();
    };
  }, [requestCameraStream, stopCamera]);

  // 7. Interactive Gesture Listeners (Mouse Drag & Scroll + Touch Drag & Pinch-to-Zoom)
  React.useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container || !isMarkerDetected) return;

    // Mouse Pointer Drag (Desktop)
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      isPointerDownRef.current = true;
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
      disableAutoRotate();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!isPointerDownRef.current || !threeRef.current) return;
      const dx = e.clientX - lastPointerPosRef.current.x;
      const dy = e.clientY - lastPointerPosRef.current.y;
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

      const { activeMeshGroup } = threeRef.current;
      if (activeMeshGroup) {
        activeMeshGroup.rotation.y += dx * 0.008;
        activeMeshGroup.rotation.x += dy * 0.008;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isPointerDownRef.current = false;
    };

    // Mouse Wheel Zoom (Desktop)
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      disableAutoRotate();
      const zoomStep = e.deltaY < 0 ? 0.1 : -0.1;
      setScaleFactor((prev) => {
        const next = Math.min(Math.max(prev + zoomStep, 0.4), 3.0);
        if (threeRef.current?.activeMeshGroup) {
          threeRef.current.activeMeshGroup.scale.set(next, next, next);
        }
        return next;
      });
    };

    // Touch Drag (1-finger rotate) & Pinch (2-finger zoom) on Mobile
    const onTouchStart = (e: TouchEvent) => {
      disableAutoRotate();
      if (e.touches.length === 1) {
        isPointerDownRef.current = true;
        lastPointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isPointerDownRef.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDistanceRef.current = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isPointerDownRef.current && threeRef.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - lastPointerPosRef.current.x;
        const dy = e.touches[0].clientY - lastPointerPosRef.current.y;
        lastPointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        const { activeMeshGroup } = threeRef.current;
        if (activeMeshGroup) {
          activeMeshGroup.rotation.y += dx * 0.008;
          activeMeshGroup.rotation.x += dy * 0.008;
        }
      } else if (e.touches.length === 2 && lastPinchDistanceRef.current !== null && threeRef.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        const distanceDelta = currentDistance - lastPinchDistanceRef.current;
        lastPinchDistanceRef.current = currentDistance;

        setScaleFactor((prev) => {
          const next = Math.min(Math.max(prev + distanceDelta * 0.006, 0.4), 3.0);
          if (threeRef.current?.activeMeshGroup) {
            threeRef.current.activeMeshGroup.scale.set(next, next, next);
          }
          return next;
        });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isPointerDownRef.current = false;
        lastPinchDistanceRef.current = null;
      } else if (e.touches.length === 1) {
        lastPinchDistanceRef.current = null;
        lastPointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isPointerDownRef.current = true;
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isMarkerDetected, disableAutoRotate]);

  // Button Actions
  const handleZoom = (delta: number) => {
    setScaleFactor((prev) => {
      const next = Math.min(Math.max(prev + delta, 0.4), 3.0);
      if (threeRef.current?.activeMeshGroup) {
        threeRef.current.activeMeshGroup.scale.set(next, next, next);
      }
      return next;
    });
  };

  const handleReset = () => {
    setScaleFactor(1);
    setIsAutoRotate(true);
    isAutoRotateRef.current = true;
    if (threeRef.current?.activeMeshGroup) {
      threeRef.current.activeMeshGroup.scale.set(1, 1, 1);
      threeRef.current.activeMeshGroup.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950 text-foreground select-none">
      {/* 1. Live Background Video Stream */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Subtle overlay shading for HUD readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none z-10" />

      {/* 2. Interactive Three.js 3D Virtual Canvas (Mouse drag/scroll & Touch drag/pinch) */}
      <div
        ref={canvasContainerRef}
        className={cn(
          "absolute inset-0 h-full w-full z-20",
          isMarkerDetected
            ? "pointer-events-auto touch-none cursor-grab active:cursor-grabbing"
            : "pointer-events-none"
        )}
      />

      {/* 3. Scanning Reticle (Center Viewfinder) with Playful Geometric Pop Style */}
      <div className="absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none px-4">
        <div
          className={cn(
            "relative size-60 sm:size-64 rounded-3xl flex flex-col items-center justify-center transition-all duration-300",
            isMarkerDetected
              ? "border-3 border-quaternary bg-quaternary/10 shadow-[0_0_24px_rgba(52,211,153,0.35)]"
              : "border-3 border-dashed border-white/60 bg-black/15"
          )}
        >
          {/* Animated Scanning Laser Line (only when searching) */}
          {status !== "error" && !isMarkerDetected && (
            <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_12px_#FBBF24] animate-pulse top-1/2 -translate-y-1/2" />
          )}

          {/* Chunky Corner Brackets */}
          <div
            className={cn(
              "absolute -top-2 -left-2 size-6 border-t-4 border-l-4 rounded-tl-xl transition-colors",
              isMarkerDetected ? "border-quaternary" : "border-tertiary"
            )}
          />
          <div
            className={cn(
              "absolute -top-2 -right-2 size-6 border-t-4 border-r-4 rounded-tr-xl transition-colors",
              isMarkerDetected ? "border-quaternary" : "border-tertiary"
            )}
          />
          <div
            className={cn(
              "absolute -bottom-2 -left-2 size-6 border-b-4 border-l-4 rounded-bl-xl transition-colors",
              isMarkerDetected ? "border-quaternary" : "border-tertiary"
            )}
          />
          <div
            className={cn(
              "absolute -bottom-2 -right-2 size-6 border-b-4 border-r-4 rounded-br-xl transition-colors",
              isMarkerDetected ? "border-quaternary" : "border-tertiary"
            )}
          />

          {/* Center Scan Candy Button (When marker is not yet detected) */}
          {!isMarkerDetected && status !== "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <Button
                variant="candyYellow"
                size="lg"
                onClick={handleScanMarker}
                disabled={isScanning}
                className="pointer-events-auto shadow-[4px_4px_0px_#1E293B] gap-2 h-11 px-5 text-xs sm:text-sm font-extrabold"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="size-4 animate-spin text-foreground" strokeWidth={2.5} />
                    <span>Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Scan className="size-4.5 text-foreground" strokeWidth={2.5} />
                    <span>Pindai Marker</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Instruction Label under reticle as a Playful Sticker Pill */}
          <div className="absolute -bottom-16 text-center px-2 w-full">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-1.5 text-xs font-bold shadow-[3px_3px_0px_#1E293B] transition-all",
                isMarkerDetected
                  ? "bg-quaternary text-foreground"
                  : "bg-white text-foreground"
              )}
            >
              {isMarkerDetected ? (
                <>
                  <CheckCircle2 className="size-4 text-foreground" strokeWidth={3} />
                  <span>{activeGeometry.name} Terdeteksi! 🎉</span>
                </>
              ) : isScanning ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin text-accent" strokeWidth={2.5} />
                  <span>Menganalisis pola kartu marker...</span>
                </>
              ) : (
                <span>Arahkan ke kartu marker lalu klik Pindai 🔍</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Top Floating Header HUD */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3 sm:p-4">
        {/* Back to Home Candy Button */}
        <Link
          href="/"
          onClick={stopCamera}
          className={cn(
            buttonVariants({ variant: "candySecondary", size: "sm" }),
            "gap-1.5 shadow-[3px_3px_0px_#1E293B] text-xs font-bold"
          )}
        >
          <ArrowLeft className="size-4" strokeWidth={2.5} />
          <span>Beranda</span>
        </Link>

        {/* Marker Switcher & Quick Help */}
        <div className="flex items-center gap-2">
          {/* Target Selector in Sticker Pill Style */}
          <div className="relative">
            <select
              aria-label="Pilih Model Bangun Ruang"
              value={activeGeometry.id}
              onChange={(e) => {
                const found = GEOMETRIES.find((g) => g.id === e.target.value);
                if (found) {
                  setActiveGeometry(found);
                }
              }}
              className="appearance-none rounded-full border-2 border-border bg-white text-foreground font-heading font-bold shadow-[3px_3px_0px_#1E293B] px-3.5 py-1.5 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              {GEOMETRIES.map((g) => (
                <option key={g.id} value={g.id} className="bg-white text-foreground font-sans">
                  {g.name} (#{g.targetIndex})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-foreground">
              <ChevronDown className="size-3.5" strokeWidth={2.5} />
            </div>
          </div>

          {/* Help Button */}
          <Button
            size="icon-sm"
            variant="candyYellow"
            onClick={() => setIsMarkerModalOpen(true)}
            className="shadow-[3px_3px_0px_#1E293B]"
            title="Lihat Gambar Marker"
          >
            <HelpCircle className="size-4.5" strokeWidth={2.5} />
          </Button>
        </div>
      </header>

      {/* Gesture Hint Badge (Appears when marker is detected) */}
      {isMarkerDetected && (
        <div className="absolute top-16 sm:top-18 inset-x-0 z-25 flex justify-center pointer-events-none animate-in fade-in duration-300">
          <div className="flex items-center gap-2 rounded-full border-2 border-border bg-white text-foreground px-3.5 py-1 text-[11px] font-bold shadow-[3px_3px_0px_#1E293B]">
            <Move className="size-3.5 text-accent" strokeWidth={2.5} />
            <span>Sentuh untuk memutar • Cubit untuk zoom</span>
          </div>
        </div>
      )}

      {/* 5. Error Overlay (if camera fails or denied) */}
      {status === "error" && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border-3 border-border bg-[#FFFDF5] p-6 text-center shadow-[8px_8px_0px_#1E293B]">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border-2 border-border bg-destructive text-white shadow-[4px_4px_0px_#1E293B] mb-4">
              <CameraOff className="size-8" strokeWidth={2.5} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-black text-foreground">
              {errorMessage || "Kamera Belum Terhubung"}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {errorHelpTip || "Pastikan peramban Anda memiliki izin akses ke kamera perangkat."}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="candyMint"
                size="lg"
                onClick={handleRetryCamera}
                className="w-full h-12 text-sm"
              >
                Coba Buka Kamera Lagi
              </Button>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "candySecondary", size: "lg" }),
                  "w-full h-12 text-sm flex items-center justify-center"
                )}
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bottom Floating Action Bar HUD */}
      <footer className="absolute bottom-5 inset-x-0 z-30 flex flex-col items-center gap-2.5 px-3">
        {isMarkerDetected ? (
          /* Controls Active when Marker is Detected - Playful Floating Dock */
          <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-2 rounded-full border-2 border-border bg-white p-1.5 shadow-[6px_6px_0px_#1E293B]">
              <Button
                size="sm"
                variant={isAutoRotate ? "candyMint" : "candySecondary"}
                onClick={toggleAutoRotate}
                className="h-8 px-3 text-xs gap-1.5"
                title="Toggle Putar Otomatis"
              >
                <RotateCw className={`size-3.5 ${isAutoRotate ? "animate-spin" : ""}`} strokeWidth={2.5} />
                <span>Rotasi</span>
              </Button>

              <div className="h-4 w-0.5 bg-border" />

              <Button
                size="icon-sm"
                variant="candySecondary"
                onClick={() => handleZoom(0.2)}
                title="Perbesar Model (Zoom In)"
              >
                <ZoomIn className="size-4" strokeWidth={2.5} />
              </Button>

              <Button
                size="icon-sm"
                variant="candySecondary"
                onClick={() => handleZoom(-0.2)}
                title="Perkecil Model (Zoom Out)"
              >
                <ZoomOut className="size-4" strokeWidth={2.5} />
              </Button>

              <Button
                size="icon-sm"
                variant="candySecondary"
                onClick={handleReset}
                title="Reset Ukuran & Posisi"
              >
                <RotateCcw className="size-4" strokeWidth={2.5} />
              </Button>

              <div className="h-4 w-0.5 bg-border" />

              {/* Formula Details Toggle */}
              <Button
                size="sm"
                variant="candy"
                onClick={() => setIsFormulaDrawerOpen(true)}
                className="h-8 px-3.5 text-xs gap-1.5"
              >
                <BookOpen className="size-3.5" strokeWidth={2.5} />
                <span>Rumus</span>
              </Button>
            </div>

            {/* Quick Button to Reset / Scan Other Marker */}
            <Button
              size="xs"
              variant="candySecondary"
              onClick={handleResetScan}
              className="text-[11px] gap-1 shadow-[3px_3px_0px_#1E293B]"
            >
              <RefreshCw className="size-3" strokeWidth={2.5} />
              <span>Lepas / Pindai Marker Lain</span>
            </Button>
          </div>
        ) : (
          /* Helper hint when marker is not yet detected */
          <Button
            size="sm"
            variant="candySecondary"
            onClick={() => setIsMarkerModalOpen(true)}
            className="shadow-[4px_4px_0px_#1E293B] text-xs gap-2 py-2 px-4"
          >
            <Lightbulb className="size-4 text-tertiary shrink-0" strokeWidth={2.5} />
            <span>Belum punya kartu? Buka Katalog Marker</span>
          </Button>
        )}
      </footer>

      {/* 7. Bottom Drawer / Sheet for Formula & Characteristics Styled as Playful Study Card */}
      {isFormulaDrawerOpen && (
        <div className="absolute inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl border-t-4 border-x-4 border-border bg-[#FFFDF5] p-5 sm:p-6 shadow-[0px_-6px_0px_#1E293B] animate-in slide-in-from-bottom duration-200">
          <div className="mx-auto max-w-xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-border">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl border-2 border-border bg-accent text-white shadow-[2px_2px_0px_#1E293B]">
                  <Sparkles className="size-5" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-black text-foreground">
                    {activeGeometry.name}
                  </h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Target Marker #{activeGeometry.targetIndex}
                  </p>
                </div>
              </div>

              <Button
                size="icon-sm"
                variant="candySecondary"
                onClick={() => setIsFormulaDrawerOpen(false)}
                aria-label="Tutup panel rumus"
              >
                <X className="size-4" strokeWidth={2.5} />
              </Button>
            </div>

            {/* Formula Cards */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Volume Formula */}
              <div className="rounded-2xl border-2 border-border bg-[#EEF2FF] p-4 shadow-[4px_4px_0px_#1E293B]">
                <Badge variant="violet" size="sm" className="mb-2 uppercase tracking-wider">
                  Rumus Volume
                </Badge>
                <p className="font-mono text-xl font-black text-foreground">
                  {activeGeometry.formulaVolume.formula}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {activeGeometry.formulaVolume.description}
                </p>
              </div>

              {/* Surface Area Formula */}
              <div className="rounded-2xl border-2 border-border bg-[#ECFDF5] p-4 shadow-[4px_4px_0px_#1E293B]">
                <Badge variant="mint" size="sm" className="mb-2 uppercase tracking-wider">
                  Luas Permukaan
                </Badge>
                <p className="font-mono text-xl font-black text-foreground">
                  {activeGeometry.formulaSurface.formula}
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {activeGeometry.formulaSurface.description}
                </p>
              </div>
            </div>

            {/* Characteristics List */}
            <div className="mt-4 rounded-2xl border-2 border-border bg-white p-4 shadow-[4px_4px_0px_#1E293B]">
              <h4 className="font-heading text-xs font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-secondary" />
                <span>Karakteristik & Ciri Bangun Ruang</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-foreground">
                {activeGeometry.characteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent font-black select-none">●</span>
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variables Legend */}
            <div className="mt-4 pt-3 border-t-2 border-border">
              <h4 className="font-heading text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
                Keterangan Variabel
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(activeGeometry.variables).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center gap-1.5 rounded-lg border-2 border-border bg-white px-2.5 py-1 shadow-[2px_2px_0px_#1E293B]"
                  >
                    <span className="font-mono font-bold text-accent">{key}</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="font-semibold text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Marker Catalog Modal within Scanner */}
      <MarkerModal
        open={isMarkerModalOpen}
        onOpenChange={setIsMarkerModalOpen}
      />
    </div>
  );
}
