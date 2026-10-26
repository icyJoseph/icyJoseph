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
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasWebGpu()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let stopLoop: (() => void) | undefined;
    let disposeGpu: (() => void) | undefined;
    let onVisibility: (() => void) | undefined;
    let revealFrame = 0;

    (async () => {
      try {
        // Probe adapter *before* downloading vgpu — LH/headless often has
        // `navigator.gpu` but no adapter; importing anyway wastes ~50kb.
        const adapter = await navigator.gpu?.requestAdapter();
        if (!adapter || disposed) return;

        const { init, effect, surface, clock, frameLoop } = await import(
          /* webpackPrefetch: false */ "vgpu"
        );
        type Frame = Parameters<Parameters<typeof frameLoop>[1]>[0];

        if (disposed) return;

        const gpu = await init();
        if (disposed) {
          gpu.dispose();
          return;
        }
        disposeGpu = () => gpu.dispose();

        const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] });
        // Start dark — intensity ramps so the beam reads as light coming on,
        // not a hard cut from the CSS underpaint.
        const beam = effect(gpu, roomBeamSource, {
          set: {
            params: {
              time: 0,
              origin: [1.02, 1.05],
              ang0: 0.75,
              intensity: 0,
              mode: 0,
              ...roomBeamColors,
            },
          },
        });

        const time = clock(gpu);
        const startedAt = performance.now();
        const warmMs = 1400;

        const paint = (frame: Frame) => {
          const t = Math.min(1, (performance.now() - startedAt) / warmMs);
          // Ease-out: quick enough to feel present, soft at the end.
          const intensity = 1 - (1 - t) ** 2.4;
          beam.set({
            params: {
              time: time.time,
              intensity,
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

        if (!disposed) {
          setLive(true);
          // Paint one frame under opacity:0, then fade the canvas in.
          revealFrame = requestAnimationFrame(() => {
            if (!disposed) setOn(true);
          });
        }
      } catch {
        // Stay on CSS fallback.
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(revealFrame);
      stopLoop?.();
      if (onVisibility) {
        document.removeEventListener("visibilitychange", onVisibility);
      }
      disposeGpu?.();
    };
  }, []);

  return (
    <div className="home-room home-room--fallback" aria-hidden>
      <canvas
        ref={canvasRef}
        className={
          live && on
            ? "home-room__canvas home-room__canvas--on"
            : "home-room__canvas"
        }
      />
    </div>
  );
}
