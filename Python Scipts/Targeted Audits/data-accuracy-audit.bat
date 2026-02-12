@echo off
REM ============================================================
REM  Praxis Library — Data Accuracy Audit
REM  Charts, gauges, counters, bar widths, stat cards
REM ============================================================
cd /d "%~dp0\..\.."

echo.
echo  ========================================
echo   Praxis Library - Data Accuracy Audit
echo  ========================================
echo.

python "Python Scipts\PraxisLibraryAudit.py" --verbose -c data-accuracy %*

echo.
echo  Data accuracy audit complete. Report saved to .claude\reports\
echo.
pause
