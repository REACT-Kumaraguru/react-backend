const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbx9wQXkZ1ahXWlIjoub-XJdmjzt892rRCO81kKU6lYB1nkjhCCuuPoLiuIqLuhqow3HOQ/exec";

// Deploy google-scripts/social-impact-fellowship.gs as a standalone Web App
// (script.google.com → New project → paste code → Deploy → Web App → Execute as Me, Anyone)
// then paste the /exec URL below.
const SIF_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbydUbsNuOwVTxBAK84LVljXVpLR5ZElf094XyE4p71CD-gsrIwD3U_0sJOtjznvI8Lrug/exec";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
}

export async function submitInternshipForm(formData) {
  try {
    let resumeData = null;
    let coverLetterData = null;

    // Resume
    if (formData.resume) {
      const base64 = await fileToBase64(formData.resume);
      resumeData = {
        name: formData.resume.name,
        type: formData.resume.type,
        data: base64
      };
    }

    // Cover Letter
    if (formData.coverLetter) {
      const base64 = await fileToBase64(formData.coverLetter);
      coverLetterData = {
        name: formData.coverLetter.name,
        type: formData.coverLetter.type,
        data: base64
      };
    }

    const payload = {
      formType: "Internship",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      linkedinId: formData.linkedinId || "",   // NEW: LinkedIn Profile URL
      university: formData.university,
      degree: formData.degree,
      yearOfStudy: formData.yearOfStudy,
      preferredRole: formData.preferredRole,
      roleInterest: formData.roleInterest,
      relevantExperience: formData.relevantExperience,
      skills: formData.skills,
      availability: formData.availability,
      duration: formData.duration,
      referral: formData.referral,
      additionalInfo: formData.additionalInfo,
      resume: resumeData,
      coverLetter: coverLetterData
    };

    await fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function submitSocialImpactFellowshipForm(application) {
  if (!SIF_WEBAPP_URL) {
    return { success: false, error: "Social Impact Fellowship Web App URL is not configured. Please deploy the script and update SIF_WEBAPP_URL in googleFormApi.js." };
  }
  try {
    const payload = {
      formType: "Social Impact Fellowship",
      submittedAt: new Date().toISOString(),
      ...application
    };

    await fetch(SIF_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(payload)
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message
    };
  }
}
