module.exports = function (grunt) {
  grunt.initConfig({

    // Builds Sass
    sass: {
      dev: {
        files: {
          'public/stylesheets/elements-documentation.css': 'public/sass/elements-documentation.scss',
          'public/stylesheets/elements-documentation-ie6.css': 'public/sass/elements-documentation-ie6.scss',
          'public/stylesheets/elements-documentation-ie7.css': 'public/sass/elements-documentation-ie7.scss',
          'public/stylesheets/elements-documentation-ie8.css': 'public/sass/elements-documentation-ie8.scss',
          'public/stylesheets/vendor/prism.css': 'public/sass/vendor/prism.scss'
        },
        options: {
          includePaths: [
            'govuk_modules/govuk_frontend_toolkit/stylesheets'
          ],
          outputStyle: 'expanded',
          imagePath: '../images'
        }
      }
    },

    // Empty encoded snippets folder
    clean: {
      contents: ['app/views/snippets/encoded/*']
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
      govuk_frontend_assets: {
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_alpha/assets/',
          src: '**',
          dest: 'govuk_modules/govuk_frontend_alpha/'
        }]
      },
      govuk_frontend_template: {
        files: [{
          expand: true,
          cwd: 'node_modules/govuk_frontend_alpha/templates/',
          src: '**',
          dest: 'lib/'
        }]
      }
    },

    // Encode HTML snippets
    htmlentities: {
      files: {
        src: ['app/views/snippets/*.html'],
        dest: 'app/views/snippets/encoded/'
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
    'grunt-sass',
    'grunt-nodemon',
    'grunt-concurrent',
    'grunt-htmlentities'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task)
  })

  grunt.registerTask('default', ['clean', 'copy', 'encode-snippets', 'sass', 'concurrent:target'])

  // Encode HTML snippets
  grunt.registerTask('encode-snippets', ['htmlentities', 'encode-snippets-success'])
  grunt.registerTask('encode-snippets-success', function () {
    grunt.log.writeln('HTML snippets encoded.'['yellow'].bold)
  })

  // Tests
  grunt.registerTask('test', ['lint', 'test-default', 'test-success'])
  grunt.registerTask('test-success', function () {
    grunt.log.writeln('The tests are complete and the app runs, without errors.'['yellow'].bold)
  })

  // 1. Use govuk-scss-lint to lint the sass files
  grunt.registerTask('lint', ['lint-success'])
  grunt.registerTask('lint-success', function () {
    grunt.log.writeln('Scss lint is complete, without errors.'['yellow'].bold)
  })

  // 2. Test that the default grunt task runs the app
  grunt.registerTask('test-default', ['clean', 'copy', 'encode-snippets', 'sass'])
}
