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

Versions should only be changed in a commit of their own, in a pull request of
their own. This alerts team members to the new version and allows for
last-minute scrutiny before the new version is released. Also, by raising a
separate pull request, we avoid version number conflicts between feature
branches.

## Releasing a new version

1. Create a branch that proposes a new [version number](https://github.com/alphagov/govuk_elements/blob/master/VERSION.txt) and update the [`CHANGELOG`](https://github.com/alphagov/govuk_elements/blob/master/CHANGELOG.md). To see the commits to be summarised in the changelog since the last release, [compare the latest-release branch with master](https://github.com/alphagov/govuk_elements/compare/latest-release...master).
2. Open a Pull Request - here is a [good example](https://github.com/alphagov/govuk_elements/pull/438).
3. Once merged into master a new version will be built by [Travis CI](https://travis-ci.org/alphagov/govuk_elements).
4. The master branch will be [deployed to production](http://govuk-elements.herokuapp.com/)

## For each new version

1. A new tag will be created and pushed to GitHub
2. The GOV.UK elements app builds the govuk-elements-sass package to /dist and the contents of dist (a versioned .tgz file) is then released to NPM as the [govuk-elements-sass](https://www.npmjs.com/package/govuk-elements-sass) package.
3. The versioned govuk-elements-sass.tgz file is uploaded to GitHub releases.
4. The [latest release branch](https://github.com/alphagov/govuk_elements/tree/latest-release) and the latest release [Heroku app](http://govuk-elements-sass-release.herokuapp.com/) are updated.

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
