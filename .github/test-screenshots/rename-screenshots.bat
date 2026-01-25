@echo off
REM Batch script to rename security test screenshots
REM
REM INSTRUCTIONS:
REM 1. Open each screenshot to identify it
REM 2. Edit this file and uncomment the correct rename commands
REM 3. Run this batch file
REM

echo ==========================================
echo Screenshot Rename Helper
echo ==========================================
echo.
echo Current files in directory:
echo.
dir /B *.png | findstr /V /C:"gtmetrix.png" /C:"mozilla-observatory.png" /C:"securityheaders.png" /C:"ssl-labs.png"
echo.
echo ==========================================
echo.
echo BEFORE RUNNING: Open each screenshot above and identify it!
echo.
echo Then uncomment (remove REM) from the correct rename commands below:
echo.
pause

REM ==========================================
REM OPTION 1: If Screenshot 171954.png (408KB, 1627x680) is SSL Labs
REM ==========================================
REM ren "Screenshot 2026-01-23 171954.png" "ssl-labs.png"

REM ==========================================
REM OPTION 2: If Screenshot 170907.png (103KB, 1148x903) is GTmetrix
REM ==========================================
REM ren "Screenshot 2026-01-23 170907.png" "gtmetrix.png"

REM ==========================================
REM OPTION 3: If Screenshot 171044.png (70KB, 1237x674) is Security Headers
REM ==========================================
REM ren "Screenshot 2026-01-23 171044.png" "securityheaders.png"

REM ==========================================
REM OPTION 4: If Screenshot 171501.png (71KB, 1102x741) is Mozilla Observatory
REM ==========================================
REM ren "Screenshot 2026-01-23 171501.png" "mozilla-observatory.png"

echo.
echo ==========================================
echo Rename complete! Checking new filenames:
echo ==========================================
echo.
dir /B gtmetrix.png mozilla-observatory.png securityheaders.png ssl-labs.png 2>nul
echo.
echo If all 4 files are listed above, you're done!
echo If not, check which ones are missing and edit this script.
echo.
pause
