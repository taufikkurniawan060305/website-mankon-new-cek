@echo off
title Website Praktikum Manajemen Konstruksi
cd /d "%~dp0"
echo ===================================================
echo   Menjalankan Website Praktikum Manajemen Konstruksi
echo ===================================================
echo Memulai server lokal di http://localhost:5500/ ...
start "" powershell -ExecutionPolicy Bypass -File ".\server.ps1"
timeout /t 2 /nobreak >nul
start http://localhost:5500/
exit
