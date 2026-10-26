/** Stable 32-bit hash for seeding OG composition from post identity. */
export function hashSeed(...parts: string[]): number {
  const input = parts.join("\0");
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Independent 0–1 channels from one seed (avoids correlated adjacent bytes). */
function channels(h: number): number[] {
  const out: number[] = [];
  let x = (h >>> 0) || 1;
  for (let i = 0; i < 8; i++) {
    x ^= (x << 13) >>> 0;
    x ^= x >>> 17;
    x ^= (x << 5) >>> 0;
    x >>>= 0;
    out.push(x / 0xffffffff);
  }
  return out;
}

export type FlareSeed = {
  /** Window / beam side. */
  side: "left" | "right";
  /** Beam origin X as % (mirrors by side). */
  beamX: number;
  /** Beam origin Y as % (0–55). */
  beamY: number;
  /** Diagonal wash angle (degrees). */
  angle: number;
  /** Hot spot size as % (32–78). */
  hotSize: number;
  /** Beam opacity scale 0.1–0.32. */
  wash: number;
  /** Floor bounce 0–1. */
  floor: number;
  /** Cool leaf rim vs dry flare rim (0–1). */
  cool: number;
  /** Composition: 0 window, 1 overhead, 2 desk bounce. */
  mode: 0 | 1 | 2;
};

export function flareSeedFrom(slug: string, title: string): FlareSeed {
  const [a, b, c, d, e, f, g, i] = channels(hashSeed(slug, title));
  const side: "left" | "right" = a < 0.5 ? "right" : "left";
  const mode = (Math.floor(b * 3) % 3) as 0 | 1 | 2;

  let beamX: number;
  let beamY: number;
  let hotSize: number;

  if (mode === 1) {
    // Overhead pool — more centered, larger
    beamX = 35 + c * 30;
    beamY = -8 + d * 18;
    hotSize = 55 + e * 30;
  } else if (mode === 2) {
    // Desk bounce — lower, tighter
    beamX = side === "right" ? 58 + c * 32 : 10 + c * 32;
    beamY = 28 + d * 28;
    hotSize = 32 + e * 28;
  } else {
    // Window beam
    beamX = side === "right" ? 68 + c * 28 : 4 + c * 28;
    beamY = -5 + d * 32;
    hotSize = 38 + e * 35;
  }

  return {
    side,
    beamX,
    beamY,
    angle: side === "right" ? 125 + f * 55 : 200 + f * 55,
    hotSize,
    wash: 0.12 + g * 0.2,
    floor: 0.15 + i * 0.55,
    cool: (a + c) % 1,
    mode,
  };
}

/** CSS object-position for card/entry crops — follow the seeded hot spot. */
export function flareCropPosition(seed: FlareSeed): string {
  const y = Math.max(8, Math.min(seed.beamY + 12, 48));
  return `${seed.beamX.toFixed(1)}% ${y.toFixed(1)}%`;
}

/** Uniforms for room-beam.wgsl (poster space, y up). */
export type BeamShaderParams = {
  origin: [number, number];
  ang0: number;
  intensity: number;
  mode: number;
};

export function beamParamsFromSeed(seed: FlareSeed): BeamShaderParams {
  const x = seed.beamX / 100;
  // CSS % is from top; poster y is up.
  const y = 1 - Math.max(-0.05, Math.min(seed.beamY / 100, 0.55));

  // Push slightly past the frame like the original window corner.
  const origin: [number, number] =
    seed.side === "right"
      ? [0.92 + x * 0.18, Math.min(1.12, y + 0.15)]
      : [x * 0.35 - 0.08, Math.min(1.12, y + 0.15)];

  const ang0 =
    seed.mode === 1
      ? 1.2 + seed.cool * 0.4
      : seed.side === "right"
        ? 0.55 + seed.cool * 0.45
        : 2.35 + seed.cool * 0.4;

  return {
    origin,
    ang0,
    intensity: 0.75 + seed.wash * 1.1,
    mode: seed.mode,
  };
}
