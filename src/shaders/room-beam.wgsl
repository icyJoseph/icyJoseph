// Two-ink room: emerald shade field, fluorescent red only in the window beam.
struct Params {
  time: f32,
  pointer: vec2f,
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

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  // Poster space: origin bottom-left, y up.
  let p = vec2f(uv.x, 1.0 - uv.y);

  // Soft pointer + slow breathe on the window corner.
  let breathe = 0.015 * sin(params.time * 0.4);
  let ptr = (params.pointer - vec2f(0.75, 0.2)) * 0.1;
  let window_c = vec2f(1.02 + ptr.x, 1.05 + ptr.y + breathe);

  // Hard diagonal cut — print-like two-ink split across the room.
  let diagonal = (p.x - 0.28) * 0.85 + (p.y - 0.15) * 1.15;
  let light_side = smoothstep(0.02, 0.22, diagonal);

  // Distance falloff from the window corner (beam intensity).
  let to_window = p - window_c;
  let dist = length(to_window * vec2f(0.85, 1.05));
  let near_window = saturate(1.0 - dist * 0.95);

  // Beam wedge from the upper-right.
  let ang = atan2(-to_window.y, -to_window.x);
  let wedge = smoothstep(0.55, 0.15, abs(ang - 0.75));
  let beam = light_side * near_window * (0.35 + 0.65 * wedge);

  // Room ground — cooler emerald where the beam does not hit.
  let floor_mix = smoothstep(0.0, 0.7, p.y);
  var color = mix(params.room, params.shade, floor_mix);
  color = mix(color, params.mid * 0.55, (1.0 - p.x) * 0.12 * (1.0 - beam));

  // Marker coats: dry wash → wet neon → hot hit near the glass.
  let wash = beam * 0.9;
  let wet = beam * beam * 1.1;
  let hot = pow(near_window * wedge, 2.2) * light_side;

  color = mix(color, params.flare_dry, saturate(wash) * 0.75);
  color = mix(color, params.flare_wet, saturate(wet) * 0.9);
  color = mix(color, params.flare_hot, saturate(hot) * 0.95);

  // Keep a readable dark pocket for brand type (lower-left).
  let type_well = smoothstep(0.55, 0.15, length((p - vec2f(0.22, 0.28)) * vec2f(1.4, 1.1)));
  color = mix(color, params.room, type_well * 0.45);

  let n = fract(sin(dot(p * 900.0 + params.time * 0.02, vec2f(12.9898, 78.233))) * 43758.5453);
  color += (n - 0.5) * 0.014;

  return vec4f(color, 1.0);
}
