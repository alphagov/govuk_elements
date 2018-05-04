ID-SK elements ·
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Greenkeeper badge](https://badges.greenkeeper.io/id-sk/idsk_elements.svg)](https://greenkeeper.io/)
===============

ID-SK elements is three things:

1. [An online design guide](http://idsk-elements.herokuapp.com/), explaining how to make your service look consistent with the rest of ID-SK.
2. An example of how to use the code in the [ID-SK template](https://github.com/id-sk/idsk_template) and the [ID-SK frontend toolkit](https://github.com/id-sk/idsk_frontend_toolkit).
3. An [npm package of the Sass files](https://www.npmjs.com/package/idsk-elements-sass).

# ID-SK elements guide

[http://idsk-elements.herokuapp.com/](http://idsk-elements.herokuapp.com/).

# Using idsk-elements-sass

Installation and usage instructions can be found in the idsk-elements-sass [README](https://github.com/id-sk/idsk_elements/blob/master/packages/idsk-elements-sass/README.md).

## Running this site locally

If you would like to clone the repository and run it locally,
you will need [Node.js](http://nodejs.org/) (at least version v0.10.0).

Clone this repository

    git clone git@github.com:id-sk/idsk_elements.git


Install all dependencies

    npm install


Run the app

    npm start

Go to [localhost:3000](http://localhost:3000) in your browser.


## Running tests

To check the whole codebase, run:

    npm test

## Linting

### GOV.UK lint
[ID-SK elements uses govuk-lint](https://github.com/alphagov/govuk-lint#sass), which uses [scss-lint](https://github.com/brigade/scss-lint) as its scss linter.

### Standard JavaScript
ID-SK elements uses [standardjs](http://standardjs.com/), an opinionated JavaScript linter. All JavaScript files follow its conventions.

Both linters run on CI to ensure that new pull requests are in line with them.


## Running Wraith to compare changes

ID-SK elements uses Wraith so that regressions can be easily spotted.

This needs to be run from the Wraith directory `/tests/wraith` and some dependencies need to be installed on the local machine first.

1. Install Wraith and its dependencies.
      
        gem install wraith
        
        brew install phantomjs
        
        brew install imagemagick

2. Take a baseline of the current version.

On master run:

        wraith history config.yaml


3. Switch to your feature branch and make changes.

On your feature branch run:

        wraith latest config.yaml

## Releasing a new version

Follow the instructions in [CONTRIBUTING.md](https://github.com/id-sk/idsk_elements/blob/master/CONTRIBUTING.md).

## Pattern libraries using GOV.UK elements

Here are examples of service-specific pattern libraries using [upstream GOV.UK elements](https://github.com/alphagov/govuk_elements).

* [Rural Payments style guide](http://rural-payments-styleguide.herokuapp.com) | [Source Code](https://github.com/Defra/rural-payments-styleguide/)
* [Land Registry pattern library](http://land-registry-elements.herokuapp.com) | [Source Code](https://github.com/LandRegistry/land-registry-elements)
* [Digital Marketplace frontend toolkit](http://alphagov.github.io/digitalmarketplace-frontend-toolkit/) | [Source Code](https://github.com/alphagov/digitalmarketplace-frontend-toolkit)


## Contributing

You can find contribution guidelines in [CONTRIBUTING.md](https://github.com/id-sk/idsk_elements/blob/master/CONTRIBUTING.md)
