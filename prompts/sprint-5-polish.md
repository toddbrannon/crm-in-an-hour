# Sprint 5 — Polish & Final Validation

## What this builds
Final formatting pass on all sheets, a Start Here guide tab,
and a validation function that confirms the build is complete
and working before handoff.

## Prompt

You are building Sprint 5 of a Google Sheets CRM for a boutique
sales recruiting firm. This is the final polish sprint.
The workbook has the following sheets:
Dashboard, Companies, Settings, Archive.

COMPANIES sheet columns:
A: Company Name, B: Primary Contact Name, C: Contact Email,
D: Website, E: LinkedIn Profile, F: Pipeline Stage,
G: Potential Value, H: Deal Structure, I: Roles Needed,
J: Assigned Owner, K: Lead Source, L: Date Created,
M: Stage Entry Date, N: Days In Stage, O: Date of Last Interaction,
P: Next Action, Q: Next Action Due Date, R: Notes

Complete the following five tasks:

1. COMPANIES SHEET POLISH
- Apply alternating row banding: #F8FAFC on even rows, #FFFFFF on odd
  Only apply to rows with data — not the full sheet
- Header row (row 1): bold, background #0D1F3C, white text, height 36px
- Add a filter view covering all columns A:R
- Sort existing data by Pipeline Stage in this order:
  Currently Working (Deal Won), Booked Call, 1st Call Completed,
  Middle of Funnel (Giving Value), Past Client, Deal Lost

2. DASHBOARD POLISH
- Ensure title row background is #0D1F3C, white text, font size 20, height 52px
- Subtitle row background #1a3a5c, font color #90CAF9, font size 10
- Section headers "PIPELINE SUMMARY" and "ATTENTION REQUIRED"
  in #1E6FBF, bold, font size 10
- Stage summary table headers: background #E8F1FA, bold, #0D1F3C text
- Active Total row: background #0D1F3C, white text, bold
- Overdue table headers: background #FFEBEE, bold, #C62828 text
- Last updated timestamp: right-aligned, #90CAF9 text on #1a3a5c background

3. SETTINGS SHEET POLISH
- Header row: background #0D1F3C, white text, bold
- Add a thin border (#e0e0e0) around all data cells
- Column widths: Stage 220px, Lead Source 160px, Owner 160px

4. START HERE SHEET
Create a new sheet called "Start Here" and move it to position 1
(leftmost tab). Set tab color to #2E7D32. Hide gridlines on this sheet.

Add the following content with clean formatting:

Title (row 1, merged A:B):
"Pipeline CRM — Demo Build"
Background #0D1F3C, white text, font size 18, bold, height 48px

Subtitle (row 2, merged A:B):
"Built with Google Sheets + Apps Script  |  Sales Recruiting Pipeline Tracker"
Background #1a3a5c, font color #90CAF9, font size 10, height 28px

Content sections in column B, section labels in #1E6FBF bold font size 11:

WHAT THIS IS (row 4)
A lightweight CRM built to track deal stages, potential value, and
follow-up actions for a boutique recruiting firm. Designed for
daily use — open it every morning and know exactly who to call,
what the pipeline is worth, and what's overdue.

HOW TO USE IT (row 6)
→ Use Pipeline CRM menu → Add / Edit Company to enter records
→ Dashboard tab shows pipeline summary and overdue actions
→ Edit any Pipeline Stage cell directly — Days In Stage resets automatically
→ Use Pipeline CRM menu → Archive Record to remove closed deals

WHAT'S AUTOMATED (row 11)
→ Date Created: auto-populated on new records via sidebar
→ Stage Entry Date: auto-resets every time Pipeline Stage changes
→ Days In Stage: recalculates daily from Stage Entry Date
→ Overdue rows: amber highlight when Next Action Due Date has passed

TABS (row 16)
→ Start Here: this guide
→ Dashboard: pipeline summary and overdue flags
→ Companies: master record table — your daily working view
→ Settings: edit dropdown values here to customize
→ Archive: removed records with timestamps

5. FINAL VALIDATION — finalCheck()
Write a function called finalCheck() that logs a pass/fail
report to the console covering:

- Named ranges exist and point to correct ranges:
  STAGE_LIST → Settings!A2:A7
  LEAD_SOURCES → Settings!B2:B6
  OWNERS → Settings!C2:C2

- onEdit trigger is installed and handler is named onStageChange

- Dashboard sheet contains data in the stage summary table
  (check that B6 returns a number greater than 0)

- Companies sheet has at least one data row below the header

- Archive sheet exists and has a header row

- Settings sheet has all three columns populated

Log each check as PASS or FAIL with a brief description.
Show a toast when complete: "Final check done — see Apps Script logs"

Run finalCheck() immediately after writing it.

## Notes
- Start Here tab should feel like a welcome screen, not a spreadsheet
- Hide gridlines on Start Here only — leave them on other sheets
- The finalCheck() log is for the developer — client doesn't need to see it
- If any check fails, the log entry should describe what's missing
  so it can be fixed without re-running the full build
- Tab order after this sprint:
  Start Here → Dashboard → Companies → Settings → Archive
