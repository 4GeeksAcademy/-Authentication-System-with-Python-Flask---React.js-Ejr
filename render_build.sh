#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm install sonner --force
npm run build

pipenv install

pipenv run upgrade
