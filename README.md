GOV.UK elements
===============

## What is it?

GOV.UK elements is three things:

1. an online design guide, explaining how to make your service look consistent with the rest of GOV.UK
2. an example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)
3. an npm package, only including the Sass files

The guide can be seen here: http://govuk-elements.herokuapp.com/.
This is the most recent tagged version of govuk elements.

There is also a staging app, to preview what is currently in master:
http://govuk-elements-test.herokuapp.com/


## How can it be used?

It can be used as a base of front end code.

GOV.UK elements has the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) and the [GOV.UK template](https://github.com/alphagov/govuk_template) as dependencies.

The toolkit provides Sass variables, functions and mixins - in order to use these - they must be imported before any of the elements Sass files.

Take a look at `/public/sass/_govuk-elements.scss` to see how the GOV.UK front end toolkit's Sass files are imported.


    // GOV.UK front end toolkit
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


Choose the Sass files you need to build on top of those provided by the front end toolkit.

Take a look at `/public/sass/_govuk-elements.scss` to see how the Sass files within `/public/sass/elements` are imported.


    // GOV.UK elements

    @import "elements/helpers";                       // Helper functions and classes

    // Generic (normalize/reset.css)
    @import "elements/reset";

    // Base (unclassed HTML elements)
    // These are predefined by govuk_template
    // If you're not using govuk_template, uncomment the line below.
    // @import "elements/base";                       // HTML elements, set by the GOV.UK template

    // Objects (unstyled design patterns)
    @import "elements/layout";                        // Main content container. Grid layout - rows and column widths

    // Components (chunks of UI)
    @import "elements/elements-typography";           // Typography
    @import "elements/buttons";                       // Buttons
    @import "elements/icons";                         // Icons - numbered steps, calendar, search
    @import "elements/lists";                         // Lists - numbered, bulleted
    @import "elements/tables";                        // Tables - regular, numeric
    @import "elements/details";                       // Details summary
    @import "elements/panels";                        // Panels with a left grey border
    @import "elements/forms";                         // Form - wrappers, inputs, labels
    @import "elements/forms/form-block-labels";       // Chunky labels for radios and checkboxes
    @import "elements/forms/form-date";               // Date of birth pattern
    @import "elements/forms/form-validation";         // Errors and validation
    @import "elements/breadcrumb";                    // Breadcrumb
    @import "elements/phase-banner";                  // Alpha and beta banners and tags
    @import "elements/components";                    // GOV.UK prefixed styles - blue highlighted box


Ignore the `/public/sass/elements-page.scss` files, these exist to style the page furniture of GOV.UK elements (for example, the HTML example boxes and colour swatches).

## Using the govuk-elements-sass package

If you would like to import the govuk elements Sass files into your project, you can do so using:

    `npm install govuk-elements-sass`

This will install the files within `public/sass` to `node_modules/govuk-elements-sass`.

These Sass files have the variables, mixins and functions defined by the govuk frontend toolkit as a dependency.

These files are listed at the top of the `_govuk_elements.scss` partial, shown below:

    // GOV.UK front end toolkit
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


These files must be imported before the govuk elements Sass files.

Either copy these files your Sass directory, or configure the `includeFiles` path if you’re using a task runner like Grunt.

If you're not using the govuk template, you'll also need to uncomment the base partial in `_govuk_elements.scss`, or create your own.

    // @import "elements/base";                       // HTML elements, set by the GOV.UK template


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
