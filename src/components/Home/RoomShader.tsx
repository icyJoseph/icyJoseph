"use client";

/// <reference types="@webgpu/types" />

import { useEffect, useRef, useState } from "react";

import { flareTokens, roomTokens } from "lib/design/tokens";
import roomBeamSource from "shaders/room-beam.wgsl";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const room = hexToRgb(roomTokens[0].hex);
const shade = hexToRgb(roomTokens[1].hex);
const mid = hexToRgb(roomTokens[2].hex);
const flareDry = hexToRgb(flareTokens[0].hex);
const flareWet = hexToRgb(flareTokens[1].hex);
const flareHot = hexToRgb(flareTokens[2].hex);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function RoomShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      typeof navigator === "undefined" ||
      !("gpu" in navigator) ||
      !(navigator as Navigator & { gpu?: unknown }).gpu
    ) {
      setFallback(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      setFallback(true);
      return;
    }

    let disposed = false;
    let stopLoop: (() => void) | undefined;
    let disposeGpu: (() => void) | undefined;
    let onVisibility: (() => void) | undefined;
    let onPointer: ((e: PointerEvent) => void) | undefined;

    const pointer = { x: 0.72, y: 0.18 };

    (async () => {
      try {
        const { init, effect, surface, clock, frameLoop } = await import("vgpu");

        if (disposed) return;

        const gpu = await init();
        if (disposed) {
          gpu.dispose();
          return;
        }
        disposeGpu = () => gpu.dispose();

        const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] });
        const beam = effect(gpu, roomBeamSource, {
          set: {
            params: {
              time: 0,
              pointer: [pointer.x, pointer.y],
              room,
              shade,
              mid,
              flare_dry: flareDry,
              flare_wet: flareWet,
              flare_hot: flareHot,
            },
          },
        });

        const time = clock(gpu);

        const paint = (frame: { pass: (s: unknown, e: unknown) => void }) => {
          beam.set({
            params: {
              time: time.time,
              pointer: [pointer.x, pointer.y],
            },
          });
          frame.pass(canvasSurface, beam);
        };

        let handle = frameLoop(gpu, paint, { fps: 30 });

        stopLoop = () => {
          handle.stop();
        };

        onVisibility = () => {
          if (document.hidden) {
            handle.stop();
          } else if (!disposed) {
            handle = frameLoop(gpu, paint, { fps: 30 });
            stopLoop = () => {
              handle.stop();
            };
          }
        };

        onPointer = (e: PointerEvent) => {
          pointer.x = e.clientX / window.innerWidth;
          pointer.y = e.clientY / window.innerHeight;
        };

        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("pointermove", onPointer, { passive: true });
      } catch {
        if (!disposed) setFallback(true);
      }
    })();

    return () => {
      disposed = true;
      stopLoop?.();
      if (onVisibility) {
        document.removeEventListener("visibilitychange", onVisibility);
      }
      if (onPointer) {
        window.removeEventListener("pointermove", onPointer);
      }
      disposeGpu?.();
    };
  }, []);

  return (
    <div
      className={
        fallback ? "home-room home-room--fallback" : "home-room"
      }
      aria-hidden
    >
      {!fallback ? (
        <canvas ref={canvasRef} className="home-room__canvas" />
      ) : null}
    </div>
  );
}
