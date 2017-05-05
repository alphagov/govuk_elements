'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const del = require('del')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const runsequence = require('run-sequence')
const sass = require('gulp-sass')

// Clean task ----------------------------
// Deletes the /public directory
// ---------------------------------------

gulp.task('clean', () => {
  return del(paths.public)
})

// Styles build task ---------------------
// Compiles CSS from Sass
// Output both a minified and non-minified version into /public/stylesheets/
// ---------------------------------------

gulp.task('styles', () => {
  return gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass({
      includePaths: [
        'node_modules/govuk_frontend_toolkit/stylesheets'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.publicCss))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest(paths.publicCss))
})

// Images build task ---------------------
// Copies images to /public/images
// ---------------------------------------

gulp.task('images', () => {
  return gulp.src(paths.assetsImg + '**/*')
    .pipe(gulp.dest(paths.publicImg))
})

// Scripts build task ---------------------
// Copies JavaScript to /public/javascripts
// ---------------------------------------
gulp.task('scripts', () => {
  return gulp.src(paths.assetsJs + '**/*.js')
    .pipe(gulp.dest(paths.publicJs))
})

// Copy assets task ----------------------------
// Runs tasks that copy assets to the public directory.
// ---------------------------------------

gulp.task('copy-assets', cb => {
  runsequence('clean', ['styles', 'images', 'scripts'], cb)
})

// Server task --------------------------
// Configures nodemon
// ---------------------------------------
gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    ext: '*',
    ignore: [
      paths.public + '*',
      paths.assets + '*',
      paths.nodeModules + '*'
    ]
  })
})

// Watch task ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------

gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:images'])

gulp.task('watch:styles', () => {
  return gulp.watch(paths.assetsScss + '**/*.scss', ['styles'])
})

gulp.task('watch:scripts', () => {
  return gulp.watch(paths.assetsJs + '**/*.js', ['scripts'])
})

gulp.task('watch:images', () => {
  return gulp.watch(paths.assetsImg + '**/*', ['images'])
})

// Develop task --------------------------
// Runs copy-assets task and sets up watches.
// ---------------------------------------
gulp.task('develop', cb => {
  runsequence('build',
              'watch',
              'server', cb)
})
