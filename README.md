GOV.UK elements
===============

## What is it?

GOV.UK elements is three things:

1. an online design guide, explaining how to make your service look consistent with the rest of GOV.UK
2. an example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)
3. an npm package of the Sass files

The guide can be seen here: [http://govuk-elements.herokuapp.com](http://govuk-elements.herokuapp.com/).

To preview the latest relase of govuk-elements-sass:
[http://govuk-elements-sass-release.herokuapp.com/](http://govuk-elements-sass-release.herokuapp.com/)
This is the most recent tagged version.

## How can it be used?

It can be used as a base of frontend code.

GOV.UK elements has the [GOV.UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit) and the [GOV.UK template](https://github.com/alphagov/govuk_template) as dependencies.

The toolkit provides Sass variables, functions and mixins, they *must be imported* before any of the GOV.UK elements Sass files.

Take a look at the top of `/public/sass/_govuk-elements.scss` to see how the GOV.UK frontend toolkit's Sass files are imported.

Choose the Sass files you need to build on top of those provided by the frontend toolkit.

Ignore the `/public/sass/elements-page.scss` files, these exist to style the page furniture of GOV.UK elements (for example, the HTML example boxes and colour swatches).


## Using the govuk-elements-sass package

To install the govuk-elements-sass package, use:

    `npm install govuk-elements-sass`

This installs the package as well as the packages it depends on to the local `/node_modules/` folder.

The GOV.UK frontend toolkit scss dependencies must be imported first, as these contain Sass variables, mixins and functions.

The `_govuk_elements.scss` partial shows which files are required.

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
    @import "typography";                             // Core bold and heading mixins, also external links
    @import "shims";                                  // Inline block mixin, clearfix placeholder

    // Mixins to generate components (chunks of UI)
    @import "design-patterns/alpha-beta";
    @import "design-patterns/buttons";

    // Functions
    // @import "url-helpers";                         // Function to output image-url, or prefixed path (Rails and Compass only)


Add the `node_modules/govuk_frontend_toolkit` and `node_modules/govuk-elements-sass` directories to the `includePaths` property of your Sass plugin - if you're using a task runner like Gulp, to reference the location of these files.

If you're not using the [GOV.UK template](https://github.com/alphagov/govuk_template), you'll also need to uncomment the base partial in `_govuk_elements.scss`, or create your own.

    // @import "elements/base";                       // HTML elements, set by the GOV.UK template


## Example: Using [Gulp](http://gulpjs.com/) to compile the govuk-elements-sass files

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


Import `_govuk-elements.scss` into your main.scss file.

### Example Gulpfile.js

    'use strict';

    var gulp = require('gulp');
    var sass = require('gulp-sass');

    var repo_root = __dirname + '/';
    var govuk_frontend_toolkit_root =  repo_root + 'node_modules/govuk_frontend_toolkit/stylesheets'; // 1
    var govuk_elements_sass_root =  repo_root + 'node_modules/govuk-elements-sass/public/sass'; // 2

    // Compile scss files to css
    gulp.task('styles', function () {
      return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass({includePaths: [
          govuk_frontend_toolkit_root,
          govuk_elements_sass_root
          ]}).on('error', sass.logError))
        .pipe(gulp.dest('./assets/css'));
    });

In the example above `includePaths` uses two paths to resolve the scss @import statements.

1. The location of the directory containing the govuk_frontend_toolkit sass files
2. The location of the directory containing the govuk-elements-sass files

### Run

    gulp styles

To compile the govuk-elements-sass files.

## Running this site locally

If you would like to clone the repository and run it locally,
you will need [Node.js](http://nodejs.org/) (at least version v0.10.0).

Clone this repository

    git clone git@github.com:alphagov/govuk_elements.git


Install the required node modules

    npm install


Run the app

    node start.js

Go to [localhost:3000](http://localhost:3000) in your browser.


## Running Wraith to compare changes

GOV.UK elements uses Wraith so that regressions can be easily spotted.

This needs to be run from the Wraith directory `/tests/wraith` and some dependencies need to be installed on the local machine first.

### Install Wraith and its dependencies

    gem install wraith
    brew install phantomjs
    brew install imagemagick

### Usage

Take a baseline of the current version.
On master run:

    wraith history config.yaml


Switch to your feature branch and make changes.
On feature branch run:

    wraith latest config.yaml


## How are people building with GOV.UK elements?

Here are examples of service-specific pattern libraries using GOV.UK elements.

* [Rural Payments style guide](http://rural-payments-styleguide.herokuapp.com) | [Source Code](https://github.com/Defra/rural-payments-styleguide/)
* [Land Registry pattern library](http://land-registry-elements.herokuapp.com) | [Source Code](https://github.com/LandRegistry/land-registry-elements)
* [Digital Marketplace frontend toolkit](http://alphagov.github.io/digitalmarketplace-frontend-toolkit/) | [Source Code](https://github.com/alphagov/digitalmarketplace-frontend-toolkit)
