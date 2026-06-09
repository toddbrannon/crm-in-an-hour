# Pipeline CRM — Google Sheets + Apps Script

A fully functional company pipeline CRM built in Google Sheets with Apps Script automation. Designed for small teams that need daily pipeline visibility without the overhead of a paid CRM platform.

Built for a boutique sales recruiting firm. Delivered in under an hour using a Claude-assisted micro sprint workflow.

**Total external cost to the client: $0**

---

## What This Is

A lightweight CRM that answers the questions that matter every morning:

- Who am I talking to?
- Where are they in my pipeline?
- What do I need to do today?
- What is this pipeline actually worth?

No Salesforce. No HubSpot. No monthly bill. Just a Google Sheets workbook that opens fast, updates automatically, and gets used every day.

---

## Features

- **6 pipeline stages** — color-coded, dropdown-validated, consistent across every view
- **Live dashboard** — pipeline value by stage, company count, avg deal size, active totals
- **Overdue flags** — any record with a past-due Next Action surfaces automatically on the dashboard
- **Auto-timestamps** — Date Created and Stage Entry Date populate without user input
- **Days In Stage** — resets automatically every time a stage changes via onEdit trigger
- **Sidebar form** — add and edit company records without leaving the sheet
- **Duplicate detection** — warns before saving a record that already exists
- **Archive workflow** — moves closed records out of the active view with a timestamp
- **Named ranges** — all dropdowns driven from Settings sheet, no hardcoded values in script
- **Settings sheet** — stages, lead sources, and owners fully editable without touching code

---

## Sheet Structure

| Tab | Purpose |
|---|---|
| Start Here | Usage guide, automation summary, tab overview |
| Dashboard | Pipeline summary, overdue flags, last-updated timestamp |
| Companies | Master record table — your daily working view |
| Settings | All dropdown values — edit here to customize |
| Archive | Removed records with archive timestamps |

---

## Record Fields

Each company record contains 18 fields:

| Column | Field | Notes |
|---|---|---|
| A | Company Name | Required |
| B | Primary Contact Name | |
| C | Contact Email | |
| D | Website | |
| E | LinkedIn Profile | |
| F | Pipeline Stage | Required — dropdown from Settings |
| G | Potential Value | Currency format |
| H | Deal Structure | e.g. Contingency 20% |
| I | Roles Needed | |
| J | Assigned Owner | Dropdown from Settings |
| K | Lead Source | Dropdown from Settings |
| L | Date Created | Auto-populated on save |
| M | Stage Entry Date | Script-managed — resets on stage change |
| N | Days In Stage | Formula — =IF(M{row}="","",TODAY()-M{row}) |
| O | Date of Last Interaction | Auto-updated on stage change |
| P | Next Action | |
| Q | Next Action Due Date | Drives overdue flags |
| R | Notes | |

---

## Pipeline Stages

| Stage | Meaning |
|---|---|
| Booked Call | Call scheduled, not yet held |
| 1st Call Completed | Initial conversation done |
| Middle of Funnel (Giving Value) | Active nurture / proposal stage |
| Currently Working (Deal Won) | Contract signed, work in progress |
| Deal Lost | Did not close — keep for re-engagement tracking |
| Past Client | Previously placed — relationship to maintain |

---

## The Build Workflow

This project was built using a Claude-assisted micro sprint architecture. Rather than one large prompt, the build was broken into five focused sprints — each with a specific deliverable and a tight prompt.

The sprint prompts are included in this repo and work in both Claude and Gemini inside Google Sheets.

### Sprint Overview

| Sprint | Deliverable |
|---|---|
| 1 | Sheet structure, named ranges, Settings sheet, column formatting |
| 2 | Sample data, dashboard formulas, overdue table |
| 3 | Apps Script sidebar — add and edit modes |
| 4 | onEdit triggers, stage timestamps, overdue highlighting, archive logic |
| 5 | Polish, Start Here guide, final validation |

See [`/prompts`](/prompts) for the complete prompt for each sprint.

---

## What Claude Did Before the Build Started

