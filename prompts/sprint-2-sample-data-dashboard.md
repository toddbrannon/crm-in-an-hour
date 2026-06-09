You are building Sprint 2 of a Google Sheets CRM for a boutique 
sales recruiting firm. The workbook was created in Sprint 1 and 
has the following sheets: Dashboard, Companies, Settings, Archive.

COMPANIES sheet columns:
A: Company Name, B: Primary Contact Name, C: Contact Email,
D: Website, E: LinkedIn Profile, F: Pipeline Stage,
G: Potential Value, H: Deal Structure, I: Roles Needed,
J: Assigned Owner, K: Lead Source, L: Date Created,
M: Stage Entry Date, N: Days In Stage, O: Date of Last Interaction,
P: Next Action, Q: Next Action Due Date, R: Notes

PART 1 — INSERT SAMPLE DATA
Insert 15 realistic company records spread across all six stages:
- Booked Call: 3 records
- 1st Call Completed: 3 records
- Middle of Funnel (Giving Value): 3 records
- Currently Working (Deal Won): 2 records
- Deal Lost: 2 records
- Past Client: 2 records

Potential values between $8,000 and $45,000.
Date Created: between 5 and 60 days ago.
Stage Entry Date: after Date Created, between 1 and 30 days ago.
Next Action Due Date: 4 records overdue, remaining 2–14 days out.
Days In Stage formula for each row: =IF(M{row}="","",TODAY()-M{row})

PART 2 — BUILD THE DASHBOARD
On the Dashboard sheet build the following using SUMIF/COUNTIF 
with named ranges. Do not use QUERY.

Stage summary table:
- One row per stage in pipeline order
- Columns: Stage | # Companies | Total Value | Avg Deal Size
- Totals row for active stages only (exclude Deal Lost, Past Client)

Overdue table:
- Header row: Company | Stage | Next Action | Due Date | Days Overdue
- Pull all records where Next Action Due Date < today
  and stage is not Deal Lost or Past Client
- Days Overdue = TODAY() - Next Action Due Date
