#!/bin/bash
set -e

REPO_PATH='id-sk/idsk_elements'

echo "Running create-release.sh ..."
echo "Add config for id-sk/$REPO_PATH"

git config --global user.name "ID-SK CI"
git config --global user.email "ernest.walzel+idsk@slovensko.digital"
git remote add origin_ssh git@github.com:$REPO_PATH.git

# This openssl command was generated automatically by `travis encrypt-file`, see `.travis/README.md` for more details
openssl aes-256-cbc -K $encrypted_232b4f868286_key -iv $encrypted_232b4f868286_iv -in .travis/idsk_elements.enc -out ~/.ssh/id_rsa -d
chmod 600 ~/.ssh/id_rsa


# VERSION.txt has been updated and a tag
# doesn't already exist

# Get the version from the version file
VERSION_TAG="v`cat packages/idsk-elements-sass/VERSION.txt`"

# Create a new tag
echo "Creating new tag: $VERSION_TAG"

# Create a new tag and push to Github
git tag $VERSION_TAG
git push origin_ssh $VERSION_TAG

# This tag will trigger the builds for the deploy providers marked "# For tagged commits" in .travis.yml

# Alias branch for the most recently released tag, for easier diffing and
# automatic deployment to Heroku.
# Force push local `master` branch to the `latest-release` branch on Github
git push --force origin_ssh master:latest-release
echo "Pushed latest-release branch to GitHub"
