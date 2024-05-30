#!/usr/bin/env bash
set -o errexit

pipenv install

npm install
npm run build
npm run tailwind

pipenv run remake