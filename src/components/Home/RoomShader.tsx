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

        document.addEventListener("visibilitychange", onVisibility);

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
