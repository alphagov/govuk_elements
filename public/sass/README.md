### Sass project structure

This file explains the Sass project structure used. 

In an attempt to apply the [single responsibility principle to Sass](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/) each file is responsible for styling a single element, or module.

#### base

This folder contains any reset styles you may need, for example - [Normalize.css](http://necolas.github.io/normalize.css/) and base styles for typography and grid layout.

There's a `.govuk` class, in `_typography-base.scss` which increases the default font size to 19px. 
Apply this to your `main` content area.

#### helpers

This folder contains any helpers you may need, put functions and mixins in here. 
Use a variables file to define any global project variables.

There's a `_vars.scss` file, with gutter variables.

There's a `_colours.scss` file, with a colour palette.

There's a `_mixins.scss` file, with a clearfix mixin.

#### modules

This folder contains styles for discrete components, or modules. 

`_buttons.scss` shows how to use the govuk_frontend_toolkit buttons mixin.

`_forms.scss` has common form styles.

`_form-validation.scss` has form error message styles.

`_lists.scss` has numbered and bulleted list styles.

`_text-indent.scss` has text box styles.

#### service-design-manual

This folder contains the styles to make the page look like the [GOV.UK Service Design Manual](https://www.gov.uk/service-manual).

#### template

This folder contains template styles for main page sections.
The global header and footer are already provided  as part of the govuk_template. 
Styles for other 'template' or global page sections should appear here - the breadcrumb, alpha-beta banner and cookie message.


### Find out more about Sass

[Sass](http://sass-lang.com/)
[Sass guides and tutorials] (http://thesassway.com/guides)

#### Sass best practices

* [Keep your CSS selectors short] (http://csswizardry.com/2012/05/keep-your-css-selectors-short/), don't create styles which are overly specific.
* Be careful of nesting! Aim to nest no more than three levels deep.

* Put variables in a vars.scss file, then if values change - you'll only need to update them in once place.


#### Find out more about structuring your Sass project

The best way to structure your Sass project is the way that works for you and your team. 

For more on structuring Sass:

[Architecture for a Sass project](http://www.sitepoint.com/architecture-sass-project/)

[Sass Style Guide](http://www.sitepoint.com/css-sass-styleguide/)


