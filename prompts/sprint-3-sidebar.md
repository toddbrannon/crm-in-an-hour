# Sprint 3 — Apps Script Sidebar Form

## What this builds
The full sidebar HTML form for adding and editing company records, 
with company search/select to load existing records.

## Prompt

I have a Google Sheets CRM workbook. 
Spreadsheet ID: [PASTE ID]

Build a complete Apps Script sidebar for this CRM. 
The sidebar should handle both ADDING new company records 
and EDITING existing ones.

SIDEBAR BEHAVIOR:

On open: show a mode selector at the top — 
  "Add New Company" | "Edit Existing Company"

When EDIT mode is selected: show a searchable dropdown 
  that populates from column A of the Companies sheet. 
  When a company is selected, load all its field values 
  into the form fields automatically.

FORM FIELDS (in this order):
1. Company Name (text, required)
2. Primary Contact Name (text)
3. Contact Email (text)
4. Website (text)
5. LinkedIn Profile (text)
6. Pipeline Stage (dropdown — from STAGE_LIST named range, required)
7. Potential Value (number)
8. Deal Structure (text)
9. Roles Needed (text)
10. Assigned Owner (dropdown — from OWNERS named range)
11. Lead Source (dropdown — from LEAD_SOURCES named range)
12. Date of Last Interaction (date)
13. Next Action (text)
14. Next Action Due Date (date)
15. Notes (textarea, 4 rows)

SAVE BEHAVIOR — ADD MODE:
- Validate Company Name and Pipeline Stage are not empty
- Check for duplicate company name — if found, warn but allow override
- Write all fields to the next empty row in Companies sheet
- Auto-populate Date Created (column L) with today's date
- Auto-populate Stage Entry Date (column M) with today's date
- Show success message, clear form

SAVE BEHAVIOR — EDIT MODE:
- Find the row by Company Name match
- Update all editable fields
- If Pipeline Stage has changed: update Stage Entry Date (column M) 
  to today's date
- Do NOT overwrite Date Created (column L)
- Show success message

DESIGN:
- Clean, minimal styling
- Navy header (#0D1F3C) with white text "Pipeline CRM"
- Use the stage colors for the Pipeline Stage dropdown options:
  Booked Call → #E3F2FD
  1st Call Completed → #F3E5F5
  Middle of Funnel → #FFF8E1
  Currently Working → #E8F5E9
  Deal Lost → #FFEBEE
  Past Client → #F5F5F5
- Primary action button in #1E6FBF
- Error messages in red, success messages in green
- Mobile-friendly sizing (sidebar is narrow)

Create the openSidebar() function that opens this sidebar, 
and wire it to the custom menu item built in Sprint 1.

## Notes
- Sidebar is HTML service — create as a separate Sidebar.html file
- All data reads/writes go through google.script.run calls
- getDropdownValues() should pull from named ranges, not hardcoded arrays
- getCompanyList() populates the Edit mode dropdown from col A
- getCompanyData(name) loads a single record for editing
- saveRecord(formData) handles both add and edit based on formData.mode
