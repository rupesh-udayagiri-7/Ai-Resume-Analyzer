import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import '../index.css';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ id: null, title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Admin Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/jobs/');
      setJobs(response.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load jobs.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated]);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill out all fields.' });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/api/jobs/${formData.id}/`, formData);
        setMessage({ type: 'success', text: 'Job updated successfully!' });
      } else {
        await axios.post('http://localhost:8000/api/jobs/', formData);
        setMessage({ type: 'success', text: 'Job created successfully!' });
      }
      setFormData({ id: null, title: '', description: '' });
      setIsEditing(false);
      fetchJobs();
    } catch (err) {
      console.error("Job save failed:", err);
      setMessage({ type: 'error', text: 'Failed to save job.' });
    }
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleEdit = (job) => {
    setFormData({ id: job.id, title: job.title, description: job.description });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job description?')) {
      try {
        await axios.delete(`http://localhost:8000/api/jobs/${id}/`);
        setMessage({ type: 'success', text: 'Job deleted successfully!' });
        fetchJobs();
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete job.' });
      }
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="glass-panel" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
          {loginError && (
            <div className="alert-message alert-danger" style={{ marginBottom: '1rem' }}>
              {loginError}
            </div>
          )}
          <form onSubmit={handleLoginSubmit} className="admin-form">
            <div className="form-group">
              <label className="input-label">Username</label>
              <input 
                type="text" 
                name="username"
                className="input-field" 
                placeholder="Enter username"
                value={loginForm.username}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Password</label>
              <input 
                type="password" 
                name="password"
                className="input-field" 
                placeholder="Enter password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container fade-in">
      <header className="page-header">
        <h2>Job Description Management</h2>
        <p>Add, edit, and organize the job descriptions available for resume analysis.</p>
      </header>

      {message.text && (
        <div className={`alert-message ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
          {message.text}
        </div>
      )}

      <main className="admin-grid">
        {/* Form Section */}
        <div className="glass-panel form-card">
          <h3 className="section-subtitle">
            {isEditing ? 'Edit Job Description' : 'Add New Job Description'}
          </h3>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label className="input-label">Job Title</label>
              <input 
                type="text" 
                name="title"
                className="input-field" 
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Job Description / Requirements</label>
              <textarea 
                name="description"
                className="input-field text-area-large" 
                placeholder="Paste the full job requirements..."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isEditing ? <FiEdit2 /> : <FiPlus />}
                {isEditing ? 'Update Job' : 'Add Job'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => { setIsEditing(false); setFormData({ id: null, title: '', description: '' }); }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Jobs List */}
        <div className="glass-panel list-card">
          <h3 className="section-subtitle">Saved Jobs</h3>
          
          {loading ? (
             <div className="loading-state"><div className="loader"></div></div>
          ) : jobs.length === 0 ? (
            <div className="empty-state">No jobs found. Create one to get started.</div>
          ) : (
            <div className="jobs-list">
              {jobs.map(job => (
                <div key={job.id} className="job-item">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <p className="job-preview">{job.description.substring(0, 80)}...</p>
                  </div>
                  <div className="job-actions">
                    <button className="icon-btn edit-btn" title="Edit" onClick={() => handleEdit(job)}>
                      <FiEdit2 />
                    </button>
                    <button className="icon-btn delete-btn" title="Delete" onClick={() => handleDelete(job.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
