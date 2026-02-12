@echo off
REM ============================================================
REM  Praxis Library — Citation Accuracy Audit
REM  Source attribution, .gov/.edu links, highlight box citations
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Citation Accuracy Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c citation-accuracy %*

echo.
echo  Citation accuracy audit complete. Report saved to .claude\reports\
echo.
pause
