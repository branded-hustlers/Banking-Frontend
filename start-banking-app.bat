@echo off
echo Starting Core Banking System...
echo.
echo Navigating to project directory...
cd /d "C:\Users\Johnson Kuzagbe\Desktop\Core Banking System\Core-Banking-System-Frontend\electron-banking-system"

echo.
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm start

pause