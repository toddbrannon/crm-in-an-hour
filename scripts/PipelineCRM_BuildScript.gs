// ============================================================
// PIPELINE CRM — COMPLETE BUILD SCRIPT
// Run once to build the entire workbook.
// Extensions > Apps Script > paste > Save > Run
// ============================================================
 
function buildCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.getUi().alert('Building your CRM... this will take about 30 seconds. Click OK and wait for the completion message.');
 
  // ── 1. CREATE / RESET SHEETS ──────────────────────────────
  const sheetNames = ['Start Here', 'Dashboard', 'Companies', 'Settings', 'Archive'];
  
  // Remove all existing sheets except the first (can't delete all)
  const existing = ss.getSheets();
  // Create needed sheets first
  sheetNames.forEach(name => {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });
  // Remove any sheets not in our list
  ss.getSheets().forEach(sh => {
    if (!sheetNames.includes(sh.getName())) ss.deleteSheet(sh);
  });
  // Reorder
  sheetNames.forEach((name, i) => {
    ss.setActiveSheet(ss.getSheetByName(name));
    ss.moveActiveSheet(i + 1);
  });
 
  buildSettingsSheet(ss);
  buildCompaniesSheet(ss);
  buildDashboardSheet(ss);
  buildStartHereSheet(ss);
  buildArchiveSheet(ss);
  insertSampleData(ss);
  createNamedRanges(ss);
  applyConditionalFormatting(ss);
  buildDashboardFormulas(ss);
  installOnEditTrigger();
 
  ss.setActiveSheet(ss.getSheetByName('Dashboard'));
  SpreadsheetApp.getUi().alert('✅ Pipeline CRM is ready! Check the Dashboard tab to get started.');
}
 
 
// ── SETTINGS SHEET ────────────────────────────────────────────
function buildSettingsSheet(ss) {
  const sh = ss.getSheetByName('Settings');
  sh.clearContents();
  sh.clearFormats();
  sh.setTabColor('#5c6bc0');
 
  const navyBg = '#0D1F3C';
  const white = '#FFFFFF';
 
  // Headers
  const headers = [['Stage', 'Lead Source', 'Owner']];
  sh.getRange('A1:C1').setValues(headers)
    .setBackground(navyBg).setFontColor(white)
    .setFontWeight('bold').setFontSize(11);
 
  // Stage list
  const stages = [
    ['Booked Call'],
    ['1st Call Completed'],
    ['Middle of Funnel (Giving Value)'],
    ['Currently Working (Deal Won)'],
    ['Deal Lost'],
    ['Past Client']
  ];
  sh.getRange('A2:A7').setValues(stages);
 
  // Lead sources
  const sources = [['Cold Outreach'], ['Referral'], ['Inbound'], ['LinkedIn'], ['Event']];
  sh.getRange('B2:B6').setValues(sources);
 
  // Owner
  sh.getRange('C2').setValue('Todd Brannon');
 
  sh.setColumnWidth(1, 220);
  sh.setColumnWidth(2, 160);
  sh.setColumnWidth(3, 160);
 
  // Hide gridlines feel — light alternating
  sh.getRange('A2:C7').setBorder(true, true, true, true, true, true, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
}
 
 
// ── COMPANIES SHEET ───────────────────────────────────────────
function buildCompaniesSheet(ss) {
  const sh = ss.getSheetByName('Companies');
  sh.clearContents();
  sh.clearFormats();
  sh.setTabColor('#1E6FBF');
 
  const headers = [
    'Company Name', 'Primary Contact Name', 'Contact Email',
    'Website', 'LinkedIn Profile', 'Pipeline Stage',
    'Potential Value', 'Deal Structure', 'Roles Needed',
    'Assigned Owner', 'Lead Source', 'Date Created',
    'Stage Entry Date', 'Days In Stage', 'Date of Last Interaction',
    'Next Action', 'Next Action Due Date', 'Notes'
  ];
 
  const headerRow = sh.getRange(1, 1, 1, headers.length);
  headerRow.setValues([headers])
    .setBackground('#0D1F3C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(10)
    .setVerticalAlignment('middle');
 
  sh.setRowHeight(1, 36);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);
 
  // Column widths
  const widths = [200, 160, 200, 150, 150, 170, 120, 140, 160, 140, 130, 110, 120, 100, 140, 200, 130, 280];
  widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));
 
  // Header border
  headerRow.setBorder(null, null, true, null, null, null, '#1E6FBF', SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
}
 
 
// ── DASHBOARD SHEET ───────────────────────────────────────────
function buildDashboardSheet(ss) {
  const sh = ss.getSheetByName('Dashboard');
  sh.clearContents();
  sh.clearFormats();
  sh.setTabColor('#0D1F3C');
  sh.setColumnWidth(1, 220);
  sh.setColumnWidth(2, 120);
  sh.setColumnWidth(3, 150);
  sh.setColumnWidth(4, 150);
  sh.setColumnWidth(5, 200);
  sh.setColumnWidth(6, 130);
  sh.setColumnWidth(7, 150);
  sh.setColumnWidth(8, 180);
 
  // Title bar
  sh.getRange('A1:H1').merge()
    .setValue('Pipeline Dashboard')
    .setBackground('#0D1F3C')
    .setFontColor('#FFFFFF')
    .setFontSize(20)
    .setFontWeight('bold')
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left')
    .setPaddingBottom && null;
  sh.setRowHeight(1, 52);
  sh.getRange('A1').setValue('  Pipeline Dashboard');
}
 
 
// ── START HERE SHEET ──────────────────────────────────────────
function buildStartHereSheet(ss) {
  const sh = ss.getSheetByName('Start Here');
  sh.clearContents();
  sh.clearFormats();
  sh.setTabColor('#2E7D32');
  sh.setColumnWidth(1, 180);
  sh.setColumnWidth(2, 500);
  sh.hideGridlines();
 
  const navy = '#0D1F3C';
  const accent = '#1E6FBF';
  const white = '#FFFFFF';
 
  // Title
  sh.getRange('A1:B1').merge().setValue('Pipeline CRM — Demo Build')
    .setBackground(navy).setFontColor(white)
    .setFontSize(18).setFontWeight('bold')
    .setVerticalAlignment('middle').setHorizontalAlignment('left');
  sh.getRange('A1').setValue('   Pipeline CRM — Demo Build');
  sh.setRowHeight(1, 48);
 
  sh.getRange('A2:B2').merge().setValue('Built with Google Sheets + Apps Script  |  Sales Recruiting Pipeline Tracker')
    .setBackground('#1a3a5c').setFontColor('#90CAF9')
    .setFontSize(10).setHorizontalAlignment('left');
  sh.getRange('A2').setValue('   Built with Google Sheets + Apps Script  |  Sales Recruiting Pipeline Tracker');
  sh.setRowHeight(2, 28);
 
  const sections = [
    [4,  'WHAT THIS IS', accent, true],
    [5,  'A lightweight CRM built to track deal stages, potential value, and follow-up actions for a boutique recruiting firm. Designed for daily use — open it every morning and know exactly who to call, what the pipeline is worth, and what\'s overdue.', null, false],
    [7,  'HOW TO USE IT', accent, true],
    [8,  '→  Use Pipeline CRM menu → Add / Edit Company to enter records', null, false],
    [9,  '→  Dashboard tab shows pipeline summary and overdue actions', null, false],
    [10, '→  Edit any Pipeline Stage cell directly — Days In Stage resets automatically', null, false],
    [11, '→  Use Pipeline CRM menu → Archive Record to remove closed deals', null, false],
    [13, 'WHAT\'S AUTOMATED', accent, true],
    [14, '→  Date Created: auto-populated on new records via sidebar', null, false],
    [15, '→  Stage Entry Date: auto-resets every time Pipeline Stage changes', null, false],
    [16, '→  Days In Stage: recalculates daily from Stage Entry Date', null, false],
    [17, '→  Overdue rows: amber highlight when Next Action Due Date has passed', null, false],
    [19, 'TABS', accent, true],
    [20, '→  Start Here: this guide', null, false],
    [21, '→  Dashboard: pipeline summary and overdue flags', null, false],
    [22, '→  Companies: master record table (your daily working view)', null, false],
    [23, '→  Settings: edit dropdown values here to customize', null, false],
    [24, '→  Archive: removed records with timestamps', null, false],
  ];
 
  sections.forEach(([row, text, color, bold]) => {
    const cell = sh.getRange(`B${row}`);
    cell.setValue(text).setFontSize(10).setWrap(true);
    if (color) cell.setFontColor(color).setFontWeight('bold').setFontSize(11);
    if (bold && !color) cell.setFontWeight('bold');
    sh.setRowHeight(row, bold ? 28 : 22);
  });
 
  sh.setTabColor('#2E7D32');
}
 
 
// ── ARCHIVE SHEET ─────────────────────────────────────────────
function buildArchiveSheet(ss) {
  const sh = ss.getSheetByName('Archive');
  sh.clearContents();
  sh.clearFormats();
  sh.setTabColor('#757575');
 
  const headers = [
    'Company Name', 'Primary Contact Name', 'Contact Email',
    'Website', 'LinkedIn Profile', 'Pipeline Stage',
    'Potential Value', 'Deal Structure', 'Roles Needed',
    'Assigned Owner', 'Lead Source', 'Date Created',
    'Stage Entry Date', 'Days In Stage', 'Date of Last Interaction',
    'Next Action', 'Next Action Due Date', 'Notes', 'Archived On'
  ];
 
  sh.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#424242').setFontColor('#FFFFFF')
    .setFontWeight('bold').setFontSize(10);
  sh.setFrozenRows(1);
}
 
 
// ── SAMPLE DATA ───────────────────────────────────────────────
function insertSampleData(ss) {
  const sh = ss.getSheetByName('Companies');
  const today = new Date();
 
  function daysAgo(n) {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  }
  function daysFromNow(n) {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d;
  }
 
  // [Company, Contact, Email, Website, LinkedIn, Stage, Value, DealStructure, RolesNeeded, Owner, LeadSource, DateCreated, StageEntryDate, DaysInStage(formula), LastInteraction, NextAction, NextActionDue, Notes]
  const data = [
    // Booked Call (3)
    ['Apex Revenue Solutions', 'Marcus Webb', 'mwebb@apexrevenue.com', 'apexrevenue.com', 'linkedin.com/in/marcuswebb', 'Booked Call', 18000, 'Contingency 20%', 'VP of Sales', 'Todd Brannon', 'Cold Outreach', daysAgo(5), daysAgo(5), '', daysAgo(1), 'Send pre-call research brief', daysFromNow(1), 'Scaling sales team after Series B. Looking for enterprise AEs.'],
    ['Meridian Growth Partners', 'Sarah Okonkwo', 'sokonkwo@meridiangp.com', 'meridiangp.com', 'linkedin.com/in/sarahokonkwo', 'Booked Call', 24000, 'Contingency 22%', 'Director of Business Development', 'Todd Brannon', 'LinkedIn', daysAgo(8), daysAgo(8), '', daysAgo(2), 'Confirm call logistics', daysFromNow(2), 'PE-backed firm. Urgent need for BD leader.'],
    ['Vantage Point Staffing', 'Derek Holt', 'dholt@vantagept.com', 'vantagept.com', '', 'Booked Call', 15000, 'Retained 33%', 'Senior Account Executive', 'Todd Brannon', 'Referral', daysAgo(3), daysAgo(3), '', daysAgo(1), 'Review job description they sent', daysFromNow(3), 'Referred by Marcus Webb. SMB focus.'],
 
    // 1st Call Completed (3)
    ['Cornerstone Tech Group', 'Amanda Reyes', 'areyes@cornerstonetech.com', 'cornerstonetech.com', 'linkedin.com/in/amandareyes', '1st Call Completed', 32000, 'Contingency 20%', 'Regional Sales Manager', 'Todd Brannon', 'Cold Outreach', daysAgo(18), daysAgo(10), '', daysAgo(4), 'Send capability deck + two comp packages', daysFromNow(-2), 'Strong fit. Wants 2 candidates by end of month. OVERDUE.'],
    ['BlueShift Analytics', 'Ryan Patel', 'rpatel@blueshiftai.com', 'blueshiftai.com', 'linkedin.com/in/ryanpatel', '1st Call Completed', 28500, 'Contingency 18%', 'Sales Engineer', 'Todd Brannon', 'Inbound', daysAgo(14), daysAgo(7), '', daysAgo(3), 'Schedule follow-up with hiring manager', daysFromNow(4), 'Technical sale. Needs SE with SaaS background.'],
    ['Frontier Industrial Supply', 'Cynthia Park', 'cpark@frontierind.com', 'frontierind.com', '', '1st Call Completed', 19500, 'Contingency 20%', 'Outside Sales Rep', 'Todd Brannon', 'Cold Outreach', daysAgo(20), daysAgo(12), '', daysAgo(5), 'Send 3 candidate profiles for review', daysFromNow(-3), 'Manufacturing vertical. Comp $75-85k base. OVERDUE.'],
 
    // Middle of Funnel (3)
    ['Nexus Capital Advisors', 'Jonathan Mills', 'jmills@nexuscap.com', 'nexuscap.com', 'linkedin.com/in/jonathanmills', 'Middle of Funnel (Giving Value)', 42000, 'Retained 25%', 'Head of Sales', 'Todd Brannon', 'Referral', daysAgo(35), daysAgo(18), '', daysAgo(2), 'Share final 2 candidate shortlist', daysFromNow(5), 'Actively interviewing. Decision expected next week.'],
    ['Summit Logistics Corp', 'Brianna Foster', 'bfoster@summitlogistics.com', 'summitlogistics.com', 'linkedin.com/in/briannafoster', 'Middle of Funnel (Giving Value)', 22000, 'Contingency 20%', 'National Accounts Manager', 'Todd Brannon', 'LinkedIn', daysAgo(28), daysAgo(14), '', daysAgo(1), 'Check in on candidate interview feedback', daysFromNow(7), 'Two candidates in final round. Good momentum.'],
    ['TrueNorth SaaS', 'Kevin Zhao', 'kzhao@truenorthsaas.com', 'truenorthsaas.com', 'linkedin.com/in/kevinzhao', 'Middle of Funnel (Giving Value)', 35000, 'Contingency 22%', 'Enterprise AE (x2)', 'Todd Brannon', 'Cold Outreach', daysAgo(30), daysAgo(20), '', daysAgo(6), 'Prep counteroffer guidance for candidate', daysFromNow(-1), 'Offer extended to top candidate. Watching for counteroffer. OVERDUE.'],
 
    // Currently Working / Deal Won (2)
    ['Reliant Medical Devices', 'Patricia Nguyen', 'pnguyen@reliantmed.com', 'reliantmed.com', 'linkedin.com/in/patriciangu', 'Currently Working (Deal Won)', 38000, 'Retained 25% — $9,500 upfront', 'VP of Sales — Medical Devices', 'Todd Brannon', 'Referral', daysAgo(55), daysAgo(22), '', daysAgo(1), 'Coordinate start date with candidate + client', daysFromNow(3), 'Contract signed. Candidate starts July 7. Collecting final invoice.'],
    ['Clearpath Financial Group', 'Thomas Barrett', 'tbarrett@clearpathfin.com', 'clearpathfin.com', '', 'Currently Working (Deal Won)', 29000, 'Contingency 20% — invoiced', 'Senior Sales Consultant', 'Todd Brannon', 'Cold Outreach', daysAgo(45), daysAgo(15), '', daysAgo(2), 'Confirm 30-day check-in call', daysFromNow(10), 'Placed. Candidate in 2nd week. Guarantee period tracking.'],
 
    // Deal Lost (2)
    ['Cascade Retail Solutions', 'Monica Stern', 'mstern@cascaderetail.com', 'cascaderetail.com', '', 'Deal Lost', 16000, 'Contingency 20%', 'Regional Sales Director', 'Todd Brannon', 'Cold Outreach', daysAgo(60), daysAgo(40), '', daysAgo(25), '', '', 'Went with internal hire after 3 rounds. Keep warm for Q4.'],
    ['Halo Software Inc', 'Greg Simmons', 'gsimmons@halosoftware.com', 'halosoftware.com', 'linkedin.com/in/gregsimmons', 'Deal Lost', 21000, 'Contingency 18%', 'Sales Development Manager', 'Todd Brannon', 'LinkedIn', daysAgo(50), daysAgo(35), '', daysAgo(20), '', '', 'Budget cut. Hiring freeze until Q1. Circle back October.'],
 
    // Past Client (2)
    ['Ironclad Manufacturing', 'Diane Wolfe', 'dwolfe@ironcladmfg.com', 'ironcladmfg.com', '', 'Past Client', 27000, 'Contingency 20% — paid', 'District Sales Manager', 'Todd Brannon', 'Referral', daysAgo(180), daysAgo(160), '', daysAgo(90), 'Quarterly check-in', daysFromNow(14), 'Placed 2 reps last year. Strong relationship. Follow up for new headcount Q3.'],
    ['Pacific Rim Distributors', 'Alan Torres', 'atorres@pacificrimdist.com', 'pacificrimdist.com', 'linkedin.com/in/alantorres', 'Past Client', 19000, 'Contingency 20% — paid', 'Inside Sales Rep (x2)', 'Todd Brannon', 'Cold Outreach', daysAgo(240), daysAgo(220), '', daysAgo(60), 'Send holiday touchpoint + case study', daysFromNow(21), 'Expanding warehouse ops. New sales roles expected late summer.'],
  ];
 
  // Write data rows
  data.forEach((row, i) => {
    const r = i + 2;
    const range = sh.getRange(r, 1, 1, 18);
    // Set non-formula columns
    const rowData = [...row];
    rowData[13] = ''; // Days In Stage — will be formula
    range.setValues([rowData]);
 
    // Format date columns
    sh.getRange(r, 12).setNumberFormat('mm/dd/yyyy'); // Date Created
    sh.getRange(r, 13).setNumberFormat('mm/dd/yyyy'); // Stage Entry Date
    sh.getRange(r, 15).setNumberFormat('mm/dd/yyyy'); // Last Interaction
    sh.getRange(r, 17).setNumberFormat('mm/dd/yyyy'); // Next Action Due
 
    // Days In Stage formula
    if (row[12]) { // if Stage Entry Date exists
      sh.getRange(r, 14).setFormula(`=IF(M${r}="","",TODAY()-M${r})`);
    }
 
    // Currency format for Potential Value
    sh.getRange(r, 7).setNumberFormat('$#,##0');
 
    // Alternating row banding
    if (i % 2 === 0) {
      sh.getRange(r, 1, 1, 18).setBackground('#F8FAFC');
    } else {
      sh.getRange(r, 1, 1, 18).setBackground('#FFFFFF');
    }
  });
}
 
 
// ── NAMED RANGES ──────────────────────────────────────────────
function createNamedRanges(ss) {
  // Remove existing named ranges to avoid duplicates
  ss.getNamedRanges().forEach(nr => nr.remove());
 
  const settings = ss.getSheetByName('Settings');
  ss.setNamedRange('STAGE_LIST',    settings.getRange('A2:A7'));
  ss.setNamedRange('LEAD_SOURCES',  settings.getRange('B2:B6'));
  ss.setNamedRange('OWNERS',        settings.getRange('C2:C2'));
}
 
 
// ── CONDITIONAL FORMATTING ────────────────────────────────────
function applyConditionalFormatting(ss) {
  const sh = ss.getSheetByName('Companies');
  const maxRow = 200;
 
  // Clear existing rules
  sh.clearConditionalFormatRules();
  const rules = [];
 
  // Stage color coding on column F
  const stageColors = [
    ['Booked Call',                   '#E3F2FD', '#1565C0'],
    ['1st Call Completed',            '#F3E5F5', '#6A1B9A'],
    ['Middle of Funnel (Giving Value)','#FFF8E1', '#F57F17'],
    ['Currently Working (Deal Won)',  '#E8F5E9', '#2E7D32'],
    ['Deal Lost',                     '#FFEBEE', '#C62828'],
    ['Past Client',                   '#F5F5F5', '#424242'],
  ];
 
  stageColors.forEach(([stage, bg, fg]) => {
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(stage)
      .setBackground(bg)
      .setFontColor(fg)
      .setRanges([sh.getRange(`F2:F${maxRow}`)])
      .build());
  });
 
  // Overdue row highlight — amber when Next Action Due Date < today
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=AND($Q2<>"",($Q2)<TODAY(),$F2<>"Deal Lost",$F2<>"Past Client")`)
    .setBackground('#FFF8E1')
    .setFontColor('#7B5E00')
    .setRanges([sh.getRange(`A2:R${maxRow}`)])
    .build());
 
  // Overdue — make col Q bold red
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=AND($Q2<>"",($Q2)<TODAY(),$F2<>"Deal Lost",$F2<>"Past Client")`)
    .setBackground('#FFECB3')
    .setFontColor('#C62828')
    .setBold(true)
    .setRanges([sh.getRange(`Q2:Q${maxRow}`)])
    .build());
 
  sh.setConditionalFormatRules(rules);
}
 
 
// ── DASHBOARD FORMULAS ────────────────────────────────────────
function buildDashboardFormulas(ss) {
  const sh = ss.getSheetByName('Dashboard');
 
  // Subtitle row
  sh.getRange('A2').setValue('  Your pipeline at a glance. Refreshes with live data.')
    .setFontColor('#90CAF9').setFontSize(10).setBackground('#1a3a5c');
  sh.getRange('A2:H2').setBackground('#1a3a5c');
  sh.setRowHeight(2, 26);
 
  // Spacer
  sh.setRowHeight(3, 16);
 
  // Section header — Pipeline Summary
  sh.getRange('A4').setValue('PIPELINE SUMMARY')
    .setFontColor('#1E6FBF').setFontWeight('bold').setFontSize(10);
  sh.setRowHeight(4, 28);
 
  // Table headers
  const tableHeaders = [['Stage', '# Companies', 'Total Value', 'Avg Deal Size']];
  sh.getRange('A5:D5').setValues(tableHeaders)
    .setBackground('#E8F1FA').setFontWeight('bold').setFontSize(10)
    .setFontColor('#0D1F3C').setBorder(null, null, true, null, null, null, '#1E6FBF', SpreadsheetApp.BorderStyle.SOLID);
  sh.setRowHeight(5, 28);
 
  // Stage rows
  const stages = [
    'Booked Call',
    '1st Call Completed',
    'Middle of Funnel (Giving Value)',
    'Currently Working (Deal Won)',
    'Deal Lost',
    'Past Client'
  ];
 
  const stageBgs = ['#E3F2FD','#F3E5F5','#FFF8E1','#E8F5E9','#FFEBEE','#F5F5F5'];
  const stageFgs = ['#1565C0','#6A1B9A','#F57F17','#2E7D32','#C62828','#424242'];
 
  stages.forEach((stage, i) => {
    const row = 6 + i;
    sh.getRange(row, 1).setValue(stage).setFontColor(stageFgs[i]).setFontWeight('bold').setFontSize(10);
    sh.getRange(row, 1).setBackground(stageBgs[i]);
    sh.getRange(row, 2).setFormula(`=COUNTIF(Companies!F:F,"${stage}")`).setHorizontalAlignment('center').setFontSize(10);
    sh.getRange(row, 3).setFormula(`=SUMIF(Companies!F:F,"${stage}",Companies!G:G)`).setNumberFormat('$#,##0').setFontSize(10);
    sh.getRange(row, 4).setFormula(`=IFERROR(C${row}/B${row},"—")`).setNumberFormat('$#,##0').setFontSize(10);
    sh.setRowHeight(row, 26);
  });
 
  // Totals row (active stages only — exclude Deal Lost, Past Client)
  const totalsRow = 12;
  sh.getRange(totalsRow, 1).setValue('ACTIVE TOTAL').setFontWeight('bold').setFontSize(10).setBackground('#0D1F3C').setFontColor('#FFFFFF');
  sh.getRange(totalsRow, 2).setFormula('=SUM(B6:B9)').setFontWeight('bold').setHorizontalAlignment('center').setBackground('#0D1F3C').setFontColor('#FFFFFF').setFontSize(10);
  sh.getRange(totalsRow, 3).setFormula('=SUM(C6:C9)').setNumberFormat('$#,##0').setFontWeight('bold').setBackground('#0D1F3C').setFontColor('#FFFFFF').setFontSize(10);
  sh.getRange(totalsRow, 4).setFormula('=IFERROR(C12/B12,"—")').setNumberFormat('$#,##0').setBackground('#0D1F3C').setFontColor('#FFFFFF').setFontSize(10);
  sh.setRowHeight(totalsRow, 30);
 
  // Spacer
  sh.setRowHeight(13, 20);
 
  // Section header — Attention Required
  sh.getRange('A14').setValue('ATTENTION REQUIRED — OVERDUE NEXT ACTIONS')
    .setFontColor('#C62828').setFontWeight('bold').setFontSize(10);
  sh.setRowHeight(14, 28);
 
  // Overdue table headers
  sh.getRange('A15:E15').setValues([['Company', 'Stage', 'Next Action', 'Due Date', 'Days Overdue']])
    .setBackground('#FFEBEE').setFontWeight('bold').setFontSize(10).setFontColor('#C62828')
    .setBorder(null, null, true, null, null, null, '#C62828', SpreadsheetApp.BorderStyle.SOLID);
  sh.setRowHeight(15, 28);
 
  // Overdue data rows using IFERROR + FILTER approach via formula
  sh.getRange('A16').setFormula(
    `=IFERROR(FILTER(Companies!A2:A200,Companies!Q2:Q200<TODAY(),Companies!Q2:Q200<>"",Companies!F2:F200<>"Deal Lost",Companies!F2:F200<>"Past Client"),"No overdue items — you're all caught up!")`
  ).setFontSize(10);
  sh.getRange('B16').setFormula(
    `=IFERROR(FILTER(Companies!F2:F200,Companies!Q2:Q200<TODAY(),Companies!Q2:Q200<>"",Companies!F2:F200<>"Deal Lost",Companies!F2:F200<>"Past Client"),"")`
  ).setFontSize(10);
  sh.getRange('C16').setFormula(
    `=IFERROR(FILTER(Companies!P2:P200,Companies!Q2:Q200<TODAY(),Companies!Q2:Q200<>"",Companies!F2:F200<>"Deal Lost",Companies!F2:F200<>"Past Client"),"")`
  ).setFontSize(10);
  sh.getRange('D16').setFormula(
    `=IFERROR(FILTER(Companies!Q2:Q200,Companies!Q2:Q200<TODAY(),Companies!Q2:Q200<>"",Companies!F2:F200<>"Deal Lost",Companies!F2:F200<>"Past Client"),"")`
  ).setNumberFormat('mm/dd/yyyy').setFontSize(10);
  sh.getRange('E16').setFormula(
    `=IFERROR(FILTER(TODAY()-Companies!Q2:Q200,Companies!Q2:Q200<TODAY(),Companies!Q2:Q200<>"",Companies!F2:F200<>"Deal Lost",Companies!F2:F200<>"Past Client"),"")`
  ).setFontSize(10);
 
  // Last updated
  sh.getRange('G2').setFormula('="Last updated: "&TEXT(NOW(),"mmm d, yyyy")')
    .setFontColor('#90CAF9').setFontSize(9).setHorizontalAlignment('right').setBackground('#1a3a5c');
  sh.getRange('H2').setBackground('#1a3a5c');
}
 
 
// ── ONEDIT TRIGGER ────────────────────────────────────────────
function installOnEditTrigger() {
  // Remove existing onEdit triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'onStageChange') {
      ScriptApp.deleteTrigger(t);
    }
  });
  ScriptApp.newTrigger('onStageChange')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onEdit()
    .create();
}
 
