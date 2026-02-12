@echo off
REM ============================================================
REM  Praxis Library — Relevancy Audit
REM  Placeholder content, outdated dates, orphan files
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Relevancy Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c relevancy %*

echo.
echo  Relevancy audit complete. Report saved to .claude\reports\
echo.
pause
