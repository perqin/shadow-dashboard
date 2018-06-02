#!/bin/bash

set -e

# Download Web GUI zip
FILENAME=$(curl 'https://api.github.com/repos/perqin/shadow-dashboard-web-gui/releases/latest' -q | python3 -c "import sys, json; print(json.load(sys.stdin)['assets'][0]['name'])")
DIRNAME="${FILENAME%.*}"
DOWNLOAD_URL=$(curl 'https://api.github.com/repos/perqin/shadow-dashboard-web-gui/releases/latest' -q | python3 -c "import sys, json; print(json.load(sys.stdin)['assets'][0]['browser_download_url'])")
curl $DOWNLOAD_URL -LO
# Unzip
unzip -O $FILENAME
rm $FILENAME
# Move to src/public
rm -rf ./src/public/*
mv ./$DIRNAME/* ./src/public/
rm -d $DIRNAME
