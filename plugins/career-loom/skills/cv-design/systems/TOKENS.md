# tokens.json reference

Each design system folder (`systems/<id>-<name>/`) holds one `tokens.json`. It is validated against `../schema/tokens.schema.json` (JSON Schema 2020-12, `additionalProperties: false` everywhere, so unknown keys are rejected). The renderer in `../scripts/` reads it; see `../scripts/README.md`. This file documents the schema once. If the two disagree, the schema wins.

## Top-level fields

| Field | Type | Values / unit | Notes |
|---|---|---|---|
| `id` | string | `P1`-`P8`, `C1 C3 C5 C6 C7 C8 C9 C10 C11 C12 C15 C20` | Required. Retired ids (C2, C17, C18 and others) fail the pattern. The folder name must start with the lowercase id (tested). |
| `name` | string | min 3 characters | Required. |
| `atsTier` | enum | `A` `B` `C` `D` | Required. See tiers below. |
| `status` | enum | `stub` `draft` `finished` | Required. |
| `twin` | string or null | design id, e.g. `"P1"` | Must be a string if present on a tier C or D design. Existing A designs use `null` or omit it. |
| `rtlVariant` | const | `true` | Required. See RTL below. |
| `layout` | object | see below | |
| `fonts` | object | see below | |
| `colors` | object | hex `#rrggbb` | |
| `sizes` | object | pt, mm | |
| `spacing` | object | pt, mm | |
| `limits` | object | `maxPages` const `2` | Optional. The renderer defaults to 2 as well. |
| `note` | string | free text | Optional. |

### Required fields by status

| Status | Required |
|---|---|
| `stub` | `id`, `name`, `atsTier`, `status`, `rtlVariant`. No layout, fonts, colours, sizes or spacing. Every current C/D stub also carries `twin`, but the schema does not require it at this status. |
| `draft`, `finished` | the stub set plus `twin` (null allowed for A/B), `layout`, `fonts`, `colors`, `sizes`, `spacing`. |

`cv-render.mjs` refuses `stub` and `draft` designs unless `--allow-draft` is passed (exit 4). P1 and C9 are `finished`; the other 18 are `stub`. Rendering a stub with `--allow-draft` crashes with `Cannot read properties of undefined (reading 'sectionOrder')` (exit 1), because it has no layout; the renderer has no friendlier message for this yet.

Conditional rules in the schema: a `sidebar` layout also requires `layout.sidebarWidth`, `layout.sidebarSections` and the four `colors.sidebar*` values. A `band` header also requires `colors.bandBg` and `colors.bandText`.

## Tiers

| Tier | Meaning | DOCX | Twin |
|---|---|---|---|
| A | Plain single column, no colour needed. Parser-safe. | yes | none |
| B | Single column with colour. | yes | none (in the current files; the schema does not forbid one) |
| C | Two columns or sidebar. | best effort, always one column | required, tier A |
| D | Graphic design, PDF only. | none | required, tier A |

Every C and D design names an A-tier `twin` and the CLI writes it next to the design as `<name>-ats.*`. Applications through portals get the twin, not the design. That the twin is tier A is checked by `tests/tokens.test.mjs`, not by the schema. Currently every twin is P1.

## layout

| Field | Values | Effect (checked in `scripts/lib/css.mjs`, `html.mjs`, `docx.mjs`) |
|---|---|---|
| `kind` (required) | `single`, `sidebar` | `sidebar` renders a CSS grid: side column plus main column, with the sidebar tint mirrored in RTL. DOCX ignores it and writes one column. |
| `header` (required) | `plain`, `band`, `split` | **Not read by the renderer.** Accepted by the schema and has no effect on output yet. |
| `sidebarWidth` | string `^[0-9.]+(mm\|%)$` | Grid column width, e.g. `"54mm"`. Required when `kind` is `sidebar`. |
| `sidebarSections` | array of `contact`, `skills`, `languages`, `certificates`, `links` | Sections moved into the sidebar and removed from the main column. `links` has no renderer and is silently dropped. Required for `sidebar`. |
| `headingCase` | `none`, `upper` | `upper` is applied to Latin and Cyrillic text only. Never to Arabic, CJK or Devanagari. |
| `headingStyle` | `rule-below`, `rule-above`, `plain`, `bar-start`, `ribbon` | Only `rule-below` draws anything (a 0.75pt rule under the heading). The other four render as plain headings for now. |
| `bulletStyle` | `disc`, `dash`, `none` | `dash` gives "–". Anything else gives "•", including `none`. |
| `dateAlign` | `inline`, `end` | **Not read by the renderer.** Dates are always pushed to the end of the entry line. |
| `sectionOrder` | array of strings | Order of sections. Sections left out are not rendered. Known keys: `summary work projects education volunteer publications skills certificates languages` (and `contact`, only meaningful inside the sidebar; in single layouts contact is in the header). Unknown keys are ignored. |

## fonts

Four roles: `display` (name), `heading` (section and entry titles), `body`, `mono`. Each is an object, all three keys required:

| Key | Allowed | Notes |
|---|---|---|
| `latin` | `Inter`, `IBM Plex Mono` | Bundled OFL families only. |
| `arabic` | `IBM Plex Sans Arabic`, `Cairo` | Used for Arabic-script text. |
| `weight` | `400`, `600`, `700` | Bundled files exist for these weights (IBM Plex Mono: 400 and 600 only, so `mono` should not use 700). |

