#! /bin/bash

set -e

echo "Starting provider"

git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.org"
git remote add origin_ssh git@github.com:alphagov/govuk_elements.git
openssl aes-256-cbc -K $encrypted_85ebe8034b89_key -iv $encrypted_85ebe8034b89_iv -in .travis/govuk_elements.enc -out ~/.ssh/id_rsa -d && chmod 600 ~/.ssh/id_rsa # This openssl command was generated automatically by `travis encrypt-file`, see `.travis/README.md` for more details

./push-version-tag.sh
./update-release-branch.sh
