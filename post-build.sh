#!/bin/bash
# Post-build script to add type="module" to script tags in index.html

INDEX_FILE="dist/index.html"

if [ -f "$INDEX_FILE" ]; then
  echo "Adding type=\"module\" to script tags in $INDEX_FILE"
  sed -i 's/<script src=/<script type="module" src=/g' "$INDEX_FILE"
  echo "Done!"
else
  echo "Error: $INDEX_FILE not found"
  exit 1
fi
