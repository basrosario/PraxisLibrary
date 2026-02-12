@echo off
REM ============================================================
REM  Praxis Library — Security Audit
REM  CSP compliance, inline styles/scripts, external resources
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Security Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c security %*

echo.
echo  Security audit complete. Report saved to .claude\reports\
echo.
pause
