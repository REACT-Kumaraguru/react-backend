  /**
  * REACT - Expression of Interest (Work With Us)
  *
  * Deploy as Web app: Execute as "Me", Who has access: "Anyone"
  * Paste the Web App URL into `InterestForm.jsx` (SCRIPT_URL).
  *
  * This script must be BOUND to your Google Sheet (open the Sheet → Extensions → Apps Script).
  * Standalone scripts cannot use getActiveSpreadsheet(); use openById(SPREADSHEET_ID) instead.
  * The tab name must match SHEET_NAME (default: Sheet1).
  */

  /** Tab name in the bound spreadsheet */
  const SHEET_NAME = "Sheet1";

  /**
   * Expected columns (row 1 optional labels): Submitted At | Full Name | Email | Phone |
   * LinkedIn (required in form) | Resume file name | Resume Drive URL | Preferred role/domain | Why role | Past exp |
   * Status | Working details | Fresher exp | Availability
   * If upgrading from an older sheet without LinkedIn, insert a column E and shift the rest right.
   */

  /** Google Drive folder ID for uploaded resumes (from folder URL) */
  const RESUME_FOLDER_ID = "1BXi5LVj78CEfAOTxNAtuoVqyV5eHIrlk";

  /**
  * CORS preflight for browser fetch with Content-Type: application/json
  */
  function doOptions() {
    return jsonResponse_({ status: "ok" });
  }

  function doPost(e) {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) {
        throw new Error('Sheet not found: "' + SHEET_NAME + '"');
      }

      const contents = e && e.postData && e.postData.contents ? e.postData.contents : null;
      if (!contents) {
        throw new Error("Missing POST body");
      }

      const data = JSON.parse(contents);
      const timestamp = new Date();

      const fullName = safeString_(data.fullName);
      const email = safeString_(data.email);
      const phone = safeString_(data.phone);
      const linkedin = safeString_(data.linkedin);
      const resumeFileName = data.resume && data.resume.name ? String(data.resume.name) : "";
      const preferredDomains = normalizePreferredDomains_(data.preferredDomains);
      const whyPreferRole = safeString_(data.whyPreferRole);
      const pastExperience = safeString_(data.pastExperience);
      const currentStatus = safeString_(data.currentStatus);
      const workingDetails = safeString_(data.workingDetails);
      const fresherExperience = safeString_(data.fresherExperience);
      const availability = safeString_(data.availability);

      // Columns: A Timestamp, B Name, C Email, D Phone, E LinkedIn, F Resume filename, G Drive URL, H+ rest
      const row = [
        timestamp,
        fullName,
        email,
        phone,
        linkedin,
        resumeFileName,
        "",
        preferredDomains,
        whyPreferRole,
        pastExperience,
        currentStatus,
        workingDetails,
        fresherExperience,
        availability
      ];

      sheet.appendRow(row);

      let fileUrl = "";
      if (data.resume && data.resume.data) {
        const folder = DriveApp.getFolderById(RESUME_FOLDER_ID);
        const mimeType = data.resume.type || MimeType.PDF;
        const originalName = data.resume.name || "resume.pdf";
        const blob = Utilities.newBlob(Utilities.base64Decode(data.resume.data), mimeType, originalName);
        const file = folder.createFile(blob);
        fileUrl = file.getUrl();

        const lastRow = sheet.getLastRow();
        sheet.getRange(lastRow, 7).setValue(fileUrl);
      }

      return jsonResponse_({
        status: "success",
        message: "Saved to sheet" + (fileUrl ? " and resume stored in Drive" : "")
      });
    } catch (error) {
      return jsonResponse_({
        status: "error",
        message: String(error)
      });
    }
  }

  /**
  * Frontend sends preferredDomains as a string (text field) or legacy array.
  */
  function normalizePreferredDomains_(value) {
    if (Array.isArray(value)) return value.map(function (x) { return String(x); }).join(", ");
    if (value === null || value === undefined) return "";
    return String(value).trim();
  }

  function safeString_(value) {
    if (value === null || value === undefined) return "";
    return String(value).trim();
  }

  /**
  * JSON response with CORS headers for browser fetch from your website.
  */
  function jsonResponse_(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
  }
