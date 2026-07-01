# 🚀 Complete Setup Guide - AI Resume Analyzer

This guide will help you set up and run the AI Resume Analyzer project on your local machine from GitHub.

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Git** - [Download Git](https://git-scm.com/download/)
- **Node.js** (v16+) - [Download Node.js](https://nodejs.org/)
- **Python** (3.8+) - [Download Python](https://www.python.org/downloads/)
- **npm** - Comes with Node.js

### Verify Installations

```bash
# Check Node.js version
node --version
# Output: v16.0.0 or higher

# Check npm version
npm --version
# Output: 7.0.0 or higher

# Check Python version
python --version
# Output: Python 3.8 or higher
```

---

## 🔧 Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/rupesh-udayagiri-7/Ai-Resume-Analyzer.git

# Navigate into the project
cd Ai-Resume-Analyzer

# List contents to verify
ls -la  # macOS/Linux
dir     # Windows
```

You should see:
```
backend/
frontend/
run_servers.bat
run_startup.ps1
README.md
SETUP_GUIDE.md
.gitignore
```

---

## 🔧 Step 2: Backend Setup (Python/Django)

### 2.1 Create Virtual Environment

**macOS/Linux:**
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# You should see (venv) at the start of your terminal
```

**Windows (Command Prompt):**
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# You should see (venv) at the start of your terminal
```

**Windows (PowerShell):**
```powershell
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# If you get an error, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Then run the activation command again
```

### 2.2 Install Dependencies

With virtual environment activated:

```bash
# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

# Verify installation
pip list
```

### 2.3 Run Django Development Server

```bash
# Ensure you're in backend directory with venv activated
cd backend

# Run migrations (if needed)
python manage.py migrate

# Start the Django server
python manage.py runserver

# Expected output:
# Starting development server at http://127.0.0.1:8000/
# Django version 4.x, using settings 'config.settings'
```

✅ Backend is now running at: **http://localhost:8000**

---

## 🔧 Step 3: Frontend Setup (React/Vite)

**In a new terminal window/tab:**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# This will install all packages listed in package.json
# It may take 2-5 minutes depending on your internet speed
```

### Start Frontend Development Server

```bash
# Run Vite dev server
npm run dev

# Expected output:
#   VITE v8.0.0  ready in 234 ms
#
#   ➜  Local:   http://localhost:5173/
#   ➜  press h to show help
```

✅ Frontend is now running at: **http://localhost:5173**

---

## 🎯 Step 4: Verify Both Servers Are Running

Open your browser and check:

1. **Backend API**: http://localhost:8000/api/
   - Should show Django REST Framework interface
   
2. **Frontend**: http://localhost:5173/
   - Should show the Resume Analyzer UI

3. **Check Connection**: Open browser console (F12) and verify no CORS errors

---

## ⚡ Quick Start (All-in-One Method)

### Windows - Command Prompt

```bash
# From project root directory
run_servers.bat
```

This opens two command windows:
- One for Backend Server
- One for Frontend Server

### Windows - PowerShell

```powershell
# From project root directory
.\run_startup.ps1

# If you get permission error, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### macOS/Linux - Terminal

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend (open new terminal tab)
cd frontend
npm run dev
```

---

## 📦 Backend Dependencies Explained

```
Django                  # Web framework
djangorestframework     # REST API toolkit
django-cors-headers    # Handle CORS requests
pymongo                # MongoDB support
pdfminer.six          # PDF text extraction
python-docx           # Word document handling
spacy                 # NLP processing
scikit-learn          # Machine learning
```

---

## 📦 Frontend Dependencies Explained

```
react                          # UI library
react-dom                      # React renderer
react-router-dom               # Routing
axios                          # HTTP requests
react-icons                    # Icon library
react-circular-progressbar     # Progress visualization
vite                          # Build tool
@vitejs/plugin-react          # React plugin for Vite
eslint                        # Code linting
```

---

## 🔌 API Connection

### Frontend Configuration

Frontend connects to backend via `axios` in `src/services/api.js`:

```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
```

**If backend is on different port:**
- Edit `frontend/.env` or `frontend/.env.local`
- Add: `VITE_API_URL=http://localhost:YOUR_PORT/api`

---

## 🐛 Troubleshooting

### Issue: "Port 8000 already in use"

**Solution:**
```bash
# macOS/Linux - Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Windows - Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: "Module not found" errors in Python

**Solution:**
```bash
# Ensure virtual environment is activated
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Reinstall requirements
pip install -r requirements.txt
```

### Issue: "npm command not found"

**Solution:**
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal/command prompt

### Issue: CORS errors in browser console

**Solution:**
- Ensure backend is running
- Check `CORS_ALLOWED_ORIGINS` in backend settings
- Verify frontend is accessing correct backend URL

### Issue: "Cannot find module" in React

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json  # macOS/Linux
rmdir /s node_modules                  # Windows
npm install
```

### Issue: Python version mismatch

**Solution:**
```bash
# Use specific Python version
python3 -m venv venv  # Use python3 explicitly

# Or on Windows
python -m venv venv
```

---

## 📝 Environment Setup (Optional)

### Backend .env file

Create `backend/.env`:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
PDF_MAX_SIZE=10485760
```

### Frontend .env file

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=AI Resume Analyzer
```

---

## 🏗️ Project Structure

```
Ai-Resume-Analyzer/
│
├── backend/                    # Django REST API
│   ├── manage.py              # Django management
│   ├── requirements.txt        # Python dependencies
│   ├── venv/                  # Virtual environment
│   ├── app/
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # Data serializers
│   │   ├── urls.py            # URL routing
│   │   └── models.py          # Database models
│   └── config/
│       └── settings.py        # Django settings
│
├── frontend/                   # React + Vite
│   ├── package.json           # npm dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── node_modules/          # Installed packages
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Main app
│   │   └── main.jsx           # Entry point
│   └── index.html             # HTML template
│
├── run_servers.bat            # Windows batch file
├── run_startup.ps1            # PowerShell script
├── README.md                  # Project overview
└── SETUP_GUIDE.md            # This file
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running at http://localhost:8000
- [ ] Frontend running at http://localhost:5173
- [ ] No CORS errors in browser console
- [ ] Can upload resume file
- [ ] Can paste job description
- [ ] Analysis completes successfully
- [ ] ATS score displays correctly

---

## 🔄 Daily Workflow

### To start development:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### To stop:
- Press `Ctrl + C` in each terminal

### To make changes:
- Edit files in `backend/` or `frontend/`
- Changes auto-reload with hot module replacement (HMR)

---

## 📚 Additional Commands

### Frontend Build for Production

```bash
cd frontend
npm run build

# Output in: frontend/dist/
```

### Backend Django Commands

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test
```

### Frontend Linting

```bash
cd frontend
npm run lint
```

---

## 🚀 Next Steps

1. ✅ Follow the setup guide above
2. 📖 Read the main [README.md](README.md)
3. 🔍 Explore the API endpoints
4. 💻 Start developing features
5. 🧪 Write tests
6. 📤 Push changes to GitHub

---

## ❓ Need Help?

1. Check the **Troubleshooting** section above
2. Read error messages carefully
3. Check GitHub Issues: https://github.com/rupesh-udayagiri-7/Ai-Resume-Analyzer/issues
4. Review documentation in comments

---

## 📞 Support

For issues or questions:
- Open a GitHub Issue
- Check closed issues for solutions
- Review error stack traces

---

**Happy Coding! 🎉**

Last Updated: July 2026
Version: 1.0.0
