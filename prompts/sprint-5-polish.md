# Sprint 5 — Polish & Final Validation

## What this builds
Final formatting pass, a cover sheet that explains the demo, and a usage guide tab so it looks like a real client deliverable.


## Prompt

I have a Google Sheets CRM workbook.
Spreadsheet ID: [PASTE ID]

Do a final polish pass and add two finishing elements:

1. COMPANIES SHEET POLISH
- Alternate row banding on Companies sheet 
  (light gray #F9FAFB on even rows, white on odd)
  but only on rows with data — not the full sheet
- Make sure header row (row 1) is bold, navy background 
  (#0D1F3C), white text, height 36px
- Add a filter view to the Companies sheet covering all columns
- Sort existing data by Pipeline Stage in this order:
  Currently Working, Booked Call, 1st Call Completed, 
  Middle of Funnel, Past Client, Deal Lost

2. DASHBOARD POLISH  
- Add a simple horizontal bar chart to the Dashboard sheet 
  showing pipeline value by active stage (exclude Deal Lost, 
  Past Client). Position it in columns E-H, rows 4-10.
  Chart title: "Active Pipeline Value by Stage"
  Use these bar colors matching the stage colors.

3. ADD A "START HERE" SHEET
Insert a new sheet called "Start Here" and move it 
to position 1 (leftmost tab).

Add the following content with clean formatting:

Title: "Pipeline CRM — Demo Build"
Subtitle: "Built with Google Sheets + Apps Script"

Section: WHAT THIS IS
Brief description: A lightweight company pipeline CRM 
built to track deal stages, potential value, and follow-up 
actions for a boutique recruiting firm. Designed for daily use.

Section: HOW TO USE IT
- Use Pipeline CRM menu → Add / Edit Company to enter records
- Dashboard tab shows pipeline summary and overdue actions
- Edit any Pipeline Stage cell directly — Days In Stage resets automatically
- Use Pipeline CRM menu → Archive Record to remove closed deals

Section: WHAT'S AUTOMATED
- Date Created: auto-populated on new records
- Stage Entry Date: auto-resets when Pipeline Stage changes
- Days In Stage: recalculates daily from Stage Entry Date
- Overdue highlighting: rows with past-due Next Actions turn amber

Section: TABS
- Start Here: this guide
- Dashboard: pipeline summary and overdue flags
- Companies: master record table
- Settings: dropdown values (edit here to customize)
- Archive: removed records with timestamps

Format this sheet with navy headers, clean body text, 
no gridlines visible (hide gridlines on this sheet only).

4. FINAL CHECK
Run a function called finalCheck() that:
- Confirms all named ranges exist and point to correct ranges
- Confirms the onEdit trigger is installed
- Confirms Dashboard formulas are returning values (not errors)
- Logs a pass/fail report to the console
