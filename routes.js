module.exports = {
  bind : function (app, assetPath) {

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
      var section = "layout";
      var section_name = "Layout";
      var page_name = "Example: Grid layout";
      res.render('examples/example_grid_layout', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Typography
    app.get('/typography', function (req, res) {
      var page_name = "Typography";
      res.render('guide_typography', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section = "typography";
      var section_name = "Typography";
      var page_name = "Example: Typography";
      res.render('examples/example_typography', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Progressive disclosure
    app.get('/typography/example-details-summary', function (req, res) {
      var section = "typography";
      var section_name = "Typography";
      var page_name = "Example: Details summary";
      res.render('examples/example_details_summary', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
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
      var section = "forms";
      var section_name = "Forms";
      var page_name = "Example: Form";
      res.render('examples/example_forms', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Date pattern
    app.get('/forms/example-date', function (req, res) {
      var section = "forms";
      var section_name = "Forms";
      var page_name = "Example: Date";
      res.render('examples/example_date', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Radio buttons and checkboxes
    app.get('/forms/example-radios-checkboxes', function (req, res) {
      var section = "forms";
      var section_name = "Forms";
      var page_name = "Example: Radio buttons and checkboxes";
      res.render('examples/example_radios_checkboxes', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Example page: Form elements
    app.get('/forms/example-form-elements', function (req, res) {
      var section = "forms";
      var section_name = "Forms";
      var page_name = "Example: Form elements";
      res.render('examples/example_form_elements', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Errors and validation
    app.get('/errors', function (req, res) {
      var page_name = "Errors and validation";
      res.render('guide_errors', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = "errors";
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - single question";
      res.render('examples/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = "errors";
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - single question";
      var personal_details = req.body.personal_details;
      var error = false;
      if (!personal_details) {
        error = true;
      } else {
        error = false;
      }
      res.render('examples/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name, 'personal_details': personal_details, 'error': error});
    });

    app.get('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = "errors";
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - multiple questions";
      res.render('examples/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = "errors";
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
      res.render('examples/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section': section, 'section_name' : section_name, 'page_name' : page_name, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // Alpha and beta banners
    app.get('/alpha-beta-banners', function (req, res) {
      var page_name = "Alpha and beta banners";
      res.render('guide_alpha_beta', {'assetPath' : assetPath, 'page_name' : page_name });
    });

  }
};
