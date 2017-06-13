'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const gutil = require('gulp-util')
const cssnano = require('gulp-cssnano')
const del = require('del')
const mocha = require('gulp-mocha')
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

// Build task ----------------------------
// Runs tasks that copy assets to the public directory.
// ---------------------------------------

gulp.task('build', cb => {
  runsequence('clean', ['styles', 'images', 'scripts'], cb)
})

// Server task --------------------------
// Configures nodemon
// ---------------------------------------
gulp.task('server', () => {
  nodemon({
    watch: ['.env', '**/*.js', '**/*.json'],
    script: 'server.js',
    ignore: [
      paths.public + '*',
      paths.assets + '*',
      paths.nodeModules + '*'
    ]
  })
})

// Test task --------------------------
// Check that the build task copies assets
// to /public and that the app runs.
// ---------------------------------------
gulp.task('test', cb => {
  runsequence('build', ['test:app'], cb)
})

gulp.task('test:app', () =>
  gulp.src(paths.testSpecs + 'app_spec.js', {read: false})
  .pipe(mocha({reporter: 'spec'}))
  // https://github.com/sindresorhus/gulp-mocha#test-suite-not-exiting
  .once('error', () => {
    process.exit(1)
  })
  .once('end', () => {
    process.exit()
  })
)

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

// Package task ----------------------------
// Copies the scss files to packages/govuk-elements-sass/
// Ignores the elements-documentation stylesheets
// ---------------------------------------

gulp.task('package', cb => {
  runsequence('package:prepare', cb)
})

gulp.task('package:prepare', () => {
  return gulp.src(
    [
      paths.assetsScss + '**/elements/**/*.scss',
      paths.assetsScss + '_govuk-elements.scss',
      paths.assetsScss + '_frontend-toolkit.scss',
      paths.assetsScss + '_elements.scss'
    ])
    .pipe(gulp.dest(paths.package + 'public/sass/'))
})

// Default task --------------------------
// Lists out available tasks.
// ---------------------------------------

gulp.task('default', () => {
  const cyan = gutil.colors.cyan
  const green = gutil.colors.green

  gutil.log(green('----------'))

  gutil.log(('The following main ') + cyan('tasks') + (' are available:'))

  gutil.log(cyan('build'
    ) + ': copies assets to the public directory.'
  )
  gutil.log(cyan('develop'
    ) + ': performs an initial build then sets up watches.'
  )
  gutil.log(cyan('package'
    ) + ': prepares the govuk-elements-sass npm package'
  )

  gutil.log(green('----------'))
})
