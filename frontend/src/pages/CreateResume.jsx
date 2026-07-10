import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiBookOpen, FiCode, FiFolder, FiDownload, FiPlus, FiTrash2, FiCpu, FiLayout } from 'react-icons/fi';
import '../index.css';

const CreateResume = () => {
  const navigate = useNavigate();
  
  // Active wizard step: personal, experience, education, skills, projects
  const [activeStep, setActiveStep] = useState('personal');
  
  // Selected resume template: classic, modern, minimalist
  const [template, setTemplate] = useState('modern');

  // Form State
  const [personal, setPersonal] = useState({
    fullName: 'John Doe',
    jobTitle: 'Senior Frontend Developer',
    email: 'johndoe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    website: 'johndoe.dev',
    summary: 'Innovative and detail-oriented Frontend Engineer with 5+ years of experience building highly responsive web applications. Expert in React, JavaScript, and modern CSS architecture. Passionate about web performance, accessibility, and user-centric designs.'
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      company: 'TechCorp Solutions',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-01',
      endDate: 'Present',
      bullets: 'Led a team of 4 developers to redesign the core SaaS product dashboard, increasing user engagement by 25%.\nImplemented modular design systems using React and CSS variables, improving development cycle efficiency by 40%.\nOptimized frontend bundle sizes by 35% through lazy loading, tree shaking, and code splitting.'
    },
    {
      id: 2,
      company: 'Innovate Web Labs',
      role: 'Frontend Developer',
      location: 'Oakland, CA',
      startDate: '2021-03',
      endDate: '2022-12',
      bullets: 'Built responsive web interfaces for high-traffic e-commerce platforms, enhancing conversion rates by 12%.\nCollaborated with UI/UX designers to translate Figma mockups into pixel-perfect, accessible React components.\nReduced API loading latency by 20% by implementing efficient client-side caching states.'
    }
  ]);

  const [education, setEducation] = useState([
    {
      id: 1,
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      year: '2020',
      details: 'Relevant coursework: Software Engineering, Web Development, Data Structures & Algorithms.'
    }
  ]);

  const [skills, setSkills] = useState('React, JavaScript, TypeScript, CSS Grid/Flexbox, Next.js, Redux, Node.js, Git, Responsive Design, Web Accessibility (a11y), TailwindCSS');

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'DevSpace Portfolio Portal',
      tech: 'React, Next.js, TailwindCSS',
      description: 'A customizable developer portfolio template featuring automatic GitHub project imports and responsive dark/light theme options.'
    },
    {
      id: 2,
      title: 'Dynamic Charting Library',
      tech: 'TypeScript, D3.js, React',
      description: 'A lightweight charting component library designed for fluid canvas rendering and interactive dashboard data representations.'
    }
  ]);

  // Form Handlers
  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleAddExperience = () => {
    setExperience([...experience, {
      id: Date.now(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: ''
    }]);
  };

  const handleExperienceChange = (id, field, value) => {
    setExperience(experience.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemoveExperience = (id) => {
    setExperience(experience.filter(item => item.id !== id));
  };

  const handleAddEducation = () => {
    setEducation([...education, {
      id: Date.now(),
      school: '',
      degree: '',
      year: '',
      details: ''
    }]);
  };

  const handleEducationChange = (id, field, value) => {
    setEducation(education.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemoveEducation = (id) => {
    setEducation(education.filter(item => item.id !== id));
  };

  const handleAddProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      title: '',
      tech: '',
      description: ''
    }]);
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(projects.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleRemoveProject = (id) => {
    setProjects(projects.filter(item => item.id !== id));
  };

  // Compile full resume text for copy/analysis
  const getCompiledResumeText = () => {
    let text = `${personal.fullName}\n${personal.jobTitle}\n${personal.email} | ${personal.phone} | ${personal.location}\n`;
    if (personal.linkedin) text += `LinkedIn: ${personal.linkedin} `;
    if (personal.github) text += `GitHub: ${personal.github} `;
    text += `\n\nSUMMARY\n${personal.summary}\n\nEXPERIENCE\n`;
    experience.forEach(exp => {
      text += `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n${exp.bullets}\n\n`;
    });
    text += `EDUCATION\n`;
    education.forEach(edu => {
      text += `${edu.degree} - ${edu.school} (${edu.year})\n${edu.details}\n\n`;
    });
    text += `SKILLS\n${skills}\n\nPROJECTS\n`;
    projects.forEach(proj => {
      text += `${proj.title} [${proj.tech}]\n${proj.description}\n\n`;
    });
    return text;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getCompiledResumeText());
    alert('Resume text copied to clipboard! You can paste it directly or navigate to the Analyzer to check compatibility.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-builder-container fade-in">
      <header className="page-header no-print">
        <h2>Industrial Resume Builder</h2>
        <p>Build a clean, high-impact, ATS-friendly resume to secure your next role.</p>
      </header>

      <main className="builder-workspace">
        {/* Left Side: Wizard Form Panel */}
        <div className="glass-panel form-card no-print">
          {/* Tabs Navigation */}
          <div className="builder-tabs">
            <button className={`tab-btn ${activeStep === 'personal' ? 'active' : ''}`} onClick={() => setActiveStep('personal')}>
              <FiUser /> Personal
            </button>
            <button className={`tab-btn ${activeStep === 'experience' ? 'active' : ''}`} onClick={() => setActiveStep('experience')}>
              <FiBriefcase /> Work History
            </button>
            <button className={`tab-btn ${activeStep === 'education' ? 'active' : ''}`} onClick={() => setActiveStep('education')}>
              <FiBookOpen /> Education
            </button>
            <button className={`tab-btn ${activeStep === 'skills' ? 'active' : ''}`} onClick={() => setActiveStep('skills')}>
              <FiCode /> Skills
            </button>
            <button className={`tab-btn ${activeStep === 'projects' ? 'active' : ''}`} onClick={() => setActiveStep('projects')}>
              <FiFolder /> Projects
            </button>
          </div>

          <div className="tab-content" style={{ marginTop: '1.5rem' }}>
            {/* 1. Personal Step */}
            {activeStep === 'personal' && (
              <div className="fade-in">
                <h3 className="tab-title">Contact & Summary Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="input-label">Full Name</label>
                    <input type="text" name="fullName" className="input-field" value={personal.fullName} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Professional Target Title</label>
                    <input type="text" name="jobTitle" className="input-field" value={personal.jobTitle} onChange={handlePersonalChange} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="input-label">Email Address</label>
                    <input type="email" name="email" className="input-field" value={personal.email} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Phone Number</label>
                    <input type="text" name="phone" className="input-field" value={personal.phone} onChange={handlePersonalChange} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="input-label">Location (City, State)</label>
                    <input type="text" name="location" className="input-field" value={personal.location} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">LinkedIn URL</label>
                    <input type="text" name="linkedin" className="input-field" value={personal.linkedin} onChange={handlePersonalChange} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="input-label">GitHub Username / URL</label>
                    <input type="text" name="github" className="input-field" value={personal.github} onChange={handlePersonalChange} />
                  </div>
                  <div className="form-group">
                    <label className="input-label">Personal Portfolio Website</label>
                    <input type="text" name="website" className="input-field" value={personal.website} onChange={handlePersonalChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="input-label">Professional Summary</label>
                  <textarea name="summary" className="input-field" style={{ minHeight: '120px' }} value={personal.summary} onChange={handlePersonalChange} />
                </div>
              </div>
            )}

            {/* 2. Experience Step */}
            {activeStep === 'experience' && (
              <div className="fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="tab-title" style={{ margin: 0 }}>Professional Experience</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleAddExperience}>
                    <FiPlus /> Add Role
                  </button>
                </div>
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="accordion-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#c084fc' }}>Role #{idx + 1}</span>
                      {experience.length > 1 && (
                        <button className="icon-btn delete-btn" onClick={() => handleRemoveExperience(exp.id)}><FiTrash2 /></button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="input-label">Company Name</label>
                        <input type="text" className="input-field" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Job Title / Role</label>
                        <input type="text" className="input-field" value={exp.role} onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="input-label">Location</label>
                        <input type="text" className="input-field" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Start Date</label>
                        <input type="month" className="input-field" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-label">End Date</label>
                        <input type="text" placeholder="Present or date" className="input-field" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Key Achievements (Line separated bullets)</label>
                      <textarea className="input-field" placeholder="List your key results and performance achievements..." style={{ minHeight: '100px' }} value={exp.bullets} onChange={(e) => handleExperienceChange(exp.id, 'bullets', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Education Step */}
            {activeStep === 'education' && (
              <div className="fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="tab-title" style={{ margin: 0 }}>Academic Education</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleAddEducation}>
                    <FiPlus /> Add Degree
                  </button>
                </div>
                {education.map((edu, idx) => (
                  <div key={edu.id} className="accordion-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#c084fc' }}>Academic Record #{idx + 1}</span>
                      {education.length > 1 && (
                        <button className="icon-btn delete-btn" onClick={() => handleRemoveEducation(edu.id)}><FiTrash2 /></button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="input-label">School / University</label>
                        <input type="text" className="input-field" value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Year of Graduation</label>
                        <input type="text" placeholder="e.g. 2020" className="input-field" value={edu.year} onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Degree Target / Major</label>
                      <input type="text" className="input-field" placeholder="e.g. B.S. in Computer Science" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label className="input-label">Additional Details / GPAs</label>
                      <input type="text" className="input-field" placeholder="e.g. GPA 3.8, specialized in algorithms" value={edu.details} onChange={(e) => handleEducationChange(edu.id, 'details', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Skills Step */}
            {activeStep === 'skills' && (
              <div className="fade-in">
                <h3 className="tab-title">Core Skills List</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Type your skills separated by commas. These will be formatted dynamically inside your template.
                </p>
                <div className="form-group">
                  <label className="input-label">Technical & Soft Skills</label>
                  <textarea className="input-field" style={{ minHeight: '160px' }} value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>
              </div>
            )}

            {/* 5. Projects Step */}
            {activeStep === 'projects' && (
              <div className="fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="tab-title" style={{ margin: 0 }}>Key Projects</h3>
                  <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleAddProject}>
                    <FiPlus /> Add Project
                  </button>
                </div>
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="accordion-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: '#c084fc' }}>Project #{idx + 1}</span>
                      {projects.length > 1 && (
                        <button className="icon-btn delete-btn" onClick={() => handleRemoveProject(proj.id)}><FiTrash2 /></button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="input-label">Project Title</label>
                        <input type="text" className="input-field" value={proj.title} onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Technologies Used</label>
                        <input type="text" className="input-field" placeholder="e.g. React, Node.js" value={proj.tech} onChange={(e) => handleProjectChange(proj.id, 'tech', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="input-label">Short Description</label>
                      <textarea className="input-field" placeholder="Describe the project goal, scope, and key deliverables..." style={{ minHeight: '80px' }} value={proj.description} onChange={(e) => handleProjectChange(proj.id, 'description', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Resume Live Preview Sheet */}
        <div className="preview-panel">
          {/* Template selection bar */}
          <div className="template-controls no-print" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiLayout style={{ color: '#c084fc' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Templates:</span>
              <div className="template-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={`template-btn ${template === 'modern' ? 'active' : ''}`} onClick={() => setTemplate('modern')}>Modern Tech</button>
                <button className={`template-btn ${template === 'classic' ? 'active' : ''}`} onClick={() => setTemplate('classic')}>Classic Exec</button>
                <button className={`template-btn ${template === 'minimalist' ? 'active' : ''}`} onClick={() => setTemplate('minimalist')}>Minimalist</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handleCopyText}>Copy Text</button>
              <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={handlePrint}>
                <FiDownload /> Print / PDF
              </button>
            </div>
          </div>

          {/* Printable sheet container */}
          <div id="printable-resume-area" className={`resume-sheet-preview template-${template}`}>
            {/* Header branding */}
            <div className="resume-header-block">
              <h1>{personal.fullName || 'Your Name'}</h1>
              <h2>{personal.jobTitle || 'Your Job Title'}</h2>
              <div className="resume-contact-row">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && <span>{personal.phone}</span>}
                {personal.location && <span>{personal.location}</span>}
              </div>
              <div className="resume-contact-row secondary">
                {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
                {personal.github && <span>GitHub: {personal.github}</span>}
                {personal.website && <span>Website: {personal.website}</span>}
              </div>
            </div>

            {/* Summary */}
            {personal.summary && (
              <div className="resume-section-block">
                <h3 className="resume-section-title">Professional Summary</h3>
                <p className="resume-section-body">{personal.summary}</p>
              </div>
            )}

            {/* Work History */}
            {experience.some(exp => exp.company || exp.role) && (
              <div className="resume-section-block">
                <h3 className="resume-section-title">Work Experience</h3>
                {experience.map((exp) => (exp.company || exp.role) && (
                  <div key={exp.id} className="resume-item-block">
                    <div className="resume-item-meta">
                      <span className="role">{exp.role || 'Role Title'}</span>
                      <span className="dates">{exp.startDate || 'Start'} — {exp.endDate || 'End'}</span>
                    </div>
                    <div className="resume-item-submeta">
                      <span className="company">{exp.company || 'Company'}</span>
                      <span className="location">{exp.location || 'Location'}</span>
                    </div>
                    {exp.bullets && (
                      <ul className="resume-bullets">
                        {exp.bullets.split('\n').map((bullet, idx) => bullet.trim() && (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div className="resume-section-block">
                <h3 className="resume-section-title">Core Competencies & Skills</h3>
                <div className="resume-skills-grid">
                  {skills.split(',').map((skill) => skill.trim() && (
                    <span key={skill} className="resume-skill-badge">{skill.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.some(p => p.title) && (
              <div className="resume-section-block">
                <h3 className="resume-section-title">Technical Projects</h3>
                {projects.map((proj) => proj.title && (
                  <div key={proj.id} className="resume-item-block">
                    <div className="resume-item-meta">
                      <span className="role">{proj.title}</span>
                      {proj.tech && <span className="tech-stack">{proj.tech}</span>}
                    </div>
                    <p className="resume-section-body" style={{ marginTop: '0.25rem' }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.some(edu => edu.school || edu.degree) && (
              <div className="resume-section-block">
                <h3 className="resume-section-title">Education</h3>
                {education.map((edu) => (edu.school || edu.degree) && (
                  <div key={edu.id} className="resume-item-block">
                    <div className="resume-item-meta">
                      <span className="role">{edu.degree || 'Degree'}</span>
                      <span className="dates">{edu.year}</span>
                    </div>
                    <div className="resume-item-submeta">
                      <span className="company">{edu.school || 'School'}</span>
                    </div>
                    {edu.details && <p className="resume-section-body" style={{ fontStyle: 'italic', marginTop: '0.15rem' }}>{edu.details}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick analysis notice */}
          <div className="glass-panel no-print" style={{ marginTop: '1.5rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <FiCpu style={{ fontSize: '1.8rem', color: '#c084fc' }} />
              <div>
                <h4 style={{ color: 'white', fontSize: '0.95rem' }}>Need an instant scoring checks?</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                  Copy your resume text using the copy action, then run a compatibility scan inside the Analyzer!
                </p>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={() => navigate('/analyze')}>
              Go to Analyzer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateResume;
