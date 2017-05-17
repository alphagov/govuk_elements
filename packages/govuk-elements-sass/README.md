GOV.UK elements ·
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Greenkeeper badge](https://badges.greenkeeper.io/alphagov/govuk_elements.svg)](https://greenkeeper.io/)
===============

GOV.UK elements is three things:

1. [An online design guide](http://govuk-elements.herokuapp.com/), explaining how to make your service look consistent with the rest of GOV.UK.
2. An example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit).
3. An [npm package of the Sass files](https://www.npmjs.com/package/govuk-elements-sass).

# GOV.UK elements guide

[http://govuk-elements.herokuapp.com/](http://govuk-elements.herokuapp.com/).

# Using govuk-elements-sass

GOV.UK elements has the [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit) as a dependency.

It assumes your project is using the [GOV.UK template](https://github.com/alphagov/govuk_template).

The govuk_frontend_toolkit provides Sass variables, functions and mixins, they *must be imported* before any of the GOV.UK elements Sass files.

The govuk_frontend_toolkit's Sass files are imported at the top of `_govuk-elements.scss`.

## Install

To install the govuk-elements-sass package, use:

    `npm install govuk-elements-sass`

This installs the package as well as the packages it depends on to the local `/node_modules/` folder.

## Usage

To import all of the govuk-elements-sass files, import the `_govuk-elements.scss` partial.

    @import govuk-elements;

## Set a path for your image assets

If you are not using Rails or Compass, then you will need to define a `$path` variable in your main application stylesheet.

     $path: "/public/images/";

There is an example of this in: `assets/sass/govuk-elements-styles.scss`.

## Alternate usage

You can pick and choose partials from the govuk-elements-sass package.

Choose these from the list of imported partials in `_govuk_elements.scss`.

**The GOV.UK frontend toolkit scss dependencies listed below must be imported first**.

    // GOV.UK frontend toolkit
    // Sass variables, mixins and functions
    // https://github.com/alphagov/govuk_frontend_toolkit/tree/master/stylesheets

    // Settings (variables)
    @import "colours";                                // Colour variables
    @import "font_stack";                             // Font family variables
    @import "measurements";                           // Widths and gutter variables

    // Mixins
    @import "conditionals";                           // Media query mixin
    @import "device-pixels";                          // Retina image mixin
    @import "grid_layout";                            // Basic grid layout mixin
    @import "typography";                             // Core bold and heading mixins
    @import "shims";                                  // Inline block mixin, clearfix placeholder

    // Mixins to generate components (chunks of UI)
    @import "design-patterns/alpha-beta";
    @import "design-patterns/buttons";

    // Functions
    // @import "url-helpers";                         // Function to output image-url, or prefixed path (Rails and Compass only)


If you're not using the [GOV.UK template](https://github.com/alphagov/govuk_template),
you’ll also need to uncomment the base partial in `_govuk_elements.scss`, or create your own.

    // @import "elements/base";                       // HTML elements, set by the GOV.UK template


## Compile

### Using a task runner to compile the Sass files

Add the `node_modules/govuk_frontend_toolkit` and `node_modules/govuk-elements-sass` directories to the `includePaths` property of your Sass plugin - if you're using a task runner like Gulp or Grunt, to reference the location of these files.

Import `_govuk-elements.scss` into your main.scss file.

### Example folder structure

    - index.html
    -- node_modules
        -- govuk-elements-sass
        -- govuk_frontend_toolkit
    -- assets
        -- scss
            - main.scss
        -- css
            - main.css

### Using [Gulp](http://gulpjs.com/)

#### Example Gulpfile.js

    'use strict';

    const gulp = require('gulp')
    const sass = require('gulp-sass')

    // Compile scss files to css
    gulp.task('styles', () => {
      return gulp.src('./sass/**/*.scss')
        .pipe(sass({
          includePaths: [
            'node_modules/govuk_frontend_toolkit/stylesheets', // 1
            'node_modules/govuk-elements-sass/public/sass'     // 2
          ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
    })

In the example above `includePaths` uses two paths to resolve the scss @import statements.

1. The location of the directory containing the govuk_frontend_toolkit sass files.
2. The location of the directory containing the govuk-elements-sass files.

### Using Grunt

#### Example Gruntfile.js

    grunt.loadNpmTasks('grunt-contrib-sass')

    grunt.initConfig({
      sass: {
        dist: {
          options: {
            includePaths: [
              'node_modules/govuk_frontend_toolkit/stylesheets', // 1
              'node_modules/govuk-elements-sass/public/sass'     // 2
            ],
          },
          files: {
            'main.css': 'main.scss'
          }
        }
      }
    })

In the example above `includePaths` uses two paths to resolve the scss @import statements.

1. The location of the directory containing the govuk_frontend_toolkit sass files.
2. The location of the directory containing the govuk-elements-sass files.

## Running this site locally

If you would like to clone the repository and run it locally,
you will need [Node.js](http://nodejs.org/) (at least version v0.10.0).

Clone this repository

    git clone git@github.com:alphagov/govuk_elements.git


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
[GOV.UK elements uses govuk-lint](https://github.com/alphagov/govuk-lint#sass), which uses [scss-lint](https://github.com/brigade/scss-lint) as its scss linter.

### Standard JavaScript
GOV.UK elements uses [standardjs](http://standardjs.com/), an opinionated JavaScript linter. All JavaScript files follow its conventions.

Both linters run on CI to ensure that new pull requests are in line with them.


## Running Wraith to compare changes

GOV.UK elements uses Wraith so that regressions can be easily spotted.

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


## Pattern libraries using GOV.UK elements

Here are examples of service-specific pattern libraries using GOV.UK elements.

* [Rural Payments style guide](http://rural-payments-styleguide.herokuapp.com) | [Source Code](https://github.com/Defra/rural-payments-styleguide/)
* [Land Registry pattern library](http://land-registry-elements.herokuapp.com) | [Source Code](https://github.com/LandRegistry/land-registry-elements)
* [Digital Marketplace frontend toolkit](http://alphagov.github.io/digitalmarketplace-frontend-toolkit/) | [Source Code](https://github.com/alphagov/digitalmarketplace-frontend-toolkit)


## Contributing

You can find contribution guidelines in [CONTRIBUTING.md](https://github.com/alphagov/govuk_elements/blob/master/CONTRIBUTING.md)
