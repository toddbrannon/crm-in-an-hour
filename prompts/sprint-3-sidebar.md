# Sprint 3 — Apps Script Sidebar

## What this builds
A fully functional Apps Script sidebar with Add and Edit modes,
company search and select, color-coded stage dropdown, duplicate
detection, and auto-populated timestamps on save.

## Prompt

You are building Sprint 3 of a Google Sheets CRM for a boutique
sales recruiting firm. The workbook has the following sheets:
Dashboard, Companies, Settings, Archive.

COMPANIES sheet columns:
A: Company Name, B: Primary Contact Name, C: Contact Email,
D: Website, E: LinkedIn Profile, F: Pipeline Stage,
G: Potential Value, H: Deal Structure, I: Roles Needed,
J: Assigned Owner, K: Lead Source, L: Date Created,
M: Stage Entry Date, N: Days In Stage, O: Date of Last Interaction,
P: Next Action, Q: Next Action Due Date, R: Notes

Named ranges in Settings sheet:
- STAGE_LIST → Settings!A2:A7
- LEAD_SOURCES → Settings!B2:B6
- OWNERS → Settings!C2:C2

Build a complete Apps Script sidebar with two modes:

ADD MODE:
- Form fields for all user-editable columns (skip L, M, N — script manages these)
- Validate Company Name and Pipeline Stage as required before saving
- Check for duplicate Company Name — warn user but allow override
- On save: write all fields to next empty row in Companies sheet
- Auto-populate Date Created (col L) with today's date
- Auto-populate Stage Entry Date (col M) with today's date
- Show success message and clear form after save

EDIT MODE:
- Dropdown at top of sidebar populated from column A of Companies sheet
- When company selected: load all field values into form automatically
- On save: update all editable fields in the matching row
- If Pipeline Stage has changed: reset Stage Entry Date (col M) to today
- Do NOT overwrite Date Created (col L)
- Show success message after save

FORM FIELDS (in this order):
1. Company Name (text, required)
2. Primary Contact Name (text)
3. Contact Email (email)
4. Website (text)
5. LinkedIn Profile (text)
6. Pipeline Stage (dropdown from STAGE_LIST, required)
7. Potential Value (number)
8. Deal Structure (text)
9. Roles Needed (text)
10. Assigned Owner (dropdown from OWNERS)
11. Lead Source (dropdown from LEAD_SOURCES)
12. Date of Last Interaction (date)
13. Next Action (text)
14. Next Action Due Date (date)
15. Notes (textarea, 4 rows)

DESIGN:
- Navy header (#0D1F3C) with white text "Pipeline CRM"
- Mode toggle at top: Add New | Edit Existing
- Stage dropdown options color-coded to match sheet:
  Booked Call → #E3F2FD
  1st Call Completed → #F3E5F5
  Middle of Funnel → #FFF8E1
  Currently Working → #E8F5E9
  Deal Lost → #FFEBEE
  Past Client → #F5F5F5
- Primary save button: #1E6FBF
- Success messages in green, errors in red
- Clean minimal styling, sidebar-width friendly

Create openSidebar() function that opens this sidebar.
Wire it to the custom menu item "Add / Edit Company".

## Notes
- Sidebar is HTML service — create as a separate Sidebar.html file
- All data reads/writes go through google.script.run calls
- getDropdownValues() should pull from named ranges, not hardcoded arrays
- getCompanyList() populates the Edit mode dropdown from col A
- getCompanyData(name) loads a single record for editing
- saveRecord(formData) handles both add and edit based on formData.mode
