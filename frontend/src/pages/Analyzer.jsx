import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiFileText } from 'react-icons/fi';
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
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleJobSelect = (e) => {
    const selectedJobId = e.target.value;
    if (selectedJobId) {
      const job = savedJobs.find(j => j.id === selectedJobId);
      if (job) setJobDescription(job.description);
    } else {
      setJobDescription('');
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
        <p>Upload your document and provide the job requirements to generate insights.</p>
      </header>

      <main className="main-grid">
        {/* Input Section */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUploadCloud /> Upload Data
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Resume (PDF/DOCX)</label>
            <div 
              className="upload-zone"
              onClick={() => document.getElementById('resume-upload').click()}
            >
              <FiFileText className="upload-icon" />
              <p>{resume ? resume.name : 'Click to browse or drag file here'}</p>
              <input 
                type="file" 
                id="resume-upload" 
                hidden 
                accept=".pdf,.docx" 
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="input-label">Select a Saved Job Description (Optional)</label>
            <select className="input-field select-dropdown" onChange={handleJobSelect}>
              <option value="">-- Custom Text Below --</option>
              {savedJobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Job Description</label>
            <textarea 
              className="input-field" 
              placeholder="Paste the job requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Generate Analysis'}
          </button>
        </div>

        {/* Results Section */}
        <div className="glass-panel results-card">
          {!results && !loading && (
            <div className="empty-state">
              Upload your resume and a job description to see your match score and personalized insights here.
            </div>
          )}
          
          {loading && (
            <div className="loading-state">
              <div className="loader"></div>
            </div>
          )}

          {results && !loading && (
            <div className="results-content fade-in">
              <div className="score-container">
                <h3 style={{ marginBottom: '1rem' }}>Match Score</h3>
                <div className="score-circle">
                  <CircularProgressbar 
                    value={results.match_score} 
                    text={`${results.match_score}%`} 
                    styles={buildStyles({
                      pathColor: results.match_score > 70 ? 'var(--success)' : results.match_score > 40 ? 'var(--warning)' : 'var(--danger)',
                      textColor: 'var(--text-main)',
                      trailColor: 'var(--surface-light)',
                    })}
                  />
                </div>
              </div>

              <div className="skills-lists">
                <div>
                  <h4 style={{ marginBottom: '0.5rem', color: 'var(--success)' }}>Matched Skills</h4>
                  <div className="skill-tags">
                    {results.matched_skills.length > 0 ? results.matched_skills.map(skill => (
                      <span key={skill} className="skill-tag matched">{skill}</span>
                    )) : <span className="empty-skills">No direct matches found.</span>}
                  </div>
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem', color: 'var(--danger)' }}>Missing Skills</h4>
                  <div className="skill-tags">
                    {results.missing_skills.length > 0 ? results.missing_skills.map(skill => (
                      <span key={skill} className="skill-tag missing">{skill}</span>
                    )) : <span className="empty-skills">None identified!</span>}
                  </div>
                </div>
              </div>

              {results.suggestions && results.suggestions.length > 0 && (
                <div className="suggestions-container">
                  <h4 style={{ marginBottom: '0.5rem' }}>Actionable Suggestions</h4>
                  <ul className="suggestions-box">
                    {results.suggestions.map((sug, idx) => (
                      <li key={idx}>{sug}</li>
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
