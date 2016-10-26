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

Follow the guidelines on [semver.org](http://semver.org/) for assigning version
numbers.

Versions should only be changed in a commit of their own, in a pull request of
their own. This alerts team members to the new version and allows for
last-minute scrutiny before the new version is released. Also, by raising a
separate pull request, we avoid version number conflicts between feature
branches.

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
