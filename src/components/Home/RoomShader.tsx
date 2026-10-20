"use client";

/// <reference types="@webgpu/types" />

import { useEffect, useRef, useState } from "react";

import {
  hasWebGpu,
  prefersReducedMotion,
  roomBeamColors,
} from "lib/gpu/room-colors";
import roomBeamSource from "shaders/room-beam.wgsl";

export function RoomShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasWebGpu()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let stopLoop: (() => void) | undefined;
    let disposeGpu: (() => void) | undefined;
    let onVisibility: (() => void) | undefined;
    let onPointer: ((e: PointerEvent) => void) | undefined;

    const pointer = { x: 0.72, y: 0.18 };

    (async () => {
      try {
        const { init, effect, surface, clock, frameLoop } = await import("vgpu");
        type Frame = Parameters<Parameters<typeof frameLoop>[1]>[0];

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
              origin: [1.02, 1.05],
              ang0: 0.75,
              intensity: 1,
              mode: 0,
              ...roomBeamColors,
            },
          },
        });

        const time = clock(gpu);

        const paint = (frame: Frame) => {
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

        if (!disposed) setLive(true);
      } catch {
        // Stay on CSS fallback.
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
      className={live ? "home-room" : "home-room home-room--fallback"}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="home-room__canvas"
        style={live ? undefined : { opacity: 0 }}
      />
    </div>
  );
}
