GOV.UK elements
===============

### What is it?

GOV.UK Elements is two things:

1. an online design guide, explaining how to make your service look consistent with the rest of GOV.UK
2. an example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)

The guide can be seen at: http://govuk-elements.herokuapp.com/.

### How can it be used?

GOV.UK Elements is still in alpha so the CSS might change but you're welcome to use whatever form of it you feel fits your project. Please use [GitHub's watch feature](https://help.github.com/articles/watching-repositories) to keep an eye on what may change.

It can be used as a sensible base of front end code. Choose the Sass files you need to build on top of those provided by the front end toolkit. For example, add grids, typography and additional modules as you need them.

As you get a better understanding of the user needs for your project you should be iterating this code so it best fits the resulting requirements.

### How are people building with GOV.UK Elements?

Here are examples of service-specific pattern libraries using GOV.UK Elements.

* [Rural Payments style guide](http://rural-payments-styleguide.herokuapp.com) | [Source Code](https://github.com/Defra/rural-payments-styleguide/)
* [Land Registry style guide](http://styleguide.landregistryconcept.co.uk/)

###  How to we want people to contribute and improve elements.

#### Design

There is a Hackpad for feeding back on the design patterns contained in elements:

https://designpatterns.hackpad.com/GOV.UK-elements-feedback-sKrDyQxcfA2

#### Code

The code in GOV.UK Elements is built on top of the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit).

If you want to suggest changes or raise bugs on code from the toolkit, please do so through its repository, not this one.

GOV.UK Elements code in use across live projects but not already in the toolkit should eventually be added to it. All contributions towards this goal are welcome and should be in the form of pull requests on the toolkit repository.

Examples of pull requests already raised to this end:

- https://github.com/alphagov/govuk_frontend_toolkit/pull/100
- https://github.com/alphagov/govuk_frontend_toolkit/pull/121

### Navigating this repository

#### To view the Sass files:

You can find the Sass files here:

```
/public/sass/
```

```
/public/sass/main.scss
```

The main.scss file shows how to import the Elements Sass files.

#### To view this site locally:

If you would like to clone the repository and run it locally,
you will need [Node.js](http://nodejs.org/) (at least version v0.10.0).

* clone this repository
* install the required node modules
```
npm install --production
```
* run the app
```
foreman start -p 3000
```
* go to [localhost:3000](http://localhost:3000) in your browser.
