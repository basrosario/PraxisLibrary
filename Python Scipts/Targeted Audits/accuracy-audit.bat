@echo off
REM ============================================================
REM  Praxis Library — Accuracy Audit
REM  Counter values, glossary counts, search index consistency
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Accuracy Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c accuracy %*

echo.
echo  Accuracy audit complete. Report saved to .claude\reports\
echo.
pause
