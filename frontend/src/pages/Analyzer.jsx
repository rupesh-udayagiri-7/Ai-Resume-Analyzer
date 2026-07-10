import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiFileText, FiCpu, FiAward, FiInfo, FiEdit2, FiCheckCircle } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../index.css';

const Analyzer = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const [selectedRoleId, setSelectedRoleId] = useState('');

  // Fetch predefined Job Descriptions on load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/');
        setSavedJobs(response.data);
      } catch (err) {
        console.error("Failed to load saved jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setResults(null); // Clear previous results upon new upload
    }
  };

  const handleJobSelect = (e) => {
    const jobId = e.target.value;
    if (jobId) {
      const job = savedJobs.find(j => j.id === jobId);
      if (job) {
        setJobDescription(job.description);
        setSelectedRoleId(jobId);
        setResults(null);
      }
    } else {
      setJobDescription('');
      setSelectedRoleId('');
    }
  };

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      setError('Please provide both a resume file and a job description.');
      return;
    }
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-container fade-in">
      <header className="page-header">
        <h2>Resume Compatibility Analyzer</h2>
        <p>Get an immediate match score, find missing skills, or scan database roles for a second opinion.</p>
      </header>

      <main className="main-grid">
        {/* Input Section */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.5rem', color: 'white' }}>
            <FiUploadCloud /> Upload & Match
          </h2>
          
          {/* Resume Upload */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Resume (PDF/DOCX)</label>
            <div 
              className="upload-zone"
              onClick={() => document.getElementById('resume-upload').click()}
            >
              <FiFileText className="upload-icon" />
              <p style={{ fontWeight: '500', color: resume ? 'white' : 'var(--text-muted)' }}>
                {resume ? resume.name : 'Click to browse or drag file here'}
              </p>
              <input 
                type="file" 
                id="resume-upload" 
                hidden 
                accept=".pdf,.docx" 
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Select Target Job Role Row */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Select Target Job Role</label>
            {savedJobs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No job roles found in database. Add them in the Admin Panel.
              </p>
            ) : (
              <div className="role-pills-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
                {savedJobs.map(job => (
                  <button
                    key={job.id}
                    type="button"
                    className={`role-pill-btn ${selectedRoleId === job.id ? 'active' : ''}`}
                    onClick={() => {
                      setJobDescription(job.description);
                      setSelectedRoleId(job.id);
                      setResults(null);
                    }}
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Job Description Textarea */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Job Description Requirements</span>
              <span style={{ fontSize: '0.85rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiEdit2 /> Editable Text
              </span>
            </label>
            <textarea 
              className="input-field" 
              placeholder="Select a job role above or paste custom requirements here..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setSelectedRoleId(''); // Clear active pill when custom text is edited
              }}
            />
          </div>

          {error && <div className="alert-message alert-danger" style={{ margin: '0 0 1.5rem 0' }}>{error}</div>}

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.9rem' }}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing Compatibility...' : 'Generate Compatibility Check'}
          </button>
        </div>

        {/* Results Section */}
        <div className="glass-panel results-card">
          {!results && !loading && (
            <div className="empty-state">
              <FiAward style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', opacity: '0.5' }} />
              <p>Upload your resume and a job description, then click analysis to inspect score matching here.</p>
            </div>
          )}
          
          {loading && (
            <div className="loading-state">
              <div className="loader"></div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Calculating skill correlations...</p>
            </div>
          )}

          {results && !loading && (
            <div className="results-content fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="scores-row" style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div className="score-container" style={{ margin: 0 }}>
                  <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem', color: 'white' }}>Job Match Score</h3>
                  <div className="score-circle">
                    <CircularProgressbar 
                      value={results.match_score} 
                      text={`${results.match_score}%`} 
                      styles={buildStyles({
                        pathColor: results.match_score > 70 ? 'var(--success)' : results.match_score > 40 ? 'var(--warning)' : 'var(--danger)',
                        textColor: 'var(--text-main)',
                        trailColor: 'rgba(255, 255, 255, 0.04)',
                      })}
                    />
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    marginTop: '0.75rem',
                    color: results.match_score > 70 ? 'var(--success)' : results.match_score > 40 ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {results.match_score > 70 ? 'Strong Compatibility' : results.match_score > 40 ? 'Moderate Alignment' : 'Low Compatibility'}
                  </p>
                </div>

                <div className="score-container" style={{ margin: 0 }}>
                  <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem', color: 'white' }}>ATS Resume Score</h3>
                  <div className="score-circle">
                    <CircularProgressbar 
                      value={results.ats_score} 
                      text={`${results.ats_score}%`} 
                      styles={buildStyles({
                        pathColor: results.ats_score > 75 ? 'var(--success)' : results.ats_score > 50 ? 'var(--warning)' : 'var(--danger)',
                        textColor: 'var(--text-main)',
                        trailColor: 'rgba(255, 255, 255, 0.04)',
                      })}
                    />
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    marginTop: '0.75rem',
                    color: results.ats_score > 75 ? 'var(--success)' : results.ats_score > 50 ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {results.ats_score > 75 ? 'Highly Optimized' : results.ats_score > 50 ? 'Needs Improvement' : 'Formatting Issues'}
                  </p>
                </div>
              </div>

              <div className="skills-lists">
                <div>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
                    <FiCheckCircle /> Matched Skills
                  </h4>
                  <div className="skill-tags">
                    {results.matched_skills.length > 0 ? results.matched_skills.map(skill => (
                      <span key={skill} className="skill-tag matched">{skill}</span>
                    )) : <span className="empty-skills">No direct matches found.</span>}
                  </div>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.75rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
                    <FiInfo /> Missing Skills
                  </h4>
                  <div className="skill-tags">
                    {results.missing_skills.length > 0 ? results.missing_skills.map(skill => (
                      <span key={skill} className="skill-tag missing">{skill}</span>
                    )) : <span className="empty-skills">None identified!</span>}
                  </div>
                </div>
              </div>

              {results.suggestions && results.suggestions.length > 0 && (
                <div className="suggestions-container">
                  <h4 style={{ marginBottom: '0.75rem', color: 'white', fontSize: '1.05rem' }}>Actionable Suggestions</h4>
                  <ul className="suggestions-box" style={{ textAlign: 'left' }}>
                    {results.suggestions.map((sug, idx) => (
                      <li key={idx} style={{ lineHeight: '1.6', marginBottom: '0.75rem' }}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </main>


    </div>
  );
};

export default Analyzer;
