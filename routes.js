module.exports = {
  bind : function (app, assetPath) {
    app.get('/', function (req, res) {

      res.render('index',
                {'assetPath' : assetPath});

    });

    // GOV.UK elements snippets
    app.get('/snippets', function (req, res) {
      res.render('snippets', {'assetPath' : assetPath });
    });

    // GOV.UK elements example pages

    app.get('/examples/grid-layout', function (req, res) {
      res.render('examples/grid_layout', {'assetPath' : assetPath });
    });

    app.get('/examples/typography', function (req, res) {
      res.render('examples/typography', {'assetPath' : assetPath });
    });

    app.get('/examples/forms', function (req, res) {
      res.render('examples/forms', {'assetPath' : assetPath });
    });

    app.get('/examples/form-validation-single-question', function (req, res) {
      res.render('examples/form-validation-single-question', {'assetPath' : assetPath });
    });

    app.post('/examples/form-validation-single-question', function(req, res) {
      var niNumber = req.body.niNumber;
      var error = false;
      if (!niNumber) {
        error = true;
      } else {
        error = false;
      }
      res.render('examples/form-validation-single-question', {'assetPath' : assetPath, 'niNumber': niNumber, 'error': error});
    });

    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      res.render('examples/form-validation-single-question-radio', {'assetPath' : assetPath});
    });

    app.post('/examples/form-validation-single-question-radio', function (req, res) {
      var country = req.body.country;
      var error = false;
      if (!country) {
        error = true;
      } else {
        error = false;
      }
      res.render('examples/form-validation-single-question-radio', {'assetPath' : assetPath, 'country': country, 'error': error});
    });

    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      res.render('examples/form-validation-multiple-questions', {'assetPath' : assetPath });
    });

    app.post('/examples/form-validation-multiple-questions', function(req, res) {
      var fullName = req.body.fullName;
      var niNo = req.body.niNo;
      var error = false;
      if (!fullName || !niNo) {
        error = true;
      }
      else {
        error = false;
      }
      res.render('examples/form-validation-multiple-questions', {'assetPath' : assetPath, 'fullName': fullName, 'niNo': niNo, 'error': error});
    });

    // GOV.UK elements test pages

    // Progressive disclosure pattern
    app.get('/patterns/details-summary', function (req, res) {
      res.render('patterns/details_summary', {'assetPath' : assetPath });
    });

    // Date pattern
    app.get('/patterns/date', function (req, res) {
      res.render('patterns/date', {'assetPath' : assetPath });
    });

    // Radio and checkbox pattern
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.render('patterns/radios_checkboxes', {'assetPath' : assetPath });
    });

  }
};
