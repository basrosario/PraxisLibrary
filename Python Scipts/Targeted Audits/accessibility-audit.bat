@echo off
REM ============================================================
REM  Praxis Library — Accessibility Audit
REM  WCAG AA: alt text, headings, labels, skip links, lang
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Accessibility Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c accessibility %*

echo.
echo  Accessibility audit complete. Report saved to .claude\reports\
echo.
pause
