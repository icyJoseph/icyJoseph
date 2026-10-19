import { flareTokens, paperTokens, roomTokens } from "./tokens";

function table(
  headers: string[],
  rows: ReadonlyArray<readonly string[]>,
): string {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [head, sep, body].join("\n");
}

/** Markdown design system for humans and agents. Served at /design.md */
export function generateDesignSpecMarkdown(): string {
  const lines: string[] = [];

  lines.push("# icyJoseph design system");
  lines.push("");
  lines.push("_Señor Developer · sunset window · flare + emerald_");
  lines.push("");
  lines.push("Visual reference: [/design](/design)");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Vibe");
  lines.push("");
  lines.push(
    "Late afternoon. A dev still sitting at the desk, laptop open, not really in the source code anymore. Orange-red light from the window cuts across the keyboard, the rest of the room sits in the shade.",
  );
  lines.push("");
  lines.push(
    "🤖 Fluorescent where attention lands, dark emerald where it does not. Not everything is equally important anymore. Less startup neon, more end-of-day coding. The old developer era is closing, and the room is getting quieter. People prompt and ship. The code is not what anyone looks at anymore.",
  );
  lines.push("");
  lines.push("Keywords: late light, window beam, marker layers, quiet room.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Color");
  lines.push("");
  lines.push("Two families.");
  lines.push("");
  lines.push(
    "- **Room** — emerald shadow. The parts of the UI that never catch the beam.",
  );
  lines.push(
    "- **Flare** — Ohuhu FY02 fluorescent red. Wet for glow on screen (`#F97979`), dry after a second coat (`#C46E6D`).",
  );
  lines.push("");
  lines.push("### Room");
  lines.push("");
  lines.push(
    table(
      ["Token", "CSS", "Hex", "Use"],
      roomTokens.map((t) => [
        t.name,
        `\`--${t.css}\``,
        `\`${t.hex}\``,
        t.role,
      ]),
    ),
  );
  lines.push("");
  lines.push("### Flare");
  lines.push("");
  lines.push(
    table(
      ["Token", "CSS", "Hex", "Use"],
      flareTokens.map((t) => [
        t.name,
        `\`--${t.css}\``,
        `\`${t.hex}\``,
        t.role,
      ]),
    ),
  );
  lines.push("");
  lines.push("### Paper");
  lines.push("");
  lines.push(
    table(
      ["Token", "CSS", "Hex", "Use"],
      paperTokens.map((t) => [
        t.name,
        `\`--${t.css}\``,
        `\`${t.hex}\``,
        t.role,
      ]),
    ),
  );
  lines.push("");
  lines.push("### CSS variables");
  lines.push("");
  lines.push("```css");
  lines.push(":root {");
  for (const t of [...roomTokens, ...flareTokens, ...paperTokens]) {
    lines.push(`  --${t.css}: ${t.hex.toLowerCase()};`);
  }
  lines.push("}");
  lines.push("```");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Layers");
  lines.push("");
  lines.push(
    "Treat flare like alcohol marker ink. Same pigment, multiple coats:",
  );
  lines.push("");
  lines.push("1. **Wash** — thin dry red over shade (`#C46E6D` ~35% opacity).");
  lines.push(
    "2. **Dry + pass** — first coat settled, second pass offset (dry + wet mix).",
  );
  lines.push(
    "3. **Wet neon** — top bloom with `#F97979` / `#FF6B7C` and soft glow.",
  );
  lines.push("");
  lines.push(
    "Background atmosphere should be soft radial spills — no hard borders or clip-path seams.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Type");
  lines.push("");
  lines.push("- Font: **Recursive** (site-wide).");
  lines.push("- Brand / display in light: paper warm, optional flare glow.");
  lines.push("- Subhead / accent titles: wet flare (`#F97979`) with neon bloom.");
  lines.push("- Body: paper cool on room.");
  lines.push("- Meta / dates / asides: leaf.");
  lines.push("");
  lines.push(
    "Display line “Late light on the sill” carries the plate: two-ink poster, thick even outlines. The field is the room — #030806, #0a1612, #14352c — with leaf only on the code marks. Flare is layered: window is hit (#FF6B7C) with a glow center (#FF9AA8), the beam is wet (#F97979), the desk and chair seat are dry (#C46E6D), the agent harness is hit with dry cards. Desk against the back wall, window on the right-hand wall, empty chair. Code pane stays in the dark.",
  );
  lines.push("");
  lines.push(
    "Credit to [Benji on Paper](https://www.benjionpaper.com/), for inspiring this kind of theme.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Controls");
  lines.push("");
  lines.push("| Control | Treatment |");
  lines.push("| --- | --- |");
  lines.push(
    "| Primary button | Hit fill (`#FF6B7C` → `#F97979`), dark text, soft neon shadow |",
  );
  lines.push("| Secondary | Shade fill, emerald mid border, paper cool text |");
  lines.push("| Ghost | Transparent, wet flare text |");
  lines.push("| Disabled | 40% opacity, no glow |");
  lines.push("| Inline link | Wet flare underline; glow on hover |");
  lines.push("| Quiet link | Leaf; glow on hover |");
  lines.push(
    "| Fields | Shade background, emerald mid border; focus ring wet flare |",
  );
  lines.push("| Checkbox | Accent wet flare |");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Code (Bright)");
  lines.push("");
  lines.push(
    "Theme name: `flare-emerald`. Background shade. Keywords and tags wet flare. Functions hit. Strings glow. Comments leaf. Types paper warm.",
  );
  lines.push("");
  lines.push("| Scope | Hex |");
  lines.push("| --- | --- |");
  lines.push("| editor.background | `#0a1612` |");
  lines.push("| editor.foreground / variables | `#9bb5a8` |");
  lines.push("| comment | `#5f8f7a` |");
  lines.push("| keyword / tag | `#F97979` |");
  lines.push("| function | `#FF6B7C` |");
  lines.push("| string / attribute | `#FF9AA8` |");
  lines.push("| constant / number | `#C46E6D` |");
  lines.push("| type / class | `#E8DCCF` |");
  lines.push("");
  lines.push("Source: `src/design-system/flare-theme.ts`");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Icons");
  lines.push("");
  lines.push(
    "Phosphor via `design-system/Icons`. Robot (duotone, wet flare) marks design-system framing lines.",
  );
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("## Do / don't");
  lines.push("");
  lines.push("**Do**");
  lines.push("");
  lines.push("- Keep the room dark; warmth is a spotlight, not a wash.");
  lines.push("- Layer flare like marker coats.");
  lines.push("- Use leaf for quiet UI chrome.");
  lines.push("");
  lines.push("**Don't**");
  lines.push("");
  lines.push("- Hard vertical window-frame lines (they bleed).");
  lines.push("- Default purple/indigo AI gradients.");
  lines.push("- Cool blue shadows. Emerald only.");
  lines.push("- Stock Bright themes once this system is active.");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("_Text for implementers. Visual: `/design`._");
  lines.push("");

  return lines.join("\n");
}
