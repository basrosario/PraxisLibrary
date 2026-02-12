@echo off
REM ============================================================
REM  Praxis Library — Site Audit Runner
REM  Runs the full site audit with verbose output
REM
REM  Usage:
REM    Double-click this file, or from terminal:
REM      "Python Scipts\run_audit.bat"
REM      "Python Scipts\run_audit.bat" --skip-urls     (offline mode)
REM      "Python Scipts\run_audit.bat" -c security
REM ============================================================

REM Navigate to project root (parent of Python Scipts folder)
cd /d "%~dp0\.."

echo.
echo  ========================================
echo   Praxis Library - Full Site Audit
echo  ========================================
echo.

REM URL verification is now on by default — pass --skip-urls for offline mode
python "Python Scipts\PraxisLibraryAudit.py" --verbose %*

echo.
echo  Audit complete. Report saved to .claude\reports\
echo.
pause
