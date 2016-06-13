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
          'public/stylesheets/prism.css': 'public/sass/prism.scss',
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
      },
    }
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
    },

    // Lint scss files
    shell: {
      multiple: {
        command: [
          'bundle',
          'bundle exec govuk-lint-sass public/sass/elements/'
        ].join('&&')
      }
    }

  });

  [
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-sass',
    'grunt-nodemon',
    'grunt-concurrent',
    'grunt-shell'
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  });

  grunt.registerTask('default', [
    'copy',
    'sass',
    'concurrent:target'
  ]);

  grunt.registerTask(
    'test_default',
    'Test that the default task runs the app',
    [
      'copy',
      'sass'
    ]
  );

  grunt.registerTask(
    'lint',
    'Use govuk-scss-lint to lint the sass files',
    function() {
      grunt.task.run('shell', 'lint_message');
    }
  );

   grunt.registerTask(
    'lint_message',
    'Output a message once linting is complete',
    function() {
      grunt.log.write("scss lint is complete, without errors.");
    }
  );

  grunt.registerTask(
    'test',
    'Lint the Sass files, then check the app runs',
    function() {
      grunt.task.run('lint', 'test_default', 'test_message');
    }
  );

  grunt.registerTask(
    'test_message',
    'Output a message once the tests are complete',
    function() {
      grunt.log.write("scss lint is complete and the app runs, without errors.");
    }
  );
};
