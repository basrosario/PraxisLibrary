@echo off
REM ============================================================
REM  Praxis Library — Continuity Audit
REM  Template consistency across all pages
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Continuity Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c continuity %*

echo.
echo  Continuity audit complete. Report saved to .claude\reports\
echo.
pause
