# Sprint 4 — Triggers & Automation: onEdit Trigger & Overdue Highlighting

## What this builds
The automatic stage timestamp logic, Days In Stage formula locked in, overdue row highlighting on the Companies sheet, and the refreshDashboard function.

## Prompt

I have a Google Sheets CRM workbook.
Spreadsheet ID: [PASTE ID]

Add the following Apps Script functions:

1. ON EDIT TRIGGER — createOnEditTrigger()
Create an installable onEdit trigger (not simple) that fires 
when any cell in the Companies sheet is edited.

When the trigger fires:
- Check if the edited cell is in column F (Pipeline Stage)
- If yes: write today's date into column M (Stage Entry Date) 
  of the same row
- Write a formula into column N (Days In Stage) of the same row:
  =IF(M{row}="","",TODAY()-M{row})
- Also update column O (Date of Last Interaction) with today's date

2. DAYS IN STAGE FORMULA — fixDaysInStageFormulas()
Write the Days In Stage formula into column N for all existing 
rows that have data in column M but are missing the formula in N.
Formula: =IF(M{row}="","",TODAY()-M{row})
Run this once on all existing sample data rows.

3. OVERDUE HIGHLIGHTING — highlightOverdueRows()
Apply conditional formatting to the Companies sheet:
- If column Q (Next Action Due Date) is not empty AND 
  is less than today: highlight the entire row background #FFF3E0
- If column Q is not empty AND is less than today AND 
  Pipeline Stage is not Deal Lost or Past Client: 
  make column Q text bold and red (#C62828)

4. REFRESH DASHBOARD — refreshDashboard()
A function that:
- Recalculates all formulas on Dashboard sheet
- Updates the "Last updated" timestamp in Dashboard!H3
- Shows a toast notification "Dashboard refreshed"

5. ARCHIVE RECORD — archiveRecord()
A function that:
- Gets the active row in Companies sheet
- Copies the entire row to the Archive sheet 
  (appending to next empty row)
- Adds a timestamp in an extra column on Archive 
  (column S: "Archived On")
- Deletes the row from Companies sheet
- Shows confirmation toast

Wire refreshDashboard and archiveRecord to the 
custom menu items from Sprint 1.

After writing all functions, run fixDaysInStageFormulas() 
and highlightOverdueRows() immediately so the 
sample data looks correct.
- The trigger handler function should be named onStageChange
- highlightOverdueRows() uses whenFormulaSatisfied() with absolute
  column references ($F2, $Q2) so rules evaluate correctly per row
- Archive sheet should already exist from Sprint 1 with headers in row 1
