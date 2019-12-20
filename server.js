var path = require('path')
var express = require('express')
var nunjucks = require('nunjucks')
var routes = require('./app/routes.js')
var app = express()
var bodyParser = require('body-parser')
var port = (process.env.PORT || 3000)
var IS_HEROKU = process.env.hasOwnProperty('IS_HEROKU')

module.exports = app

// Application settings
app.set('view engine', 'html')

// Set the location of the views and govuk_template layout file
var appViews = [
  path.join(__dirname, '/app/views'),
  path.join(__dirname, '/node_modules/govuk_template_jinja/views/layouts')
]

// Tell nunjucks we are using express to serve the templates within
// the views defined in appViews
nunjucks.configure(appViews, {
  express: app,
  autoescape: true,
  watch: true,
  noCache: true
})

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_template_jinja/assets')))
app.use('/public', express.static(path.join(__dirname, '/node_modules/govuk_frontend_toolkit')))

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

// Hot patch send method to manipulate HTML before it is sent.
app.use(function (req, res, next) {
  var send = res.send
  res.send = function () {
    // Check first argument is html before manipluating it
    var isString = typeof arguments[0] === 'string'
    var isHTML = isString && arguments[0].trim().startsWith('<!DOCTYPE html>')
    if (isHTML) {
      // Remove the cookie banner from the page so cookies are not set,
      // this is not configurable in govuk_template.
      var cookieBannerRegex = /<div id="global-cookie-message">\s*<\/div>/
      arguments[0] = arguments[0].replace(cookieBannerRegex, '')
    }
    send.apply(this, arguments)
  }
  next()
})

// routes (found in routes.js)

routes.bind(app, '/public/')

// start the app

app.listen(port, function () {
  if (!IS_HEROKU) {
    console.log('Listening on port ' + port + '   url: http://localhost:' + port)
  }
})
