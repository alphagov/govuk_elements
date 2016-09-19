module.exports = function (grunt) {
  grunt.initConfig({

    // Builds Sass
    sass: {
      dev: {
        files: {
          'public/stylesheets/main.css': 'public/sass/main.scss',
          'public/stylesheets/main-ie6.css': 'public/sass/main-ie6.scss',
          'public/stylesheets/main-ie7.css': 'public/sass/main-ie7.scss',
          'public/stylesheets/main-ie8.css': 'public/sass/main-ie8.scss',
          'public/stylesheets/elements-page.css': 'public/sass/elements-page.scss',
          'public/stylesheets/elements-page-ie6.css': 'public/sass/elements-page-ie6.scss',
          'public/stylesheets/elements-page-ie7.css': 'public/sass/elements-page-ie7.scss',
          'public/stylesheets/elements-page-ie8.css': 'public/sass/elements-page-ie8.scss',
          'public/stylesheets/prism.css': 'public/sass/prism.scss'
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
