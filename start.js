var path = require('path')
var fs = require('fs')
var pidFile = path.join(__dirname, '/.start.pid')
var fileOptions = { encoding: 'utf-8' }

// start grunt
var gruntfile = path.join(__dirname, '/Gruntfile.js')
require('./node_modules/grunt/lib/grunt.js').cli({
  'gruntfile': gruntfile
})

fs.writeFileSync(pidFile, process.pid, fileOptions)
process.on('SIGINT', function () {
  var pid = fs.readFileSync(pidFile, fileOptions)

  fs.unlink(pidFile)
  process.kill(pid, 'SIGTERM')
  process.exit()
})
