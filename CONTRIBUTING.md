# Contribution Guidelines

We welcome patches to GOV.UK elements, as long as you follow these
guidelines:

## Indentation and whitespace

2-space, soft-tabs only. No trailing whitespace.

## JavaScript

`govuk_elements` uses [standardjs](http://standardjs.com/), an opinionated JavaScript linter.
All JavaScript files follow its conventions, and it runs on CI to ensure that new pull requests are in line with them.

To check the whole codebase, run:

`npm test`

Take a look at the [prototype kit documentation on linting](https://github.com/alphagov/govuk_prototype_kit/blob/master/docs/linting.md).

## Versioning

We use [Semantic Versioning](http://semver.org/).

## To release a new version

1. Run the package task (to copy the Sass files from `/assets/sass` to `/packages/govuk-elements-sass/public/sass/`)

    gulp package

2. Open a new pull request with two commits:

**The first commit:**
Commit the changes to the Sass files in the package.
Update CHANGELOG.md to summarise these changes.

To see the commits to be summarised in the changelog since the last release, [compare the latest-release branch with master](https://github.com/alphagov/govuk_elements/compare/latest-release...master).

**The second commit:**
Propose a new version number in [`VERSION.txt`](https://github.com/alphagov/govuk-elements-sass/blob/master/packages/govuk-elements-sass/VERSION.txt) and update [`package.json`](https://github.com/alphagov/govuk-elements-sass/blob/master/packages/govuk-elements-sass/CHANGELOG.md) with the new version number.

3. Once merged into master a new version will be built:

The [create-release.sh](https://github.com/alphagov/govuk_elements/blob/master/create-release.sh) script will check for an existing tag matching the version number in `packages/govuk-elements-sass/VERSION.txt`, if it doesn’t exist, it creates a tag and pushes this to Github.

On a tagged commit, Travis deploys the package to npm.

The contents of `/packages/govuk-elements-sass` will be also be released using [GitHub Releases using Travis](https://docs.travis-ci.com/user/deployment/releases/).

## Commit hygiene

Please see our [git style guide](https://github.com/alphagov/styleguides/blob/master/git.md)
which describes how we prefer git history and commit messages to read.

## Code

The code in GOV.UK elements is built on top of the [GOV.UK template](https://github.com/alphagov/govuk_template)
and the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit).

If you find an issue with GOV.UK elements, please raise an issue via this repository.

If you want to suggest changes or raise bugs on code from the toolkit, please do so through its repository, not this one.

## Design

There is a Hackpad for [Design Patterns for GOV.UK services](https://designpatterns.hackpad.com/).
