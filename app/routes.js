module.exports = {
  bind: function (app, assetPath) {
    app.get('/', function (req, res) {
      res.render('index', { 'asset_path': assetPath })
    })

    // Redirect snippets page to the index page
    app.get('/snippets', function (req, res) {
      res.redirect('/')
    })

    app.get('/style-guide', function (req, res) {
      var pageName = 'Front-end style guide'
      res.render('guide_style_guide', { 'page_name': pageName })
    })

    // Layout
    app.get('/layout', function (req, res) {
      var pageName = 'Layout'
      res.render('guide_layout', { 'page_name': pageName })
    })

    // Example page: Grid layout
    app.get('/layout/example-grid-layout', function (req, res) {
      var section = 'layout'
      var sectionName = 'Layout'
      var pageName = 'Example: Grid layout'
      res.render('examples/example_grid_layout', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/grid-layout', function (req, res) {
      res.redirect('/layout/example-grid-layout')
    })

    // Typography
    app.get('/typography', function (req, res) {
      var pageName = 'Typography'
      res.render('guide_typography', { 'page_name': pageName })
    })

    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section = 'typography'
      var sectionName = 'Typography'
      var pageName = 'Example: Typography'
      res.render('examples/example_typography', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/typography', function (req, res) {
      res.redirect('/typography/example-typography')
    })

    // Example page: Progressive disclosure
    app.get('/typography/example-details-summary', function (req, res) {
      var section = 'typography'
      var sectionName = 'Typography'
      var pageName = 'Example: Details summary'
      res.render('examples/example_details_summary', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/details-summary', function (req, res) {
      res.redirect('/typography/example-details-summary')
    })

    // Colour
    app.get('/colour', function (req, res) {
      var pageName = 'Colour'
      res.render('guide_colour', { 'page_name': pageName })
    })

    // Icons and images
    app.get('/icons-images', function (req, res) {
      var pageName = 'Icons and images'
      res.render('guide_icons_images', { 'page_name': pageName })
    })

    // Example page: Icons
    app.get('/icons-images/example-icons', function (req, res) {
      var section = 'icons-images'
      var sectionName = 'Icons and images'
      var pageName = 'Example: Icons'
      res.render('examples/example_icons', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Data
    app.get('/data', function (req, res) {
      var pageName = 'Data'
      res.render('guide_data', { 'page_name': pageName })
    })

    // Buttons
    app.get('/buttons', function (req, res) {
      var pageName = 'Buttons'
      res.render('guide_buttons', { 'page_name': pageName })
    })

    // Forms
    app.get('/form-elements', function (req, res) {
      var pageName = 'Form elements'
      res.render('guide_form_elements', { 'page_name': pageName })
    })

    // Example page: Basic form
    app.get('/form-elements/example-forms', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Form'
      res.render('examples/example_forms', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/forms', function (req, res) {
      res.redirect('/form-elements/example-forms')
    })

    // Example page: Date pattern
    app.get('/form-elements/example-date', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Date'
      res.render('examples/example_date', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/date', function (req, res) {
      res.redirect('/form-elements/example-date')
    })

    // Example page: Radio buttons and checkboxes
    app.get('/form-elements/example-radios-checkboxes', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Radio buttons and checkboxes'
      res.render('examples/example_radios_checkboxes', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.redirect('/form-elements/example-radios-checkboxes')
    })

    // Example page: Form elements
    app.get('/form-elements/example-form-elements', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Form elements'
      res.render('examples/example_form_elements', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Errors and validation
    app.get('/errors', function (req, res) {
      var pageName = 'Errors and validation'
      res.render('guide_errors', { 'page_name': pageName })
    })

    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - single question'
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    app.post('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - single question'
      var personalDetails = req.body.personalDetails
      var error = false
      if (!personalDetails) {
        error = true
      } else {
        error = false
      }
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name': sectionName, 'page_name': pageName, 'personal_details': personalDetails, 'error': error })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      res.redirect('/errors/example-form-validation-single-question-radio')
    })

    app.get('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - multiple questions'
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    app.post('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - multiple questions'
      var fullName = req.body.fullName
      var niNo = req.body.niNo
      var error = false
      if (!fullName || !niNo) {
        error = true
      } else {
        error = false
      }
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name': sectionName, 'page_name': pageName, 'fullName': fullName, 'niNo': niNo, 'error': error })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      res.redirect('/errors/example-form-validation-multiple-questions')
    })

    // Alpha and beta banners
    app.get('/alpha-beta-banners', function (req, res) {
      var pageName = 'Alpha and beta banners'
      res.render('guide_alpha_beta', { 'page_name': pageName })
    })
  }
}
