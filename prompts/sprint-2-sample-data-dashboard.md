# Sprint 2 - Sample Data Dashboard

## What this builds: 15 realistic sample company records spread across all six stages, 
plus the full Dashboard sheet with live formulas, 
pipeline value by stage, company counts, and overdue flags.

## Prompt

I have a Google Sheets CRM workbook with the structure below. 
Spreadsheet ID: [PASTE ID FROM SPRINT 1 LOG]

COMPANIES sheet columns:
A: Company Name, B: Primary Contact Name, C: Contact Email, 
D: Website, E: LinkedIn Profile, F: Pipeline Stage, G: Potential Value, 
H: Deal Structure, I: Roles Needed, J: Assigned Owner, K: Lead Source, 
L: Date Created, M: Stage Entry Date, N: Days In Stage (formula), 
O: Date of Last Interaction, P: Next Action, Q: Next Action Due Date, 
R: Notes

Do two things:

PART 1 — INSERT SAMPLE DATA
Insert 15 realistic company records for a boutique sales recruiting firm. 
Spread them across all six stages:
- Booked Call: 3 records
- 1st Call Completed: 3 records
- Middle of Funnel (Giving Value): 3 records
- Currently Working (Deal Won): 2 records
- Deal Lost: 2 records
- Past Client: 2 records

Make company names, contacts, and values realistic for B2B recruiting 
(staffing/recruiting firms targeting companies that need sales hires). 
Potential values between $8,000 and $45,000. 

For Date Created: spread between 45 and 5 days ago.
For Stage Entry Date: should be AFTER Date Created, 
  between 1 and 30 days ago.
For Next Action Due Date: 
  - 4 records should be OVERDUE (past today's date)
  - remaining should be 2-14 days in the future
For Date of Last Interaction: within the last 30 days.

PART 2 — BUILD THE DASHBOARD
On the Dashboard sheet, build the following using SUMIF/COUNTIF 
formulas referencing the Companies sheet. Do not use QUERY.

Layout:

Row 1: Title — "Pipeline Dashboard" — merged A1:H1, 
  large bold text, navy background (#0D1F3C), white text

Row 3: Section header "PIPELINE SUMMARY" 

Rows 4-10: Stage summary table with these columns:
  A: Stage name
  B: # Companies (COUNTIF)
  C: Total Pipeline Value (SUMIF, formatted as currency)
  D: Avg Deal Size (C/B, formatted as currency)

One row per stage in this order:
  Booked Call, 1st Call Completed, Middle of Funnel (Giving Value),
  Currently Working (Deal Won), Deal Lost, Past Client

Row 11: Totals row — sum of B and C columns for active stages only
  (exclude Deal Lost and Past Client from totals)

Row 13: Section header "ATTENTION REQUIRED"

Rows 14+: A table showing all records where Next Action Due Date 
  is not empty AND is less than today. Pull these columns:
  A: Company Name
  B: Pipeline Stage  
  C: Next Action
  D: Next Action Due Date
  E: Days Overdue (=TODAY()-due date)

Use IFERROR around all formulas. Format the overdue table rows 
with a light red background (#FFEBEE).

Add a last-refreshed timestamp in cell H3: "Last updated: [TODAY()]"
