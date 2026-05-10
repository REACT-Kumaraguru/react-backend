const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyBZ5NhPYCdCSMv4GmpZLuwn64juM68qWdCL7CWRKcMnQt0oI1lxwtXMWUCny3rGEvIAA/exec";

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