# ATS and Parsing Tips

## How hiring software actually handles your résumé
1. **Parse.** The file is turned into fields: name, contact, titles, employers, dates, skills. Layout matters here.
2. **Knockout questions.** Recruiter-set questions (work authorisation, years of experience, degree, location, salary). A "no" can screen you out automatically, and rewriting the résumé cannot fix it. [S015]
3. **Search and rank.** Recruiters search by keyword and filter. If you're missing the terms, you never show up in the results. [S003]
4. **Human review.** The first scan is short, so the top third of page 1 carries most of the weight. [S016, Weak]

**Not every employer uses ATS software.** In some markets, including (reportedly) Iraq and Kurdistan, HR staff read CVs by hand. [S159, Weak: one job seeker's observation, unconfirmed] Ask or check which applies; keep an ATS-safe version for multinationals, NGOs, the UN and any online portal.

## Do
- Use a single column for any file you upload to a portal.
- Use standard section headings in your output language ("Experience", "Education", "Skills").
- Put contact details in the main body, not in a Word header or footer.
- Write dates as "MM/YYYY" or "Mon YYYY", consistently.
- Export a text-based PDF **and** a .docx; upload the .docx if the portal accepts it.
- Name the file "Firstname-Lastname-Role.pdf".
- Use the posting's exact wording for skills you genuinely have.
- Check the apply URL: "myworkdayjobs" means Workday; "boards.greenhouse.io" means Greenhouse.

## Don't
- Build columns with tables or text boxes. [S006, S011]
- Put information only in icons, skill bars or images.
- Use creative headings ("My Journey") instead of standard ones.
- Upload design-tool (e.g., Canva) PDFs to portals.
- Hide keywords in white text.
- Use vague dates like "Summer 2023".

## How to check yourself
Copy all the text from your PDF and paste it into a plain text editor. If the order is scrambled or text is missing, a parser will have the same problem.

## Evidence note
Almost all parsing tests come from résumé-tool vendors, and none tested the major ATS products directly. [S011] The plugin says "this layout carries known parsing risk", never "Workday will reject you".

## Round 3 additions (October 2026)
- Textkernel lists résumé parsing for 29 languages, with Arabic supported only for skills and ontology layers. Arabic, Sorani and Persian-script CVs sent to portals are high parse risk; send the English twin. [S177–S180]
- Single and multi-column layouts are claimed as supported by that vendor, but keep portal uploads to the A-rated plain twin. [S179]
- Recruiter first-screen time studies are vendor data (about 7.4 seconds in one); use them only as directional. [S181–S183]
