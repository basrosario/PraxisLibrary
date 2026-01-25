#!/bin/bash
# Bash script to rename security test screenshots
#
# INSTRUCTIONS:
# 1. Open each screenshot to identify it
# 2. Edit this file and uncomment the correct rename commands
# 3. Run: bash rename-screenshots.sh
#

echo "=========================================="
echo "Screenshot Rename Helper"
echo "=========================================="
echo ""
echo "Current files in directory:"
echo ""
ls -lh *.png | grep "Screenshot"
echo ""
echo "File dimensions:"
file Screenshot*.png
echo ""
echo "=========================================="
echo ""
echo "BEFORE RUNNING: Open each screenshot above and identify it!"
echo ""
echo "Then uncomment (remove #) from the correct rename commands below:"
echo ""
read -p "Press Enter to continue..."

# ==========================================
# Based on file sizes and dimensions, here are the likely matches:
# ==========================================

# Screenshot 171954.png (408KB, 1627x680 - very wide) → likely SSL Labs
# mv "Screenshot 2026-01-23 171954.png" "ssl-labs.png"

# Screenshot 170907.png (103KB, 1148x903 - tall/square) → likely GTmetrix summary
# mv "Screenshot 2026-01-23 170907.png" "gtmetrix.png"

# Screenshot 171044.png (70KB, 1237x674 - wide) → likely Security Headers
# mv "Screenshot 2026-01-23 171044.png" "securityheaders.png"

# Screenshot 171501.png (71KB, 1102x741 - medium) → likely Mozilla Observatory
# mv "Screenshot 2026-01-23 171501.png" "mozilla-observatory.png"

echo ""
echo "=========================================="
echo "Rename complete! Checking new filenames:"
echo "=========================================="
echo ""
ls -lh gtmetrix.png mozilla-observatory.png securityheaders.png ssl-labs.png 2>/dev/null
echo ""
echo "If all 4 files are listed above, you're done!"
echo "If not, check which ones are missing and edit this script."
echo ""
