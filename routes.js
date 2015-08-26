module.exports = {
  bind : function (app, assetPath) {

    app.get('/', function (req, res) {
      res.render('index', {'assetPath' : assetPath });
    });

    // GOV.UK elements guide pages
    app.get('/layout', function (req, res) {
      var pageName = "Layout";
      res.render('guide-layout', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/typography', function (req, res) {
      var pageName = "Typography";
      res.render('guide-typography', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/colour', function (req, res) {
      var pageName = "Colour";
      res.render('guide-colour', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/icons-images', function (req, res) {
      var pageName = "Icons and images";
      res.render('guide-icons-images', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/data', function (req, res) {
      var pageName = "Data";
      res.render('guide-data', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/buttons', function (req, res) {
      var pageName = "Buttons";
      res.render('guide-buttons', {'assetPath' : assetPath, 'pageName' : pageName });
    });
    app.get('/forms', function (req, res) {
      var pageName = "Forms";
      res.render('guide-forms', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/errors', function (req, res) {
      var pageName = "Errors and validation";
      res.render('guide-errors', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/alpha-beta', function (req, res) {
      var pageName = "Alpha and beta banners";
      res.render('guide-alpha-beta', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    // GOV.UK elements example pages
    app.get('/examples/grid-layout', function (req, res) {
      var pageName = "";
      res.render('examples/grid_layout', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/examples/typography', function (req, res) {
      var pageName = "";
      res.render('examples/typography', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/examples/forms', function (req, res) {
      var pageName = "";
      res.render('examples/forms', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      var pageName = "";
      res.render('examples/form-validation-single-question-radio', {'assetPath' : assetPath, 'pageName' : pageName});
    });

    app.post('/examples/form-validation-single-question-radio', function (req, res) {
      var pageName = "";
      var personal_details = req.body.personal_details;
      var error = false;
      if (!personal_details) {
        error = true;
      } else {
        error = false;
      }
      res.render('examples/form-validation-single-question-radio', {'assetPath' : assetPath, 'pageName' : pageName, 'personal_details': personal_details, 'error': error});
    });

    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      var pageName = "";
      res.render('examples/form-validation-multiple-questions', {'assetPath' : assetPath });
    });

    app.post('/examples/form-validation-multiple-questions', function(req, res) {
      var pageName = "";

      var fullName = req.body.fullName;
      var niNo = req.body.niNo;
      var error = false;
      if (!fullName || !niNo) {
        error = true;
      }
      else {
        error = false;
      }
      res.render('examples/form-validation-multiple-questions', {'assetPath' : assetPath, 'pageName' : pageName, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // GOV.UK elements test pages

    // Progressive disclosure pattern
    app.get('/patterns/details-summary', function (req, res) {
      var pageName = "";
      res.render('patterns/details_summary', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    // Date pattern
    app.get('/patterns/date', function (req, res) {
      var pageName = "";
      res.render('patterns/date', {'assetPath' : assetPath, 'pageName' : pageName });
    });

    // Radio and checkbox pattern
    app.get('/patterns/radios-checkboxes', function (req, res) {
      var pageName = "";
      res.render('patterns/radios_checkboxes', {'assetPath' : assetPath, 'pageName' : pageName });
    });

  }
};
