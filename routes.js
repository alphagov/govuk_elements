module.exports = {
  bind : function (app, assetPath) {

    app.use(function (req, res, next) {

      // Get the path
      var path = req.path;

      // Replace any slash at the end of a line with nothing
      var path_parts = path.replace(/\/\s*$/, '').split('/');

      if (path_parts.length === "3") {

        var section = path_parts[1];
        var page = path_parts[2];

        res.locals({
          "section": section,
          "page": page
        });


      } else if (path_parts.length === "2") {

        var page = path_parts[1];

        res.locals({
          "page": page
        });
      }
      next();
    });

    app.get('/', function (req, res) {
      res.render('index', {'assetPath' : assetPath });
    });

    // Layout
    app.get('/layout', function (req, res) {
      var page_name = "Layout";
      res.render('guide_layout', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Grid layout
    app.get('/layout/example-grid-layout', function (req, res) {
      var section_name = "Layout";
      var page_name = "Example: Grid layout";
      res.render('layout/example_grid_layout', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Typography
    app.get('/typography', function (req, res) {
      var page_name = "Typography";
      res.render('guide_typography', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section_name = "Typography";
      var page_name = "Example: Typography";
      res.render('typography/example_typography', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Progressive disclosure
    app.get('/typography/example-details-summary', function (req, res) {
      var section_name = "Typography";
      var page_name = "Example: Details summary";
      res.render('typography/example_details_summary', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Colour
    app.get('/colour', function (req, res) {
      var page_name = "Colour";
      res.render('guide_colour', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Icons and images
    app.get('/icons-images', function (req, res) {
      var page_name = "Icons and images";
      res.render('guide_icons_images', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Data
    app.get('/data', function (req, res) {
      var page_name = "Data";
      res.render('guide_data', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Buttons
    app.get('/buttons', function (req, res) {
      var page_name = "Buttons";
      res.render('guide_buttons', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Forms
    app.get('/forms', function (req, res) {
      var page_name = "Forms";
      res.render('guide_forms', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Basic form
    app.get('/forms/example-forms', function (req, res) {
      var section_name = "Forms";
      var page_name = "Example: Forms";
      res.render('forms/example_forms', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Date pattern
    app.get('/forms/date', function (req, res) {
      var section_name = "Forms";
      var page_name = "Example: Date";
      res.render('forms/date', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Radio buttons and checkboxes
    app.get('/forms/radios-checkboxes', function (req, res) {
      var section_name = "Forms";
      var page_name = "Example: Radio buttons and checkboxes";
      res.render('patterns/radios_checkboxes', {'assetPath' : assetPath, 'page_name' : page_name, 'section_name' : section_name });
    });

    // Example page: Form elements
    app.get('/forms/form-elements', function (req, res) {
      var section_name = "Forms";
      var page_name = "Example: Form elements";
      res.render('forms/form_elements', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Errors and validation
    app.get('/errors', function (req, res) {
      var page_name = "Errors and validation";
      res.render('guide_errors', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section_name = "Errors";
      var page_name = "Example: Form validation - single question";
      res.render('errors/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section_name = "Forms";
      var page_name = "Example: Form validation - single question";
      var personal_details = req.body.personal_details;
      var error = false;
      if (!personal_details) {
        error = true;
      } else {
        error = false;
      }
      res.render('errors/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name, 'personal_details': personal_details, 'error': error});
    });

    app.get('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - multiple questions";
      res.render('errors/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - multiple questions";
      var fullName = req.body.fullName;
      var niNo = req.body.niNo;
      var error = false;
      if (!fullName || !niNo) {
        error = true;
      } else {
        error = false;
      }
      res.render('errors/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // Alpha and beta banners
    app.get('/alpha-beta', function (req, res) {
      var page_name = "Alpha and beta banners";
      res.render('guide_alpha_beta', {'assetPath' : assetPath, 'page_name' : page_name });
    });

  }
};
