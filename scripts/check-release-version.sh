echo "Check to see if a tag for this version exists"

# Get the version from the version file
VERSION_TAG="v`cat packages/govuk-elements-sass/VERSION.txt`"

# Create a new tag - if the version file has been updated and a tag for that
# version doesn't already exist

# Check to make sure the tag doesn't already exist
if ! git rev-parse $VERSION_TAG >/dev/null 2>&1; then
  echo "A tag for this version doesn't already exist"
  echo "Proceed to create release..."
else
  echo "A tag for this version exists, no need to create release."
  exit 1
fi
