# Sprint 4 — Triggers & Automation

## What this builds
An installable onEdit trigger that manages stage timestamps automatically,
overdue row highlighting on the Companies sheet, an archive function,
and a dashboard refresh utility.

## Prompt

You are building Sprint 4 of a Google Sheets CRM for a boutique
sales recruiting firm. The workbook has the following sheets:
Dashboard, Companies, Settings, Archive.

COMPANIES sheet columns:
A: Company Name, B: Primary Contact Name, C: Contact Email,
D: Website, E: LinkedIn Profile, F: Pipeline Stage,
G: Potential Value, H: Deal Structure, I: Roles Needed,
J: Assigned Owner, K: Lead Source, L: Date Created,
M: Stage Entry Date, N: Days In Stage, O: Date of Last Interaction,
P: Next Action, Q: Next Action Due Date, R: Notes

Build the following four functions:

1. ONEDIT TRIGGER — installOnEditTrigger()
Create an installable onEdit trigger (not a simple trigger) that
fires when any cell in the Companies sheet is edited.

When triggered:
- Check if edited cell is in column F (Pipeline Stage)
- If yes:
  - Write today's date to column M (Stage Entry Date) same row
  - Write formula to column N (Days In Stage): =IF(M{row}="","",TODAY()-M{row})
  - Write today's date to column O (Date of Last Interaction) same row
  - Apply mm/dd/yyyy format to columns M and O

Remove any existing triggers named onStageChange before creating
a new one to prevent duplicates.

2. OVERDUE HIGHLIGHTING — highlightOverdueRows()
Apply conditional formatting rules to the Companies sheet:

Rule 1 — entire row:
- When column Q (Next Action Due Date) is not empty
  AND column Q < today
  AND column F is not "Deal Lost"
  AND column F is not "Past Client"
- Apply background #FFF8E1, font color #7B5E00
- Range: A2:R200

Rule 2 — column Q only:
- Same conditions as Rule 1
- Apply background #FFECB3, font color #C62828, bold
- Range: Q2:Q200

Clear all existing conditional format rules before applying new ones
to avoid stacking duplicates on repeat runs.

3. ARCHIVE FUNCTION — archiveRecord()
- Get the active row in the Companies sheet
- If active row is less than 2, show alert: "Please click a company row first"
- Show confirmation dialog with company name before archiving
- If confirmed:
  - Copy entire row (columns A:R) to next empty row in Archive sheet
  - Write today's date to column S of Archive row (Archived On)
  - Delete the row from Companies sheet
  - Show toast: "[Company Name] archived"

4. REFRESH DASHBOARD — refreshDashboard()
- Update the last-refreshed timestamp on the Dashboard sheet
- Target cell: H3 (or wherever the timestamp lives in your build)
- Formula: ="Last updated: "&TEXT(NOW(),"mmm d, yyyy h:mm am/pm")
- Show toast notification: "Dashboard refreshed ✓"

AFTER writing all functions:
- Run installOnEditTrigger() immediately
- Run highlightOverdueRows() immediately so existing sample data
  shows correct formatting without requiring a manual trigger

Wire archiveRecord() and refreshDashboard() to the existing
custom menu under "Pipeline CRM".

## Notes
- Use installable trigger (ScriptApp.newTrigger), not simple onEdit
- Simple onEdit triggers cannot write to other cells reliably
- The trigger handler function should be named onStageChange
- highlightOverdueRows() uses whenFormulaSatisfied() with absolute
  column references ($F2, $Q2) so rules evaluate correctly per row
- Archive sheet should already exist from Sprint 1 with headers in row 1
