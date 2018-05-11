module.exports = {
  bind: function (app, assetPath) {
    app.get('/', function (req, res) {
      res.render('index', { 'asset_path': assetPath })
    })

    // Redirect snippets page to the index page
    app.get('/snippets', function (req, res) {
      res.redirect('/')
    })

    // Layout
    app.get('/layout', function (req, res) {
      var pageName = 'Rozmiestnenie'
      res.render('guide_layout', { 'page_name': pageName })
    })

    // Example page: Grid layout
    app.get('/layout/example-grid-layout', function (req, res) {
      var section = 'layout'
      var sectionName = 'Layout'
      var pageName = 'Príklad: Mriežkové rozloženie'
      res.render('examples/example_grid_layout', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/grid-layout', function (req, res) {
      res.redirect('/layout/example-grid-layout')
    })

    // Typography
    app.get('/typography', function (req, res) {
      var pageName = 'Typografia'
      res.render('guide_typography', { 'page_name': pageName })
    })

    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section = 'typography'
      var sectionName = 'Príklad: Typografia'
      var pageName = 'Typografia'
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
      var pageName = 'Príklad: Detailné zhrnutie'
      res.render('examples/example_details_summary', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/details-summary', function (req, res) {
      res.redirect('/typography/example-details-summary')
    })

    // Colour
    app.get('/colour', function (req, res) {
      var pageName = 'Farby'
      res.render('guide_colour', { 'page_name': pageName })
    })

    app.get('/hlavicka-paticka', function (req, res) {
      var pageName = 'Hlavička a pätička'
      res.render('guide_header_footer', {'page_name': pageName})
    })

    // Icons and images
    app.get('/icons-images', function (req, res) {
      var pageName = 'Ikony a obrázky'
      res.render('guide_icons_images', { 'page_name': pageName })
    })

    // Example page: Icons
    app.get('/icons-images/example-icons', function (req, res) {
      var section = 'icons-images'
      var sectionName = 'Icons and images'
      var pageName = 'Príklad: Ikony a obrázky'
      res.render('examples/example_icons', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // udaje
    app.get('/udaje', function (req, res) {
      var pageName = 'Údaje'
      res.render('guide_data', { 'page_name': pageName })
    })

    // Buttons
    app.get('/buttons', function (req, res) {
      var pageName = 'Tlačidlá'
      res.render('guide_buttons', { 'page_name': pageName })
    })

    // Forms
    app.get('/form-elements', function (req, res) {
      var pageName = 'Formulárové prvky'
      res.render('guide_form_elements', { 'page_name': pageName })
    })

    // Example page: Basic form
    app.get('/form-elements/example-forms', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Príklad: Formulár'
      res.render('examples/example_forms', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/forms', function (req, res) {
      res.redirect('/form-elements/example-forms')
    })

    // Example page: Date pattern
    app.get('/form-elements/example-date', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Formulárové prvky'
      var pageName = 'Príklad: Dátumy'
      res.render('examples/example_date', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/date', function (req, res) {
      res.redirect('/form-elements/example-date')
    })

    // Example page: Radio buttons and checkboxes
    app.get('/form-elements/example-radios-checkboxes', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Formulárové prvky'
      var pageName = 'Príklad: Prepínače a zaškrtávacie polia'
      res.render('examples/example_radios_checkboxes', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.redirect('/form-elements/example-radios-checkboxes')
    })

    // Example page: Form elements
    app.get('/form-elements/example-form-elements', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Formulárové prvky'
      var pageName = 'Príklad: Formulárové elementy'
      res.render('examples/example_form_elements', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    // Errors and validation
    app.get('/errors', function (req, res) {
      var pageName = 'Chyby a validácia'
      res.render('guide_errors', { 'page_name': pageName })
    })

    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Chyby a validácia'
      var pageName = 'Príklad: Kontrola formulára - jedna otázka'
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    app.post('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Chyby a validácia'
      var pageName = 'Príklad: Kontrola formulára - jedna otázka'
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
      var sectionName = 'Chyby a validácia'
      var pageName = 'Príklad: Kontrola formulára - viacero otázok'
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })

    app.post('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = 'errors'
      var sectionName = 'Chyby a validácia'
      var pageName = 'Príklad: Kontrola formulára - viacero otázok'
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
      var pageName = 'Alfa a beta transparenty'
      res.render('guide_alpha_beta', { 'page_name': pageName })
    })

    app.get('/uvod/id-sk', function (req, res) {
      var pageName = 'Čo je ID-SK'
      res.render('introduction/id-sk', { 'page_name': pageName })
    })

    app.get('/uvod/principy', function (req, res) {
      var pageName = 'Princípy tvorby elektronických služieb'
      res.render('introduction/10_principov_tvorby_elektronickych_sluzieb', { 'page_name': pageName })
    })

    app.get('/uvod/metodika-ucd', function (req, res) {
      var pageName = 'Metodika UCD (user-centered dizajn)'
      res.render('introduction/metodika_ucd', { 'page_name': pageName })
    })

    // Patterns
    app.get('/vzory/adresy', function (req, res) {
      var pageName = 'Adresy'
      res.render('patterns/adresy', { 'page_name': pageName })
    })

    app.get('/vzory/oznacenie-verzie-sluzby', function (req, res) {
      var pageName = 'Označenie verzie služby'
      res.render('patterns/oznacenie-verzie-sluzby', { 'page_name': pageName })
    })

    app.get('/vzory/overenie-pred-zaciatkom-procesu', function (req, res) {
      var pageName = 'Overenie pred začiatkom procesu'
      res.render('patterns/overenie-pred-zaciatkom-procesu', { 'page_name': pageName })
    })

    app.get('/vzory/zhrnutie', function (req, res) {
      var pageName = 'Zhrnutie'
      res.render('patterns/zhrnutie', { 'page_name': pageName })
    })

    app.get('/vzory/stranky-dokoncenia-procesu', function (req, res) {
      var pageName = 'Stránky dokočenia procesu'
      res.render('patterns/stranky-dokoncenia-procesu', { 'page_name': pageName })
    })

    app.get('/vzory/datumy', function (req, res) {
      var pageName = 'Dátumy'
      res.render('patterns/datumy', { 'page_name': pageName })
    })

    app.get('/vzory/emailove-adresy', function (req, res) {
      var pageName = 'Emailové adresy'
      res.render('patterns/emaily', { 'page_name': pageName })
    })
    app.get('/vzory/proces-overenia-emailovej-adresy', function (req, res) {
      var pageName = 'Emailové adresy'
      res.render('patterns/proces-overenia-emailovej-adresy', { 'page_name': pageName })
    })

    app.get('/vzory/stranky-so-spatnou-vazbou', function (req, res) {
      var pageName = 'Stránky so spätnou väzbou'
      res.render('patterns/stranky-so-spatnou-vazbou', { 'page_name': pageName })
    })

    app.get('/vzory/struktura-formularov', function (req, res) {
      var pageName = 'Štruktúra formulárov'
      res.render('patterns/struktura-formularov', { 'page_name': pageName })
    })

    app.get('/vzory/vyber-pohlavia', function (req, res) {
      var pageName = 'Výber pohlavia'
      res.render('patterns/vyber-pohlavia', { 'page_name': pageName })
    })

    app.get('/vzory/pomocny-text', function (req, res) {
      var pageName = 'Pomocný text'
      res.render('patterns/pomocny-text', { 'page_name': pageName })
    })

    app.get('/vzory/mena', function (req, res) {
      var pageName = 'Mená'
      res.render('patterns/mena', { 'page_name': pageName })
    })

    app.get('/vzory/hesla', function (req, res) {
      var pageName = 'Heslá'
      res.render('patterns/hesla', { 'page_name': pageName })
    })

    app.get('/vzory/platobna-stranka', function (req, res) {
      var pageName = 'Platobná stránka'
      res.render('patterns/platobna-stranka', { 'page_name': pageName })
    })

    app.get('/vzory/indikatory-progresu', function (req, res) {
      var pageName = 'Indukátory progresu'
      res.render('patterns/indikatory-progresu', { 'page_name': pageName })
    })

    app.get('/vzory/stranky-s-otazkami', function (req, res) {
      var pageName = 'Stránky s otázkami'
      res.render('patterns/stranky-s-otazkami', { 'page_name': pageName })
    })

    app.get('/vzory/uvodne-obrazovky', function (req, res) {
      var pageName = 'Úvodné obrazovky'
      res.render('patterns/uvodne-obrazovky', { 'page_name': pageName })
    })

    app.get('/vzory/zoznamy-uloh', function (req, res) {
      var pageName = 'Zoznamy úloh'
      res.render('patterns/zoznamy-uloh', { 'page_name': pageName })
    })

    app.get('/vzory/prihlasenie-a-ucty', function (req, res) {
      var pageName = 'Prihlásenie a používateľské účty'
      res.render('patterns/prihlasenie-a-ucty', { 'page_name': pageName })
    })

    app.get('/vzory/ukazka-podania-ziadosti', function (req, res) {
      var pageName = 'Ukážka podania žiadosti'
      res.render('patterns/ukazka-podania-ziadosti', { 'page_name': pageName })
    })

    app.get('/vzory/pouzivatelske-mena', function (req, res) {
      var pageName = 'Používateľské mená'
      res.render('patterns/pouzivatelske-mena', { 'page_name': pageName })
    })

    app.get('/vzory/ako-zacat-s-vyvojom', function (req, res) {
      var pageName = 'Ako začať s vývojom'
      res.render('introduction/ako-zacat-s-vyvojom', { 'page_name': pageName })
    })

    // Slovnik
    app.get('/slovnik/slovnik', function (req, res) {
      var pageName = 'Slovník'
      res.render('dictionary/slovnik', { 'page_name': pageName })
    })
  }
}
