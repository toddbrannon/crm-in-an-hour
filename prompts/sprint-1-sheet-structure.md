# Sprint 1 — Sheet Structure & Settings

## What this builds
The full workbook skeleton: all sheets created and ordered, 
Settings sheet populated with named ranges, Companies sheet 
with all 18 columns, headers, formatting, column widths, 
frozen rows/columns, and color-coded stage validation.

## Prompt

Build me a Google Apps Script project that creates a fully structured 
Google Sheets CRM workbook from scratch when run.

Create the following sheets in this order: Dashboard, Companies, Settings, Archive.

SETTINGS SHEET — populate these named ranges:
STAGE_LIST (Settings!A2:A7):
- Booked Call
- 1st Call Completed
- Middle of Funnel (Giving Value)
- Currently Working (Deal Won)
- Deal Lost
- Past Client

LEAD_SOURCES (Settings!B2:B6):
- Cold Outreach / Referral / Inbound / LinkedIn / Event

COMPANIES SHEET — create these columns with bold headers, frozen row 1, frozen column A:
A: Company Name, B: Primary Contact Name, C: Contact Email,
D: Website, E: LinkedIn Profile, F: Pipeline Stage,
G: Potential Value, H: Deal Structure, I: Roles Needed,
J: Assigned Owner, K: Lead Source, L: Date Created,
M: Stage Entry Date, N: Days In Stage, O: Date of Last Interaction,
P: Next Action, Q: Next Action Due Date, R: Notes

Apply color coding to Pipeline Stage column using conditional formatting:
- Booked Call → #E3F2FD / #1565C0
- 1st Call Completed → #F3E5F5 / #6A1B9A
- Middle of Funnel → #FFF8E1 / #F57F17
- Currently Working → #E8F5E9 / #2E7D32
- Deal Lost → #FFEBEE / #C62828
- Past Client → #F5F5F5 / #424242

## Notes
- Named ranges must be created in the spreadsheet, not just referenced in script
- Stage Entry Date (col M) is script-managed — do not expose to users as editable
- Days In Stage (col N) should be a formula: =IF(M{row}="","",TODAY()-M{row})
