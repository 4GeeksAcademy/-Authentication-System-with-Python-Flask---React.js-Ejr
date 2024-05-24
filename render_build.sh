#!/usr/bin/env bash
set -o errexit

npm install
npm run tailwind
npm run build

pipenv install
pipenv run remake