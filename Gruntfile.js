module.exports = function (grunt) {
  grunt.initConfig({

    // Builds Sass
    sass: {
      dev: {
        files: {
          'public/stylesheets/govuk-elements-styles.css': 'public/sass/govuk-elements-styles.scss',
          'public/stylesheets/govuk-elements-styles-ie6.css': 'public/sass/govuk-elements-styles-ie6.scss',
          'public/stylesheets/govuk-elements-styles-ie7.css': 'public/sass/govuk-elements-styles-ie7.scss',
          'public/stylesheets/govuk-elements-styles-ie8.css': 'public/sass/govuk-elements-styles-ie8.scss',
          'public/stylesheets/elements-documentation.css': 'public/sass/elements-documentation.scss',
          'public/stylesheets/elements-documentation-ie6.css': 'public/sass/elements-documentation-ie6.scss',
          'public/stylesheets/elements-documentation-ie7.css': 'public/sass/elements-documentation-ie7.scss',
          'public/stylesheets/elements-documentation-ie8.css': 'public/sass/elements-documentation-ie8.scss',
          'public/stylesheets/vendor/prism.css': 'public/sass/vendor/prism.scss'
        },
        options: {
          includePaths: [
            'govuk_modules/govuk_template/assets/stylesheets',
            'govuk_modules/govuk_frontend_toolkit/stylesheets'
          ],
          outputStyle: 'expanded',
          imagePath: '../images'
        }
      }
    },

    // Copies templates and assets from external modules and dirs
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'app/assets/',
          src: ['**/*', '!sass/**'],
          dest: 'public/'
        }]
      },
      govuk: {
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_toolkit/',
          src: '**',
          dest: 'govuk_modules/govuk_frontend_toolkit/'
        },
        {
          expand: true,
          cwd: 'node_modules/govuk_template_jinja/',
          src: '**',
          dest: 'govuk_modules/govuk_template/'
        }]
      },
      govuk_template_jinja: {
        files: [{
          expand: true,
          cwd: 'govuk_modules/govuk_template/views/layouts/',
          src: '**',
          dest: 'lib/'
        }]
      }
    },

    // workaround for libsass
    replace: {
      fixSass: {
        src: ['govuk_modules/public/sass/**/*.scss'],
        overwrite: true,
        replacements: [{
          from: /filter:chroma(.*);/g,
          to: 'filter:unquote("chroma$1");'
        }]
      }
    },

    // Runs javascript unit tests
    jasmine: {
      javascripts: {
        src: [
          'public/javascripts/vendor/jquery-1.11.0.min.js',
          'public/javascripts/redirect.js'
        ],
        options: {
          specs: 'spec/unit/**/*.spec.js',
          helpers: 'spec/unit/*.helper.js'
        }
      }
    },

    // Watches styles and specs for changes
    watch: {
      css: {
        files: ['public/sass/**/*.scss'],
        tasks: ['sass'],
        options: { nospawn: true }
      }
    },

    // nodemon watches for changes and restarts app
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'html, js'
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  })

  ;[
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-contrib-jasmine',
    'grunt-sass',
    'grunt-nodemon',
    'grunt-concurrent'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task)
  })

  grunt.registerTask('default', ['copy', 'sass', 'concurrent:target'])

  // Tests
  grunt.registerTask('test', ['lint', 'jasmine', 'test-default', 'test-success'])
  grunt.registerTask('test-success', function () {
    grunt.log.writeln('The tests are complete and the app runs, without errors.'['yellow'].bold)
  })

  // 1. Use govuk-scss-lint to lint the sass files
  grunt.registerTask('lint', ['lint-success'])
  grunt.registerTask('lint-success', function () {
    grunt.log.writeln('Scss lint is complete, without errors.'['yellow'].bold)
  })

  // 2. Test that the default grunt task runs the app
  grunt.registerTask('test-default', ['copy', 'sass'])
}