function onStageChange(e) {
  if (!e) return;
  const sh = e.source.getActiveSheet();
  if (sh.getName() !== 'Companies') return;
  const col = e.range.getColumn();
  const row = e.range.getRow();
  if (row < 2) return;
 
  // Column 6 = Pipeline Stage
  if (col === 6) {
    sh.getRange(row, 13).setValue(new Date()); // Stage Entry Date
    sh.getRange(row, 13).setNumberFormat('mm/dd/yyyy');
    sh.getRange(row, 14).setFormula(`=IF(M${row}="","",TODAY()-M${row})`); // Days In Stage
    sh.getRange(row, 15).setValue(new Date()); // Date of Last Interaction
    sh.getRange(row, 15).setNumberFormat('mm/dd/yyyy');
  }
}
 
 
// ── SIDEBAR ───────────────────────────────────────────────────
function openSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Pipeline CRM')
    .setWidth(320);
  SpreadsheetApp.getUi().showSidebar(html);
}
 
function refreshDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dash = ss.getSheetByName('Dashboard');
  dash.getRange('G2').setFormula('="Last updated: "&TEXT(NOW(),"mmm d, yyyy h:mm am/pm")');
  SpreadsheetApp.getActiveSpreadsheet().toast('Dashboard refreshed ✓', 'Pipeline CRM', 3);
}
 
