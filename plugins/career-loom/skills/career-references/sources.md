# Sources

Every statistic, rule or claim the plugin gives a user must trace to an entry here.

## Rules for using this file
- Paraphrase only. Never copy passages from a source into a user-facing answer.
- Always show the evidence label next to any number you quote.
- "R1" and "R2" mean the source was collected in research rounds 1 and 2; "R3-quick" means a quick web search in round 3 (October 2026); "R3" means the full round-3 research (24 October 2026); "R3-premium" means the premium-feature gap research (24 October 2026). Re-check regulatory, quota and connector entries every quarter.
- "Not identified" means the page did not name an author when it was captured. Do not guess an author.
- Titles in *italics* were inferred from the link because the page title was not captured.
- "Link pending" means the source was cited without a URL. Add and verify the link before release.
- A "U" item becomes verified only when a new source row is added here and the regional file cites it. Record the check in the verification log at the bottom. See `docs/verification.md` (repo, not shipped).

## Volatility key
Every source has a `Volatility` value that sets how soon it must be re-checked.

| Value | Re-check window | Use for |
|---|---|---|
| `stable` | 36 months (link check only) | Peer-reviewed studies, field experiments, historical findings |
| `annual` | 12 months | Recurring platform or vendor reports, regional convention guides, font and script support notes |
| `quarterly` | 3 months | Laws, quotas, regulations, connector or product status, API access, data licences, vendor pricing |
| `hypothesis` | None (see `docs/verification.md` (repo, not shipped)) | Founder observations and anything awaiting primary verification |

An entry is **stale** when today minus `Last checked` exceeds its window. `hypothesis` entries are never stale, only unverified. Volatility measures how fast a claim goes out of date, not evidence quality. Judgement calls are listed in `docs/volatility-review.md` (repo, not shipped).

**Last checked dates.** Round 1 and 2 entries show `2026-09-25 (earliest possible)`: the exact check date was not recorded, but round 1 cites the plugin directory opening on that date, so every R1/R2 source was checked on or after it. Treat the date as the earliest possible, not as a confirmed check. Round 3 entries show the date they were captured.

## Evidence labels
| Label | Meaning |
|---|---|
| **Strong** | Peer-reviewed research, government or intergovernmental data, or official documentation from the organization itself |
| **Moderate** | Large platform data sets, reputable journalism, or established research centres |
| **Vendor** | Surveys or data from companies that sell résumé, hiring or job-search products |
| **Weak** | Blogs, roundups, secondary summaries, small or undisclosed samples, anecdote, or unverified pages |

---

