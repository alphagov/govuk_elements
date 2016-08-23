var path = require('path')
var express = require('express')
var nunjucks = require('express-nunjucks')
var routes = require('./app/routes.js')
var app = express()
var bodyParser = require('body-parser')
var config = require('./app/config.js')
var port = (process.env.PORT || 3000)

// Application settings
app.set('view engine', 'html')
app.set('views', [path.join(__dirname, '/app/views'), path.join(__dirname, '/lib/')])

nunjucks.setup({
  autoescape: true,
  watch: true,
  noCache: true
}, app)

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/public', express.static(path.join(__dirname, '/govuk_modules/public')))
app.use('/public', express.static(path.join(__dirname, '/govuk_modules/govuk_template/assets')))
app.use('/public', express.static(path.join(__dirname, '/govuk_modules/govuk_frontend_toolkit')))

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
