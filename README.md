# 📄 AI Resume Analyzer

A comprehensive AI-powered resume analysis tool that evaluates resumes against job descriptions and provides actionable insights for improvement.

## 🎯 Features

- **ATS Score Analysis**: Calculates Applicant Tracking System (ATS) compatibility score
- **Keyword Matching**: Identifies missing keywords from job descriptions
- **Resume Scoring**: Provides detailed scoring metrics across multiple dimensions
- **Improvement Suggestions**: AI-powered recommendations for resume enhancement
- **Job Description Parsing**: Extracts and analyzes job requirements
- **Real-time Feedback**: Instant analysis and suggestions

## 📊 ATS Score Breakdown

The ATS score is calculated based on:

| Component | Weight | Description |
|-----------|--------|-------------|
| Formatting Compatibility | 25% | PDF readability, structure, fonts |
| Keyword Matching | 30% | Keywords from job description found in resume |
| Content Structure | 20% | Proper sections, formatting, organization |
| Experience Relevance | 15% | Job history alignment with target role |
| Skills Alignment | 10% | Technical skills match with requirements |

**Score Range**: 0-100
- **90-100**: Excellent - High chance of ATS pass
- **75-89**: Good - Likely to pass ATS screening
- **60-74**: Fair - May need improvements
- **Below 60**: Poor - Significant improvements needed

## 🏗️ Project Structure

```
Ai-Resume-Analyzer/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS styles
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Python Flask/FastAPI application
│   ├── app.py              # Main application
│   ├── routes/
│   │   ├── analyze.py      # Resume analysis endpoints
│   │   ├── score.py        # ATS scoring endpoints
│   │   └── suggestions.py  # Improvement suggestions
│   ├── services/
│   │   ├── ats_scorer.py   # ATS scoring logic
│   │   ├── nlp_service.py  # NLP processing
│   │   └── keyword_extractor.py
│   ├── models/
│   │   └── resume_models.py
│   ├── utils/
│   │   ├── pdf_parser.py
│   │   └── text_processor.py
│   ├── requirements.txt
│   └── config.py
├── run_servers.bat         # Windows startup script
├── run_startup.ps1         # PowerShell startup script
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ (for frontend)
- Python 3.8+ (for backend)
- npm or yarn (for frontend)
- pip (for backend)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

The backend will be available at `http://localhost:5000`

### Run Both Servers

**Windows (Command Prompt):**
```bash
run_servers.bat
```

**Windows (PowerShell):**
```powershell
.\run_startup.ps1
```

**macOS/Linux:**
```bash
# Terminal 1
cd backend
python app.py

# Terminal 2
cd frontend
npm run dev
```

## 📋 API Endpoints

### Analysis Endpoints

#### POST `/api/analyze`
Analyzes a resume against a job description.

**Request:**
```json
{
  "resume_text": "string",
  "job_description": "string"
}
```

**Response:**
```json
{
  "ats_score": 85,
  "formatting_score": 22,
  "keyword_score": 28,
  "structure_score": 18,
  "experience_score": 12,
  "skills_score": 5,
  "missing_keywords": ["keyword1", "keyword2"],
  "matched_keywords": ["keyword3", "keyword4"],
  "suggestions": ["suggestion1", "suggestion2"],
  "overall_feedback": "Your resume looks good!"
}
```

#### POST `/api/score`
Calculates detailed ATS score breakdown.

**Request:**
```json
{
  "resume_data": {
    "text": "string",
    "format": "pdf|docx|txt"
  },
  "job_description": "string"
}
```

**Response:**
```json
{
  "total_score": 85,
  "score_breakdown": {
    "formatting": 25,
    "keywords": 30,
    "structure": 20,
    "experience": 12,
    "skills": 10
  },
  "details": {}
}
```

#### POST `/api/suggestions`
Generates improvement suggestions.

**Request:**
```json
{
  "resume_text": "string",
  "job_description": "string",
  "current_score": 75
}
```

**Response:**
```json
{
  "suggestions": [
    {
      "category": "keywords",
      "suggestion": "Add 'Project Management' to your skills section",
      "impact": "high",
      "priority": 1
    },
    {
      "category": "formatting",
      "suggestion": "Use standard fonts (Arial, Calibri, Times New Roman)",
      "impact": "medium",
      "priority": 2
    }
  ],
  "estimated_improvement": 10
}
```