function archiveRecord() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const companies = ss.getSheetByName('Companies');
  const archive = ss.getSheetByName('Archive');
  const activeRow = companies.getActiveCell().getRow();
 
  if (activeRow < 2) {
    SpreadsheetApp.getUi().alert('Please click on a company row first, then use Archive Record.');
    return;
  }
 
  const ui = SpreadsheetApp.getUi();
  const companyName = companies.getRange(activeRow, 1).getValue();
  const confirm = ui.alert(`Archive "${companyName}"?`, 'This will move the record to the Archive tab.', ui.ButtonSet.YES_NO);
  if (confirm !== ui.Button.YES) return;
 
  const rowData = companies.getRange(activeRow, 1, 1, 18).getValues()[0];
  rowData.push(new Date()); // Archived On timestamp
  archive.appendRow(rowData);
  companies.deleteRow(activeRow);
  ss.toast(`"${companyName}" archived ✓`, 'Pipeline CRM', 3);
}
 
// ── CUSTOM MENU ───────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Pipeline CRM')
    .addItem('Add / Edit Company', 'openSidebar')
    .addSeparator()
    .addItem('Refresh Dashboard', 'refreshDashboard')
    .addItem('Archive Record', 'archiveRecord')
    .addToUi();
}
 
// ── SIDEBAR DATA HELPERS ──────────────────────────────────────
function getCompanyList() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Companies');
  const data = sh.getRange('A2:A200').getValues().flat().filter(v => v !== '');
  return data;
}
 
