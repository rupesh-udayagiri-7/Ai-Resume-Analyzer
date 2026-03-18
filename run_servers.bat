@echo off
start "Backend Server" cmd /k "cd backend && venv\Scripts\python.exe manage.py runserver"
start "Frontend Server" cmd /k "cd frontend && npm run dev"
