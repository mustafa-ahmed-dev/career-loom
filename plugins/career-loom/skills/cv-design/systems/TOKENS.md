# tokens.json reference

Each design system folder (`systems/<id>-<name>/`) holds one `tokens.json`. It is validated against `../schema/tokens.schema.json` (JSON Schema 2020-12, `additionalProperties: false` everywhere, so unknown keys are rejected). The renderer in `../scripts/` reads it; see `../scripts/README.md`. `design.css`, `components.html` and the Tokens block in `spec.md` are generated from it by `../scripts/build-design-files.mjs`; edit `tokens.json`, then regenerate. This file documents the schema once. If the two disagree, the schema wins.

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

`cv-render.mjs` refuses a `stub` outright (exit 4, message lists the finished designs) and refuses `draft` unless `--allow-draft` is passed. All 20 designs are `finished`; a design only gets that status when all five checks pass (see its `spec.md`).

Conditional rules in the schema: tier A requires `kind: single`, `header: plain` and a heading style of `rule-below`, `rule-above` or `plain`. A `sidebar` layout requires `sidebarWidth`, `sidebarSections` and the four `colors.sidebar*` values; `labelled` requires `labelWidth`; a `band` header requires `colors.bandBg` and `bandText`; `headingStyle: ribbon` requires `ribbonBg` and `ribbonText`; `projectsStyle: cards` requires `cardBg`; `skillsStyle: pills` requires `chipBg`.

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
| `kind` (required) | `single`, `sidebar`, `labelled` | `sidebar`: CSS grid with a side column and a main column; the page edge tint mirrors in RTL. `labelled`: every section is a two-column grid with the heading in a label column (`labelWidth`) and the content beside it. DOCX ignores both and writes one column. |
| `header` (required) | `plain`, `band`, `split` | `band`: full-bleed coloured header (page margin 0, the layout padding repeats on every page). `split`: name and headline at the start, contact block at the end, rule below. |
| `headerAlign` | `start`, `center` | `center` centres name, headline and contact. |
| `headerFull` | boolean | Sidebar designs only: the header spans both columns and the sidebar starts below it (no page-height tint). |
| `sidebarWidth` | string `^[0-9.]+(mm\|%)$` | Sidebar column width, e.g. `"54mm"`. Required for `sidebar`. |
| `labelWidth` | string `^[0-9.]+mm$` | Label column width for `labelled`. Required there. |
| `sidebarSections` | array of `contact`, `skills`, `languages`, `certificates` | Sections moved into the sidebar. If `contact` is not listed, the contact line stays in the header. |
| `headingCase` | `none`, `upper` | `upper` is applied to Latin and Cyrillic text only. Never to Arabic, CJK or Devanagari. |
| `headingStyle` | `rule-below`, `rule-above`, `plain`, `bar-start`, `ribbon` | A thin rule under or above the heading; no decoration; a coloured bar at the start edge; or a full-width tinted ribbon (`ribbonBg`/`ribbonText`). In a sidebar, headings always use a rule below in `sidebarAccent`. |
| `bulletStyle` | `disc`, `dash`, `none` | `dash` gives "–", `disc` gives "•", `none` draws no marker and no indent. |
| `dateAlign` | `inline`, `end` | `end` pushes the dates to the end of the entry line; `inline` keeps them next to the title. |
| `entryStyle` | `stacked`, `timeline` | `timeline`: dates in a start-side column beside a thin line with a dot per entry. Line and dots are CSS backgrounds (decoration); the dates are real text. |
| `skillsStyle` | `inline`, `mono`, `pills` | `mono`: skills in the mono font. `pills`: skills as text on a `chipBg` tint. No levels or bars either way. |
| `projectsStyle` | `list`, `cards` | `cards`: the projects section is a two-column grid of bordered text cards (`cardBg`). |
| `highlightsStyle` | `inline`, `cards` | How the optional `highlights` of the CV are shown: one line, or 2-4 large-number cards. Values and labels are always text. |
| `sectionOrder` | array of strings | Order of sections. Sections left out are not rendered. Known keys: `summary highlights work projects education volunteer publications skills certificates languages` (and `contact`, only meaningful inside the sidebar). A section the order forgets is appended at the end, never dropped. Unknown keys are ignored. |

