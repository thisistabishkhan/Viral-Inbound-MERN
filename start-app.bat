@echo off
echo Starting Viral Inbound MERN Application...

:: Add Node.js to PATH for this session
set PATH=%PATH%;C:\Program Files\nodejs\

set NPM_CMD="C:\Program Files\nodejs\npm.cmd"

cd server
if not exist node_modules (
    echo Installing Server Dependencies...
    call %NPM_CMD% install
) else (
    echo Server dependencies found.
)

start "Viral Inbound Backend" cmd /k "%NPM_CMD% run dev"
cd ..

cd client
if not exist node_modules (
    echo Installing Client Dependencies...
    call %NPM_CMD% install
) else (
    echo Client dependencies found.
)

start "Viral Inbound Frontend" cmd /k "%NPM_CMD% run dev"

echo.
echo Application starting...
echo Backend running on port 5000
echo Frontend running on http://localhost:5173
echo.
echo If the windows close immediately, there is an error.
echo Check if Node.js is blocked or not installed correctly.
echo.
echo Done.
