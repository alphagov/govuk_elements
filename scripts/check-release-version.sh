echo "Check if VERSION.txt has been updated"

if git diff --exit-code --quiet packages/govuk-elements-sass/VERSION.txt; then
  echo "VERSION.txt is unchanged, no need to create release."
  exit 1
else
  echo "Proceed to create release..."
fi
