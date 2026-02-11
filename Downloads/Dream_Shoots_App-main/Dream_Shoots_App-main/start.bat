@echo off
REM Dream Shoots App - Start Script for Railway (Windows)

echo 🚀 Starting Dream Shoots App...

REM Determine which service to run
if "%SERVICE%"=="backend" goto backend
if "%SERVICE%"=="" goto backend
if "%SERVICE%"=="frontend" goto frontend

echo ❌ Unknown service: %SERVICE%
echo Set SERVICE=backend or SERVICE=frontend
exit /b 1

:backend
echo 📦 Starting Backend Service...
cd backend

echo 📥 Installing Python dependencies...
pip install --no-cache-dir -r requirements.txt

echo ✅ Backend starting on port %PORT% (default 8000)
if "%PORT%"=="" (
    set PORT=8000
)
uvicorn server:app --host 0.0.0.0 --port %PORT%
exit /b %ERRORLEVEL%

:frontend
echo 📦 Starting Frontend Service...
cd frontend

echo 📥 Installing Node dependencies...
call npm ci

echo 🔨 Building frontend...
call npm run build

echo ✅ Frontend starting on port %PORT% (default 3000)
if "%PORT%"=="" (
    set PORT=3000
)
call npx serve -s build -l %PORT%
exit /b %ERRORLEVEL%
