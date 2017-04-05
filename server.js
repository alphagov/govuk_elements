var path = require('path')
var express = require('express')
var nunjucks = require('nunjucks')
var routes = require('./app/routes.js')
var app = express()
var bodyParser = require('body-parser')
var config = require('./app/config.js')
var port = (process.env.PORT || 3000)

// Application settings
app.set('view engine', 'html')

// Set the location of the template files
var appViews = [
  path.join(__dirname, '/app/views'),
  path.join(__dirname, '/lib/'),
  path.join(__dirname, '/node_modules/govuk_frontend_alpha/templates/')
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app
})

// Serve static content for the app from the "public" directory
app.use('/public', express.static(path.join(__dirname, '/public')))

// Serve the govuk_frontend_alpha assets from the node_modules directory
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/')))

// For the default compiled stylesheet only - serve the govuk_frontend_alpha toolkit and template assets from the node_modules directory
app.use('/images/toolkit', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/toolkit/')))
app.use('/images/template', express.static(path.join(__dirname, '/node_modules/govuk_frontend_alpha/assets/images/template/')))

// Support for parsing data in POSTs
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Add variables that are available in all views
app.use(function (req, res, next) {
  res.locals.cookieText = config.cookieText
  next()
})

// routes (found in routes.js)

routes.bind(app, '/public/')

// start the app

app.listen(port)
console.log('')
console.log('Listening on port ' + port)
console.log('')
