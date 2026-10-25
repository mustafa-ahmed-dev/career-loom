# Directory submission: answers to copy

Maintainer notes for the developer portal at https://claude.ai/directory/manage (Submit new, then Plugin bundle). Not shipped with the plugin. The portal's wording can change, so match each answer to the question it actually asks. Sources: the [pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist) and [submit guide](https://claude.com/docs/plugins/submit).

## Before you open the portal

- [ ] Repository is public (it can stay private while you validate, but must be public before the listing goes live).
- [ ] Your GitHub account is connected to claude.ai in the organization you submit from, and can push to the repo.
- [ ] `claude plugin validate plugins/career-loom --strict` passes.
- [ ] You have looked at `plugins/career-loom/assets/icon.png` one last time. The listing icon is fixed at the first save.
- [ ] You have read the Anthropic Software Directory Terms and Policy.

## 1. Source step

| Field | Enter |
|---|---|
| Repository | `mustafa-ahmed-dev/career-loom` |
| Plugin path | `plugins/career-loom` |
| Branch or tag | `main` (or leave empty to follow the default branch) |

Select **Validate**. Fix anything marked **Blocks**, push, then **Re-validate**. A result applies to one commit.

First Validate result (commit `2bdbe1d`, 2026-10-25): the repository fetched, size and file limits passed, the manifest is valid, 9 skills and 2 agents were found, there are no MCP servers, and the name and publisher checks passed. The `.gitattributes` line did not stop validation.

Findings that were reported as held for a reviewer or as warnings, and what they are:
- **`UNREAD_ASSET_REFERENCED`:** the CV renderer's scripts use bundled fonts and images, so a reviewer looks at them. Expected for a plugin that bundles fonts. No action.
- **`MCP_FORWARDS_CREDENTIAL_ENV`:** was a false positive. "tokens" in `build-gallery.mjs` means design tokens, and `$50-$90` was a price in source row S232. Both were reworded in the repo. Nothing reads or sends a credential.
- **`UNKNOWN_KEY` (`icon`, `documentationUrl`, `privacyPolicyUrl`, `supportUrl`):** fields only the directory reads. No action.
- **`RUNTIME_FETCH_EXEC` on the logo image and `ASSETS_PASSED_UNREAD`:** image files that were not read as code. No text matching a download-and-execute pattern was found in the files. No action.

After pushing a fix, select **Re-validate** on the Source step. A report applies to one commit.

## 2. Listing details step

Read-only. It comes from `plugin.json` and `plugins/career-loom/README.md`, so change those files, push and re-validate, not the form.

## 3. Data handling step

Draft answers from `plugins/career-loom/PRIVACY.md`. Check each against the live wording of the question.

| Question | Draft answer |
|---|---|
| Does the plugin read or store personal data? | **Reads: yes.** It works with the CVs, résumés and career details the user gives it in the conversation. **Stores: no.** It keeps nothing between conversations and offers a "forget me" option. |
| Does it send data to services other than its declared connectors? | **No, with two user-controlled exceptions.** (1) If the user turns on web search in Claude, search terms (not the CV) go to the search tool. (2) Only when the user asks, documents are saved to Google Drive, Microsoft 365 or Notion through connectors the user has enabled. The plugin has no server, analytics or connectors of its own. The optional CV renderer runs locally and uploads nothing. Its setup downloads npm packages, Chromium and two open-licence fonts from public hosts, with no CV content sent. |
| How long does it keep data? | **Nothing is retained by the plugin.** Data stays in the user's Claude conversation, under Claude's own retention settings. |
| Is it intended for people under 18? | **Your decision.** The plugin is written for job seekers and does not collect age. Recommended answer: **No, it is not directed at people under 18.** Choose differently if you want to market it to students or school leavers, and then check the policy for what that requires. |

## 4. Compliance step

- **Contact email:** use an address you read, where Anthropic can reach you about the submission. (Not written here because this file is public.)
- **Acknowledgements:** select all four, but read each one first. They are your confirmations, so don't tick them from this file.

## 5. Review and submit step

| Setting | Recommended |
|---|---|
| How new versions reach the directory | **GitHub push webhook** (default). It needs admin access to the repo to set up, and the directory also checks on a schedule either way. |
| Auto-publish passing versions | **Off** for the first submission. A reviewer publishes the first version anyway. Decide later once you trust the pipeline. |

Then select **Submit for review**.

## After you submit

- Follow the plugin under **Submissions** in the portal. The **Versions** tab shows the scan result for each commit.
- A passing version is not live until you select **Publish** (by default a reviewer publishes it).
- A first submission that fails the security scan is rejected. Fix it, push, then select **Resubmit for review**.
- Raise `version` in `plugin.json` with every release. Updates arrive when you merge to the tracked branch.
- To withdraw an unpublished submission or delist a live plugin, use its page in the portal.
