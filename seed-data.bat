@echo off
echo Seeding Database with Sample Blogs...
set NPM_CMD="C:\Program Files\nodejs\npm.cmd"
set NODE_EXE="C:\Program Files\nodejs\node.exe"

cd server
if not exist node_modules (
    echo Installing dependencies first...
    call %NPM_CMD% install
)
%NODE_EXE% seed.js
echo.
echo Done.

