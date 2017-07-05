# Check to see whether the yarn lockfile was changed when Travis ran yarn.
# We can't use yarn check --integrity because the lock file will already have been updated
# (but not committed), and so the check will always pass.

echo "checking Yarn lockfile for changes"

if git diff --exit-code --quiet yarn.lock; then
  echo "no changes have been made to the lockfile"
else
  echo "lockfile needs updating, run yarn and commit"
  exit 1
fi
