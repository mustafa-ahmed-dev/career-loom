# Verification Guide

Every "unverified" or "must verify" item in this library is checked here. Record each completed check in the verification log at the bottom of `sources.md`.

## 1. How verification works
| Method | Use it for | What counts as verified |
|---|---|---|
| **Official source** | Laws, quotas, government forms | The ministry or official legal text, read directly and dated |
| **Local practitioner check** | Hiring habits that aren't written down (CV norms, channels) | At least 5 recruiters or HR staff, from at least 3 different sectors, mostly agreeing |
| **Technical test** | Fonts, rendering, connectors | You ran the test and kept the result |
| **Research round 3** | Literature, studies, guides | The source is opened and read, not just found in a search snippet |

**Rule:** a "U" item becomes verified only when a new source row is added to `sources.md` (S160 onwards) and the regional file cites it. Until then the plugin keeps saying "unverified".

## 2. Checklist

### Laws and quotas (official sources)
| Item | File | Where to verify | How |
|---|---|---|---|
| Saudi Nitaqat figures (S084) | gcc.md | HRSD (hrsd.gov.sa), Qiwa (qiwa.sa) | Find the official decision for each profession quota; record the decision number and date |
| UAE Emiratisation targets and fines (S085–S088) | gcc.md | MOHRE (mohre.gov.ae), Nafis (nafis.gov.ae) | Settle the AED 9,000 vs 10,000 fine conflict from MOHRE text only |
| Qatar, Kuwait, Oman, Bahrain quotas | gcc.md | Qatar Ministry of Labour; Kuwait Public Authority for Manpower; Oman Ministry of Labour; Bahrain LMRA (lmra.gov.bh) | Same as Saudi: decision, date, profession list |
| Korea fair-hiring law and photo rules | asia.md | Korean Law Information Center (law.go.kr); Ministry of Employment and Labor (moel.go.kr) | Read the Fair Hiring Procedure Act (채용절차의 공정화에 관한 법률): year, what it bans, which employer sizes it covers |
| Japan rirekisho standard form | asia.md | MHLW (mhlw.go.jp); Hello Work (hellowork.mhlw.go.jp) | Download the current official form; confirm the photo slot and the year it changed |
| UK photo and date-of-birth practice | north-america-uk-anz.md | National Careers Service (nationalcareers.service.gov.uk); Equality Act 2010 (legislation.gov.uk) | Confirm it's a convention, not a legal ban |
| US protected characteristics | north-america-uk-anz.md | EEOC (eeoc.gov) | Confirm the list the plugin never asks about |
| EU / Europass | europe.md | europass.europa.eu | Check the current template's sections and photo option |
| Germany / Austria / Switzerland: signature, photo | europe.md | Bundesagentur für Arbeit (arbeitsagentur.de) application guidance | Check current advice on photo, signature and date |
| France CV and motivation letter | europe.md | France Travail (francetravail.fr), APEC (apec.fr) | Check length, photo, letter format |
| Morocco | levant-egypt-maghreb.md | ANAPEC (anapec.org) | CV and letter guidance |
| Data-protection laws | asia.md, africa-latam.md, europe.md | Turkey KVKK (kvkk.gov.tr); India MeitY (meity.gov.in) for the DPDP Act; Brazil ANPD (gov.br/anpd); South Africa Information Regulator (inforegulator.org.za); Nigeria Data Protection Commission (ndpc.gov.ng); China PIPL (official National People's Congress text) | Confirm the law's name and that it covers CV data; don't summarise it beyond that |

### Local practice (practitioner checks)
| Item | File | Who to ask | How |
|---|---|---|---|
| Iraq / Kurdistan CV norms and channels (no published source yet; S159 was removed from use) | iraq-kri.md | 5–10 recruiters or HR staff in Erbil, Sulaymaniyah and Duhok, mixing NGOs, oil and gas, private companies and banks | Use the 10-minute question set below |
| Egypt military-status line | levant-egypt-maghreb.md | 3–5 Egyptian recruiters (LinkedIn) | Is it still expected? For which employers? |
| Levant CV language and photo | levant-egypt-maghreb.md | Recruiters in Amman and Beirut | Same short question set |
| Africa and Latin America CV norms | africa-latam.md | Round-3 research first, then 2–3 recruiters per country | The national guides from step 1 come first |

**Question set for Iraq / Kurdistan recruiters (about 10 minutes):**
1. Which language do you prefer CVs in, for which roles?
2. Ideal length?
3. Photo: do you expect one, does it matter, does a missing photo hurt?
4. Do you want nationality, marital status or date of birth? Why?
5. Where do your hires actually come from: referrals, LinkedIn, Facebook or Telegram groups, job boards, walk-ins? Rough percentages are fine.
6. What makes you reject a CV in the first seconds?
7. Do you read cover letters?
8. Do you use any ATS or screening software? How do you filter CVs manually?
9. How do you contact shortlisted candidates (WhatsApp, phone, email)?
10. What do candidates most often get wrong (for example exaggeration)?

Record each answer with the date, sector, city and role (no names unless they agree). Five or more consistent answers count as verified.

### Technical tests
| Item | How |
|---|---|
| Sorani glyphs in each font | Render the letters ڕ ڵ ۆ ێ in Vazirmatn, Noto Sans Arabic, IBM Plex Sans Arabic and Cairo, in both PDF and Word; screenshot the results. Or check the font's character table (cmap) for U+0695, U+06B5, U+06C6, U+06CE with fontTools |
| IBM Plex Sorani bug (S143) | Read the latest comments on the GitHub issue; re-run the render test |
| Indeed connector status (S098) | Check docs.indeed.com/mcp and connect it once in claude.ai; note whether it's still in beta |
| Sorani Reality note | A native Sorani speaker writes it, rather than translating it. A second native speaker then checks it against the English |

### Missing links in `sources.md`
| ID | Where to find it |
|---|---|
| S015 Hidden Workers | HBS Project on Managing the Future of Work site (hbs.edu) |
| S017 Laszlo Bock | LinkedIn Pulse; search the exact title |
| S035–S036, S059 | Journal sites / DOI search (Sackett already has its DOI) |
| S045 Greenhouse data | greenhouse.com reports and blog |
| S052 CareerPlug | careerplug.com reports |
| S057 NY Fed Staff Report 568 | newyorkfed.org (Staff Reports) |
| S014 | Open the arXiv page and read the abstract; keep it only if it's relevant, otherwise delete the row |
| S023 | Open the PDF; the institution's name is usually in the footer or on the cover |

## Quarterly freshness review
Run in the first week of January, April, July and October.

| Step | Action |
|---|---|
| 1 | In `sources.md`, list every row whose Last checked date is older than its Volatility window (quarterly: 3 months, annual: 12, stable: 36). `hypothesis` rows are skipped |
| 2 | Re-open each stale source. Unchanged: update Last checked. Changed: update the row's takeaway and add a verification-log row. Link rotted: find the new link or mark "Link pending" |
| 3 | Re-check quota, legal and connector items first: S081–S088 (HRSD, MOHRE), S098–S141 (connectors, APIs), S164–S168 (photo and personal-data rules), S177–S180 (parser languages), S185–S195 (rendering tools), S206–S214 (taxonomy licences), S233–S236 (platform docs) |
| 4 | Review `banned-claims.md`: add any bad figure that kept appearing in live search |
| 5 | Consider promoting a recurring live finding to `sources.md` (this is the only gate that adds sources) |
| 6 | Review `volatility-review.md` and correct any values |
| 7 | Never edit the library from inside a user session |