function getDropdownValues() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    stages: ss.getSheetByName('Settings').getRange('A2:A7').getValues().flat().filter(v => v),
    sources: ss.getSheetByName('Settings').getRange('B2:B6').getValues().flat().filter(v => v),
    owners: ss.getSheetByName('Settings').getRange('C2:C2').getValues().flat().filter(v => v),
  };
}
 
function getCompanyData(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Companies');
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      return {
        row: i + 1,
        companyName: data[i][0], contactName: data[i][1], email: data[i][2],
        website: data[i][3], linkedin: data[i][4], stage: data[i][5],
        value: data[i][6], dealStructure: data[i][7], rolesNeeded: data[i][8],
        owner: data[i][9], leadSource: data[i][10],
        lastInteraction: data[i][14] ? Utilities.formatDate(new Date(data[i][14]), Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
        nextAction: data[i][15],
        nextActionDue: data[i][16] ? Utilities.formatDate(new Date(data[i][16]), Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
        notes: data[i][17],
      };
    }
  }
  return null;
}
 
function saveRecord(formData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('Companies');
  const today = new Date();
 
  const row = [
    formData.companyName, formData.contactName, formData.email,
    formData.website, formData.linkedin, formData.stage,
    parseFloat(formData.value) || 0, formData.dealStructure, formData.rolesNeeded,
    formData.owner, formData.leadSource,
    today,       // Date Created (col L)
    today,       // Stage Entry Date (col M)
    '',          // Days In Stage (col N — formula written below)
    formData.lastInteraction ? new Date(formData.lastInteraction) : '',
    formData.nextAction,
    formData.nextActionDue ? new Date(formData.nextActionDue) : '',
    formData.notes,
  ];
 
  if (formData.mode === 'add') {
    // Duplicate check
    const existing = sh.getRange('A2:A200').getValues().flat();
    if (existing.includes(formData.companyName)) {
      return { success: false, message: `"${formData.companyName}" already exists. Edit that record instead.` };
    }
    sh.appendRow(row);
    const newRow = sh.getLastRow();
    sh.getRange(newRow, 7).setNumberFormat('$#,##0');
    sh.getRange(newRow, 12).setNumberFormat('mm/dd/yyyy');
    sh.getRange(newRow, 13).setNumberFormat('mm/dd/yyyy');
    sh.getRange(newRow, 14).setFormula(`=IF(M${newRow}="","",TODAY()-M${newRow})`);
    sh.getRange(newRow, 15).setNumberFormat('mm/dd/yyyy');
    sh.getRange(newRow, 17).setNumberFormat('mm/dd/yyyy');
  } else {
    // Edit mode — find and update
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === formData.originalName) {
        const r = i + 1;
        const stageChanged = data[i][5] !== formData.stage;
        sh.getRange(r, 2).setValue(formData.contactName);
        sh.getRange(r, 3).setValue(formData.email);
        sh.getRange(r, 4).setValue(formData.website);
        sh.getRange(r, 5).setValue(formData.linkedin);
        sh.getRange(r, 6).setValue(formData.stage);
        sh.getRange(r, 7).setValue(parseFloat(formData.value) || 0);
        sh.getRange(r, 8).setValue(formData.dealStructure);
        sh.getRange(r, 9).setValue(formData.rolesNeeded);
        sh.getRange(r, 10).setValue(formData.owner);
        sh.getRange(r, 11).setValue(formData.leadSource);
        if (stageChanged) sh.getRange(r, 13).setValue(today);
        if (formData.lastInteraction) sh.getRange(r, 15).setValue(new Date(formData.lastInteraction));
        sh.getRange(r, 16).setValue(formData.nextAction);
        if (formData.nextActionDue) sh.getRange(r, 17).setValue(new Date(formData.nextActionDue));
        sh.getRange(r, 18).setValue(formData.notes);
        break;
      }
    }
  }
  return { success: true, message: `"${formData.companyName}" saved successfully.` };
}
