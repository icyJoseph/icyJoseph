// Two-ink room: emerald shade field, fluorescent red only in the window beam.
// Light drifts on a slow Lissajous path (sun / cloud), not the cursor.
struct Params {
  time: f32,
  origin: vec2f,
  ang0: f32,
  intensity: f32,
  mode: f32,
  room: vec3f,
  shade: vec3f,
  mid: vec3f,
  flare_dry: vec3f,
  flare_wet: vec3f,
  flare_hot: vec3f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn saturate(x: f32) -> f32 {
  return clamp(x, 0.0, 1.0);
}

/** 3:2 Lissajous in the window pocket — slow, closed, sun-like. */
fn light_drift(t: f32, phase: f32) -> vec2f {
  // Frequencies in a small-integer ratio; period ~ 2π / gcd-ish ≈ a long loop.
  let wx = 0.11;
  let wy = wx * (2.0 / 3.0);
  let ax = 0.10;
  let ay = 0.065;
  // Soft second harmonic so the path doesn’t look mechanical.
  let x = 0.78 + ax * sin(t * wx + phase) + 0.022 * sin(t * wx * 0.5 + phase * 1.3);
  let y = 0.20 + ay * sin(t * wy + phase + 0.85) + 0.018 * sin(t * wy * 0.5 + 1.1);
  return vec2f(x, y);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  // Poster space: origin bottom-left, y up.
  let p = vec2f(uv.x, 1.0 - uv.y);

  let breathe = 0.014 * sin(params.time * 0.38);
  let sway = 0.01 * sin(params.time * 0.22 + params.ang0);

  let drift = light_drift(params.time, params.ang0 * 0.35);
  let ptr = (drift - vec2f(0.5, 0.35)) * 0.14;
  var window_c = params.origin + vec2f(ptr.x + sway, ptr.y + breathe);

  // Mode 1 overhead: pull toward top-center and widen.
  // Mode 2 desk bounce: drop the hot spot and soften the wedge.
  if (params.mode > 1.5) {
    window_c = mix(window_c, vec2f(window_c.x, 0.42 + 0.08 * sin(params.time * 0.35)), 0.55);
  } else if (params.mode > 0.5) {
    window_c = mix(window_c, vec2f(0.5, 1.08), 0.35);
  }

  let diagonal = (p.x - 0.28) * 0.85 + (p.y - 0.15) * 1.15;
  let light_side = smoothstep(0.02, 0.22, diagonal);

  let to_window = p - window_c;
  let dist_scale = select(0.95, 0.72, params.mode > 0.5);
  let dist = length(to_window * vec2f(0.85, 1.05));
  let near_window = saturate(1.0 - dist * dist_scale);

  let ang = atan2(-to_window.y, -to_window.x);
  let wedge_w = select(0.4, 0.7, params.mode > 0.5);
  let wedge = smoothstep(wedge_w, 0.12, abs(ang - params.ang0));
  var beam = near_window * (0.3 + 0.7 * wedge) * params.intensity;
  if (params.mode < 0.5) {
    beam *= light_side;
  }

  let floor_mix = smoothstep(0.0, 0.7, p.y);
  var color = mix(params.room, params.shade, floor_mix);
  color = mix(color, params.mid * 0.55, (1.0 - p.x) * 0.12 * (1.0 - beam));

  // Desk bounce: lift a soft floor wash under the beam.
  if (params.mode > 1.5) {
    let floor_glow = saturate(1.0 - length((p - vec2f(window_c.x, 0.12)) * vec2f(1.6, 3.2)));
    color = mix(color, params.flare_dry, floor_glow * 0.22 * params.intensity);
  }

  let wash = beam * 0.9;
  let wet = beam * beam * 1.1;
  let hot = pow(near_window * wedge, 2.2) * select(light_side, 1.0, params.mode > 0.5);

  color = mix(color, params.flare_dry, saturate(wash) * 0.75);
  color = mix(color, params.flare_wet, saturate(wet) * 0.9);
  color = mix(color, params.flare_hot, saturate(hot) * 0.95);

  // Readable dark pocket for brand type on full OG / home (lower-left).
  let type_well = smoothstep(0.55, 0.15, length((p - vec2f(0.22, 0.28)) * vec2f(1.4, 1.1)));
  color = mix(color, params.room, type_well * 0.35);

  let n = fract(sin(dot(p * 900.0 + params.time * 0.02, vec2f(12.9898, 78.233))) * 43758.5453);
  color += (n - 0.5) * 0.014;

  return vec4f(color, 1.0);
}
