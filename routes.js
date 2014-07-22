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

    // GOV.UK elements test pages

    // Progressive disclosure pattern
    app.get('/patterns/details-summary', function (req, res) {
      res.render('patterns/details_summary', {'assetPath' : assetPath });
    });

    // Date pattern
    app.get('/patterns/form-date', function (req, res) {
      res.render('patterns/form_date', {'assetPath' : assetPath });
    });

    // Radio and checkbox pattern
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.render('patterns/radios_checkboxes', {'assetPath' : assetPath });
    });

    // GOV.UK template example pages

    app.get('/examples/template', function (req, res) {
      res.render('examples/template', {'assetPath' : assetPath });
    });

    app.get('/examples/template/header', function (req, res) {
      res.render('examples/template/header', {'assetPath' : assetPath });
    });
    app.get('/examples/template/header-with-title', function (req, res) {
      res.render('examples/template/header_with_title', {'assetPath' : assetPath });
    });
    app.get('/examples/template/header-with-nav', function (req, res) {
      res.render('examples/template/header_with_nav', {'assetPath' : assetPath });
    });


  }
};
