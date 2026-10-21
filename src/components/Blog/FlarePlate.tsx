"use client";

/// <reference types="@webgpu/types" />

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  hasWebGpu,
  prefersReducedMotion,
  roomBeamColors,
} from "lib/gpu/room-colors";
import {
  beamParamsFromSeed,
  flareCropPosition,
  type FlareSeed,
} from "lib/og/seed";
import roomBeamSource from "shaders/room-beam.wgsl";

type FlarePlateProps = {
  seed: FlareSeed;
  /** Static OG fallback (and reduced-motion / no-GPU). */
  fallbackSrc: string;
  className?: string;
  imageClassName?: string;
  canvasClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Seeded room beam on a canvas when WebGPU is available; OG still otherwise.
 * Animation only while the plate is on screen.
 */
export function FlarePlate({
  seed,
  fallbackSrc,
  className = "blog-card__plate",
  imageClassName = "blog-card__image",
  canvasClassName = "blog-card__canvas",
  sizes = "(max-width: 672px) 100vw, 640px",
  priority = false,
}: FlarePlateProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const crop = flareCropPosition(seed);
  const seedKey = `${seed.side}-${seed.mode}-${seed.beamX.toFixed(2)}-${seed.beamY.toFixed(2)}-${seed.wash.toFixed(3)}`;

  useEffect(() => {
    if (prefersReducedMotion() || !hasWebGpu()) return;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const beam = beamParamsFromSeed(seed);
    let disposed = false;
    let visible = false;
    let stopLoop: (() => void) | undefined;
    let disposeGpu: (() => void) | undefined;
    let onVisibility: (() => void) | undefined;
    let running = false;

    const stop = () => {
      stopLoop?.();
      stopLoop = undefined;
      running = false;
    };

    const start = async () => {
      if (disposed || running || !visible) return;
      running = true;

      try {
        const { init, effect, surface, clock, frameLoop } = await import("vgpu");
        type Frame = Parameters<Parameters<typeof frameLoop>[1]>[0];
        if (disposed || !visible) {
          running = false;
          return;
        }

        const gpu = await init();
        if (disposed || !visible) {
          gpu.dispose();
          running = false;
          return;
        }
        disposeGpu = () => gpu.dispose();

        const canvasSurface = surface(gpu, canvas, { dpr: [1, 1.5] });
        const fx = effect(gpu, roomBeamSource, {
          set: {
            params: {
              time: 0,
              origin: beam.origin,
              ang0: beam.ang0,
              intensity: beam.intensity,
              mode: beam.mode,
              ...roomBeamColors,
            },
          },
        });

        const time = clock(gpu);

        const paint = (frame: Frame) => {
          fx.set({
            params: {
              time: time.time,
            },
          });
          frame.pass(canvasSurface, fx);
        };

        let handle = frameLoop(gpu, paint, { fps: 24 });
        stopLoop = () => handle.stop();
        setLive(true);

        onVisibility = () => {
          if (document.hidden) {
            handle.stop();
          } else if (!disposed && visible) {
            handle = frameLoop(gpu, paint, { fps: 24 });
            stopLoop = () => handle.stop();
          }
        };
        document.addEventListener("visibilitychange", onVisibility);
      } catch {
        stop();
        disposeGpu?.();
        disposeGpu = undefined;
        running = false;
        if (!disposed) setLive(false);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        if (visible) {
          void start();
        } else {
          stop();
          disposeGpu?.();
          disposeGpu = undefined;
          if (onVisibility) {
            document.removeEventListener("visibilitychange", onVisibility);
            onVisibility = undefined;
          }
          running = false;
          setLive(false);
        }
      },
      { rootMargin: "80px", threshold: 0.05 },
    );

    io.observe(root);

    return () => {
      disposed = true;
      io.disconnect();
      stop();
      if (onVisibility) {
        document.removeEventListener("visibilitychange", onVisibility);
      }
      disposeGpu?.();
    };
    // seedKey captures the seeded identity; seed object itself is recreated each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seedKey
  }, [seedKey]);

  return (
    <div ref={rootRef} className={className} aria-hidden>
      <Image
        src={fallbackSrc}
        alt=""
        width={960}
        height={540}
        className={
          live ? `${imageClassName} ${imageClassName}--under` : imageClassName
        }
        style={{ objectPosition: crop, transformOrigin: crop }}
        sizes={sizes}
        unoptimized
        priority={priority}
      />
      <canvas
        ref={canvasRef}
        className={
          live ? `${canvasClassName} ${canvasClassName}--live` : canvasClassName
        }
      />
    </div>
  );
}
