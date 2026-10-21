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

function tokenTable(
  tokens: ReadonlyArray<{ name: string; css: string; hex: string; role: string }>,
): string {
  return table(
    ["Token", "CSS", "Hex", "Use"],
    tokens.map((t) => [t.name, `\`--${t.css}\``, `\`${t.hex}\``, t.role]),
  );
}

/** Markdown design system for humans and agents. Served at /design.md */
export function generateDesignSpecMarkdown(): string {
  const cssVars = [...roomTokens, ...flareTokens, ...paperTokens]
    .map((t) => `  --${t.css}: ${t.hex.toLowerCase()};`)
    .join("\n");

  return `# icyJoseph design system

_Señor Developer · sunset window · flare + emerald_

Visual reference: [/design](/design)

---

## Vibe

Late afternoon. A dev still sitting at the desk, laptop open, not really in the source code anymore. Orange-red light from the window cuts across the keyboard, the rest of the room sits in the shade.

🤖 Fluorescent where attention lands, dark emerald where it does not. Not everything is equally important anymore. Less startup neon, more end-of-day coding. The old developer era is closing, and the room is getting quieter. People prompt and ship. The code is not what anyone looks at anymore.

Keywords: late light, window beam, marker layers, quiet room.

---

## Color

Two families.

- **Room** — emerald shadow. The parts of the UI that never catch the beam.
- **Flare** — Ohuhu FY02 fluorescent red. Wet for glow on screen (\`#F97979\`), dry after a second coat (\`#C46E6D\`).

### Room

${tokenTable(roomTokens)}

### Flare

${tokenTable(flareTokens)}

### Paper

${tokenTable(paperTokens)}

### CSS variables

\`\`\`css
:root {
${cssVars}
}
\`\`\`

---

## Layers

Treat flare like alcohol marker ink. Same pigment, multiple coats:

1. **Wash** — thin dry red over shade (\`#C46E6D\` ~35% opacity).
2. **Dry + pass** — first coat settled, second pass offset (dry + wet mix).
3. **Wet neon** — top bloom with \`#F97979\` / \`#FF6B7C\` and soft glow.

Background atmosphere should be soft radial spills — no hard borders or clip-path seams.

---

## Type

- Font: **Recursive** (site-wide).
- Brand / display in light: paper warm, optional flare glow.
- Subhead / accent titles: wet flare (\`#F97979\`) with neon bloom.
- Body: paper cool on room.
- Meta / dates / asides: leaf.

Credit to [Benji on Paper](https://www.benjionpaper.com/), for inspiring this kind of theme.

---

## Controls

| Control | Treatment |
| --- | --- |
| Primary button | Hit fill (\`#FF6B7C\` → \`#F97979\`), dark text, soft neon shadow |
| Secondary | Shade fill, emerald mid border, paper cool text |
| Ghost | Transparent, wet flare text |
| Disabled | 40% opacity, no glow |
| Inline link | Wet flare underline; glow on hover |
| Quiet link | Leaf; glow on hover |
| Fields | Shade background, emerald mid border; focus ring wet flare |
| Checkbox | Accent wet flare |

---

## Code (Bright)

Theme name: \`flare-emerald\`. Background shade. Keywords and tags wet flare. Functions hit. Strings glow. Comments leaf. Types paper warm.

| Scope | Hex |
| --- | --- |
| editor.background | \`#0a1612\` |
| editor.foreground / variables | \`#9bb5a8\` |
| comment | \`#5f8f7a\` |
| keyword / tag | \`#F97979\` |
| function | \`#FF6B7C\` |
| string / attribute | \`#FF9AA8\` |
| constant / number | \`#C46E6D\` |
| type / class | \`#E8DCCF\` |

Source: \`src/design-system/flare-theme.ts\`

---

## Icons

Phosphor via \`design-system/Icons\`. Robot (duotone, wet flare) marks design-system framing lines.

---

## Do / don't

**Do**

- Keep the room dark; warmth is a spotlight, not a wash.
- Layer flare like marker coats.
- Use leaf for quiet UI chrome.

**Don't**

- Hard vertical window-frame lines (they bleed).
- Default purple/indigo AI gradients.
- Cool blue shadows. Emerald only.
- Stock Bright themes once this system is active.

---

_Text for implementers. Visual: \`/design\`._
`;
}
