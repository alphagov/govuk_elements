GOV.UK elements
===============

### What is it?

GOV.UK Elements is two things:

1. an example of how to use the code in the [GOV.UK template](https://github.com/alphagov/govuk_template) and the [GOV.UK front end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)
2. a collection of HTML and CSS, to show common patterns across GOV.UK and services


[View GOV.UK Elements here](http://govuk-elements.herokuapp.com/).


### How can it be used?

GOV.UK Elements is still in alpha so the CSS might change but you're welcome to use whatever form of it you feel fits your project. Please use [GitHub's watch feature](https://help.github.com/articles/watching-repositories) to keep an eye on what may change.

It can be used as a sensible base of front end code. Choose the Sass files you need to build on top of those provided by the front end toolkit. For example, add grids, typography and additional modules as you need them.

As you get a better understanding of your user's needs, you should be iterating this code so it best fits your project.

####  How to we want people to contribute and improve elements.

GOV.UK Elements builds on top of the GOV.UK front end toolkit.
Any code to be shared between GOV.UK projects should exist there.

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
you will need [Node.js](http://nodejs.org/).

1. clone this repository
2. run the app
```
node start.js
```
3. go to [localhost:3000](http://localhost:3000) in your browser.
