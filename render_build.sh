#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npm run build

pipenv install
pipenv run flask fill-db-with-example-data
pipenv run upgrade
