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

SETTINGS SHEET — populate these named ranges with the following values:

STAGE_LIST (Settings!A2:A7):
- Booked Call
- 1st Call Completed
- Middle of Funnel (Giving Value)
- Currently Working (Deal Won)
- Deal Lost
- Past Client

LEAD_SOURCES (Settings!B2:B6):
- Cold Outreach
- Referral
- Inbound
- LinkedIn
- Event

OWNERS (Settings!C2:C2):
- [Your Name]

Label row 1 of each column: Stage, Lead Source, Owner

COMPANIES SHEET — create these columns in this exact order with bold 
headers in row 1, frozen:
A: Company Name
B: Primary Contact Name
C: Contact Email
D: Website
E: LinkedIn Profile
F: Pipeline Stage
G: Potential Value
H: Deal Structure
I: Roles Needed
J: Assigned Owner
K: Lead Source
L: Date Created
M: Stage Entry Date
N: Days In Stage
O: Date of Last Interaction
P: Next Action
Q: Next Action Due Date
R: Notes

Format column G as currency. Format columns L, M, O, Q as dates.
Column N should display as a number (integer).
Freeze row 1 and column A.
Set column widths: A=200, B=160, C=200, D=160, E=160, F=160, 
G=120, H=140, I=160, J=140, K=130, L=110, M=120, N=100, 
O=140, P=200, Q=130, R=300.

Apply color coding to column F using data validation from the named 
range STAGE_LIST. Use conditional formatting on column F:
- Booked Call → background #E3F2FD, text #1565C0
- 1st Call Completed → background #F3E5F5, text #6A1B9A
- Middle of Funnel (Giving Value) → background #FFF8E1, text #F57F17
- Currently Working (Deal Won) → background #E8F5E9, text #2E7D32
- Deal Lost → background #FFEBEE, text #C62828
- Past Client → background #F5F5F5, text #424242

Add a custom menu called "Pipeline CRM" with items:
- Add / Edit Company (calls openSidebar)
- Refresh Dashboard (calls refreshDashboard)
- Archive Record (calls archiveRecord)

Create all named ranges in the spreadsheet pointing to the correct 
Settings sheet ranges.

Print the spreadsheet ID and URL to the log when complete.

## Notes
- Named ranges must be created in the spreadsheet, not just referenced in script
- Stage Entry Date (col M) is script-managed — do not expose to users as editable
- Days In Stage (col N) should be a formula: =IF(M{row}="","",TODAY()-M{row})
