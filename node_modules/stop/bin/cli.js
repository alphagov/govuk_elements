#!/usr/bin/env node
"use strict";

var fs = require('fs')
var path = require('path')

var optimist = require('optimist')
var toml = require('toml').parse

var optimist = require('optimist')
  .usage('Usage: stop <source> <destination> [options]')
  .boolean('help')
  .alias('help', 'h')
  .describe('help', 'Display usage information.')
  .boolean('minify-js')
  .alias('minify-js', 'j')
  .describe('minify-js', 'Minify JavaScript using UglifyJS')
  .boolean('minify-css')
  .alias('minify-css', 'c')
  .describe('minify-css', 'Minify CSS using css-parse and css-stringify')
  .alias('throttle', 't')
  .describe('throttle', 'The number of concurrent download to permit')
  .default('throttle', 4)
  .string('filter')
  .alias('filter', 'grep')
  .alias('filter', 'f')
  .alias('filter', 'g')
  .describe('filter', 'Filter the paths to be downloaded using glob style strings')

var argv = optimist.argv

if (process.argv.length === 2) {
  var str
  try {
    str = fs.readFileSync('.stop.toml')
  } catch (ex) {
    console.log(ex.stack)
    optimist.showHelp()
    process.exit(1)
  }
  var input = toml(str)
  downloadSite(input.source, input.destination, input.options)
} else if (argv.help || argv._.length != 2) {
  optimist.showHelp()
  process.exit(argv.help ? 0 : 1)
} else {
  downloadSite(argv._[0], argv._[1], argv)
}

function downloadSite(source, destination, options) {
  try {
    var src = source.replace(/(?:\.js)?$/, '.js')
    var stat = fs.statSync(src)
    if (!stat.isFile()) throw new Error('not a file')
    var listen = require('http').Server.prototype.listen
    require('http').Server.prototype.listen = function (source) {
      var res = listen.apply(this, arguments)
      var server = this
      require('../')(source, destination, options)
        .done(function () {
          server.close()
        })
      return res
    }
    process.env.STOP = true
    require(path.resolve(src))
  } catch (ex) {
    require('../')(source, destination, options).done()
  }
}