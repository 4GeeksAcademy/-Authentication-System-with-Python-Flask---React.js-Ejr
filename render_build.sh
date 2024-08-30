#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build
npm run build-tw

pipenv install

pipenv run upgrade
pipenv run insert-test-data