# Multilingual Typography

## Default
Output is in English by default. The user can choose any language, or two languages.

**Bilingual output:**
- Two separate files is the default, and the safe choice for portals.
- One mirrored document is an option, for sending directly to people only.

## Fonts by script (open-licence fonts only)
| Script | Languages | Body font |
|---|---|---|
| Latin, Greek, Cyrillic | English, French, Spanish, Russian, Turkish… | The design system's own font |
| Arabic | Arabic | Noto Sans Arabic / Noto Naskh Arabic; IBM Plex Sans Arabic [S142] |
| Arabic script: Persian, Kurdish | Persian, Sorani | Vazirmatn [S146]; Noto (verify Sorani) [S147] |
| Arabic script: Urdu | Urdu | Noto Nastaliq Urdu |
| Hebrew | Hebrew | Noto Sans Hebrew |
| CJK | Chinese, Japanese, Korean | Noto Sans SC / TC / JP / KR (subset the font so PDFs stay small) |
| Indic | Hindi, Bengali, Tamil… | Noto Sans Devanagari / Bengali / Tamil… |
| Thai, Khmer | Thai, Khmer | Noto Sans Thai / Khmer |

## Sorani warnings
- **Cairo:** doesn't declare Central Kurdish support. Use it for Arabic headings only. [S144]
- **IBM Plex Sans Arabic:** has a reported Sorani rendering problem; test it before relying on it. [S143]
- **Before shipping any Sorani font,** check these letters: ڕ (U+0695) · ڵ (U+06B5) · ۆ (U+06C6) · ێ (U+06CE).

## Right-to-left rules
- Mirror the whole layout: sidebar side, timeline direction, bullet alignment.
- Isolate embedded English (emails, URLs, technical names) so it doesn't reverse.
- Choose one numeral style (Western or Arabic-Indic) per market and keep it consistent.
- Use ragged text alignment, not justified.
- Test PDF text extraction for reversed strings.

## Script rules
- No uppercase letter-spaced headings in scripts without capital letters; use weight or colour instead.
- No italics for Arabic or CJK; use weight.
- Increase line height for Arabic, Indic and Thai.

## Round 3 additions (October 2026)
- Plan: Typst for PDF (tagged PDF and PDF/UA-1 since 0.14), docx.js for Word with bidirectional options, semantic HTML; WeasyPrint as fallback. [S185, S191, S192]
- Known Typst limits: Arabic text extraction with complex shaping, Arabic headings in outlines, no kashida justification, CJK line breaking. Run render → extract → compare tests for every RTL script. [S186–S188, S195]
- python-docx handles run-level RTL natively but needs raw XML for paragraph bidi and table direction. [S193]
- Data model: JSON Resume (MIT) with plugin extensions; the schema repository moved in June 2026. [S194]
- IBM Plex Sans Arabic has a reported Central Kurdish bug (S143); glyph-test ڕ ڵ ۆ ێ ە in every font before release.
