import React, { useState, useRef } from 'react';
import './SocialImpactFellowshipForm.css';
import { submitSocialImpactFellowshipForm } from '../api/googleFormApi';

const ADMISSIONS_URL = 'https://admissions.kumaraguru.edu.in/pg-application-from';

const SOFT_SKILLS = [
  'Leadership', 'Communication', 'Problem solving',
  'Collaboration', 'Adaptability', 'Critical thinking',
];

const TOTAL = 8;

const STEP_LABELS = [
  'Personal Information', 'Educational Background', 'Professional Experience',
  'Fellowship Motivation', 'Problem Statement', 'Leadership',
  'Skills Assessment', 'Declaration',
];

const SECTORS = [
  ['education', 'Education'], ['healthcare', 'Healthcare'],
  ['climate', 'Climate & Sustainability'], ['agriculture', 'Agriculture'],
  ['poverty', 'Poverty alleviation'], ['women', "Women's empowerment"],
  ['disability', 'Disability inclusion'], ['rural', 'Rural development'],
  ['policy', 'Public policy'], ['financial', 'Financial inclusion'],
  ['tech', 'Technology for Good'], ['mental', 'Mental health'],
  ['other', 'Other'],
];

const TECH_SKILLS_LIST = [
  ['research', 'Research'], ['data', 'Data analysis'], ['programming', 'Programming'],
  ['design', 'Design'], ['product', 'Product development'], ['aiml', 'AI/ML'],
  ['pm', 'Project management'], ['speaking', 'Public speaking'],
  ['fundraising', 'Fundraising'], ['marketing', 'Marketing'], ['policy', 'Policy research'],
];

// ─── Upload field ─────────────────────────────────────────────────────────────
function UploadField({ accept, hint, onUpload, hasError, name }) {
  const [filename, setFilename] = useState(null);
  const inputRef = useRef(null);
  return (
    <div
      className={`sif-upload-field${hasError ? ' sif-error-upload' : ''}`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files?.[0]) {
            setFilename(e.target.files[0].name);
            onUpload && onUpload(true);
          }
        }}
      />
      <span className="sif-upload-icon">⬆</span>
      <span className="sif-upload-text">{hint}</span>
      {filename && <div className="sif-filename">✓ {filename}</div>}
    </div>
  );
}

