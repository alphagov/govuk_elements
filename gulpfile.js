'use strict'

const packageJson = require('./package.json')
const packageName = packageJson.name + '-' + packageJson.version
const paths = require('./config/paths.json')
const gulp = require('gulp')
const del = require('del')
const fs = require('fs')
const mocha = require('gulp-mocha')
const nodemon = require('gulp-nodemon')
const rename = require('gulp-rename')
const run = require('gulp-run')
const runsequence = require('run-sequence')
const sass = require('gulp-sass')

// Clean task ----------------------------
// Deletes the /public and /dist directories
// ---------------------------------------

gulp.task('clean', () => {
  return del([paths.public, paths.dist, paths.temp])
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

gulp.task('build', cb => {
  runsequence('clean', ['styles', 'images', 'scripts'], cb)
})

// Package task ----------------------------
// Copies the scss files to dist/ for the govuk-elements-sass package
// Ignores the elements-documentation stylesheets
// ---------------------------------------

const buildNpmPackageJson = () => {
  const npmPackageJson = {}
  npmPackageJson['name'] = packageJson.name
  npmPackageJson['version'] = packageJson.version
  npmPackageJson['description'] = packageJson.description
  npmPackageJson['dependencies'] = packageJson.dependencies
  npmPackageJson['repository'] = packageJson.repository
  npmPackageJson['author'] = packageJson.author
  npmPackageJson['license'] = packageJson.license
  npmPackageJson['bugs'] = packageJson.bugs
  npmPackageJson['homepage'] = packageJson.homepage
  return JSON.stringify(npmPackageJson)
}

gulp.task('package', cb => {
  runsequence('package:prepare', 'package:json', 'package:build', 'package:copy', 'package:clean', cb)
})

gulp.task('package:prepare', () => {
  return gulp.src(
    [
      './CHANGELOG.md',
      './LICENSE.txt',
      './README.md',
      paths.assetsScss + '**/elements/*.scss',
      paths.assetsScss + '_govuk-elements.scss'
    ])
    .pipe(gulp.dest(paths.temp))
})

gulp.task('package:json', cb => fs.writeFile(paths.temp + 'package.json', buildNpmPackageJson(), cb))

gulp.task('package:build', () => run(`cd ${paths.temp} && npm pack`).exec())

gulp.task('package:copy', () => {
  return gulp.src(paths.temp + packageName + '.tgz')
    .pipe(gulp.dest(paths.dist))
})

gulp.task('package:clean', () => del(`${paths.temp}`))

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
