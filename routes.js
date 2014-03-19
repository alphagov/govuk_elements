module.exports = {
  bind : function (app, assetPath) {
    app.get('/', function (req, res) {

      res.render('index',
                {'assetPath' : assetPath});
      
    });

    app.get('/sample', function (req, res) {
      
      res.render('sample',
                {'assetPath' : assetPath});
    });
    
    /* Elements example pages */

    app.get('/examples/grid-layout', function (req, res) {
      res.render('examples/elements/grid_layout', {'assetPath' : assetPath });    
    });

    app.get('/examples/typography', function (req, res) {
      res.render('examples/elements/typography', {'assetPath' : assetPath });    
    });
    
    app.get('/examples/forms', function (req, res) {
      res.render('examples/elements/forms', {'assetPath' : assetPath });    
    });

    /* Prototype example pages */

    app.get('/examples/alpha', function (req, res) {
      res.render('examples/alpha/alpha', {'assetPath' : assetPath });    
    });

    app.get('/examples/template-partial-areas', function (req, res) {
      res.render('examples/template_partial_areas', {'assetPath' : assetPath}); 
    });

  }
};