// ─── Word-count textarea ──────────────────────────────────────────────────────
function WcTextarea({ rows, maxLength, wordLimit, placeholder, required }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <textarea
        className="sif-textarea"
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        {...(required ? { 'data-req': 'true' } : {})}
        onChange={e => {
          const v = e.target.value.trim();
          setCount(v === '' ? 0 : v.split(/\s+/).length);
          if (v) e.target.style.borderColor = '';
        }}
      />
      <div className="sif-word-count">{count} / {wordLimit} words</div>
    </>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ skill, rating, onRate, hasError }) {
  return (
    <div className={`sif-skill-row${hasError ? ' sif-skill-error' : ''}`}>
      <span className="sif-skill-name">{skill}</span>
      <div className="sif-stars">
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            className={`sif-star${i <= rating ? ' lit' : ''}`}
            onClick={() => onRate(skill, i)}
          >★</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main form component ──────────────────────────────────────────────────────
export const SocialImpactFellowshipForm = () => {
  const [cur, setCur] = useState(0);
  const [globalError, setGlobalError] = useState('');
  const [savedVisible, setSavedVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Conditional visibility
  const [showPrevWork, setShowPrevWork] = useState(false);
  const [showLedTeam, setShowLedTeam] = useState(false);

  // Checkbox group states (controlled for validation)
  const [sectorChecked, setSectorChecked] = useState([]);
  const [sectorHint, setSectorHint] = useState('');
  const [extrasChecked, setExtrasChecked] = useState([]);
  const [techChecked, setTechChecked] = useState([]);

  // Soft skill ratings
  const [softRatings, setSoftRatings] = useState({});

  // Required file uploads
  const [idDocUploaded, setIdDocUploaded] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // Upload error highlights
  const [idDocError, setIdDocError] = useState(false);
  const [resumeError, setResumeError] = useState(false);

  // Checkbox group error highlights
  const [sectorError, setSectorError] = useState(false);
  const [extrasError, setExtrasError] = useState(false);
  const [techError, setTechError] = useState(false);
  const [softError, setSoftError] = useState(false);

  // Declaration + signature
  const [decls, setDecls] = useState({ accurate: false, false_info: false, terms: false, consent: false });
  const [sigName, setSigName] = useState('');
  const [sigDate, setSigDate] = useState('');
  const [sigPlace, setSigPlace] = useState('');

  // Ref for the current section DOM
  const formRef = useRef(null);
  const sectionRef = useRef(null);

  // ── Validation ────────────────────────────────────────────────────────────
  const validateSection = (idx) => {
    const container = sectionRef.current;
    let valid = true;

    // Reset highlights from previous validation
    if (container) {
      container.querySelectorAll('[data-req]').forEach(el => { el.style.borderColor = ''; });
      container.querySelectorAll('[data-req-radio]').forEach(el => el.classList.remove('sif-group-error'));
    }
    setIdDocError(false);
    setResumeError(false);
    setSectorError(false);
    setExtrasError(false);
    setTechError(false);
    setSoftError(false);

    // 1. Text / email / tel / number / url inputs and textareas marked data-req
    if (container) {
      let firstEmpty = null;
      container.querySelectorAll('[data-req]').forEach(el => {
        if (!el.value.trim()) {
          el.style.borderColor = '#a32d2d';
          valid = false;
          if (!firstEmpty) firstEmpty = el;
        }
      });
      if (firstEmpty) firstEmpty.focus();
    }

    // 2. Required radio groups marked with data-req-radio on their container
    if (container) {
      container.querySelectorAll('[data-req-radio]').forEach(groupEl => {
        const name = groupEl.dataset.reqRadio;
        const checked = groupEl.querySelector(`input[type="radio"][name="${name}"]:checked`);
        if (!checked) {
          groupEl.classList.add('sif-group-error');
          valid = false;
        }
      });
    }

    // 3. Section-specific checks
    if (idx === 0 && !idDocUploaded) { setIdDocError(true); valid = false; }
    if (idx === 1 && !resumeUploaded) { setResumeError(true); valid = false; }
    if (idx === 3 && sectorChecked.length === 0) { setSectorError(true); valid = false; }
    if (idx === 5 && extrasChecked.length === 0) { setExtrasError(true); valid = false; }
    if (idx === 6) {
      if (techChecked.length === 0) { setTechError(true); valid = false; }
      if (SOFT_SKILLS.some(s => !softRatings[s])) { setSoftError(true); valid = false; }
    }

    if (!valid) {
      setGlobalError('Please fill in all required fields before proceeding.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return valid;
  };

  const goTo = (idx) => {
    setGlobalError('');
    setCur(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nav = (dir) => {
    if (dir === 1 && !validateSection(cur)) return;
    const nxt = cur + dir;
    if (nxt >= 0 && nxt < TOTAL) goTo(nxt);
  };

  const saveDraft = () => {
    setSavedVisible(true);
    setTimeout(() => setSavedVisible(false), 2500);
  };

  const handleSectorChange = (value, checked) => {
    if (checked) {
      if (sectorChecked.length >= 3) { setSectorHint('You can select a maximum of 3 sectors.'); return; }
      const next = [...sectorChecked, value];
      setSectorChecked(next);
      setSectorError(false);
      setSectorHint(next.length === 3 ? 'Maximum of 3 sectors selected.' : '');
    } else {
      const next = sectorChecked.filter(v => v !== value);
      setSectorChecked(next);
      setSectorHint('');
    }
  };

  const handleRate = (skill, val) => {
    setSoftRatings(prev => ({ ...prev, [skill]: val }));
    setSoftError(false);
  };

  const getFieldLabel = (el) => {
    const field = el.closest('.sif-field');
    const section = el.closest('[data-section-label]')?.dataset.sectionLabel;
    const label = field?.querySelector('.sif-label')?.textContent;
    const cardTitle = field?.closest('.sif-card')?.querySelector('.sif-card-title')?.textContent;
    const name = (label || cardTitle || el.name || 'Field')
      .replace(/\*/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return section ? `${section} - ${name}` : name;
  };

  const collectApplication = () => {
    const root = formRef.current;
    const fields = {};
    const radioGroups = {};
    const checkboxGroups = {};
    const files = {};

    root?.querySelectorAll('input, textarea').forEach((el) => {
      const key = el.name || el.dataset.field || getFieldLabel(el);
      if (!key) return;

      if (el.type === 'radio') {
        radioGroups[key] = radioGroups[key] || '';
        if (el.checked) radioGroups[key] = el.value;
        return;
      }

      if (el.type === 'checkbox') {
        checkboxGroups[key] = checkboxGroups[key] || [];
        if (el.checked) checkboxGroups[key].push(el.value);
        return;
      }

      if (el.type === 'file') {
        files[key] = Array.from(el.files || []).map((file) => file.name).join(', ');
        return;
      }

      const value = el.value?.trim();
      if (value) fields[key] = value;
    });

    return {
      fields,
      radioGroups,
      checkboxGroups,
      fileNames: files,
      sectorInterests: sectorChecked,
      extracurricularActivities: extrasChecked,
      technicalSkills: techChecked,
      softSkillRatings: softRatings,
      declarations: decls,
      signature: {
        name: sigName,
        date: sigDate,
        place: sigPlace,
      },
    };
  };

  const handleSubmit = async () => {
    if (!validateSection(7)) return;
    if (!Object.values(decls).every(Boolean)) {
      setGlobalError('Please accept all declarations before submitting.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const admissionsTab = window.open('', '_blank');
    setSubmitting(true);
    setGlobalError('');

    try {
      const result = await submitSocialImpactFellowshipForm(collectApplication());
      if (!result.success) throw new Error(result.error || 'Unable to submit application.');
      if (admissionsTab) {
        admissionsTab.location.href = ADMISSIONS_URL;
      } else {
        window.open(ADMISSIONS_URL, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      admissionsTab?.close();
      setGlobalError(error.message || 'Unable to submit application. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Input helper — clears border on change ────────────────────────────────
  const reqInput = (props) => (
    <input
      className="sif-input"
      data-req="true"
      onChange={e => { if (e.target.value.trim()) e.target.style.borderColor = ''; }}
      {...props}
    />
  );

  return (
    <div className="sif-page">
      <div className="sif-wrap" ref={formRef}>

        {/* Header */}
        <div className="sif-app-header">
          <div className="sif-app-title">Social Impact Fellowship</div>
          <div className="sif-app-sub">Complete all sections to submit your application</div>
        </div>

        {/* Progress bar */}
        <div className="sif-progress-bar">
          {Array.from({ length: TOTAL }, (_, i) => (
            <React.Fragment key={i}>
              <div
                className={`sif-step-dot${cur === i ? ' active' : i < cur ? ' done' : ''}`}
                onClick={() => goTo(i)}
                title={STEP_LABELS[i]}
              >{i + 1}</div>
              {i < TOTAL - 1 && <div className="sif-step-line" />}
            </React.Fragment>
          ))}
        </div>

        {/* Error banner */}
        {globalError && (
          <div className="sif-error-banner">⚠ {globalError}</div>
        )}

        {/* ── SECTION 1 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 0 ? sectionRef : null} data-section-label="Personal Information" style={{ display: cur === 0 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 1: Personal information</div>
            <div className="sif-section-count">Step 1 of 8</div>

            <div className="sif-card">
              <div className="sif-card-title">Basic details</div>
              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">First name <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'First name' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Last name (as per official documents) <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'Last name' })}
                </div>
              </div>

              <div className="sif-field">
                <label className="sif-label">Gender <span className="sif-req">*</span></label>
                <div className="sif-radio-group horiz" data-req-radio="gender">
                  <label className="sif-radio-opt"><input type="radio" name="gender" value="male" /> Male</label>
                  <label className="sif-radio-opt"><input type="radio" name="gender" value="female" /> Female</label>
                  <label className="sif-radio-opt"><input type="radio" name="gender" value="prefer-not" /> Prefer not to say</label>
                </div>
              </div>

              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">Date of birth <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'DD/MM/YYYY' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Nationality <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'e.g. Indian' })}
                </div>
              </div>

              <div className="sif-row3">
                <div className="sif-field">
                  <label className="sif-label">Current city <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'City' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">State/Province <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'State' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Country <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'Country' })}
                </div>
              </div>

              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">Email address <span className="sif-req">*</span></label>
                  {reqInput({ type: 'email', placeholder: 'example@gmail.com' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Mobile number (with country code) <span className="sif-req">*</span></label>
                  {reqInput({ type: 'tel', placeholder: '+91 00000 00000' })}
                </div>
              </div>

              <div className="sif-field">
                <label className="sif-label">LinkedIn profile URL <span className="sif-req">*</span></label>
                {reqInput({ type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' })}
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Identity verification</div>
              <div className="sif-field">
                <label className="sif-label">Government ID type <span className="sif-req">*</span></label>
                <div className="sif-radio-group" data-req-radio="id_type">
                  <label className="sif-radio-opt"><input type="radio" name="id_type" value="aadhar" /> Aadhar card</label>
                  <label className="sif-radio-opt"><input type="radio" name="id_type" value="passport" /> Passport</label>
                  <label className="sif-radio-opt"><input type="radio" name="id_type" value="national" /> National ID</label>
                  <label className="sif-radio-opt"><input type="radio" name="id_type" value="driving" /> Driving license</label>
                </div>
              </div>
              <div className="sif-field">
                <label className="sif-label">ID number <span className="sif-req">*</span></label>
                {reqInput({ type: 'text', placeholder: 'Enter your ID number' })}
              </div>
              <div className="sif-field">
                <label className="sif-label">Upload identity document (PDF/JPG) <span className="sif-req">*</span></label>
                <UploadField
                  accept=".pdf,.jpg,.jpeg"
                  hint="Click to upload — PDF or JPG"
                  onUpload={setIdDocUploaded}
                  hasError={idDocError}
                />
                {idDocError && <div className="sif-field-error">Please upload your identity document.</div>}
              </div>
            </div>
          </div>

        {/* ── SECTION 2 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 1 ? sectionRef : null} data-section-label="Educational Background" style={{ display: cur === 1 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 2: Educational background</div>
            <div className="sif-section-count">Step 2 of 8</div>

            <div className="sif-card">
              <div className="sif-card-title">Highest qualification</div>
              <div className="sif-field">
                <label className="sif-label">Degree type <span className="sif-req">*</span></label>
                <div className="sif-radio-group" data-req-radio="degree_type">
                  <label className="sif-radio-opt"><input type="radio" name="degree_type" value="bachelors" /> Bachelor's</label>
                  <label className="sif-radio-opt"><input type="radio" name="degree_type" value="masters" /> Master's</label>
                  <label className="sif-radio-opt"><input type="radio" name="degree_type" value="doctorate" /> Doctorate</label>
                  <label className="sif-radio-opt"><input type="radio" name="degree_type" value="other" /> Other</label>
                </div>
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Academic information</div>
              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">Degree name <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'e.g. B.Tech, MBA' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Major/Specialization <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'e.g. Computer Science' })}
                </div>
              </div>
              <div className="sif-field">
                <label className="sif-label">Institution/University name <span className="sif-req">*</span></label>
                {reqInput({ type: 'text', placeholder: 'University name' })}
              </div>
              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">Country <span className="sif-req">*</span></label>
                  {reqInput({ type: 'text', placeholder: 'Country' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Year of graduation <span className="sif-req">*</span></label>
                  {reqInput({ type: 'number', placeholder: 'e.g. 2023', min: '1990', max: '2030' })}
                </div>
              </div>
              <div className="sif-field">
                <label className="sif-label">Current status <span className="sif-req">*</span></label>
                <div className="sif-radio-group" data-req-radio="edu_status">
                  <label className="sif-radio-opt"><input type="radio" name="edu_status" value="graduated" /> Graduated</label>
                  <label className="sif-radio-opt"><input type="radio" name="edu_status" value="final_year" /> Final year student</label>
                  <label className="sif-radio-opt"><input type="radio" name="edu_status" value="awaiting" /> Awaiting results</label>
                </div>
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Academic performance</div>
              <div className="sif-row3">
                <div className="sif-field">
                  <label className="sif-label">CGPA/GPA <span className="sif-req">*</span></label>
                  {reqInput({ type: 'number', placeholder: 'e.g. 8.5', step: '0.01' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Maximum scale <span className="sif-req">*</span></label>
                  {reqInput({ type: 'number', placeholder: 'e.g. 10' })}
                </div>
                <div className="sif-field">
                  <label className="sif-label">Percentage equivalent <span className="sif-req">*</span></label>
                  {reqInput({ type: 'number', placeholder: 'e.g. 85', step: '0.01' })}
                </div>
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Additional qualifications</div>
              <div className="sif-field">
                <label className="sif-label">Certifications</label>
                <textarea className="sif-textarea" rows="2" placeholder="List any relevant certifications" />
              </div>
              <div className="sif-field">
                <label className="sif-label">Research publications</label>
                <textarea className="sif-textarea" rows="2" placeholder="List any research publications" />
              </div>
              <div className="sif-field">
                <label className="sif-label">Patents</label>
                <textarea className="sif-textarea" rows="2" placeholder="List any patents" />
              </div>
              <div className="sif-field">
                <label className="sif-label">Awards and scholarships</label>
                <textarea className="sif-textarea" rows="2" placeholder="List any awards and scholarships" />
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Upload documents</div>
              <div className="sif-field">
                <label className="sif-label">Resume/CV (PDF) <span className="sif-req">*</span></label>
                <UploadField
                  accept=".pdf"
                  hint="Click to upload your resume — PDF only"
                  onUpload={setResumeUploaded}
                  hasError={resumeError}
                />
                {resumeError && <div className="sif-field-error">Please upload your resume/CV.</div>}
              </div>
              <div className="sif-field">
                <label className="sif-label">Academic transcripts</label>
                <UploadField accept=".pdf,.jpg,.jpeg" hint="Click to upload transcripts — PDF or JPG" />
              </div>
              <div className="sif-field">
                <label className="sif-label">Degree certificate (if graduated)</label>
                <UploadField accept=".pdf,.jpg,.jpeg" hint="Click to upload degree certificate — PDF or JPG" />
              </div>
            </div>
          </div>

        {/* ── SECTION 3 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 2 ? sectionRef : null} data-section-label="Professional Experience" style={{ display: cur === 2 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 3: Professional experience</div>
            <div className="sif-section-count">Step 3 of 8</div>
            <div className="sif-card">
              <div className="sif-card-title">Social impact experience</div>
              <div className="sif-field">
                <label className="sif-label">
                  Describe any experience working in NGOs, community projects, volunteering,
                  social enterprises, or government initiatives <span className="sif-req">*</span>
                </label>
                <WcTextarea required rows={10} maxLength={2500} wordLimit={300} placeholder="Describe your social impact experience in up to 300 words..." />
              </div>
            </div>
          </div>

        {/* ── SECTION 4 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 3 ? sectionRef : null} data-section-label="Fellowship Motivation" style={{ display: cur === 3 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 4: Fellowship motivation</div>
            <div className="sif-section-count">Step 4 of 8</div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Why are you applying for the Social Impact Fellowship? <span className="sif-req">*</span></label>
                <WcTextarea required rows={12} maxLength={4500} wordLimit={500} placeholder="Tell us your motivation in up to 500 words..." />
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">What social problem are you most passionate about solving? <span className="sif-req">*</span></label>
                <WcTextarea required rows={8} maxLength={2500} wordLimit={300} placeholder="Describe the social problem in up to 300 words..." />
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Which sectors interest you most? (Select up to 3) <span className="sif-req">*</span></label>
                <div className={`sif-check-grid${sectorError ? ' sif-group-error' : ''}`}>
                  {SECTORS.map(([val, label]) => (
                    <label key={val} className="sif-check-opt">
                      <input
                        type="checkbox"
                        name="sector"
                        value={val}
                        checked={sectorChecked.includes(val)}
                        onChange={e => handleSectorChange(val, e.target.checked)}
                      /> {label}
                    </label>
                  ))}
                </div>
                {sectorError && <div className="sif-field-error">Please select at least one sector.</div>}
                <div className="sif-hint">{sectorHint}</div>
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">What do you hope to achieve by the end of the fellowship? <span className="sif-req">*</span></label>
                <WcTextarea required rows={8} maxLength={2500} wordLimit={300} placeholder="Share your goals in up to 300 words..." />
              </div>
            </div>
          </div>

        {/* ── SECTION 5 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 4 ? sectionRef : null} data-section-label="Problem Statement" style={{ display: cur === 4 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 5: Problem statement &amp; project idea</div>
            <div className="sif-section-count">Step 5 of 8</div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Describe a social issue you want to work on. <span className="sif-req">*</span></label>
                <WcTextarea required rows={12} maxLength={4500} wordLimit={500} placeholder="Describe the issue in up to 500 words..." />
              </div>
            </div>
            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Who is affected by this issue? <span className="sif-req">*</span></label>
                <WcTextarea required rows={7} maxLength={2000} wordLimit={250} placeholder="Describe the affected population in up to 250 words..." />
              </div>
            </div>
            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">What evidence or observations led you to identify this problem? <span className="sif-req">*</span></label>
                <WcTextarea required rows={8} maxLength={2500} wordLimit={300} placeholder="Describe your evidence and observations in up to 300 words..." />
              </div>
            </div>
            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Proposed solution <span className="sif-req">*</span></label>
                <WcTextarea required rows={12} maxLength={4500} wordLimit={500} placeholder="Describe your proposed solution in up to 500 words..." />
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Current stage</div>
              <div className="sif-field">
                <div className="sif-radio-group" data-req-radio="stage">
                  <label className="sif-radio-opt"><input type="radio" name="stage" value="exploration" /> Problem exploration</label>
                  <label className="sif-radio-opt"><input type="radio" name="stage" value="research" /> Research stage</label>
                  <label className="sif-radio-opt"><input type="radio" name="stage" value="prototype" /> Prototype available</label>
                  <label className="sif-radio-opt"><input type="radio" name="stage" value="pilot" /> Pilot running</label>
                  <label className="sif-radio-opt"><input type="radio" name="stage" value="venture" /> Existing venture</label>
                </div>
              </div>
              <div className="sif-field">
                <label className="sif-label">Have you previously worked on this problem? <span className="sif-req">*</span></label>
                <div className="sif-radio-group horiz" data-req-radio="prev_work">
                  <label className="sif-radio-opt">
                    <input type="radio" name="prev_work" value="yes" onChange={() => setShowPrevWork(true)} /> Yes
                  </label>
                  <label className="sif-radio-opt">
                    <input type="radio" name="prev_work" value="no" onChange={() => setShowPrevWork(false)} /> No
                  </label>
                </div>
              </div>
              {showPrevWork && (
                <div className="sif-field">
                  <label className="sif-label">Describe your work and outcomes <span className="sif-req">*</span></label>
                  <textarea
                    className="sif-textarea"
                    rows="5"
                    data-req="true"
                    placeholder="Describe your previous work on this problem and the outcomes achieved..."
                    onChange={e => { if (e.target.value.trim()) e.target.style.borderColor = ''; }}
                  />
                </div>
              )}
            </div>
          </div>

        {/* ── SECTION 6 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 5 ? sectionRef : null} data-section-label="Leadership" style={{ display: cur === 5 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 6: Leadership &amp; community engagement</div>
            <div className="sif-section-count">Step 6 of 8</div>

            <div className="sif-card">
              <div className="sif-field">
                <label className="sif-label">Have you led a team or initiative? <span className="sif-req">*</span></label>
                <div className="sif-radio-group horiz" data-req-radio="led_team">
                  <label className="sif-radio-opt">
                    <input type="radio" name="led_team" value="yes" onChange={() => setShowLedTeam(true)} /> Yes
                  </label>
                  <label className="sif-radio-opt">
                    <input type="radio" name="led_team" value="no" onChange={() => setShowLedTeam(false)} /> No
                  </label>
                </div>
              </div>
              {showLedTeam && (
                <>
                  <div className="sif-row2">
                    <div className="sif-field">
                      <label className="sif-label">Project name <span className="sif-req">*</span></label>
                      {reqInput({ type: 'text', placeholder: 'Project or initiative name' })}
                    </div>
                    <div className="sif-field">
                      <label className="sif-label">Team size <span className="sif-req">*</span></label>
                      {reqInput({ type: 'number', placeholder: 'e.g. 10', min: '1' })}
                    </div>
                  </div>
                  <div className="sif-row2">
                    <div className="sif-field">
                      <label className="sif-label">Your role <span className="sif-req">*</span></label>
                      {reqInput({ type: 'text', placeholder: 'e.g. Team Lead' })}
                    </div>
                    <div className="sif-field">
                      <label className="sif-label">Outcome <span className="sif-req">*</span></label>
                      {reqInput({ type: 'text', placeholder: 'Key outcome or result' })}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Community involvement</div>
              <div className="sif-field">
                <label className="sif-label">Describe a time you created positive impact in your community. <span className="sif-req">*</span></label>
                <WcTextarea required rows={8} maxLength={2500} wordLimit={300} placeholder="Describe your community impact in up to 300 words..." />
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Extracurricular activities <span className="sif-req">*</span></div>
              <div className="sif-field">
                <div className={`sif-check-group${extrasError ? ' sif-group-error' : ''}`}>
                  {[
                    ['clubs', 'Student clubs'], ['sports', 'Sports'],
                    ['entrepreneurship', 'Entrepreneurship'], ['volunteering', 'Volunteering'],
                    ['research', 'Research groups'], ['other', 'Other'],
                  ].map(([val, label]) => (
                    <label key={val} className="sif-check-opt">
                      <input
                        type="checkbox"
                        name="extra"
                        value={val}
                        checked={extrasChecked.includes(val)}
                        onChange={e => {
                          const next = e.target.checked
                            ? [...extrasChecked, val]
                            : extrasChecked.filter(v => v !== val);
                          setExtrasChecked(next);
                          if (next.length > 0) setExtrasError(false);
                        }}
                      /> {label}
                    </label>
                  ))}
                </div>
                {extrasError && <div className="sif-field-error">Please select at least one extracurricular activity.</div>}
              </div>
            </div>
          </div>

        {/* ── SECTION 7 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 6 ? sectionRef : null} data-section-label="Skills Assessment" style={{ display: cur === 6 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 7: Skills assessment</div>
            <div className="sif-section-count">Step 7 of 8</div>

            <div className="sif-card">
              <div className="sif-card-title">Technical skills (select all that apply) <span className="sif-req">*</span></div>
              <div className="sif-field">
                <div className={`sif-check-grid${techError ? ' sif-group-error' : ''}`}>
                  {TECH_SKILLS_LIST.map(([val, label]) => (
                    <label key={val} className="sif-check-opt">
                      <input
                        type="checkbox"
                        name="tech_skill"
                        value={val}
                        checked={techChecked.includes(val)}
                        onChange={e => {
                          const next = e.target.checked
                            ? [...techChecked, val]
                            : techChecked.filter(v => v !== val);
                          setTechChecked(next);
                          if (next.length > 0) setTechError(false);
                        }}
                      /> {label}
                    </label>
                  ))}
                </div>
                {techError && <div className="sif-field-error">Please select at least one technical skill.</div>}
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Soft skills — rate yourself (1 = low, 5 = high) <span className="sif-req">*</span></div>
              {SOFT_SKILLS.map(skill => (
                <StarRating
                  key={skill}
                  skill={skill}
                  rating={softRatings[skill] || 0}
                  onRate={handleRate}
                  hasError={softError && !softRatings[skill]}
                />
              ))}
              {softError && <div className="sif-field-error" style={{ marginTop: '8px' }}>Please rate all soft skills.</div>}
            </div>
          </div>

        {/* ── SECTION 8 ─────────────────────────────────────────────────────── */}
        <div ref={cur === 7 ? sectionRef : null} data-section-label="Declaration" style={{ display: cur === 7 ? undefined : 'none' }}>
            <div className="sif-section-title">Section 8: Declaration</div>
            <div className="sif-section-count">Step 8 of 8</div>

            <div className="sif-card">
              <div className="sif-card-title">Fellowship fee</div>
              <div className="sif-fee-info">
                <div className="sif-fee-info-title">Programme fee: ₹1,00,000</div>
                <div className="sif-fee-info-sub">One lakh rupees for the full 1-year fellowship</div>
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-check-group">
                {[
                  ['accurate', 'I certify that all information provided is accurate and complete.'],
                  ['false_info', 'I understand that providing false information may result in disqualification.'],
                  ['terms', 'I agree to the fellowship terms and conditions.'],
                  ['consent', 'I consent to the processing of my data for admission purposes.'],
                ].map(([key, text]) => (
                  <label key={key} className="sif-check-opt multi-start">
                    <input
                      type="checkbox"
                      name="decl"
                      value={key}
                      checked={decls[key]}
                      onChange={e => setDecls(prev => ({ ...prev, [key]: e.target.checked }))}
                    />
                    {text}
                  </label>
                ))}
              </div>
            </div>

            <div className="sif-card">
              <div className="sif-card-title">Digital signature</div>
              <div className="sif-row2">
                <div className="sif-field">
                  <label className="sif-label">Full name <span className="sif-req">*</span></label>
                  <input
                    className="sif-input"
                    type="text"
                    placeholder="Your full name"
                    data-req="true"
                    value={sigName}
                    onChange={e => { setSigName(e.target.value); if (e.target.value.trim()) e.target.style.borderColor = ''; }}
                  />
                </div>
                <div className="sif-field">
                  <label className="sif-label">Date <span className="sif-req">*</span></label>
                  <input
                    className="sif-input"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    data-req="true"
                    value={sigDate}
                    onChange={e => { setSigDate(e.target.value); if (e.target.value.trim()) e.target.style.borderColor = ''; }}
                  />
                </div>
              </div>
              <div className="sif-field">
                <label className="sif-label">Place <span className="sif-req">*</span></label>
                <input
                  className="sif-input"
                  type="text"
                  placeholder="City/Town"
                  data-req="true"
                  value={sigPlace}
                  onChange={e => { setSigPlace(e.target.value); if (e.target.value.trim()) e.target.style.borderColor = ''; }}
                />
              </div>
            </div>

            <div className="sif-submit-note">
              Please review all sections before submitting. Once submitted, your application cannot be edited.
            </div>
          </div>

        {/* ── Navigation ───────────────────────────────────────────────────── */}
        <div className="sif-nav">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {cur > 0 && (
              <button className="sif-btn sif-btn-ghost" onClick={() => nav(-1)}>← Back</button>
            )}
            <div className={`sif-saved-badge${savedVisible ? ' show' : ''}`}>✓ Draft saved</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="sif-btn" onClick={saveDraft}>💾 Save draft</button>
            {cur < TOTAL - 1 && (
              <button className="sif-btn sif-btn-primary" onClick={() => nav(1)}>Next →</button>
            )}
            {cur === TOTAL - 1 && (
              <button
                className="sif-btn sif-btn-success"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : '✓ Submit application'}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
