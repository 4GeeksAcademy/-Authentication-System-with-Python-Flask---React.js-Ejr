#!/bin/bash
set -e
npm run build

echo "fetch"
git fetch publish deploy

echo "checkout"
git checkout -B deploy

echo "add"
git add -f dist
git add -f static

echo "commit"
git commit -m "deploy"

echo "push"
git push publish deploy