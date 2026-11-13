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
  ChevronUp,
  X,
  Scan,
  RefreshCw,
  CheckCircle2,
  Move,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
    }, 600);
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
      color: 0x3b82f6,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.2,
      transparent: true,
      opacity: 0.92,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });

    let geometry: THREE.BufferGeometry;

    switch (geomId) {
      case "cube":
        geometry = new THREE.BoxGeometry(2, 2, 2);
        mainMaterial.color.setHex(0x3b82f6);
        break;
      case "cuboid":
        geometry = new THREE.BoxGeometry(2.8, 1.6, 1.8);
        mainMaterial.color.setHex(0x06b6d4);
        break;
      case "prism":
        geometry = new THREE.CylinderGeometry(1.6, 1.6, 2.4, 3);
        mainMaterial.color.setHex(0x10b981);
        break;
      case "pyramid":
        geometry = new THREE.ConeGeometry(1.8, 2.4, 4);
        mainMaterial.color.setHex(0xf59e0b);
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
        mainMaterial.color.setHex(0x8b5cf6);
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(1.5, 2.6, 32);
        mainMaterial.color.setHex(0xf43f5e);
        break;
      case "sphere":
        geometry = new THREE.SphereGeometry(1.4, 32, 24);
        mainMaterial.color.setHex(0x4f46e5);
        break;
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2);
    }

    const mesh = new THREE.Mesh(geometry, mainMaterial);
    group.add(mesh);

    // Glowing edges
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1);
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

    // A. Mouse Pointer Drag (Desktop)
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // Touch events handled by onTouchStart
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

    // B. Mouse Wheel Zoom (Desktop)
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

    // C. Touch Drag (1-finger rotate) & Pinch (2-finger zoom) on Mobile
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
    <div className="relative h-screen w-full overflow-hidden bg-black text-white select-none">
      {/* 1. Live Background Video Stream */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Subtle overlay shading for HUD readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none z-10" />

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

      {/* 3. Scanning Reticle (Center Viewfinder) */}
      <div className="absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none">
        <div
          className={cn(
            "relative size-56 rounded-3xl flex flex-col items-center justify-center transition-all duration-300",
            isMarkerDetected
              ? "border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
              : "border-2 border-dashed border-white/40"
          )}
        >
          {/* Animated Scanning Laser Line (only when searching) */}
          {status !== "error" && !isMarkerDetected && (
            <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-pulse top-1/2 -translate-y-1/2" />
          )}

          {/* Corner Markers */}
          <div
            className={cn(
              "absolute -top-1.5 -left-1.5 size-5 border-t-3 border-l-3 rounded-tl-xl transition-colors",
              isMarkerDetected ? "border-emerald-400" : "border-cyan-400"
            )}
          />
          <div
            className={cn(
              "absolute -top-1.5 -right-1.5 size-5 border-t-3 border-r-3 rounded-tr-xl transition-colors",
              isMarkerDetected ? "border-emerald-400" : "border-cyan-400"
            )}
          />
          <div
            className={cn(
              "absolute -bottom-1.5 -left-1.5 size-5 border-b-3 border-l-3 rounded-bl-xl transition-colors",
              isMarkerDetected ? "border-emerald-400" : "border-cyan-400"
            )}
          />
          <div
            className={cn(
              "absolute -bottom-1.5 -right-1.5 size-5 border-b-3 border-r-3 rounded-br-xl transition-colors",
              isMarkerDetected ? "border-emerald-400" : "border-cyan-400"
            )}
          />

          {/* Center Scan CTA Button (When marker is not yet detected) */}
          {!isMarkerDetected && status !== "error" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <button
                type="button"
                onClick={handleScanMarker}
                disabled={isScanning}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 font-bold px-4 py-2 text-xs shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="size-3.5 animate-spin" />
                    <span>Mendeteksi...</span>
                  </>
                ) : (
                  <>
                    <Scan className="size-3.5" />
                    <span>Pindai Marker</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Instruction label under reticle */}
          <div className="absolute -bottom-14 text-center px-2 w-full">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur-md border shadow-xs transition-colors",
                isMarkerDetected
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                  : "bg-black/70 text-slate-200 border-white/10"
              )}
            >
              {isMarkerDetected ? (
                <>
                  <CheckCircle2 className="size-3 text-emerald-400" />
                  <span>{activeGeometry.name} Terdeteksi</span>
                </>
              ) : isScanning ? (
                <>
                  <RefreshCw className="size-3 animate-spin text-cyan-400" />
                  <span>Menganalisis pola marker...</span>
                </>
              ) : (
                <span>Arahkan ke kartu marker lalu klik Pindai</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Top Floating Header HUD */}
      <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3">
        <Link
          href="/"
          onClick={stopCamera}
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/70 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
          )}
        >
          <ArrowLeft className="size-4" />
          <span>Beranda</span>
        </Link>

        {/* Marker Switcher & Quick Help */}
        <div className="flex items-center gap-2">
          {/* Target Selector */}
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
              className="appearance-none rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 pr-8 text-xs font-semibold text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
            >
              {GEOMETRIES.map((g) => (
                <option key={g.id} value={g.id} className="bg-slate-900 text-white">
                  {g.name} (#{g.targetIndex})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-cyan-400">
              <ChevronUp className="size-3 rotate-180" />
            </div>
          </div>

          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => setIsMarkerModalOpen(true)}
            className="rounded-full bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/70"
            title="Lihat Marker"
          >
            <HelpCircle className="size-4 text-cyan-400" />
          </Button>
        </div>
      </header>

      {/* Gesture Hint Badge (Appears when marker is detected) */}
      {isMarkerDetected && (
        <div className="absolute top-14 inset-x-0 z-25 flex justify-center pointer-events-none animate-in fade-in duration-300">
          <div className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] text-slate-300">
            <Move className="size-3 text-cyan-400" />
            <span>Geser untuk memutar • Cubit/scroll untuk zoom</span>
          </div>
        </div>
      )}

      {/* 5. Error Overlay (if camera fails or denied) */}
      {status === "error" && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border border-rose-500/30 bg-slate-900/90 p-6 text-center shadow-2xl">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 mb-4">
              <CameraOff className="size-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {errorMessage || "Tidak Dapat Mengakses Kamera"}
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              {errorHelpTip || "Pastikan peramban Anda memiliki izin akses ke kamera perangkat."}
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <Button
                onClick={handleRetryCamera}
                className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold"
              >
                Coba Buka Kamera Lagi
              </Button>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-xl border-white/20 text-white hover:bg-white/10 flex items-center justify-center text-sm"
                )}
              >
                Kembali ke Halaman Beranda
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bottom Floating Action Bar HUD */}
      <footer className="absolute bottom-4 inset-x-0 z-30 flex flex-col items-center gap-2 px-2">
        {isMarkerDetected ? (
          /* Controls Active when Marker is Detected */
          <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 p-1 shadow-xl">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleAutoRotate}
                className={`rounded-full h-7 px-2.5 text-[11px] gap-1 ${
                  isAutoRotate ? "bg-cyan-500/20 text-cyan-300" : "text-white/80"
                }`}
                title="Toggle Putar Otomatis"
              >
                <RotateCw className={`size-3 ${isAutoRotate ? "animate-spin" : ""}`} />
                <span>Rotasi</span>
              </Button>

              <div className="h-3.5 w-px bg-white/20" />

              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => handleZoom(0.2)}
                className="rounded-full text-white/80 hover:text-white"
                title="Perbesar Model"
              >
                <ZoomIn className="size-3" />
              </Button>

              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => handleZoom(-0.2)}
                className="rounded-full text-white/80 hover:text-white"
                title="Perkecil Model"
              >
                <ZoomOut className="size-3" />
              </Button>

              <Button
                size="icon-xs"
                variant="ghost"
                onClick={handleReset}
                className="rounded-full text-white/80 hover:text-white"
                title="Reset Ukuran & Posisi"
              >
                <RotateCcw className="size-3" />
              </Button>

              <div className="h-3.5 w-px bg-white/20" />

              {/* Formula Details Toggle */}
              <Button
                size="sm"
                onClick={() => setIsFormulaDrawerOpen(true)}
                className="rounded-full h-7 px-2.5 text-[11px] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold gap-1"
              >
                <BookOpen className="size-3" />
                <span>Rumus</span>
              </Button>
            </div>

            {/* Quick Button to Reset / Scan Other Marker */}
            <button
              type="button"
              onClick={handleResetScan}
              className="flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="size-2.5" />
              <span>Lepas / Pindai Marker Lain</span>
            </button>
          </div>
        ) : (
          /* Helper hint when marker is not yet detected */
          <button
            type="button"
            onClick={() => setIsMarkerModalOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs text-slate-200 hover:bg-black/80 transition-colors shadow-lg cursor-pointer"
          >
            <HelpCircle className="size-3.5 text-cyan-400" />
            <span>Belum punya kartu? Buka Katalog Marker</span>
          </button>
        )}
      </footer>

      {/* 7. Bottom Drawer / Sheet for Formula & Characteristics */}
      {isFormulaDrawerOpen && (
        <div className="absolute inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-3xl border-t border-border bg-slate-900/95 p-5 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="mx-auto max-w-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {activeGeometry.name}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Target Marker #{activeGeometry.targetIndex}
                  </p>
                </div>
              </div>

              <Button
                size="icon-xs"
                variant="ghost"
                onClick={() => setIsFormulaDrawerOpen(false)}
                className="rounded-full text-slate-400 hover:text-white"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Formula Cards */}
            <div className="mt-3 flex flex-col gap-2.5">
              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/40 p-3">
                <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                  Rumus Volume
                </span>
                <p className="mt-0.5 text-lg font-mono font-bold text-white">
                  {activeGeometry.formulaVolume.formula}
                </p>
                <p className="mt-0.5 text-[11px] text-indigo-200/80 leading-relaxed">
                  {activeGeometry.formulaVolume.description}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/40 p-3">
                <span className="text-[10px] font-semibold text-cyan-300 uppercase tracking-wider">
                  Rumus Luas Permukaan
                </span>
                <p className="mt-0.5 text-lg font-mono font-bold text-white">
                  {activeGeometry.formulaSurface.formula}
                </p>
                <p className="mt-0.5 text-[11px] text-cyan-200/80 leading-relaxed">
                  {activeGeometry.formulaSurface.description}
                </p>
              </div>
            </div>

            {/* Characteristics */}
            <div className="mt-3">
              <h4 className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Karakteristik & Ciri Bangun Ruang
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {activeGeometry.characteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Variables Legend */}
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Keterangan Variabel
              </h4>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {Object.entries(activeGeometry.variables).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-1">
                    <span className="font-mono font-bold text-indigo-400">{key}</span>
                    <span className="text-slate-400">=</span>
                    <span className="text-slate-200">{val}</span>
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