Optional `fonts.cjk` and `fonts.devanagari` are free strings. They default to Noto Sans SC and Noto Sans Devanagari, which are not bundled; `node scripts/fetch-fonts.mjs` downloads them into a gitignored cache. Only OFL fonts, and only fonts shipped in `../fonts/` (plus that cache), may be used. Fonts are embedded in the PDF as base64 subsets chosen by unicode range.

**Cairo and Sorani.** Cairo has no glyphs for Central Kurdish (Sorani) letters (the code comment cites source S144). For documents whose language starts with `ckb` or `ku`, `arabicFont()` in `lib/css.mjs` substitutes IBM Plex Sans Arabic for every role, so a design may name Cairo and still render Sorani correctly in HTML/PDF. The check `render` verifies the Sorani letters `ڕ ڵ ۆ ێ ە` against the substituted font. The DOCX writer does not apply this substitution (`docx.mjs` reads `fonts[role].arabic` directly), so a Cairo design would not be safe for Sorani DOCX. No current finished design uses Cairo.

## colors

Required: `bg`, `text`, `muted`, `accent`, `rule`. Optional: `bandBg`, `bandText` (required with a band header), `sidebarBg`, `sidebarText`, `sidebarMuted`, `sidebarAccent` (required with a sidebar). All are `#rrggbb`. The `contrast` and `greyscale` checks require 4.5:1 for text pairs and 3:1 for `rule` on `bg`, also under colour-blind simulation and greyscale conversion.

## sizes and spacing

| Field | Unit | Constraint |
|---|---|---|
| `sizes.page` | | `A4` or `Letter` |
| `sizes.base`, `name`, `headline`, `heading`, `small` | pt | `base` >= 9, `small` >= 8 |
| `sizes.lineHeight` | ratio | 1.2 to 1.7 |
| `sizes.arabicLineHeight` | ratio | 1.4 to 1.9. Used for Arabic script. If absent, `lineHeight + 0.15`. |
| `sizes.marginTop`, `marginSide`, `marginBottom` | mm | required. With a sidebar the page margin is 0 and these become padding. |
| `spacing.section` | pt | space above a section |
| `spacing.item` | pt | between entries |
| `spacing.bullet` | pt | between bullets |
| `spacing.gutter` | mm | between columns; 0 for single column |

## RTL

`rtlVariant` must be `true` in every design. RTL is a render-time flag, never a separate design: direction comes from the CV (`meta.lang` of `ar ckb ku fa ur he ps sd`, or `meta.dir`) and can be forced with `--rtl on|off`. In RTL the layout mirrors (sidebar to the right, logical bullet and date alignment). Arabic-script PDFs have ligatures disabled so text extraction keeps letter order.

## Minimal valid example (P1)

```json
{
  "id": "P1", "name": "Plain Master", "atsTier": "A", "status": "finished", "twin": null, "rtlVariant": true,
  "layout": { "kind": "single", "header": "plain", "headingCase": "upper", "headingStyle": "rule-below", "bulletStyle": "disc", "dateAlign": "end",
    "sectionOrder": ["summary", "work", "projects", "education", "volunteer", "publications", "skills", "certificates", "languages"] },
  "fonts": {
    "display": { "latin": "Inter", "arabic": "IBM Plex Sans Arabic", "weight": 700 },
    "heading": { "latin": "Inter", "arabic": "IBM Plex Sans Arabic", "weight": 700 },
    "body": { "latin": "Inter", "arabic": "IBM Plex Sans Arabic", "weight": 400 },
    "mono": { "latin": "IBM Plex Mono", "arabic": "IBM Plex Sans Arabic", "weight": 400 }
  },
  "colors": { "bg": "#ffffff", "text": "#111111", "muted": "#4a4a4a", "accent": "#111111", "rule": "#767676" },
  "sizes": { "page": "A4", "base": 10, "name": 22, "headline": 11.5, "heading": 10.5, "small": 9, "lineHeight": 1.38, "arabicLineHeight": 1.6, "marginTop": 16, "marginSide": 18, "marginBottom": 16 },
  "spacing": { "section": 13, "item": 8, "bullet": 1.8, "gutter": 0 },
  "limits": { "maxPages": 2 }
}
```

## Designs by tier

| Design | Tier | Status | Twin | Layout in tokens |
|---|---|---|---|---|
| P1 Plain Master | A | finished | none | single, plain header |
| P2 Modern Minimal, P3 Classic Serif, P4 Executive, P5 Academic Research, P6 Technical Compact, P7 Graduate Starter, P8 Public Service Field | A | stub | none | not yet defined |
| C1 Accent Band, C3 Bold Type, C5 Ribbon Sections, C6 Metric Spotlight, C7 Brand Kit, C8 Warm Editorial | B | stub | none | not yet defined |
| C9 Sidebar Light | C | finished | P1 | sidebar, 54mm, plain header |
| C10 Sidebar Dark, C11 Split Header, C12 Timeline, C15 Swiss Grid | C | stub | P1 | not yet defined |
| C20 Portfolio Lite | D | stub | P1 | not yet defined |

Only P1 and C9 can be rendered today (both finished). The other 18 are stubs: identity and tier only.
