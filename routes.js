module.exports = {
  bind : function (app, assetPath) {

    app.use(function(req, res, next) {

      // Get the path
      var path = req.path;

      // Replace any slash at the end of a line with nothing
      var path_parts = path.replace(/\/\s*$/,'').split('/');

      if (path_parts.length == "3") {

        var section = path_parts[1];
        var page = path_parts[2];

        res.locals({
          "section": section,
          "page": page
        });


      } else if (path_parts.length == "2") {

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

    // GOV.UK elements guide pages
    app.get('/layout', function (req, res) {
      var page_name = "Layout";
      res.render('guide_layout', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/typography', function (req, res) {
      var page_name = "Typography";
      res.render('guide_typography', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/colour', function (req, res) {
      var page_name = "Colour";
      res.render('guide_colour', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/icons-images', function (req, res) {
      var page_name = "Icons and images";
      res.render('guide_icons_images', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/data', function (req, res) {
      var page_name = "Data";
      res.render('guide_data', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/buttons', function (req, res) {
      var page_name = "Buttons";
      res.render('guide_buttons', {'assetPath' : assetPath, 'page_name' : page_name });
    });
    app.get('/forms', function (req, res) {
      var page_name = "Forms";
      res.render('guide_forms', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/errors', function (req, res) {
      var page_name = "Errors and validation";
      res.render('guide_errors', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/alpha-beta', function (req, res) {
      var page_name = "Alpha and beta banners";
      res.render('guide_alpha_beta', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    // GOV.UK elements example pages
    app.get('/examples', function (req, res) {
      var page_name = "Examples";
      res.render('examples/example_index', {'assetPath' : assetPath, 'page_name' : page_name });
    });

    app.get('/examples/grid-layout', function (req, res) {
      var section_name = "Examples";
      var page_name = "Grid layout";
      res.render('examples/example_grid_layout', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.get('/examples/typography', function (req, res) {
      var section_name = "Examples";
      var page_name = "Typography";
      res.render('examples/example_typography', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.get('/examples/forms', function (req, res) {
      var section_name = "Examples";
      var page_name = "Forms";
      res.render('examples/example_forms', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      var section_name = "Examples";
      var page_name = "Form validation - single question";
      res.render('examples/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/examples/form-validation-single-question-radio', function (req, res) {
      var section_name = "Examples";
      var page_name = "Form validation - single question";

      var personal_details = req.body.personal_details;
      var error = false;
      if (!personal_details) {
        error = true;
      } else {
        error = false;
      }
      res.render('examples/example_form_validation_single_question_radio', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name, 'personal_details': personal_details, 'error': error});
    });

    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      var section_name = "Examples";
      var page_name = "Form validation - multiple questions";
      res.render('examples/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    app.post('/examples/form-validation-multiple-questions', function(req, res) {
      var section_name = "Examples";
      var page_name = "Form validation - multiple questions";

      var fullName = req.body.fullName;
      var niNo = req.body.niNo;
      var error = false;
      if (!fullName || !niNo) {
        error = true;
      }
      else {
        error = false;
      }
      res.render('examples/example_form_validation_multiple_questions', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // GOV.UK elements test pages

    // Progressive disclosure pattern
    app.get('/patterns/details-summary', function (req, res) {
      var section_name = "Patterns";
      var page_name = "Details summary";
      res.render('patterns/details_summary', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Date pattern
    app.get('/patterns/date', function (req, res) {
      var section_name = "Patterns";
      var page_name = "Date";
      res.render('patterns/date', {'assetPath' : assetPath, 'section_name' : section_name, 'page_name' : page_name });
    });

    // Radio and checkbox pattern
    app.get('/patterns/radios-checkboxes', function (req, res) {
      var section_name = "Patterns";
      var page_name = "Radio buttons and checkboxes";
      res.render('patterns/radios_checkboxes', {'assetPath' : assetPath, 'page_name' : page_name, 'section_name' : section_name });
    });

  }
};
