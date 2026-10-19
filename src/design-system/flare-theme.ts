import type { Theme } from "bright";

/**
 * Bright / VS Code theme for the sunset-window system:
 * emerald room + Ohuhu FY02 fluorescent red.
 */
export const flareTheme = {
  name: "flare-emerald",
  type: "dark",
  colors: {
    "editor.background": "#0a1612",
    "editor.foreground": "#9bb5a8",
    "editorLineNumber.foreground": "#14352c",
    "editorLineNumber.activeForeground": "#5f8f7a",
    "editor.selectionBackground": "#14352c99",
    "editor.lineHighlightBackground": "#03080666",
    foreground: "#9bb5a8",
    descriptionForeground: "#5f8f7a",
  },
  tokenColors: [
    {
      name: "Comment",
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#5f8f7a", fontStyle: "italic" },
    },
    {
      name: "String",
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#FF9AA8" },
    },
    {
      name: "Keyword",
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "storage.type",
        "storage.modifier",
      ],
      settings: { foreground: "#F97979" },
    },
    {
      name: "Operator",
      scope: ["keyword.operator", "punctuation"],
      settings: { foreground: "#5f8f7a" },
    },
    {
      name: "Function",
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
      ],
      settings: { foreground: "#FF6B7C" },
    },
    {
      name: "Class / type",
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#E8DCCF" },
    },
    {
      name: "Constant / number",
      scope: [
        "constant",
        "constant.numeric",
        "constant.language",
        "constant.character",
      ],
      settings: { foreground: "#C46E6D" },
    },
    {
      name: "Variable",
      scope: ["variable", "variable.other", "variable.parameter"],
      settings: { foreground: "#9bb5a8" },
    },
    {
      name: "Property",
      scope: [
        "variable.other.property",
        "meta.object-literal.key",
        "support.type.property-name",
      ],
      settings: { foreground: "#B8CFC4" },
    },
    {
      name: "Tag / JSX",
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: { foreground: "#F97979" },
    },
    {
      name: "Attribute",
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#FF9AA8" },
    },
    {
      name: "Invalid",
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: "#FF6B7C" },
    },
  ],
} satisfies Theme;
