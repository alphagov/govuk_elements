'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const del = require('del')

// Clean task ----------------------------
// Deletes the /public directory
// ---------------------------------------

gulp.task('clean', () => {
  return del(paths.public)
})

