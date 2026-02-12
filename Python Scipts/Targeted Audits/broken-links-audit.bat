@echo off
REM ============================================================
REM  Praxis Library — Broken Links Audit
REM  Internal link validation across all pages
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Broken Links Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c broken-links %*

echo.
echo  Broken links audit complete. Report saved to .claude\reports\
echo.
pause
