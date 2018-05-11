# ID-SK Elements Sass

## Installation

    npm install idsk-elements-sass

## Usage

**Include all Sass files**

    @import idsk-elements;


**Include individual Sass files**

Choose partials from:

    /public/sass/elements/.


## Dependencies

ID-SK elements has the [ID-SK frontend toolkit](https://github.com/id-sk/idsk_frontend_toolkit) as a dependency.

    npm install idsk_frontend_toolkit

> The ID-SK frontend toolkit scss dependencies listed below must be imported before any idsk-elements partials.

    // Settings (variables)
    @import "colours";                                // Colour variables
    @import "font_stack";                             // Font family variables
    @import "measurements";                           // Widths and gutter variables

    // Mixins
    @import "conditionals";                           // Media query mixin
    @import "device-pixels";                          // Retina image mixin
    @import "grid_layout";                            // Basic grid layout mixin
    @import "typography";                             // Core bold and heading mixins
    @import "shims";                                  // Inline block mixin, clearfix placeholder

    // Mixins to generate components (chunks of UI)
    @import "design-patterns/alpha-beta";             // Only required if using _phase-banner.scss
    @import "design-patterns/buttons";                // Only required if using _buttons.scss

    // Functions
    // @import "url-helpers";                         // Function to output image-url, or prefixed path (Rails and Compass only)


It assumes your project is using [ID-SK template](https://github.com/id-sk/idsk_template).


## Configuration


**Set a path for your image assets**

The `_url-helpers.scss` partial requires that `$path` is defined in your main application stylesheet.

     $path: "/public/images/";


**Ensure base styles are set**

If you are not using [ID-SK template](https://github.com/id-sk/idsk_template).

Uncomment the base partial in `_idsk_elements.scss`:

    // @import "elements/idsk-template-base";          // HTML elements, set by the ID-SK template


## Compiling the Sass files

Add the `node_modules/idsk_frontend_toolkit` and `node_modules/idsk-elements-sass` directories to the `includePaths` property of your Sass plugin - if you're using a task runner like Gulp or Grunt, to reference the location of these files.

**Folder structure**

    - index.html
    -- node_modules
        -- idsk-elements-sass
        -- idsk_frontend_toolkit
    -- assets
        -- scss
            - main.scss
        -- css
            - main.css

**Using [Gulp](http://gulpjs.com/)**

    const gulp = require('gulp')
    const sass = require('gulp-sass')

    // Compile scss files to css
    gulp.task('styles', () => {
      return gulp.src('./sass/**/*.scss')
        .pipe(sass({
          includePaths: [
            'node_modules/idsk_frontend_toolkit/stylesheets', // 1
            'node_modules/idsk-elements-sass/public/sass'     // 2
          ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
    })

In the example above `includePaths` uses two paths to resolve the scss @import statements.

1. The location of the directory containing the idsk_frontend_toolkit sass files.
2. The location of the directory containing the idsk-elements-sass files.

**Using [Grunt](https://gruntjs.com/)**

    grunt.loadNpmTasks('grunt-contrib-sass')

    grunt.initConfig({
      sass: {
        dist: {
          options: {
            includePaths: [
              'node_modules/idsk_frontend_toolkit/stylesheets', // 1
              'node_modules/idsk-elements-sass/public/sass'     // 2
            ],
          },
          files: {
            'main.css': 'main.scss'
          }
        }
      }
    })

In the example above `includePaths` uses two paths to resolve the scss @import statements.

1. The location of the directory containing the idsk_frontend_toolkit sass files.
2. The location of the directory containing the idsk-elements-sass files.

## Contributing

You can find contribution guidelines in [CONTRIBUTING.md](https://github.com/id-sk/idsk_elements/blob/master/CONTRIBUTING.md)
