@echo off
REM ============================================================
REM  Praxis Library — Structural Audit
REM  Orphan files, duplicate IDs, meta descriptions, deactivated tools
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Structural Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c structural %*

echo.
echo  Structural audit complete. Report saved to .claude\reports\
echo.
pause