## 🔧 Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Python** - Programming language
- **Flask/FastAPI** - Web framework
- **NLTK/spaCy** - NLP processing
- **PyPDF2** - PDF processing
- **python-docx** - Word document processing

## 📊 ATS Scoring Algorithm

### 1. Formatting Analysis (25%)
- PDF compatibility and readability
- Font selection and size consistency
- Proper spacing and margins
- Section headers clarity

### 2. Keyword Matching (30%)
- Extracts keywords from job description
- Calculates keyword density in resume
- Matches synonyms and related terms
- Awards points for exact matches

### 3. Content Structure (20%)
- Required sections presence
- Logical organization
- Contact information completeness
- Clear section separation

### 4. Experience Relevance (15%)
- Years of relevant experience
- Job title alignment
- Company type and size match
- Career progression analysis

### 5. Skills Alignment (10%)
- Technical skills match
- Soft skills assessment
- Certification relevance
- Skill level indication

## 🎓 How to Use

1. **Upload Resume**: Paste or upload your resume text
2. **Enter Job Description**: Paste the target job description
3. **Analyze**: Click the analyze button
4. **Review Results**: Check your ATS score and detailed feedback
5. **Implement Suggestions**: Follow the recommendations to improve your resume
6. **Re-analyze**: Upload your updated resume to verify improvements

## 📈 Sample ATS Scores

| Resume Type | Before | After | Improvement |
|-------------|--------|-------|-------------|
| Generic Resume | 45 | 78 | +33 points |
| Dated Format | 52 | 82 | +30 points |
| Keyword Poor | 58 | 88 | +30 points |
| Well Optimized | 85 | 92 | +7 points |

## 🤖 AI Features

- **Natural Language Processing**: Understands context and intent
- **Keyword Extraction**: Intelligently identifies important terms
- **Synonym Matching**: Recognizes similar terms and phrases
- **Smart Suggestions**: Contextual improvement recommendations
- **Semantic Analysis**: Analyzes meaning, not just keywords

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
DEBUG=True
SECRET_KEY=your_secret_key_here
PDF_MAX_SIZE=10000000
ALLOWED_EXTENSIONS=pdf,docx,txt
```

### Frontend Configuration

Environment variables in frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_MAX_FILE_SIZE=5242880
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 📝 Example Resume Analysis

**Input:**
- Resume: Software Engineer with 5 years experience
- Job Description: Senior Software Developer role

**Output:**
```
ATS Score: 82/100
✅ Formatting: 24/25 (96%)
✅ Keywords: 27/30 (90%)
✅ Structure: 19/20 (95%)
✅ Experience: 14/15 (93%)
✅ Skills: 8/10 (80%)

Missing Keywords:
- Cloud Architecture
- DevOps
- Microservices

Suggestions:
1. Add "Cloud Architecture" and "Microservices" to your experience descriptions
2. Include your DevOps certifications if you have any
3. Emphasize your leadership experience in the summary
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure backend is running on `localhost:5000`
- Check if port 5000 is not in use: `lsof -i :5000`
- Verify CORS is enabled in backend

### PDF Upload Issues
- Ensure file size is under 10MB
- Verify PDF is not password protected
- Try converting PDF to text first

### Slow Analysis
- Check internet connection
- Verify backend server performance
- Clear browser cache

## 🚀 Performance Optimization

- Resume analysis: < 2 seconds
- Keyword extraction: < 1 second
- Score calculation: < 500ms
- Frontend load time: < 3 seconds

## 📄 Supported File Formats

- `.pdf` - PDF documents
- `.docx` - Microsoft Word documents
- `.txt` - Plain text files
- `.doc` - Legacy Word documents

## 🔐 Security

- Resumes are not stored on servers
- All data is processed in-memory
- HTTPS encryption recommended for production
- No tracking or analytics by default

## 📚 Resources

- [ATS Best Practices Guide](docs/ATS_BEST_PRACTICES.md)
- [Resume Template](docs/RESUME_TEMPLATE.md)
- [Job Description Analysis](docs/JOB_DESCRIPTION_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Rupesh Udayagiri**
- GitHub: [@rupesh-udayagiri-7](https://github.com/rupesh-udayagiri-7)

## 🙏 Acknowledgments

- Built with React and Python
- Powered by NLP and Machine Learning
- Inspired by real recruiting challenges

## 📞 Support

For issues, questions, or suggestions, please:
- Open an GitHub Issue
- Check the [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- Review [FAQ](docs/FAQ.md)

---

**Last Updated**: March 2026
**Version**: 1.0.0
