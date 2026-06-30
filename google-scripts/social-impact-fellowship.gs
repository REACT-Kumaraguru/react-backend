/**
 * REACT - Social Impact Fellowship application receiver.
 *
 * Deploy as a Google Apps Script Web app:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Paste the deployed Web App URL into frontend/src/api/googleFormApi.js as WEBAPP_URL.
 * This script can be bound to the Google Sheet where submissions should be stored.
 */

const SPREADSHEET_ID = "1x1RGnU3zR0lirrWPe4H9hbKdqpX1rKZgFmHiCQ7GJxM";
const SHEET_NAME = "Social Impact Fellowship";

const HEADERS = [
  "Submitted At",
  "Form Type",
  "Applicant Name",
  "Email",
  "Phone",
  "Fields JSON",
  "Radio Groups JSON",
  "Checkbox Groups JSON",
  "File Names JSON",
  "Sector Interests",
  "Extracurricular Activities",
  "Technical Skills",
  "Soft Skill Ratings JSON",
  "Declarations JSON",
  "Signature JSON"
];

function doOptions() {
  return jsonResponse_({ status: "ok" });
}

function doPost(e) {
  try {
    const contents = e && e.postData && e.postData.contents ? e.postData.contents : "";
    if (!contents) throw new Error("Missing POST body");

    const data = JSON.parse(contents);
    const sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    const fields = data.fields || {};
    const applicantName = firstNonEmpty_([
      fields["Personal Information - First name"] && fields["Personal Information - Last name (as per official documents)"]
        ? fields["Personal Information - First name"] + " " + fields["Personal Information - Last name (as per official documents)"]
        : "",
      data.signature && data.signature.name
    ]);

    const row = [
      new Date(),
      safeString_(data.formType || "Social Impact Fellowship"),
      applicantName,
      safeString_(fields["Personal Information - Email address"]),
      safeString_(fields["Personal Information - Mobile number (with country code)"]),
      JSON.stringify(fields),
      JSON.stringify(data.radioGroups || {}),
      JSON.stringify(data.checkboxGroups || {}),
      JSON.stringify(data.fileNames || {}),
      joinArray_(data.sectorInterests),
      joinArray_(data.extracurricularActivities),
      joinArray_(data.technicalSkills),
      JSON.stringify(data.softSkillRatings || {}),
      JSON.stringify(data.declarations || {}),
      JSON.stringify(data.signature || {})
    ];

    sheet.appendRow(row);
    return jsonResponse_({ status: "success", message: "Saved to Google Sheet" });
  } catch (error) {
    return jsonResponse_({ status: "error", message: String(error) });
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  const firstCell = sheet.getRange(1, 1).getValue();
  if (firstCell) return;
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function firstNonEmpty_(values) {
  for (let i = 0; i < values.length; i += 1) {
    const value = safeString_(values[i]);
    if (value) return value;
  }
  return "";
}

function joinArray_(value) {
  return Array.isArray(value) ? value.map(function (item) { return String(item); }).join(", ") : safeString_(value);
}

function safeString_(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}