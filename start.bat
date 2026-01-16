@echo off
echo ========================================
echo   Starting Team Directory Application
echo ========================================
echo.

echo [1/2] Starting API Server on port 8500...
start "API Server" cmd /k "node server.cjs"

timeout /t 3 /nobreak >nul

echo [2/2] Starting React App on port 3000...
start "React App" cmd /k "npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo   API Server: http://localhost:8500
echo   React App:  http://localhost:3000
echo.
echo   Press any key to exit this window...
echo   (Servers will continue running in separate windows)
pause >nul
