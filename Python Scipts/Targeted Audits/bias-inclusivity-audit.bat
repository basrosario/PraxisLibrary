@echo off
REM ============================================================
REM  Praxis Library — Bias/Inclusivity Audit
REM  Exclusionary language, gender-coded terms, ableist language
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Bias/Inclusivity Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c bias-inclusivity %*

echo.
echo  Bias/Inclusivity audit complete. Report saved to .claude\reports\
echo.
pause
