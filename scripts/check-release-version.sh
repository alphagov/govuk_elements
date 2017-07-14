echo "Check to see if a tag for this version exists"

# Get the version from the version file
VERSION_TAG="v`cat packages/govuk-elements-sass/VERSION.txt`"

# Check to make sure the tag doesn't already exist
if ! git rev-parse $VERSION_TAG >/dev/null 2>&1; then
  echo "A tag for this version doesn't already exist"
  echo "Proceed to create tag and release..."
else
  echo "A tag for this version exists, no need to create release."
  exit 1
fi
