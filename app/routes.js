module.exports = {
  bind : function (app, asset_path) {

    app.get('/', function (req, res) {
      res.render('index', {'asset_path' : asset_path });
    });

    // Redirect snippets page to the index page
    app.get('/snippets', function (req, res) {
      res.redirect('/');
    });

    // Layout
    app.get('/layout', function (req, res) {
      var page_name = "Layout";
      res.render('guide_layout', { 'page_name' : page_name });
    });

    // Example page: Grid layout
    app.get('/layout/example-grid-layout', function (req, res) {
      var section = "layout";
      var section_name = "Layout";
      var page_name = "Example: Grid layout";
      res.render('examples/example_grid_layout', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/grid-layout', function (req, res) {
      res.redirect('/layout/example-grid-layout');
    });

    // Typography
    app.get('/typography', function (req, res) {
      var page_name = "Typography";
      res.render('guide_typography', { 'page_name' : page_name });
    });

    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section = "typography";
      var section_name = "Typography";
      var page_name = "Example: Typography";
      res.render('examples/example_typography', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/typography', function (req, res) {
      res.redirect('/typography/example-typography');
    });

    // Example page: Progressive disclosure
    app.get('/typography/example-details-summary', function (req, res) {
      var section = "typography";
      var section_name = "Typography";
      var page_name = "Example: Details summary";
      res.render('examples/example_details_summary', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/details-summary', function (req, res) {
      res.redirect('/typography/example-details-summary');
    });

    // Colour
    app.get('/colour', function (req, res) {
      var page_name = "Colour";
      res.render('guide_colour', { 'page_name' : page_name });
    });

    // Icons and images
    app.get('/icons-images', function (req, res) {
      var page_name = "Icons and images";
      res.render('guide_icons_images', { 'page_name' : page_name });
    });

    // Example page: Icons
    app.get('/icons-images/example-icons', function (req, res) {
      var section = "icons-images";
      var section_name = "Icons and images";
      var page_name = "Example: Icons";
      res.render('examples/example_icons', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Data
    app.get('/data', function (req, res) {
      var page_name = "Data";
      res.render('guide_data', { 'page_name' : page_name });
    });

    // Buttons
    app.get('/buttons', function (req, res) {
      var page_name = "Buttons";
      res.render('guide_buttons', { 'page_name' : page_name });
    });

    // Forms
    app.get('/form-elements', function (req, res) {
      var page_name = "Form elements";
      res.render('guide_form_elements', { 'page_name' : page_name });
    });

    // Example page: Basic form
    app.get('/form-elements/example-forms', function (req, res) {
      var section = "form-elements";
      var section_name = "Form elements";
      var page_name = "Example: Form";
      res.render('examples/example_forms', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/forms', function (req, res) {
      res.redirect('/form-elements/example-forms');
    });

    // Example page: Date pattern
    app.get('/form-elements/example-date', function (req, res) {
      var section = "form-elements";
      var section_name = "Form elements";
      var page_name = "Example: Date";
      res.render('examples/example_date', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/date', function (req, res) {
      res.redirect('/form-elements/example-date');
    });

    // Example page: Radio buttons and checkboxes
    app.get('/form-elements/example-radios-checkboxes', function (req, res) {
      var section = "form-elements";
      var section_name = "Form elements";
      var page_name = "Example: Radio buttons and checkboxes";
      res.render('examples/example_radios_checkboxes', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.redirect('/form-elements/example-radios-checkboxes');
    });

    // Example page: Form elements
    app.get('/form-elements/example-form-elements', function (req, res) {
      var section = "form-elements";
      var section_name = "Form elements";
      var page_name = "Example: Form elements";
      res.render('examples/example_form_elements', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Errors and validation
    app.get('/errors', function (req, res) {
      var page_name = "Errors and validation";
      res.render('guide_errors', { 'page_name' : page_name });
    });

    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = "errors";
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - single question";
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
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
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name' : section_name, 'page_name' : page_name, 'personal_details': personal_details, 'error': error});
    });

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      res.redirect('/errors/example-form-validation-single-question-radio');
    });

    app.get('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = "errors";
      var section_name = "Errors and validation";
      var page_name = "Example: Form validation - multiple questions";
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name' : section_name, 'page_name' : page_name });
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
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name' : section_name, 'page_name' : page_name, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      res.redirect('/errors/example-form-validation-multiple-questions');
    });

    // Alpha and beta banners
    app.get('/alpha-beta-banners', function (req, res) {
      var page_name = "Alpha and beta banners";
      res.render('guide_alpha_beta', { 'page_name' : page_name });
    });

  }
};