## 1. ATS, parsing and screening

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S001 | [*Feature on job-search myths*](https://phys.org/news/2026-07-wrong-modern-job.html) | Not identified | Phys.org (Science X Network) | Traces the "75% of résumés rejected by ATS" claim to a 2012 sales pitch by Preptel, a company that closed the following year | Moderate | R1 | 2026-09-25 (earliest possible) | annual |
| S002 | [*The 75% ATS rejection myth shattered*](https://techrseries.com/recruitment-and-on-boarding/the-75-ats-rejection-myth-shattered-92-of-recruiters-confirm-applicant-tracking-systems-do-not-auto-reject-resumes/) | Not identified | TechRSeries, reporting an Enhancv survey | 92% of 25 US recruiters said their ATS does not auto-reject on formatting or content-match scores (small sample) | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S003 | [*Applicant tracking system myths*](https://blog.hiringthing.com/applicant-tracking-system-myths) | Not identified | HiringThing (ATS vendor) | An ATS vendor's explanation of what ATS software does and doesn't do | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S004 | [*What is ATS and why it matters*](https://www.cvflux.com.br/en/blog/what-is-ats-and-why-it-matters) | Not identified | CVFlux | Background explainer on how ATS parsing works | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S005 | [*The 6-second CV: recruitment's biggest myth*](https://www.distinctrecruitment.com/uk/resources/blog/the-6-second-cv-recruitments-biggest-myth/) | Not identified | Distinct Recruitment (UK agency) | Recruitment agency challenging fixed "seconds per CV" claims | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S006 | [*Do ATS read tables in a résumé?*](https://atsverification.com/blog/do-ats-read-tables-resume/) | Not identified | ATSVerification | Tables used for core content carry parsing risk | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S007 | [*ATS résumé template*](https://resumeoptimizerpro.com/blog/ats-resume-template) | Not identified | ResumeOptimizerPro | Single-column, standard-heading layout guidance | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S008 | [*ATS résumé formatting rules 2026*](https://www.resumeadapter.com/blog/ats-resume-formatting-rules-2026) | Not identified | ResumeAdapter | Formatting hazards: columns, headers and footers, graphics | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S009 | [*ATS behaviour in Workday, Greenhouse and Taleo*](https://www.shashiworks.com/ats-workday-greenhouse-taleo.html) | Not identified | ShashiWorks | Reported differences between ATS products; Taleo said to be weaker with PDFs | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S010 | [*Why your ATS résumé is not parsed*](https://www.loopcv.pro/guides/ats-resume-not-parsed/) | Not identified | LoopCV | Common causes of parsing failure | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S011 | [*ATS résumé parsing benchmark*](https://resumeatlas.io/ats-resume-parsing-benchmark) | Not identified | ResumeAtlas | 40.8% of 218 résumés flagged for two-column or table problems; does **not** test Workday, Greenhouse, Lever, iCIMS, Taleo or SuccessFactors | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S012 | [*ATS statistics*](https://apply-mate.com/blog/ats-statistics) | Not identified | Apply-Mate | Roundup of ATS statistics. Use only to trace a figure back to its primary source | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S013 | [*Employer brand vs ATS mismatch*](https://www.skillfuel.com/employer-brand-ats-mismatch-recruitment/) | Not identified | SkillFuel | Background on candidate experience inside ATS-driven hiring | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S014 | [arXiv preprint 2609.14046](https://arxiv.org/pdf/2609.14046) | Not identified | arXiv | Cited in round 1, but its topic was not recorded. **Do not cite until reviewed** | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S015 | *Hidden Workers: Untapped Talent* (2021). Link pending | Joseph Fuller, Manjari Raman, Eva Sage-Gavin, Kristen Hines | Harvard Business School Project on Managing the Future of Work + Accenture | 88% of employers say qualified high-skills candidates are screened out for not matching the exact criteria (94% for middle-skills). The filters are set by humans, e.g. rejecting gaps of six months or more | Strong | R1 | 2026-09-25 (earliest possible) | stable |
| S016 | *Eye-tracking study update* (2018). Link pending; likely the Ladders study, see S181 for a confirmed link | Not identified | Ladders | Average initial résumé screen of 7.4 seconds. Sample and method were not disclosed, so treat it as directional only | Weak | R1 | 2026-09-25 (earliest possible) | stable |

## 2. Writing, bullet formulas and AI-written résumés

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S017 | *My Personal Formula for a Winning Resume* (29 Sep 2014). Link pending | Laszlo Bock (then SVP People Operations) | LinkedIn Pulse; author at Google | Origin of the XYZ formula. This is expert opinion; no outcome study shows it beats other formats | Weak (expert opinion) | R1 | 2026-09-25 (earliest possible) | stable |
| S018 | [*The XYZ résumé formula*](https://www.tealhq.com/post/xyz-resume) | Not identified | Teal (career platform) | Secondary explainer of Bock's formula | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S019 | [GSAS CV & Cover Letter Guide](https://careerservices.fas.harvard.edu/resources/gsas-cv-cover-letter-guide-2/) | Not identified | Harvard Mignone Center for Career Success | Academic CV and cover letter guidance; no pronouns; sentence fragments are fine | Strong (official guidance) | R2 | 2026-09-25 (earliest possible) | annual |
| S020 | [HES: Create impactful résumés and cover letters](https://careerservices.fas.harvard.edu/resources/hes-create-impactful-resumes-and-cover-letters/) | Not identified | Harvard Mignone Center for Career Success | Top résumé mistakes, active language, tailoring, writing for both humans and ATS | Strong (official guidance) | R2 | 2026-09-25 (earliest possible) | annual |
| S021 | [HES résumé and letter guide 2022 (PDF mirror)](https://digitalrosh.com/wp-content/uploads/2023/07/HES_resume-and-letter_2022-final.pdf) | Not identified | Harvard Extension School (third-party mirror) | Mirror of S020's PDF. Prefer S020 | Strong (mirror) | R2 | 2026-09-25 (earliest possible) | annual |
| S022 | [Create a Strong Resume, Harvard FAS (Scribd mirror)](https://www.scribd.com/document/997979614/CREATE-a-STRONG-RESUME-Harvard-FAS-Mignone-Center-for-Career-Success) | Not identified | Harvard FAS Mignone Center (uploaded to Scribd) | Top-5 mistakes and action-verb lists. Prefer an official Harvard URL | Strong (mirror) | R2 | 2026-09-25 (earliest possible) | annual |
| S023 | [*Undergraduate résumés and cover letters (PDF)*](https://static1.squarespace.com/static/592b51c18419c2e1dd15123b/t/636e9bd189d2e53f6a7b693f/1668193233792/undergrad_resumes_and_cover_letters.pdf) | Not identified | Issuing institution not captured | Student résumé guidance. **Identify the issuer before citing** | Weak until verified | R2 | 2026-09-25 (earliest possible) | annual |
| S024 | [*Google: how we hire*](https://www.brightnetwork.co.uk/employer-advice/google/google-how-we-hire/) | Not identified | Bright Network (UK graduate careers), summarising Google | Tailor the résumé per job; concision; cover letters not required; structured interviews; AI not allowed during interviews | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S025 | [*How to get hired at Google*](https://www.retunerai.com/blog/how-to-get-hired-at-google/) | Not identified | RetunerAI | Secondary summary of Google's hiring guidance | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S026 | [*AI in hiring survey*](https://topresume.com/career-advice/ai-in-hiring-survey) | Not identified | TopResume | n=600 US hiring managers (May 2025): 19.6% would reject a fully AI-generated application; 33.5% say they can spot one in under 20 seconds | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S027 | [*Do employers check résumés for AI? (2026)*](https://humangpt.io/blog/do-employers-check-resumes-for-ai-2026) | Not identified | HumanGPT | Roundup on employer AI-detection attitudes | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S028 | [*AI résumés in 2026: what hiring managers think*](https://www.kraftcv.com/blog/ai-resumes-2026-what-hiring-managers-think) | Not identified | KraftCV | Roundup on how hiring managers view AI-written résumés | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S029 | [*AI applicant report*](https://www.resume-now.com/job-resources/careers/ai-applicant-report) | Not identified | Resume Now | n=925: 62% say AI résumés without personalisation are more likely to be rejected; 78% look for personalised details | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S030 | [*AI résumé statistics 2026*](https://jobcannon.io/blog/ai-resume-statistics-2026) | Not identified | JobCannon | Roundup. Use only to trace figures to primary sources | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S031 | [*Interview rate per application statistics*](https://onehour.digital/blog/interview-rate-per-application-statistics) | Not identified | OneHour Digital | Roundup of application-to-interview rates | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S032 | Resume.io hiring-manager survey. Link pending | Not identified | Resume.io | n=3,000 US hiring managers: 49% say they automatically dismiss résumés they identify as AI-generated (self-report) | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S033 | ResumeBuilder AI cover letter test (2023). Link pending | Not identified | ResumeBuilder | n=1,000: only 18% of hiring managers identified all three ChatGPT-written cover letters | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S034 | Huntr application data. Link pending | Not identified | Huntr | Two data sets were captured: tailored 4.23% vs generic 2.07% interview rate (Q1 2026); and 5.75% vs 2.68% across 1.39M tracked applications. Users self-select, so there is selection bias. **Say which data set a figure comes from** | Vendor | R1/R2 | 2026-09-25 (earliest possible) | annual |

## 3. Interviews

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S035 | [Revisiting meta-analytic estimates of validity in personnel selection (2022)](https://doi.org/10.1037/apl0000994) | Paul R. Sackett, Charlene Zhang, Christopher M. Berry, Filip Lievens | *Journal of Applied Psychology* 107(11), American Psychological Association | Structured interviews ranked as the top selection procedure (mean validity .42 vs .19 for unstructured interviews) | Strong | R1 | 2026-09-25 (earliest possible) | stable |
| S036 | The validity and utility of selection methods (1998). Link pending | Frank L. Schmidt, John E. Hunter | *Psychological Bulletin* | The earlier structured-interview validity estimate of .51, revised downward by S035 | Strong | R1 | 2026-09-25 (earliest possible) | stable |
| S037 | [*Amazon Leadership Principles in interviews*](https://www.aboutamazon.com/news/workplace/amazon-leadership-principles-interview) | Not identified | Amazon | 16 Leadership Principles used as interview competencies; STAR format | Strong (official) | R2 | 2026-09-25 (earliest possible) | annual |
| S038 | [*What each Leadership Principle really means*](https://www.aboutamazon.com/news/workplace/what-do-each-of-amazons-leadership-principles-really-mean) | Not identified | Amazon | Explanation of each principle | Strong (official) | R2 | 2026-09-25 (earliest possible) | annual |
| S039 | [*Amazon interview tips*](https://www.aboutamazon.com/news/workplace/amazon-interview-best-tips) | Not identified | Amazon | Say "I", not "we"; give metrics where applicable; a Bar Raiser suggests adding an "Improvement" step (STARI) | Strong (official) | R2 | 2026-09-25 (earliest possible) | annual |
| S040 | [BIE interview prep](https://amazon.jobs/content/en/how-we-hire/bie-interview-prep) | Not identified | Amazon | Example loop: five 55-minute interviews with 2–3 behavioural questions each | Strong (official) | R2 | 2026-09-25 (earliest possible) | annual |
| S041 | [Inspira Applicant Guide](https://inspira-apps.un.org/Inspira/ApplicantGuide/Applicant%20Guide%20-%20English.pdf) | Not identified | United Nations | Automatic screening → assessment → competency-based panel interview, typically 30–60 minutes | Strong (official) | R2 | 2026-09-25 (earliest possible) | annual |
| S042 | [*UN competency-based interview guide*](https://www.unjobnet.org/career-resources/un-competency-based-interview-guide) | Not identified | UNjobnet (independent job site) | Practical summary of UN competency-based interviews | Weak | R2 | 2026-09-25 (earliest possible) | annual |

## 4. Hiring reality: ghost jobs, ghosting, conversion and referrals

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S043 | [2024 State of Job Hunting report](https://www.greenhouse.com/blog/greenhouse-2024-state-of-job-hunting-report) | Not identified | Greenhouse | 61% of US/UK/German job seekers have been ghosted after an interview; recruiter workload +26% in one quarter; 38% of job seekers mass-apply | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S044 | [Candidate survey, April 2024 (PDF)](https://grnhse-marketing-site-assets.s3.amazonaws.com/production/greenhouse-candidate-survey-april-2024.pdf) | Not identified | Greenhouse | Ghosted after an interview: US 52%, UK 42%, Ireland 54%, DACH 65% (counts anyone ghosted at least once) | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S045 | Greenhouse platform data: ghost jobs and 2026 hiring benchmark. Primary link pending | Not identified | Greenhouse | 18–22% of jobs posted per quarter classified as ghost jobs; referrals were 11.6% of 2025 hires | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S046 | [*Ghost jobs in 2026*](https://jobstrack.io/blog/ghost-jobs-2026) | Not identified | JobsTrack | Secondary roundup of ghost-job data | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S047 | [*One quarter of jobs posted online are fake*](https://www.entrepreneur.com/business-news/one-quarter-of-jobs-posted-online-are-fake-ghost-jobs-study/496683) | Not identified | Entrepreneur, reporting a ResumeUp.AI study | 27.4% of US LinkedIn listings "likely ghost". The proxy is weak (any listing older than 30 days) | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S048 | [*The ghost job economy*](https://www.myperfectresume.com/career-center/careers/basics/ghost-job-economy) | Not identified | MyPerfectResume | Survey material on ghost postings | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S049 | [*Recruitment funnel benchmarks*](https://www.pin.com/blog/recruitment-funnel-benchmarks/) | Not identified | Pin | Funnel conversion benchmarks | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S050 | [*How many applications to get hired*](https://turboresume.ai/en/blog/how-many-applications-to-get-hired/) | Not identified | TurboResume | Roundup of application-to-hire ratios | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S051 | [*Candidate ghosting statistics*](https://cuecopilot.com/candidate-ghosting-statistics/) | Not identified | CueCopilot | Roundup of ghosting figures | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S052 | 2025 Recruiting Metrics Report. Link pending | Not identified | CareerPlug | 10M+ applications at 60k+ mostly small businesses: 3% of applicants invited to interview; 27% of interviewees hired; ~180 applicants per hire | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S053 | [*Employee referral statistics 2026*](https://www.noon.ai/blog/articles/360-employee-referral-statistics-2026) | Not identified | Noon | Roundup of referral statistics. Trace each figure to its primary source | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S054 | [*Do referred candidates interview better?*](https://www.metaview.ai/resources/blog/do-referred-candidates-interview-better) | Not identified | Metaview | Vendor data on referred-candidate interview performance | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S055 | Ashby hiring-source data. Link pending | Not identified | Ashby | Inbound applications reached 52% of hires by Q1 2026, up from 38% in 2021 | Moderate | R2 | 2026-09-25 (earliest possible) | annual |
| S056 | Employer ghost-job survey (Jan 2025). Link pending | Not identified | Clarify Capital | n=1,000 employers: nearly 1 in 3 admit posting jobs they had no current intent to fill (self-report) | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S057 | *Do informal referrals lead to better matches?* Staff Report 568. Link pending | Meghan Brown, Elizabeth Setren, Giorgio Topa | Federal Reserve Bank of New York | One large US firm (2006–2010): referrals were 6% of applicants, 21% of interviewees, 27% of offers and 29% of hires | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S058 | *Getting a Job* (1974; 2nd ed. 1995). Link pending | Mark Granovetter | Book (Harvard University Press; University of Chicago Press) | 56% of respondents found their job through a personal contact; the "strength of weak ties" idea | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S059 | A causal test of the strength of weak ties (2022). Link pending | Karthik Rajkumar, Guillaume Saint-Jacques, Iavor Bojinov, Erik Brynjolfsson, Sinan Aral | *Science* 377(6612); LinkedIn, Harvard, Stanford, MIT | Experiments on 20M LinkedIn users: moderately weak ties (~10 mutual connections) drive the most job mobility | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S060 | [*Weak ties in job search*](https://addnow.app/blog/weak-ties-job-search) | Not identified | AddNow | Secondary explainer of S059. Cite S059 instead | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S061 | [*The strength of weak ties*](https://getdex.com/blog/strength-of-weak-ties/) | Not identified | Dex | Secondary explainer of S058/S059 | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S062 | [*The strength of weak ties*](https://letsbridge.com/learn/the-strength-of-weak-ties) | Not identified | Bridge | Secondary explainer | Weak | R2 | 2026-09-25 (earliest possible) | annual |

## 5. Arab region and MENA labour markets

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S063 | [Striving for Better Jobs: The Challenge of Informality in MENA (2014)](https://documents1.worldbank.org/curated/en/445141468275941540/pdf/Striving-for-better-jobs-the-challenge-of-informality-in-the-Middle-East-and-North-Africa.pdf) | Roberta Gatti et al. | World Bank | Over 70% of workers in Lebanon and Syria found jobs mainly through personal connections (2010 survey data) | Strong (dated) | R2 | 2026-09-25 (earliest possible) | stable |
| S064 | [Arab Barometer Wave 8: Palestine](https://pcpsr.org/en/node/975) | Not identified | Palestinian Center for Policy and Survey Research | 53% say wasta is frequently needed to get a job; 22% sometimes; 24% rarely or never | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S065 | [*Wasta: how personal connections are denying citizens opportunities and services*](https://www.transparency.org/en/news/wasta-how-personal-connections-are-denying-citizens-opportunities-services) | Not identified | Transparency International (GCB-MENA 2019) | Wasta used to obtain basic services: Lebanon 54%, Palestine 39%, Jordan 25% | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S066 | Family Status Report 2014 (reported via S065). Link pending | Not identified | Jordan National Council for Family Affairs | 83% consider wasta a form of corruption, yet 65% consider it necessary to get a job | Moderate | R2 | 2026-09-25 (earliest possible) | stable |
| S067 | [*Applying online the best way to find a job in the Middle East*](https://english.alarabiya.net/business/technology/2015/06/01/Applying-online-best-way-to-find-a-job-in-the-Middle-East) | Not identified | Al Arabiya, reporting a Bayt survey | Media coverage of the 2015 Bayt channel survey | Vendor (reported) | R2 | 2026-09-25 (earliest possible) | stable |
| S068 | [Hiring practices in the Middle East and North Africa survey](https://www.bayt.com/en/blog/26982/the-bayt-com-hiring-practices-in-the-middle-east-and-north-africa-survey/) | Not identified | Bayt.com | 2015 opt-in survey: 43.5% found their current job through friends or colleagues; 22.4% online; 12% careers sites; employers rank referrals top for managerial hires (38%) | Vendor (dated) | R2 | 2026-09-25 (earliest possible) | stable |
| S069 | [*Bayt.com survey: job market will get more competitive in 2024*](https://mid-east.info/bayt-com-survey-reveals-the-job-market-in-the-middle-east-will-get-significantly-more-competitive-in-2024/) | Not identified | Mid-East.info, reporting Bayt | Job seekers' top hurdles: lack of suitable opportunities 36.6%; visa or work-permit issues 24.2% | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S070 | [Iraq Labour Force Survey 2021 (report)](https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_850359.pdf) | Not identified | ILO, Central Statistical Organization (CSO), Kurdistan Region Statistics Office (KRSO) | 37.9% of employment is in the public sector (70.5% of employed women); unemployment 16.5%; youth unemployment 35.8%; female labour-force participation 10.6% | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S071 | [*Iraq and ILO launch first national labour force survey in a decade*](https://www.ilo.org/resource/news/iraq-and-ilo-launch-first-national-labour-force-survey-decade) | Not identified | ILO | Launch announcement for S070 | Strong | R2 | 2026-09-25 (earliest possible) | stable |
| S072 | [Repost of the ILO survey launch](https://iraqieconomists.net/en/2022/07/11/iraq-and-ilo-launch-first-national-labour-force-survey-in-a-decade/) | Not identified | Iraqi Economists Network | Secondary repost of S071 | Moderate | R2 | 2026-09-25 (earliest possible) | stable |
| S073 | [*Youth and employment situation in the Kurdistan Region*](https://rudawrc.net/en/article/youth-and-employment-situation-in-the-kurdistan-region-2023-08-06) | Not identified | Rudaw Research Center | KRI youth (2023): 43.9% employed; 71.3% of employed youth work in private companies; 76% think the private sector offers better prospects | Moderate | R2 | 2026-09-25 (earliest possible) | stable |
| S074 | [*Job Search Club methodology training*](https://www.ilo.org/resource/news/job-search-club-methodology-training-set-boost-employment-prospects-youth) | Not identified | ILO | ILO Job Search Clubs active in Duhok and Ninawa | Strong | R2 | 2026-09-25 (earliest possible) | annual |
| S075 | [*Kurdistan Region launches digital job portal*](https://www.kurdistan24.net/en/story/810000/kurdistan-region-launches-digital-job-portal-to-connect-employers-with-job-seekers) | Not identified | Kurdistan24 | KRG Ministry of Labour job portal launched 10 Nov 2024, private sector only at launch | Moderate | R1 | 2026-09-25 (earliest possible) | quarterly |
| S076 | [Kurdistan jobs listing page](https://www.bayt.com/en/iraq/jobs/kurdistan-jobs/) | Not identified | Bayt.com | One 2025 snapshot showed about 30 Kurdistan jobs (thin market) | Weak (snapshot) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S077 | [FIND A JOB IN KURDISTAN](https://www.linkedin.com/company/find-a-job-in-kurdistan) | Not identified | LinkedIn community page | Example of vacancies circulating through social channels (~74,000 followers) | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S078 | [HireKurd](https://hirekurd.com/) | Not identified | HireKurd | A local KRI job board (cited for its existence only) | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S079 | [*Iraq CV format*](https://resume-example.com/cv/iraq-country) | Not identified | Resume-Example | Iraq CV conventions (photo, marital status). **Validate with Erbil recruiters** | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S080 | [*GCC CV format*](https://www.upliftgcc.com/articles/gcc-cv-format) | Not identified | UpliftGCC | Gulf CV conventions: photo, nationality, visa near the top | Weak | R1 | 2026-09-25 (earliest possible) | annual |

## 6. GCC nationalisation (quota) rules: verify with the ministries every quarter

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S081 | [*Understanding Saudization and Nitaqat*](https://www.envoyglobal.com/insight/understanding-saudization-and-nitaqat-in-saudi-arabia-key-requirements-for-employers/) | Not identified | Envoy Global | Overview of the Nitaqat system | Moderate (secondary) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S082 | [*Saudization guide*](https://motaded.com.sa/blog/saudization) | Not identified | Motaded (Saudi consultancy) | Profession quotas and phase details | Weak (secondary) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S083 | [*Expats 78% of Saudi workforce*](https://vision2030.ai/analysis/expats-78-percent-saudi-workforce/) | Not identified | Vision2030.ai | Workforce composition analysis | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S084 | [*Saudization and Nitaqat in Saudi Arabia*](https://noblecoreksa.com/saudization-nitaqat-saudi-arabia/) | Not identified | NobleCore KSA | 2026–2028 phase targeting 340,000+ jobs; 100% Saudi in 69 admin roles from 5 Apr 2026; a Saudi must earn at least SAR 4,000 to count | Weak (secondary). **Verify with HRSD** | R2 | 2026-09-25 (earliest possible) | quarterly |
| S085 | [*Emiratisation 2026 guide*](https://www.businessdubai.ae/blogs/emiratisation-2026-guide) | Not identified | Business Dubai | Firms with 50+ staff must reach 10% Emiratis in skilled roles by 31 Dec 2026 | Moderate (secondary) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S086 | [*Emiratisation*](https://uaeinform.com/business-guide/emiratisation) | Not identified | UAEInform | Rules for 20–49-employee firms in 14 sectors; Nafis programme | Weak (secondary) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S087 | [*Emiratization 2026: what private-sector companies must do*](https://www.adecco.com/en-ae/resources/article/emiratization-2026-what-private-sector-companies-must-do-right-now) | Not identified | Adecco Middle East | Employer obligations and timelines | Moderate (secondary) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S088 | [*UAE Emiratisation guide 2026*](https://www.oasistyping.com/guides/uae-emiratisation-guide-2026/) | Not identified | Oasis Typing | Fine amounts. These conflict with other sources (AED 9,000 vs 10,000 per month) | Weak. **Verify with MOHRE** | R2 | 2026-09-25 (earliest possible) | quarterly |

## 7. Regional CV conventions outside the Middle East and North Africa

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S089 | [*Should you add a photo to a UK CV?*](https://www.chanukajeewantha.com/uk/career-advice/should-you-add-a-photo-to-a-uk-cv) | Chanuka Jeewantha (site owner) | Personal careers site | UK convention: no photo or date of birth; linked to Equality Act 2010 practice, not a legal ban | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S090 | [*Europass CV photo*](https://www.haired.app/blog/europass-cv-photo) | Not identified | Haired | The photo is optional on Europass and best omitted for EU institutions | Vendor | R1 | 2026-09-25 (earliest possible) | annual |
| S091 | [*Japanese résumé (rirekisho) guide*](https://fukuyoshi-trading.com/careers/guides/japanese-resume-rirekisho-guide) | Not identified | Fukuyoshi Trading | Rirekisho structure and photo convention | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S092 | [*Japanese résumé (rirekisho) guide*](https://thetailorcv.com/blog/japanese-resume-rirekisho-guide) | Not identified | TheTailorCV | Rirekisho vs shokumu keirekisho | Vendor | R2 | 2026-09-25 (earliest possible) | annual |
| S093 | [*Japanese résumé (rirekisho) guide*](https://japanlivinglife.com/articles/japanese-resume-rirekisho-guide) | Not identified | Japan Living Life | Photo 3×4 cm, taken within 3 months | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S094 | [*Rirekisho format change*](https://livinginjapan.net/2021/08/00635/) | Not identified | Living in Japan | Reports the old JIS sample form was withdrawn in 2020 in favour of an MHLW standard form. **Verify** | Weak | R2 | 2026-09-25 (earliest possible) | annual |
| S095 | [*Specified Skilled Worker résumé in Japan*](https://treeglobalpartners.com/en/articles/ssw-resume-japan/) | Not identified | Tree Global Partners | Résumé practice for Specified Skilled Worker visa applicants | Weak | R2 | 2026-09-25 (earliest possible) | annual |

## 8. Career-services industry (role models for the plugin)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S096 | [*Outplacement assistance*](https://wearecareer.com/blogs/news/outplacement-assistance) | Not identified | WeAreCareer | Randstad RiseSmart's three-person team per candidate (coach, résumé writer, job-search concierge); LHH and Korn Ferry service models | Weak (roundup) | R1 | 2026-09-25 (earliest possible) | annual |
| S097 | [*Best outplacement providers for Fortune 500 companies, 2026*](https://relevante.com/best-outplacement-providers-for-fortune-500-large-companies-in-2026/) | Not identified | Relevante | Service bundles of the major outplacement firms | Vendor | R1 | 2026-09-25 (earliest possible) | annual |

## 9. Job data, APIs and connectors (check status every quarter)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S098 | [Indeed MCP documentation](https://docs.indeed.com/mcp/) | Not identified | Indeed | Official MCP server, in beta, Claude connector only; tools: job search, job detail, get résumé, company data | Strong (official) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S099 | [*Indeed MCP*](https://www.tooljunction.io/mcp/indeed) | Not identified | ToolJunction | Directory listing of the Indeed MCP | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S100 | [*Indeed integration for Claude*](https://hackceleration.com/resources/integrations/claude/indeed) | Not identified | Hackceleration | Setup notes for the Indeed connector | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S101 | [*Indeed MCP server*](https://agentman.ai/agentskills/connections/mcp-server/indeed) | Not identified | Agentman | Directory listing | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S102 | [*Does Indeed have an API?*](https://headcountlabs.com/guides/does-indeed-have-an-api/) | Not identified | Headcount Labs | Indeed API access history | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S103 | [Adzuna developer overview](https://developer.adzuna.com/overview) | Not identified | Adzuna | Self-serve API with app_id and app_key, ~20 countries; default limits 25/min and 250/day; attribution required | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S104 | [*Adzuna API*](https://apitracker.io/a/adzuna) | Not identified | APITracker | API listing | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S105 | [*How to integrate the Adzuna API*](https://cleanjobdata.com/articles/how-to-integrate-adzuna-free-job-api) | Not identified | CleanJobData | Integration walkthrough | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S106 | [InfoJobs API operation list](https://developer.infojobs.net/documentation/operation-list/index.xhtml) | Not identified | InfoJobs | Self-serve job-offer search (Spain) | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S107 | [InfoJobs API terms of use](https://developer.infojobs.net/legal/legal/terms-of-use.xhtml) | Not identified | InfoJobs | No storing or exporting data; candidates must not be diverted away from InfoJobs | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S108 | [SEEK developer site](https://developer.seek.com/) | Not identified | SEEK | Partner-only API for hirers; no programmatic job search | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S109 | [SEEK: reflecting job ads](https://developer.seek.com/use-cases/job-posting/reflecting-job-ads) | Not identified | SEEK | Scope of the job-posting use case | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S110 | [*SEEK API*](https://jobspipe.dev/blog/seek-api) | Not identified | JobsPipe | Secondary summary of SEEK access | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S111 | [*SEEK scraper API*](https://parse.bot/marketplace/ca591f07-c45f-4820-a1e9-28b0086defff/seek-com-api) | Not identified | Parse.bot | Scraper marketplace listing. **Do not use**; it shows only scrapers exist | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S112 | [*JobStreet API*](https://jobspipe.dev/blog/jobstreet-api) | Not identified | JobsPipe | JobStreet and Jobsdb now run on the SEEK platform | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S113 | [Saramin Open API guide](https://oapi.saramin.co.kr/guide/job-search-id) | Not identified | Saramin | Korean job search API; access requires approval | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S114 | [Saramin old API migration](https://oapi.saramin.co.kr/guide/old-api-migration) | Not identified | Saramin | API version notes | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S115 | [*hh.ru API news*](https://habr.com/ru/news/1069286/) | Not identified | Habr | Reports hh.ru closing its public vacancy API | Moderate | R2 | 2026-09-25 (earliest possible) | quarterly |
| S116 | [*HeadHunter closed its public vacancy API*](https://sys-admin.by/info/it-news/headhunter-zakryl-publichnyi-api-vakansii-chto-izmenitsia-dlia-razrabotchikov-i-analitikov/) | Not identified | Sys-Admin.by | hh.ru public API closed to unauthenticated use (April 2026) | Moderate | R2 | 2026-09-25 (earliest possible) | quarterly |
| S117 | [Bayt.com terms](https://www.bayt.com/en/pages/terms/) | Not identified | Bayt.com | Terms explicitly ban robots, spiders and bulk extraction | Strong (official) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S118 | [*Naukri API*](https://jobspipe.dev/blog/naukri-api) | Not identified | JobsPipe | No public Naukri API; commercial ATS integrations only | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S119 | [*Naukri scraper API*](https://parse.bot/marketplace/5f5984ac-34ec-4e49-a9e6-5a56e0039c4b/naukri-com-api) | Not identified | Parse.bot | Scraper listing. **Do not use** | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S120 | [*Naukri API job data for India*](https://themineworks.com/blog/naukri-api-job-data-india/) | Not identified | The Mine Works | Third-party data access for Naukri | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S121 | [*XING scraper API*](https://parse.bot/marketplace/b29c4be0-7980-4fd2-ae4a-d7cc81177857/xing-com-api) | Not identified | Parse.bot | Cited as evidence the official XING API is retired. **Do not use** | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S122 | [*StepStone scraper API*](https://parse.bot/marketplace/10475ce1-c119-4b07-b8cd-f6ae6cdad6d3/stepstone-com-api) | Not identified | Parse.bot | No official StepStone API found. **Do not use** | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S123 | [*Arbeitnow job board API*](https://www.arbeitnow.com/blog/job-board-api) | Not identified | Arbeitnow | Free job API, no key, link-back required | Moderate (provider) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S124 | [*Arbeitnow API comparison*](https://cleanjobdata.com/vs/arbeitnow-api) | Not identified | CleanJobData | Notes that commercial-use terms are unclear | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S125 | [Remotive remote jobs API](https://github.com/remotive-com/remote-jobs-api) | Not identified | Remotive (GitHub) | At most 2 requests/min; 24-hour delay; credit required; no redistribution | Strong (official repo) | R2 | 2026-09-25 (earliest possible) | quarterly |
| S126 | [*Free job APIs without an API key*](https://cleanjobdata.com/articles/free-job-api-without-api-key) | Not identified | CleanJobData | Roundup of free job APIs | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S127 | [*Free job API*](https://jobspipe.dev/blog/free-job-api) | Not identified | JobsPipe | Roundup | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S128 | [*Free jobs API*](https://jobspipe.dev/free-jobs-api) | Not identified | JobsPipe | Product page | Vendor | R2 | 2026-09-25 (earliest possible) | quarterly |
| S129 | [*I built a pipeline to track the job market I'm trying to break into*](https://towardsdatascience.com/i-built-a-pipeline-to-track-the-job-market-im-trying-to-break-into/) | Not identified | Towards Data Science | Practitioner experience, including Remotive reliability problems in 2026 | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S130 | [*Greenhouse jobs API*](https://jobspipe.dev/guides/greenhouse-jobs-api) | Not identified | JobsPipe | Public Greenhouse job-board endpoint, one company at a time | Weak (secondary for an official endpoint) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S131 | [*ATS platforms with public job-posting APIs*](https://cavuno.com/blog/ats-platforms-public-job-posting-apis) | Not identified | Cavuno | Greenhouse, Lever and Ashby public endpoints | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S132 | [*Skills taxonomy*](https://jobspipe.dev/blog/skills-taxonomy) | Not identified | JobsPipe | O*NET and ESCO as skill taxonomies | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S133 | [*LinkedIn MCP*](https://lessie.ai/blog/linkedin-mcp) | Not identified | Lessie | No official LinkedIn MCP server | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S134 | [*LinkedIn MCP and terms of service*](https://contentin.io/blog/linkedin-mcp-terms-of-service/) | Not identified | ContentIn | Third-party LinkedIn MCPs risk breaching LinkedIn's terms | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S135 | [*LinkedIn MCP server: what exists and what is safe to use*](https://dev.to/skryvo/linkedin-mcp-server-what-exists-and-what-is-safe-to-use-3oah) | skryvo (DEV Community handle) | DEV Community | Landscape of LinkedIn MCP options and risks | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S136 | [*LinkedIn jobs search API*](https://www.realtyapi.io/blog/linkedin-jobs-search-api) | Not identified | RealtyAPI | Third-party LinkedIn job data (supports excluding it) | Weak | R2 | 2026-09-25 (earliest possible) | quarterly |
| S137 | [*GulfTalent scraper*](https://apify.com/blackfalcondata/gulftalent-scraper/api) | Not identified | Apify marketplace | Shows only scrapers exist for GulfTalent. **Do not use** | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S138 | [*Bayt scraper*](https://apify.com/scrapingmonkey/bayt-scraper/api/javascript) | Not identified | Apify marketplace | Shows only scrapers exist for Bayt. **Do not use** | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S139 | [*GCC jobs aggregator*](https://apify.com/get_anything/gcc-jobs-aggregator) | Not identified | Apify marketplace | Scraper-based Gulf aggregator. **Do not use** | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S140 | [*Gulf job-board overlap*](https://apify.com/entrogix_works/gulf-job-board-overlap/api) | Not identified | Apify marketplace | Scraper-based analysis. **Do not use** | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S141 | LinkedIn User Agreement §8.2. Link pending | Not identified | LinkedIn | Prohibits scraping and automated access | Strong (official) | R1 | 2026-09-25 (earliest possible) | quarterly |

## 10. Fonts and multilingual typography

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S142 | [IBM Plex Sans Arabic](https://fontsource.org/fonts/ibm-plex-sans-arabic/about) | Not identified | Fontsource | OFL-1.1 licence; lists Central Kurdish among supported languages | Strong (official listing) | R1 | 2026-09-25 (earliest possible) | annual |
| S143 | [IBM Plex issue #597](https://github.com/IBM/plex/issues/597) | Issue reporter (handle not captured) | IBM Plex (GitHub) | Reported Central Kurdish rendering problem: letters fall back to Arial. Fix status unknown | Moderate | R1 | 2026-09-25 (earliest possible) | annual |
| S144 | [Cairo](https://fontsource.org/fonts/cairo/about) | Not identified | Fontsource | Supports Arabic, Farsi and Urdu; Central Kurdish not declared | Strong (official listing) | R1 | 2026-09-25 (earliest possible) | annual |
| S145 | [Vazir-Inter (Omer) font](https://github.com/OmerKurdi79/vazirinter-omer-font) | OmerKurdi79 (GitHub handle) | GitHub | Vazir-based font used in Sorani projects | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S146 | [Saber Rastikerdar](https://en.wikipedia.org/wiki/Saber_Rastikerdar) | Wikipedia contributors | Wikipedia | Designer of Vazirmatn; Kurdish support | Moderate | R1 | 2026-09-25 (earliest possible) | annual |
| S147 | [*Kurdish Sorani fonts*](https://fontadvice.com/font-collections/kurdish-sorani-fonts/) | Not identified | FontAdvice | Third-party list of Sorani-capable fonts, including Noto | Weak | R1 | 2026-09-25 (earliest possible) | annual |
| S148 | [KurdType](https://kurdtype.vercel.app/) | Not identified | KurdType | Kurdish font resource | Weak | R1 | 2026-09-25 (earliest possible) | annual |

## 11. Claude plugin platform

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S149 | [Claude Code plugins README](https://github.com/anthropics/claude-code/blob/main/plugins/README.md) | Not identified | Anthropic | Plugin structure and components | Strong (official) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S150 | [Publish a plugin](https://code.claude.com/docs/en/plugins/publish) | Not identified | Anthropic | Publishing and directory submission | Strong (official) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S151 | [Plugins reference](https://code.claude.com/docs/en/plugins-reference) | Not identified | Anthropic | Manifest fields, userConfig, skills vs agents, Claude Code-only components | Strong (official) | R1 | 2026-09-25 (earliest possible) | quarterly |
| S152 | [*Publish a plugin to the Claude marketplace*](https://systemprompt.io/guides/publish-plugin-claude-marketplace) | Not identified | SystemPrompt | Third-party publishing walkthrough | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S153 | [*Claude plugin directory submission portal*](https://aicatchup.com/news/claude-plugin-directory-submission-portal) | Not identified | AI Catchup | Directory portal opened to paid-plan developers on 25 Sep 2026 | Moderate | R1 | 2026-09-25 (earliest possible) | quarterly |
| S154 | [*Build plugins for Claude*](https://www.developersdigest.tech/blog/build-plugins-for-claude) | Not identified | Developers Digest | Third-party build guide | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |
| S155 | [*Skills vs subagents in Claude Code*](https://crystl.dev/blog/skills-vs-subagents-claude-code/) | Not identified | Crystl | Trade-offs between skills and subagents | Weak | R1 | 2026-09-25 (earliest possible) | quarterly |

## 12. Cover letters and founder observations (round 3, quick search, October 2026)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S156 | [Cover letters: just how important are they?](https://www.resumego.net/research/cover-letters/) | Not identified | ResumeGo (résumé-writing service) | Field experiment, 7,287 US applications: tailored letter 16.4% callbacks, generic 12.5%, none 10.7%; also a survey of 236 recruiters (81% value tailored letters over generic) | Vendor (field experiment) | R3-quick | 2026-10-24 | stable |
| S157 | [Are cover letters necessary?](https://resumelab.com/cover-letter/are-cover-letters-necessary) | Not identified | ResumeLab (survey run by OnePoll) | 200 US hiring decision-makers: 83% call the letter important; 77% read it even when it isn't required; only 35–38% of candidates submit one | Vendor | R3-quick | 2026-10-24 | annual |
| S158 | [Cover letter statistics](https://resumegenius.com/blog/cover-letter-help/cover-letter-statistics) | Not identified | Resume Genius | 60% of US companies require a cover letter (US hiring-manager survey) | Vendor | R3-quick | 2026-10-24 | annual |
| S159 | **EXCLUDED, not used by any file.** Founder observation (24 Oct 2026). Not a published source | The plugin founder (a job seeker, not a recruiter) | Erbil, Kurdistan Region | Iraq/Kurdistan: referral-first hiring; Telegram groups and channels as second channel, then LinkedIn and Bayt; WhatsApp/phone as the main employer contact; few or no ATS; exaggeration common | Weak (anecdote, n=1) | R3-quick | 2026-10-24 | hypothesis |

**Warning:** AI cover-letter tool blogs misquote the ResumeGo study with inflated, inconsistent figures (for example "125,000 applications, 53.3% vs 34.8%"). Cite only S156.

---

## 13. Photos, hiring discrimination and personal-data rules (round 3, October 2026)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S160 | *Are Good-Looking People More Employable?* Management Science 61(8):1760-1776 (2015). Link pending | Bradley J. Ruffle and Ze'ev Shtudiner | Ben-Gurion University / Management Science | Field experiment in Israel (5,312 CVs sent to 2,656 openings): attractive men had far higher callbacks than men with no photo; attractive women did not benefit and were penalised when firms hired directly. Photos are optional in Israel | Strong | R3 | 2026-10-24 | stable |
| S161 | *Multiple Discrimination against Female Immigrants Wearing Headscarves*, ILR Review 73(3):600-627 (2020); IZA DP 10217. Link pending | Doris Weichselbaumer | Johannes Kepler University Linz / ILR Review | German field experiment: same applicant got far fewer callbacks with a Turkish name, and fewer again with a headscarf photo. Photos are the norm in Germany | Strong | R3 | 2026-10-24 | stable |
| S162 | *Weight, attractiveness, and gender when hiring: a field experiment in Spain*, Journal of Economic Behavior & Organization (2023). Link pending | Not identified | JEBO (Elsevier) | Spanish field experiment with manipulated photos: weight and attractiveness penalties for women | Strong | R3 | 2026-10-24 | stable |
| S163 | *The impact of attractiveness on job opportunities in Italy*, Eurasian Business Review (2020). Link pending | Not identified | Springer | Italian field experiment finding an attractiveness premium | Strong | R3 | 2026-10-24 | stable |
| S164 | EEOC, *Prohibited Employment Policies/Practices*. Link pending | Not identified | US Equal Employment Opportunity Commission | Employers should not ask for a photograph before an offer; pre-employment inquiries should be limited to what is needed to judge qualifications | Strong (official guidance, not a statute) | R3 | 2026-10-24 | quarterly |
| S165 | Fair Hiring Procedure Act (Korea), English text, Art. 4-3. Link pending | Not identified | ILO NATLEX database | Bans asking for or collecting appearance, height, weight, birthplace, marital status, property and family details unless job-related; applies to employers with 30+ regular employees; ID photo still allowed | Strong (statute) | R3 | 2026-10-24 | quarterly |
| S166 | Korea fair hiring law amendments (July 2019). Link pending | Not identified | Ius Laboris | Law-firm summary of the 2019 amendments, fines and effective date (17 July 2019) | Moderate | R3 | 2026-10-24 | quarterly |
| S167 | Korea fair hiring law (2019). Link pending | Not identified | Mercer | Second law-firm/consultancy summary of the Korean amendments | Moderate | R3 | 2026-10-24 | quarterly |
| S168 | MHLW model rirekisho form (April 2021), via Aomori Labour Bureau (jsite.mhlw.go.jp). Link pending | Not identified | Japan Ministry of Health, Labour and Welfare | The official model form replaced the JIS sample: gender field optional; commuting time, dependants and spouse fields removed | Strong (official) | R3 | 2026-10-24 | quarterly |
| S169 | Report on the MHLW rirekisho form (16 April 2021). Link pending | Not identified | Nikkei | News coverage of the 2021 form change and the removal of the JIS sample (removed July 2020) | Moderate | R3 | 2026-10-24 | annual |
| S170 | Osaka Labour Bureau rirekisho template (jsite.mhlw.go.jp). Link pending | Not identified | Osaka Labour Bureau | Older JIS-format template with a photo box (36-40 mm by 24-30 mm). Whether the 2021 form specifies dimensions is unconfirmed | Strong (official, old format) | R3 | 2026-10-24 | annual |
| S171 | Rirekisho photo size guide. Link pending | Not identified | Mynavi | Common photo size 40 x 30 mm | Weak | R3 | 2026-10-24 | annual |

## 14. Cover letters, résumé length and AI signal value (round 3)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S172 | [*Signaling in the Age of AI: Evidence from Cover Letters* (arXiv 2509.25054, v2 Nov 2025)](https://arxiv.org/abs/2509.25054) | Cui, Dias and Ye | Yale University (working paper) | After Freelancer.com launched an AI bid writer (19 April 2023), tailoring rose but its link to callbacks fell by about half. Platform data, not salaried hiring | Moderate (working paper) | R3 | 2026-10-24 | stable |
| S173 | [*Making Talk Cheap: Generative AI and Labor Market Signaling* (Nov 2025)](https://jesse-silbert.github.io/website/silbert_jmp.pdf) | Galdin and Silbert | Job-market paper (Freelancer.com data) | Model and data showing that cheap AI writing weakens the value of written signals; employers lean on price and ratings | Moderate (working paper) | R3 | 2026-10-24 | stable |
| S174 | [*Algorithmic Writing Assistance on Jobseekers' Resumes Increases Hires* (NBER WP 30886, Jan 2023)](https://www.nber.org/papers/w30886) | van Inwegen, Munyikwa and Horton | NBER (arXiv 2301.08083) | Randomised field experiment with 480,948 jobseekers: non-generative writing help raised hiring probability by about 8% | Strong (randomised experiment; working paper, one platform) | R3-premium | 2026-10-24 | stable |
| S175 | *Settling the Debate: One or Two Page Resumes* (2018). Link pending | Not identified | ResumeGo | Simulation with 482 recruiters: two-page résumés preferred overall, more so for mid-level and managerial roles. Measures preference, not callbacks | Vendor | R3 | 2026-10-24 | stable |
| S176 | Accountemps executive poll on résumé length, reported secondhand. Link pending | Not identified | Accountemps (Robert Half) | 52% of senior executives rated one page ideal for staff-level roles | Weak | R3 | 2026-10-24 | annual |

## 15. Parser documentation and recruiter-layout evidence (round 3)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S177 | [Tx Platform: supported languages (v10)](https://developer.textkernel.com/tx-platform/v10/languages/) | Not identified | Textkernel | Résumé parsing covers 29 languages including Hebrew, Chinese and Japanese; Arabic is supported only for skills, professions and ontology layers, not résumé parsing | Vendor (primary documentation) | R3 | 2026-10-24 | quarterly |
| S178 | [CV Parser release notes (archive)](https://developer.textkernel.com/release-notes/master/archive/cv-parser/) | Not identified | Textkernel | Arabic OCR added May 2022; Arabic skills extraction July 2022 | Vendor (primary documentation) | R3 | 2026-10-24 | quarterly |
| S179 | [Parser product page](https://www.textkernel.com/products-solutions/parser/) | Not identified | Textkernel | Claims support for single and multi-column résumés and 70+ file formats | Vendor | R3 | 2026-10-24 | annual |
| S180 | [Parse API v9 documentation](https://developer.textkernel.com/tx-platform/v9/resume-parser/api/) | Not identified | Textkernel | Normalisation applies only to certain languages; Arabic is not among them | Vendor (primary documentation) | R3 | 2026-10-24 | quarterly |
| S181 | [Ladders updates popular recruiter eye-tracking study (6 Nov 2018)](https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html) | Not identified | Ladders (press release via PR Newswire) | 7.4-second average first screen; clear headings and bold titles did well. Sample size not disclosed. Gives the missing link for S016 | Vendor | R3 | 2026-10-24 | stable |
| S182 | [Eye-tracking study shows recruiters look at résumés for 7 seconds](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/) | Not identified | HR Dive | Independent news coverage of the Ladders study | Moderate (journalism about a vendor study) | R3 | 2026-10-24 | stable |
| S183 | StepStone eye-tracking study (Austria, 2018), reported secondhand. Link pending | Not identified | StepStone | Reported 43-second mean viewing time among 33 HR staff | Vendor (secondhand) | R3 | 2026-10-24 | stable |

## 16. Rendering tools and typography (round 3)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S184 | [IBM Plex repository](https://github.com/ibm/plex) | Not identified | IBM | Lists the scripts covered by the Plex families (including Devanagari, Cyrillic, Thai) | Strong (official) | R3 | 2026-10-24 | annual |
| S185 | [Typst 0.14.0 changelog](https://typst.app/docs/changelog/0.14.0/) | Not identified | Typst | Tagged PDF by default and PDF/UA-1 export since 0.14 | Strong (official) | R3 | 2026-10-24 | quarterly |
| S186 | [Typst issue 4225: text extraction with complex shaping](https://github.com/typst/typst/issues/4225) | Not identified | Typst (GitHub) | Text extraction can fail with complex shaping, relevant to Arabic copy/paste and parsing. Reported open as of October 2026 | Weak (issue tracker, primary) | R3 | 2026-10-24 | quarterly |
| S187 | [Typst issue 6258: Arabic in headings breaks outlines](https://github.com/typst/typst/issues/6258) | Not identified | Typst (GitHub) | Known Arabic heading/outline problem | Weak (issue tracker, primary) | R3 | 2026-10-24 | quarterly |
| S188 | [Typst issue 740: no kashida justification](https://github.com/typst/typst/issues/740) | Not identified | Typst (GitHub) | Arabic justification gap | Weak (issue tracker, primary) | R3 | 2026-10-24 | quarterly |
| S189 | [Typst open source](https://typst.app/open-source/) | Not identified | Typst | Licence and project status | Strong (official) | R3 | 2026-10-24 | annual |
| S190 | [PDF accessibility and standards (5 March 2026)](https://quarto.org/docs/blog/posts/2026-03-05-pdf-accessibility-and-standards/) | Not identified | Quarto | Reports that Typst caught every PDF/UA-1 violation veraPDF found in their tests; mentions LaTeX tagging work | Moderate | R3 | 2026-10-24 | annual |
| S191 | WeasyPrint changelog (v70.0, September 2026). Link pending | Not identified | WeasyPrint (CourtBouillon) | PDF/UA support since v57, improved in v66; RTL fixes across v65-v70; needs system Pango | Strong (official) | R3 | 2026-10-24 | quarterly |
| S192 | docx.js bidirectional support and PR 3587. Link pending | Not identified | docx (npm) maintainers | Paragraph bidirectional and run rightToLeft options; right-alignment fix in bidi paragraphs (release unverified) | Strong (official repo) | R3 | 2026-10-24 | quarterly |
| S193 | [python-docx documentation](https://python-docx.readthedocs.io/) | Not identified | python-docx | Run-level RTL and complex-script properties are native; paragraph bidi and table bidiVisual need raw XML (issues 1411, 1502) | Strong (official) | R3 | 2026-10-24 | quarterly |
| S194 | [JSON Resume schema](https://jsonresume.org/schema) | Not identified | JSON Resume | Open résumé data schema (MIT). The schema repository was archived 12 June 2026 and moved to the jsonresume.org monorepo | Strong (official) | R3 | 2026-10-24 | quarterly |
| S195 | [Typst pull request 7642 and line-breaking issues 1009 and 8959](https://github.com/typst/typst/pull/7642) | Not identified | Typst (GitHub) | CJK line breaking (kinsoku), Korean keep-all, punctuation overhang; merge status unverified | Weak (issue tracker, primary) | R3 | 2026-10-24 | quarterly |

## 17. Iraq and Kurdistan job search, wasta and CV exaggeration (round 3)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S196 | *An Assessment of the Present and Future Labor Market in the Kurdistan Region-Iraq* (RR-489-KRG, 2014). Link pending | Not identified | RAND Corporation | KRI employers recruit mostly through local informal networks and connections | Strong (commissioned research) | R3 | 2026-10-24 | stable |
| S197 | *Women's Labor Force Participation in the Kurdistan Region of Iraq*, Policy Research Working Paper 10028 (survey Aug-Sep 2018) and World Bank feature (21 March 2019). Link pending | Not identified | World Bank with KRSO | Job seekers under-use formal channels because they believe jobs come through connections; women who found work used more formal channels | Strong | R3 | 2026-10-24 | stable |
| S198 | MSME Survey, Kurdistan Region of Iraq (December 2022). Link pending | Not identified | Kurdistan Region Statistics Office / Ministry of Planning | Most firms report informal recruitment; employment centres and training institutes are not used | Strong (official statistics) | R3 | 2026-10-24 | stable |
| S199 | [*Wasta and its relationship to employment status and income in the Arab Middle East*, Current Sociology 71(5):830-847](https://doi.org/10.1177/00113921211024705) | Baranik, Gorman and Wright | Current Sociology (SAGE) | Survey of 5,622 respondents in five Arab countries linking wasta use to employment status and income | Strong | R3 | 2026-10-24 | stable |
| S200 | KRG job-matching platform launch (10 Nov 2024). Link pending | Not identified | KRG Department of Media and Information | Official announcement; private sector only at launch; about 50 companies at the launch fair | Strong (official) | R3 | 2026-10-24 | quarterly |
| S201 | Iraq and ILO job-matching platform (November 2024). Link pending | Not identified | UN Iraq / ILO | Joint launch of the MoLSA digital job-matching platform with the KRG and EU | Strong (official) | R3 | 2026-10-24 | quarterly |
| S202 | Hali Kar job portal coverage (kar.molsa.gov.krd, as reported). Link pending | Not identified | 964media | A later portal launched because the earlier one was reportedly outdated and under-used; listings limited | Moderate | R3 | 2026-10-24 | quarterly |
| S203 | KRG investment and job platforms update (March 2026): Decree 172 and Jobs.krd. Link pending | Not identified | KRG Department of Media and Information | Decree 172 (2022) requires 75% local workforce in investment projects; Jobs.krd (launched 21 Dec 2023) is a separate platform | Strong (official) | R3 | 2026-10-24 | quarterly |
| S204 | HireRight 2025 Global Benchmark Report (press release 15 Sep 2025). Link pending | Not identified | HireRight | Over three-quarters of 1,000+ screening professionals found candidate discrepancies; in EMEA, employment (64%) and education (47%) most common. Discrepancies are not the same as lying | Vendor | R3 | 2026-10-24 | annual |
| S205 | HireRight 2026 benchmark, via Employer News. Link pending | Not identified | HireRight | 90% of EMEA respondents found discrepancies; 41% found them in more than 5% of candidates (1,900+ respondents, Feb-Mar 2026) | Vendor | R3 | 2026-10-24 | annual |

## 18. Skills taxonomies and licences (round 3)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S206 | [ESCO: download and reuse](https://esco.ec.europa.eu/en/use-esco/download) | Not identified | European Commission | ESCO content is under CC BY 4.0; 28 languages including Arabic (3,039 occupations, 13,939 skills). Confirm exact licence wording before release | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S207 | [ESCO web services and API](https://esco.ec.europa.eu/en/use-esco/use-esco-services-api) | Not identified | European Commission | API software under EUPL 1.2; downloadable local API | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S208 | [O*NET database](https://www.onetcenter.org/database.html) | Not identified | O*NET Resource Center (US DOL/ETA) | Database 31.0 under CC BY 4.0, commercial use allowed with attribution | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S209 | [O*NET Web Services data licence](https://services.onetcenter.org/help/license_data) | Not identified | O*NET Resource Center (US DOL/ETA) | Web Services licence is separate: account required, data unaltered, non-transferable | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S210 | [About O*NET Web Services](https://services.onetcenter.org/about) | Not identified | O*NET Resource Center (US DOL/ETA) | API description (REST, JSON, API key) | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S211 | [Lightcast API access](https://docs.lightcast.io/lightcast-api/docs/api-access) | Not identified | Lightcast | Free public-good access for nonprofits subject to approval; commercial licence needed for production | Vendor (primary) | R3-premium | 2026-10-24 | quarterly |
| S212 | [Open Skills FAQ](https://lightcast.io/open-skills/faqs) | Not identified | Lightcast | Open Skills taxonomy browsable; usage terms | Vendor (primary) | R3-premium | 2026-10-24 | quarterly |
| S213 | [Lightcast open terms of use (v1.2)](https://legal.lightcast.io/lightcast-legal/open-terms-of-use?v=1.2) | Not identified | Lightcast | Terms for the open taxonomy | Vendor (primary) | R3-premium | 2026-10-24 | quarterly |
| S214 | [*Lightcast API*](https://jobspipe.dev/blog/lightcast-api) | Not identified | JobsPipe | Third-party claim that free access changed in April 2026 with a cap of 50 extraction calls a month. Date and cap unverified | Weak | R3-premium | 2026-10-24 | quarterly |

## 19. Premium-feature market, competitors and platform documentation (round 3, premium-feature research)

| ID | Source | Author | Organization | What it supports | Evidence | Round | Last checked | Volatility |
|---|---|---|---|---|---|---|---|---|
| S215 | [*An AI trust crisis* (November 2025)](https://www.greenhouse.com/newsroom/an-ai-trust-crisis-70-of-hiring-managers-trust-ai-to-make-faster-and-better-hiring-decisions-only-8-of-job-seekers-call-it-fair) | Not identified | Greenhouse | AI in Hiring Report (4,136 respondents): 41% of US job seekers admit prompt injection | Vendor | R3-premium | 2026-10-24 | annual |
| S216 | The Hire Standard benchmark (March 2026). Link pending | Not identified | Greenhouse | Applications per recruiter and per job rising sharply 2022-2025 (PDF and web page give different figures); 640M+ applications | Moderate (platform data) | R3-premium | 2026-10-24 | annual |
| S217 | 2025 Workforce & Hiring Report (17 July 2025). Link pending | Not identified | Greenhouse | 22% of job seekers used bots to auto-apply; 32% admitted claiming AI skills they lack; 28% used AI to generate fake work samples (2,200 respondents) | Vendor | R3-premium | 2026-10-24 | annual |
| S218 | [State of Skills-Based Hiring 2025](https://www.testgorilla.com/skills-based-hiring/state-of-skills-based-hiring-2025/) | Not identified | TestGorilla | 39% of US employers unsure résumés are accurate (seller of skills tests) | Vendor | R3-premium | 2026-10-24 | annual |
| S219 | *Skills-First: Reimagining the Labor Market and Breaking Down Barriers* (2023). Link pending | Not identified | LinkedIn Economic Graph | Skills-first approach estimated to widen eligible talent pools (simulation, not hiring outcomes) | Moderate | R3-premium | 2026-10-24 | annual |
| S220 | [Bayt CV writing service](https://www.bayt.com/en/cv-writing/) | Not identified | Bayt.com | Paid human CV writing in tiers with Arabic translation add-on; page showed conflicting availability. Vendor claims are unverified | Vendor | R3-premium | 2026-10-24 | quarterly |
| S221 | [Naukrigulf premium CV writing](https://www.naukrigulf.com/resume-services/premium-cv-writing) | Not identified | Naukrigulf | Paid CV writing, Resume Spotlight (top of recruiter search) and critique; "up to 3x views" is an unverified vendor claim | Vendor | R3-premium | 2026-10-24 | quarterly |
| S222 | [GulfTalent CV writing service](https://www.gulftalent.com/resources/candidate-services/cv-writing-service) | Not identified | GulfTalent | CV writing offered through a TopCV partnership; "double your chances" is an unverified vendor claim | Vendor | R3-premium | 2026-10-24 | quarterly |
| S223 | [Introducing the new Wuzzuf app](https://wuzzuf.net/careers/introducing-the-new-wuzzuf-app/) | Not identified | Wuzzuf | AI CV autofill, "Write for Me" and skill suggestions in the free app | Vendor | R3-premium | 2026-10-24 | quarterly |
| S224 | [Akhtaboot Cares initiative](https://www.akhtaboot.com/en/akhtaboot-cares-initiative) | Not identified | Akhtaboot | Free CV evaluation and CV-writing lectures | Vendor | R3-premium | 2026-10-24 | annual |
| S225 | [What do you get with Jobscan Premium?](https://www.jobscan.co/video-jobscan-premium) | Not identified | Jobscan | Paywalled features: full skills list, match reports, Power Edit. "75% match rate" target is an unverified vendor construct | Vendor | R3-premium | 2026-10-24 | quarterly |
| S226 | [Teal review](https://hirecarta.com/blog/teal-review) | Not identified | HireCarta | Free job matcher shows part of the keyword list; the rest is behind the paid tier | Weak | R3-premium | 2026-10-24 | quarterly |
| S227 | [Rezi review](https://scoutify.com/blog/rezi-review/) | Not identified | Scoutify | Rezi plans, prices and score | Weak | R3-premium | 2026-10-24 | quarterly |
| S228 | [Résumé builder cost comparison](https://www.resumefast.io/blog/resume-builder-cost-comparison) | Not identified | ResumeFast | Auto-renewing trials and price ranges (figures conflict across sources) | Weak | R3-premium | 2026-10-24 | quarterly |
| S229 | [Final Round AI vs Yoodli](https://www.finalroundai.com/compare/final-round-ai-vs-yoodli) | Not identified | Final Round AI | Describes a live "copilot" with stealth mode (not built by career-firm: see rejected features) | Vendor | R3-premium | 2026-10-24 | quarterly |
| S230 | [Reactive Resume](https://github.com/AmruthPillai/Reactive-Resume) | Not identified | Amruth Pillai (open source, MIT) | Open-source résumé builder with JSON export, share links and ATS readability check | Strong (official repo) | R3-premium | 2026-10-24 | quarterly |
| S231 | [CV Iraq](https://cv-iraq.com/en/) | Not identified | CV Iraq | Free builder and CV bank in Iraq | Weak | R3-premium | 2026-10-24 | annual |
| S232 | [CV Gulf: Iraq](https://www.cvgulf.com/iraq) | Not identified | CV Gulf | Paid CV writing for Iraq ($50-$90 by level, as reported) | Weak | R3-premium | 2026-10-24 | annual |
| S233 | [Plugin feature support across platforms](https://claude.com/docs/plugins/platform-support) | Not identified | Anthropic (Claude docs) | Which plugin components load in claude.ai chat, Cowork and Claude Code; agents and hooks are ignored in chat; top-level bin/ blocks install on chat and Cowork | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S234 | [Add components to a plugin](https://code.claude.com/docs/en/plugins/components) | Not identified | Anthropic (Claude Code docs) | Skills, agents (skills frontmatter field), hooks, MCP; CLAUDE.md at plugin root is not loaded | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S235 | [Microsoft 365 connector](https://claude.com/docs/connectors/microsoft/365.md) | Not identified | Anthropic (Claude docs) | Needs work or school account and tenant admin consent; writes files to SharePoint only when admins enable write actions | Strong (official) | R3-premium | 2026-10-24 | quarterly |
| S236 | [Plugin manifest reference](https://code.claude.com/docs/en/plugins-reference) | Not identified | Anthropic (Claude Code docs) | plugin.json fields, naming rules, standard layout, validation | Strong (official) | R3-premium | 2026-10-24 | quarterly |

## Regional index
| Region file | Source IDs |
|---|---|
| iraq-kri.md | S068–S079, S177–S180, S196–S205 |
| gcc.md | S067–S069, S080–S088, S117, S177–S180, S220–S222 |
| levant-egypt-maghreb.md | S063–S068, S199, S223–S224 |
| north-america-uk-anz.md | S015, S016, S019, S020, S024, S035, S040, S043–S045, S047, S052, S055, S057–S059, S089, S108, S109, S156–S158, S164, S172–S176, S181–S183, S215–S217 |
| europe.md | S044, S090, S106, S107, S115, S116, S121–S124, S161–S163, S206–S207 |
| asia.md | S091–S095, S108, S112–S114, S118–S120, S165–S171 |
| africa-latam.md | None yet (S206 and S208 give skills-taxonomy licences only) |
| un-ingo.md | S041, S042, S074 |

## Topic index (round 3 additions)
| Topic file | New source IDs |
|---|---|
| tips/photo-and-personal-data.md | S160–S171 |
| tips/cover-letters.md | S172–S174 |
| tips/writing-bullets.md | S174, S215, S217 |
| tips/ats-and-parsing.md | S177–S183 |
| tips/design-and-layout.md | S181–S183, S190 |
| tips/multilingual-typography.md | S184–S195 |
| tips/networking-and-referrals.md and tips/search-strategy.md | S196–S203 |
| skills advice (skills-advisor) | S206–S214, S218, S219 |
| plugin platform and output destinations | S233–S236 |
| competitor features and pricing | S220–S232 |

## Verification log
Add one row each time an item is verified. A "U" item becomes verified only after a row is added here and a matching source row exists above.

| Verified on | Item / source ID | Method | Verified by | Result |
|---|---|---|---|---|
| 2026-10-24 | S016 / S181 | Search match: the Ladders 2018 update press release found and recorded as S181 | Claude (web search) | Link found for the study; confirm S016 is the same document before removing its pending flag |
| 2026-10-24 | Round-3 sources S160–S236 | Captured from web search and fetched pages, October 2026 | Claude (web search) | Recorded; items marked Weak, Vendor or "unverified" stay flagged. Human spot-check still needed |

## Pending before release
- Add and verify links for: S015, S016, S017, S032, S033, S034, S036, S045, S052, S055, S056, S057, S058, S059, S066, S141.
- Review S014 and identify the issuer of S023.
- Verify S084–S088 against HRSD (Saudi Arabia) and MOHRE (UAE).
- Verify S094 (Japan form change).
- Find published sources for Iraq/KRI CV conventions (S159 was removed from use).
- Round 3 full research is done (S160–S236). Still unverified after it: university and government section rules, regional cover-letter demand, ATS primary documents, Sorani glyphs, Gulf and Iraq photo norms.
- Spot-check the new links (S160–S236) by opening each once; several were captured through search snippets and carry no link ("Link pending").
- Confirm the MHLW 2021 rirekisho photo dimensions (S168, S170, S171 disagree or are silent).
- Confirm S214 (Lightcast free-tier change, April 2026) with Lightcast directly before relying on it.
- Quarterly freshness review: see `docs/volatility-review.md` (repo, not shipped) and the last section of `docs/verification.md` (repo, not shipped).