Before Sprint 1, the client's scope document was run through Claude for an architectural review. This caught two problems that would have caused mid-build revisions:

**Problem 1 — Missing Stage Entry Date column**
The spec called for a Days In Stage calculation but didn't include the column that makes it accurate. Without a script-managed Stage Entry Date that resets on every stage change, the calculation silently lies the moment anyone edits a stage cell. Added as a required field before any code was written.

**Problem 2 — Next Action Due Date classified as optional**
The dashboard spec required overdue next-action flags. That feature cannot be built without a due date field. The field was classified as optional in the record structure — a contradiction that would have surfaced as a change request on Day 5. Promoted to a required field at kickoff.

This is the core of the workflow: **Claude as architect first, code generator second.**

---

## How to Deploy

### Prerequisites
- A Google account
- Access to Google Sheets and Google Apps Script

### Steps

**1. Create a new Google Spreadsheet**

You can do this manually or use the Google Drive API / Claude to create it automatically.

**2. Open Apps Script**

Extensions → Apps Script

**3. Paste the build script**

- Delete the default `myFunction()` code
- Copy the contents of [`/scripts/PipelineCRM_BuildScript.gs`](/scripts/PipelineCRM_BuildScript.gs)
- Paste it into the editor
- Click Save

**4. Add the Sidebar file**

- In the left panel, click **+** next to Files → choose **HTML**
- Name it exactly `Sidebar`
- Copy the contents of [`/scripts/Sidebar.html`](/scripts/Sidebar.html)
- Paste and save

**5. Run the build**

- In the function dropdown, select `buildCRM`
- Click Run ▶
- Approve the permissions request when prompted
- Wait ~30 seconds for the completion alert

**6. You're done**

The workbook will be fully built with all sheets, formatting, named ranges, sample data, dashboard formulas, sidebar, and triggers installed.

---

## Repo Structure

```
/
├── README.md
├── prompts/
│   ├── sprint-1-sheet-structure.md
│   ├── sprint-2-sample-data-dashboard.md
│   ├── sprint-3-sidebar.md
│   ├── sprint-4-triggers-automation.md
│   └── sprint-5-polish.md
└── scripts/
    ├── PipelineCRM_BuildScript.gs
    └── Sidebar.html
```

---

## Key Technical Decisions

**Why SUMIF/COUNTIF instead of QUERY for the dashboard**
QUERY is more powerful but brittle — it references columns by letter, so inserting a column anywhere in the Companies sheet breaks dashboard formulas silently. SUMIF and COUNTIF with named ranges are more resilient and easier for non-technical users to audit.

**Why named ranges instead of hardcoded references in Apps Script**
Scripts that reference Settings!A2:A7 directly break if the Settings sheet is ever reorganized. Named ranges (STAGE_LIST, LEAD_SOURCES, OWNERS) make the system maintainable by someone who didn't build it.

**Why Stage Entry Date is script-managed and not user-editable**
If users can edit this column directly, Days In Stage becomes unreliable. The column is intentionally positioned away from daily-use columns and should be treated as read-only. The onEdit trigger owns it.

**Why the sidebar handles both add and edit from day one**
Building add-only first and adding edit later requires rebuilding the form logic. The architectural cost of doing both from the start is about 20 lines of additional script. The cost of retrofitting is a partial rebuild.

---

## The Gemini Note

These sprint prompts were also tested directly in Gemini inside Google Sheets and performed well. If you're already in the Google Workspace ecosystem, you can run the prompts natively without leaving your browser.

The workflow runs either way:
- Claude for architectural review + sprint planning → Gemini inside Sheets for execution
- Claude end-to-end outside the spreadsheet

The sprint structure is what makes it work. The prompts do the heavy lifting regardless of which model runs them.

---

## Questions or Custom Builds

If you want something like this built for your workflow, or you want to walk through the prompt architecture for a different use case, feel free to open an issue or reach out directly.

---

*Built with Claude + Google Sheets + Apps Script*
*Prompts also compatible with Gemini in Google Sheets*
