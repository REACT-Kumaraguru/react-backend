/**
 * REACT - Expression of Interest (Work With Us)
 * Google Apps Script Web App endpoint to:
 * 1) Store submissions in a Google Sheet
 * 2) (Optional) Save uploaded resume PDFs into Google Drive
 * 3) Send a confirmation email to the applicant
 *
 * Deploy instructions:
 * - In Apps Script: Deploy -> New deployment
 * - Type: Web app
 * - Execute as: "Me"
 * - Who has access: "Anyone" (or at least "Anyone with the link")
 * - Copy the deployed Web App URL and paste it into `InterestForm.jsx` (SCRIPT_URL)
 */

const SHEET_ID = "PUT_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Expression of Interest";

// Optional: Set this to a Drive folder where PDFs will be stored.
// If left as placeholder, resume URLs will be saved as blank.
const RESUME_FOLDER_ID = "PUT_YOUR_DRIVE_FOLDER_ID_HERE";

function doPost(e) {
  try {
    const contents = e && e.postData ? e.postData.contents : null;
    const data = contents ? JSON.parse(contents) : {};

    const timestamp = new Date();

    const fullName = safeString_(data.fullName);
    const email = safeString_(data.email);
    const phone = safeString_(data.phone);
    const preferredDomains = normalizePreferredDomains_(data.preferredDomains);
    const whyPreferRole = safeString_(data.whyPreferRole);
    const pastExperience = safeString_(data.pastExperience);
    const currentStatus = safeString_(data.currentStatus);
    const workingDetails = safeString_(data.workingDetails);
    const fresherExperience = safeString_(data.fresherExperience);
    const availability = safeString_(data.availability);

    const resume = data.resume;
    const resumeFileUrl = resume && resume.data ? saveResumeToDrive_(resume, timestamp) : "";

    const sheet = getOrCreateSheet_(SHEET_ID, SHEET_NAME);
    ensureHeaders_(sheet);

    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      preferredDomains,
      whyPreferRole,
      pastExperience,
      currentStatus,
      workingDetails,
      fresherExperience,
      availability,
      resumeFileUrl
    ]);

    sendConfirmationEmail_(email, fullName);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_(sheetId, sheetName) {
  const ss = SpreadsheetApp.openById(sheetId);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;

  sheet.appendRow([
    "Submitted At",
    "Full Name",
    "Email Address",
    "Phone Number",
    "Preferred Role / Domain(s)",
    "Why Prefer this Role",
    "Past Relevant Experience",
    "Current Status",
    "Working Details (Organization & Job Role)",
    "Fresher Experience (Internship / Part-time / Volunteer)",
    "Availability / When can you join",
    "Resume File URL"
  ]);
}

function normalizePreferredDomains_(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  return String(value);
}

function safeString_(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function saveResumeToDrive_(resume, timestamp) {
  // Resume payload shape (from frontend):
  // { name, type, data } where data is base64 content (no data URL prefix)
  const bytes = Utilities.base64Decode(resume.data);
  const mimeType = resume.type || MimeType.PDF;
  const originalName = resume.name || "resume.pdf";
  const safeName = originalName.replace(/[^\w.\- ()]/g, "_");
  const fileName = `${timestamp.toISOString().slice(0, 10)}_${safeName}`;

  if (!RESUME_FOLDER_ID || RESUME_FOLDER_ID === "PUT_YOUR_DRIVE_FOLDER_ID_HERE") {
    return "";
  }

  const folder = DriveApp.getFolderById(RESUME_FOLDER_ID);
  const blob = Utilities.newBlob(bytes, mimeType, fileName);
  const file = folder.createFile(blob);
  return file.getUrl();
}

function sendConfirmationEmail_(email, fullName) {
  if (!email || !email.includes("@")) return;

  const subject = "REACT - Expression of Interest Received";
  const greeting = fullName ? `Hi ${fullName},` : "Hello,";
  const body =
    `${greeting}\n\n` +
    "Thank you for submitting your interest. Our team will review and get back to you.\n\n" +
    "Regards,\n" +
    "REACT Team";

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}

