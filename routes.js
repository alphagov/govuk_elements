module.exports = {
  bind : function (app, assetPath) {
    app.get('/', function (req, res) {

      res.render('index',
                {'assetPath' : assetPath});
      
    });
    
    // Elements example pages

    app.get('/examples/grid-layout', function (req, res) {
      res.render('examples/grid_layout', {'assetPath' : assetPath }); 
    });

    app.get('/examples/typography', function (req, res) {
      res.render('examples/typography', {'assetPath' : assetPath }); 
    });
    
    app.get('/examples/forms', function (req, res) {
      res.render('examples/forms', {'assetPath' : assetPath });  
    });

  }
};
