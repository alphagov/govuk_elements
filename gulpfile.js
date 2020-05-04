'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const gutil = require('gulp-util')
const cssnano = require('cssnano')
const del = require('del')
const mocha = require('gulp-mocha')
const nodemon = require('gulp-nodemon')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

// Clean tasks ----------------------------

// Deletes the /public directory
// ---------------------------------------

gulp.task('clean:public', () => {
  return del(paths.public)
})

// Deletes the /public directory in /package
// ---------------------------------------

gulp.task('clean:package', () => {
  return del(paths.packagePublic)
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
    .pipe(postcss([ cssnano() ]))
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

gulp.task('build', gulp.series(
  'clean:public',
  gulp.parallel('styles', 'images', 'scripts')
))

// Server task --------------------------
// Configures nodemon
// ---------------------------------------
gulp.task('server', () => {
  return Promise.resolve(nodemon({
    watch: ['.env', '**/*.js', '**/*.json'],
    script: 'server.js',
    ignore: [
      paths.public + '*',
      paths.assets + '*',
      paths.nodeModules + '*'
    ]
  }))
})

// Test task --------------------------
// Check that the build task copies assets
// to /public and that the app runs.
// ---------------------------------------

gulp.task('test:app', () =>
  gulp.src(paths.testSpecs + 'app_spec.js', {read: false})
  .pipe(mocha({reporter: 'spec', exit: true}))
  .on('error', console.error)
)

gulp.task('test', gulp.series(
  'build',
  'test:app'
))

// Watch tasks ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------

gulp.task('watch', () => Promise.all([
  gulp.watch(paths.assetsScss + '**/*.scss', gulp.task('styles')),
  gulp.watch(paths.assetsJs + '**/*.js', gulp.task('scripts')),
  gulp.watch(paths.assetsImg + '**/*', gulp.task('images'))
]))

// Develop task --------------------------
// Runs copy-assets task and sets up watches.
// ---------------------------------------

gulp.task('develop', gulp.series(
  'build',
  'watch',
  'server'
))

// Package task ----------------------------
// Copies the scss files to packages/govuk-elements-sass/
// Ignores the elements-documentation stylesheets
// ---------------------------------------

gulp.task('prepare:package', () => {
  return gulp.src(
    [
      paths.assetsScss + '**/elements/**/*.scss',
      paths.assetsScss + '_govuk-elements.scss',
      paths.assetsScss + '_frontend-toolkit.scss',
      paths.assetsScss + '_elements.scss'
    ])
    .pipe(gulp.dest(paths.package + 'public/sass/'))
})

gulp.task('package', gulp.series(
  'clean:package',
  'prepare:package'
))

// Default task --------------------------
// Lists out available tasks.
// ---------------------------------------

gulp.task('default', () => {
  const cyan = gutil.colors.cyan
  const green = gutil.colors.green

  return Promise.all([
    gutil.log(green('----------')),
    gutil.log(('The following main ') + cyan('tasks') + (' are available:')),
    gutil.log(cyan('build'
      ) + ': copies assets to the public directory.'
    ),
    gutil.log(cyan('develop'
      ) + ': performs an initial build then sets up watches.'
    ),
    gutil.log(cyan('package'
      ) + ': prepares the govuk-elements-sass npm package'
    ),
    gutil.log(green('----------'))
  ])
})
