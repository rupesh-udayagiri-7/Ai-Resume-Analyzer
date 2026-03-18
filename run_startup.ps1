Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; if (Test-Path venv\Scripts\activate.ps1) { .\venv\Scripts\activate.ps1 } else { ./venv/Scripts/activate }; python manage.py runserver"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
