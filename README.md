GOV.UK elements
===============

## What is it?

GOV.UK elements is two things:

1. an online design guide, explaining how to make your service look consistent with the rest of GOV.UK
2. an example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)

The guide can be seen here: http://govuk-elements.herokuapp.com/.

## How can it be used?

It can be used as a base of front end code.

GOV.UK elements has the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) as a dependency.
The toolkit provides Sass variables and mixins, in order to use these - they must be imported before any of the elements Sass files.

Take a look at `/public/sass/main.scss` to see how the GOV.UK front end toolkit's Sass files are imported.


    // Sass mixins and variables
    // https://github.com/alphagov/govuk_frontend_toolkit/tree/master/stylesheets

    @import "colours";
    @import "conditionals";
    @import "device-pixels";
    // @import "font_stack";
    @import "grid_layout";
    @import "measurements";
    @import "shims";
    @import "typography";
    @import "url-helpers";
    @import "design-patterns/alpha-beta";
    @import "design-patterns/buttons";

Note that `_font_stack.scss` is not imported here, as this is used by the [GOV.UK template](https://github.com/alphagov/govuk_template), to set the font stack.

Choose the Sass files you need to build on top of those provided by the front end toolkit.
For example, add typography, layout (for grid layout) and additional modules as you need them.

Take a look at `/public/sass/main.scss` to see how the Sass files within `/public/sass/elements` are imported.


    // GOV.UK elements
    @import "elements/helpers";
    @import "elements/reset";
    @import "elements/elements-typography";
    @import "elements/layout";

    @import "elements/forms";
    @import "elements/forms/form-block-labels";
    @import "elements/forms/form-date";
    @import "elements/forms/form-validation";

    @import "elements/tables";
    @import "elements/lists";
    @import "elements/details";
    @import "elements/panels";
    @import "elements/buttons";
    @import "elements/icons";

    @import "elements/components";
    @import "elements/breadcrumb";


Ignore the `/public/sass/elements-page.scss` files, these exist to style the page furniture of GOV.UK elements (for example, the HTML example boxes and colour swatches).

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
* [Land Registry style guide](http://styleguide.landregistryconcept.co.uk/)
* [Digital Marketplace front end toolkit](http://alphagov.github.io/digitalmarketplace-frontend-toolkit/)