## fonts

Four roles: `display` (name), `heading` (section and entry titles), `body`, `mono`. Each is an object, all three keys required:

| Key | Allowed | Notes |
|---|---|---|
| `latin` | `Inter`, `IBM Plex Mono`, `Source Serif 4` | Bundled OFL families only. |
| `arabic` | `IBM Plex Sans Arabic`, `Cairo`, `Noto Naskh Arabic` | Used for Arabic-script text. |
| `weight` | `400`, `600`, `700` | Bundled files exist for these weights (IBM Plex Mono: 400 and 600 only, so `mono` should not use 700). |

Optional `fonts.cjk` and `fonts.devanagari` are free strings. They default to Noto Sans SC and Noto Sans Devanagari, which are not bundled; `node scripts/fetch-fonts.mjs` downloads them into a gitignored cache. Only OFL fonts, and only fonts shipped in `../fonts/` (plus that cache), may be used. Fonts are embedded in the PDF as base64 subsets chosen by unicode range.

**Cairo and Sorani.** Cairo has no glyphs for Central Kurdish (Sorani) letters (the code comment cites source S144). For documents whose language starts with `ckb` or `ku`, `arabicFont()` in `lib/css.mjs` substitutes IBM Plex Sans Arabic for every role, so a design may name Cairo and still render Sorani correctly. `docx.mjs` calls the same function, so the substitution applies to DOCX too. The check `render` verifies the Sorani letters `ڕ ڵ ۆ ێ ە` against the font actually used; the P3 and P5 specs record that they are present in Noto Naskh Arabic, which is not substituted. No current finished design uses Cairo.

## colors

Required: `bg`, `text`, `muted`, `accent`, `rule`. Optional: `bandBg`, `bandText` (band header), `sidebarBg`, `sidebarText`, `sidebarMuted`, `sidebarAccent` (sidebar; set `sidebarBg` equal to `bg` for no tint), `ribbonBg`, `ribbonText`, `cardBg`, `chipBg` (see the conditional rules above). All are `#rrggbb`. The `contrast` and `greyscale` checks require 4.5:1 for text pairs and 3:1 for `rule` on `bg`, also under colour-blind simulation and greyscale conversion.

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
| P1 Plain Master | A | finished | none | single, plain header, rule-below upper-case headings |
| P2 Modern Minimal | A | finished | none | single, plain headings, dash bullets, spacious |
| P3 Classic Serif | A | finished | none | single, centred header, serif |
| P4 Executive | A | finished | none | single, serif name, rule-above headings |
| P5 Academic Research | A | finished | none | single, serif, education and publications first |
| P6 Technical Compact | A | finished | none | single, 9.5 pt, mono skills, skills second |
| P7 Graduate Starter | A | finished | none | single, education and projects first |
| P8 Public Service and Field | A | finished | none | single, 10.5 pt, certificates and languages high |
| C1 Accent Band | B | finished | none | single, band header |
| C3 Bold Type | B | finished | none | single, 34 pt name, plain coloured headings |
| C5 Ribbon Sections | B | finished | none | single, ribbon headings |
| C6 Metric Spotlight | B | finished | none | single, highlight cards first |
| C7 Brand Kit | B | finished | none | single, bar-start headings, skill pills |
| C8 Warm Editorial | B | finished | none | single, cream page, serif headings |
| C9 Sidebar Light | C | finished | P1 | sidebar, 54mm, tinted, plain header |
| C10 Sidebar Dark | C | finished | P1 | sidebar, 56mm, dark tint |
| C11 Split Header | C | finished | P1 | sidebar below a full-width split header, no tint |
| C12 Timeline | C | finished | P1 | single, timeline entries |
| C15 Swiss Grid | C | finished | P1 | labelled grid, 36mm labels |
| C20 Portfolio Lite | D | finished | P1 | single, band header, project cards, PDF only |

All 20 designs can be rendered. Per-design check results are in each `spec.md`.
