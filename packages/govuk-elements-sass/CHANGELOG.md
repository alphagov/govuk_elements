# 3.1.3

- Fix missing arrow on the `<details>` element in Firefox ([PR #534](https://github.com/alphagov/govuk_elements/pull/611))
- Heading classes set to `display: block;` ([PR #552](https://github.com/alphagov/govuk_elements/pull/552))
- Add class to adjust fieldset top margin when used after error summary ([PR #552](https://github.com/alphagov/govuk_elements/pull/552))
- Change error layout for single-question form pages ([PR #552](https://github.com/alphagov/govuk_elements/pull/552))

# 3.1.2

- Update govuk_frontend_toolkit from v6.0.2 to v7.1.0:
  - Remove the multivariate test library (not used in elements)
  - Fix volume up and down buttons in the media player
  - Promote the details polyfill to Frontend Toolkit
- Ensure the back link remains black when focussed ([PR #544](https://github.com/alphagov/govuk_elements/pull/544))
- Deprecate adding a tabindex to the main element ([PR #534](https://github.com/alphagov/govuk_elements/pull/534))

# 3.1.1

- Only make column headers bold, not row headers ([PR #483](https://github.com/alphagov/govuk_elements/pull/483))
- Update govuk_template_jinja to 0.22.2 ([PR #505](https://github.com/alphagov/govuk_elements/pull/505))
- De-duplicate legends/headings when there is one question per page by placing the heading for the question inside the legend of the fieldset ([PR #507](https://github.com/alphagov/govuk_elements/pull/507)).
- Set cursor: default for for both the disabled input and the label - for radio buttons and checkboxes ([PR #519](https://github.com/alphagov/govuk_elements/pull/519)).
- Fix stray line on checkboxes on IE11 caused by miscalculation of the border width of rotated element ([PR #520](https://github.com/alphagov/govuk_elements/pull/520)).
- Fix hard error in details.polyfill.js raised when the `<details>` element doesn't follow [the specified structure](https://govuk-elements.herokuapp.com/typography/#typography-hidden-text) ([PR #521](https://github.com/alphagov/govuk_elements/pull/521)).

# 3.1.0

- Split the list of partials imported by GOV.UK elements into two further files - elements and frontend-toolkit. This supports npm-sass, where the frontend toolkit dependencies are imported separately ([PR #489](https://github.com/alphagov/govuk_elements/pull/489)).
- Add a new class `.body-text` for use inside legends, for text to accompany radio buttons or checkboxes - either 'select one', or 'select all that apply'. Ensure legends or elements within legends have margins in webkit browsers ([PR #484](https://github.com/alphagov/govuk_elements/pull/484)).
- Move the breadcrumb so it sits outside the main element ([PR #478](https://github.com/alphagov/govuk_elements/pull/478))
- Constrain error summary boxes to 2/3 of the page width ([PR #477](https://github.com/alphagov/govuk_elements/pull/477))
- Remove the right padding from the last column of items in a table, also remove color set for table headers and cells, to allow users to change colour settings ([PR #482](https://github.com/alphagov/govuk_elements/pull/482)
- Align table captions to the left ([PR #476](https://github.com/alphagov/govuk_elements/pull/482)).
- Add guidance for use of table captions ([PR #488](https://github.com/alphagov/govuk_elements/pull/488)).
- Fix unnecessary float and width 100% for `.form-section` and `.form-group` ([PR #487](https://github.com/alphagov/govuk_elements/pull/487)).
- Fix incorrect margin above the last panel in a group ([PR #498](https://github.com/alphagov/govuk_elements/pull/498)).
- Add guidance for the mininum text size to be used with the highlight box on confimation boxes ([PR #481](https://github.com/alphagov/govuk_elements/pull/481)).
- Update govuk_template_jinja to 0.22.0 ([PR #493](https://github.com/alphagov/govuk_elements/pull/493)).

# 3.0.3

- Increase the size of the text in the highlight box - used for confirmation pages ([PR #451](https://github.com/alphagov/govuk_elements/pull/451))
- Fix insufficient colour contrast on select boxes in Windows 10 ([PR #456](https://github.com/alphagov/govuk_elements/pull/456))

# 3.0.2

- Resolve 'dead area' between radio/checkbox and label that has hand cursor but is not clickable ([PR #435](https://github.com/alphagov/govuk_elements/pull/435))

# 3.0.1

- Update govuk_frontend_toolkit to 5.1.2 ([PR #425](https://github.com/alphagov/govuk_elements/pull/425)). This updates show-hide-content.js to work with new .multiple-choice custom radio buttons and checkboxes, released in GOV.UK elements 3.0.0.
- Ensure that table cells using tabular-numbers are 19px ([PR #424](https://github.com/alphagov/govuk_elements/pull/424)).

# 3.0.0

- Breaking changes to form validation ([#PR 405](https://github.com/alphagov/govuk_elements/pull/405))

This adds two new classes: `.form-group-error` and `.form-control-error`, and removes the old `.error` class. This lets specific controls within a group be accurately marked as having errors. For example, this allows parts of a date entry to be marked rather than the whole section.

To upgrade, you’ll need to change any occurences of `.error` that were applied to form groups to be `.form-group-error`, and then add `.form-control-error` to the failing input inside.

- Radio buttons and checkboxes have new markup that doesn’t need JavaScript ([PR #406](https://github.com/alphagov/govuk_elements/pull/406))

Previously the radio buttons and checkboxes relied on selection-buttons.js (from [govuk_frontend_toolkit](https://github.com/alphagov/govuk_frontend_toolkit)) to work. By reworking the markup (see [examples](https://govuk-elements.herokuapp.com/form-elements/#form-radio-buttons)) we’ve been able remove this requirement.

To upgrade, you’ll need to change your markup to match the new pattern. Once that has been done you’ll be able to stop including selection-buttons.js and remove [the `GOVUK.SelectionButtons` constructor](https://github.com/alphagov/govuk_frontend_toolkit/blob/master/docs/javascript.md#selection-buttons) from your JavaScript. The look and feel remains the same barring some tweaks to the focus weight. Accessibility and device compatibility remains the same as the previous version.

- Add examples of phase tags used outside of phase banners ([PR #366](https://github.com/alphagov/govuk_elements/pull/366))
- Fix invisible input content when changing colours ([PR #397](https://github.com/alphagov/govuk_elements/pull/397))
- Recommend the use of `aria-current="page"` for the last breadcrumb ([PR #418](https://github.com/alphagov/govuk_elements/pull/418))

# 2.2.1

- Fix contrast issues with phase banners. Use $govuk-blue for the phase tag and update the examples ([PR #364](https://github.com/alphagov/govuk_elements/pull/364)).

# 2.2.0

- New radio buttons and checkboxes ([PR #296](https://github.com/alphagov/govuk_elements/pull/296))

You will need to make sure that your version of the GOV.UK Frontend Toolkit is at least 4.17.0.

# 2.1.2

- Add snippets for data visualisation examples ([PR #351](https://github.com/alphagov/govuk_elements/pull/351)) and ([PR #350](https://github.com/alphagov/govuk_elements/pull/350))
- Fix the grey left hand border example for Radios and checkboxes ([PR #349](https://github.com/alphagov/govuk_elements/pull/349))
- Fix the spacing underneath the "inline" block label example ([PR #348](https://github.com/alphagov/govuk_elements/pull/348))

# 2.1.1

- Remove rounded corners on form inputs elements and textareas in iOS ([PR #342](https://github.com/alphagov/govuk_elements/pull/342))
- Fix focus outline on form fields in Chrome / Safari ([PR #346](https://github.com/alphagov/govuk_elements/pull/346))
- Updates the contribution guidelines ([PR #339](https://github.com/alphagov/govuk_elements/pull/339))
- Recommend `.visually-hidden` over `.visuallyhidden` ([PR #341](https://github.com/alphagov/govuk_elements/pull/341))

# 2.1.0

- Update govuk_frontend_toolkit to 5.0.0 and govuk_template to 0.19.0 ([PR #333](https://github.com/alphagov/govuk_elements/pull/333))
- Add a select box example ([PR #303](https://github.com/alphagov/govuk_elements/pull/303))
- Add bullet points describing use of disabled buttons ([PR #304](https://github.com/alphagov/govuk_elements/pull/304))
- Add reasoning for native over custom file inputs
- Clear floats on details elements ([PR #328](https://github.com/alphagov/govuk_elements/pull/328))
- Add a `.bold` utility class ([PR #321](https://github.com/alphagov/govuk_elements/pull/321))
- Remove external link styles ([PR #274](https://github.com/alphagov/govuk_elements/pull/274))

# 2.0.0

- Remove the images path override from the helpers partial ([PR #292](https://github.com/alphagov/govuk_elements/pull/292)). This will break background images that are currently using the `file-url` function from [the url-helpers partial in the frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit/blob/d54c9b26d314a6e6cb50ba90f6e96ca50049498f/stylesheets/_url-helpers.scss). As `$path` will vary from project to project you will need to define this in your main application stylesheet.
- Bump govuk frontend toolkit to 4.16.1 ([PR #288](https://github.com/alphagov/govuk_elements/pull/288)). This adds space key activation to links with a role of button.
- Form validation patterns for conditionally revealing content ([PR #286](https://github.com/alphagov/govuk_elements/pull/286))
- Centre text on full-width buttons ([PR #289](https://github.com/alphagov/govuk_elements/pull/289))
- Lint JS code using [StandardJS](http://standardjs.com/) ([PR #290](https://github.com/alphagov/govuk_elements/pull/290))

*This version deprecates external link styles. If your service has user research that indicates that external links are useful (or not) then we’d like to hear from you either on Slack, [digital-service-designers](https://groups.google.com/a/digital.cabinet-office.gov.uk/forum/#!forum/digital-service-designers) or [opening an issue](https://github.com/alphagov/govuk_elements/issues/new).*

# 1.2.2

- Bump govuk frontend toolkit to 4.14.4 (PR #278)
- Add a .column-full class (PR #270)
- Add a file upload example (PR #268)
- Remove the blue outline from the main content area (PR #265)
- Fix legend text wrapping in IE (PR #248)

# 1.2.1

- Consistent spacing underneath block labels and toggled content (PR #229)
- Remove underlines from abbreviations in Firefox (PR #241)

# 1.2.0

- Add MIT License (PR #236)
- Create latest release branch as an alias of the latest release (PR #232)
- Create new app to preview govuk elements sass releases (PR #219)
- Fix the summary arrow in recent Firefox (PR #227)
- Remove button padding overriding the govuk_frontend_toolkit (PR #230)
- Don't copy the govuk_frontend_toolkit's images into an icons folder (PR #223)
- Fix path for rails and node environments (PR #234)
  - Import the govuk_frontend_toolkit url-helpers partial
  - If image-url is not defined (if we are not in a Rails environment), then set a path to /public/images
- Fix the skip link in Safari (PR #225)

# 1.1.4

- Fix issue #197, toggled content not displaying
  PR (#198)
  - Instead of using show() and hide(), add and remove the .js-hidden class
  - The govuk_template sets .js-hidden, remove duplicate in helpers.scss

# 1.1.3

- Bump govuk frontend toolkit to 4.9.1 (PR #195)
- Use the GOV.UK lint gem for scss linting (PR #191)
- Use aria-describedby to associate a form hint with a form fields (PR #187)
- Bump govuk template to 0.17.0 (PR #186)
- Use 19px as the default font size for tabular data (PR #185)
- Remove invalid ARIA "breadcrumbs" role from the breadcrumb (PR #182)
- Copy base styles set by govuk template (PR #176)

# 1.1.2

- Add missing 2/3 width grid wrappers to example pages (#173)
- Update max for date pattern to 2016 (#175)
- Fix warning for the npm engine field (#171)
- Bump the govuk frontend toolkit to 4.6.1, update the $link-hover-colour swatch. (#170)
- Remove 'files' from package.json and amend .npmignore (#169)
- Fix the breadcrumbs for the 'Icons and images' section (#168)
- Make error messages plural rather than using (s) (#167)

# 1.1.1

- Update package json to publish govuk-elements-sass (#156)
- Bump govuk template to 0.16.1 (#160)

# 1.1.0

- Bump the govuk frontend toolkit to 4.6.0 and use the new breadcrumbs partial (#157)

# 1.0.0

- Use .list class required in (#135) for all list examples (#140)
- Make the list of files govuk elements imports a partial (#139)
- Fix: Update the Hex value for error colour, above $error-colour variable (#138)
- Fix: Update the selector used by the notice styles (#137)
- Fix: set only a left border for panels (#136)
- Use a common naming convention for lists, panels and icons and grid columns (#135)
- Update cookie message to match govuk template default (#132)
- Copy base styles from govuk template (#131)
- Show icons in the govuk frontend toolkit, add new .circle class to replace step icons (#129)

# 0.1.1

- Add a .column-one-third class to match the corresponding .column-two-thirds classname for layout (#127)
- Add a colour swatch for the $govuk-blue Sass variable (#125)
- Remove @-moz-document url-prefix() hack for Firefox, no longer required to style the "Back" link arrow (#123)
- Remove additonal right and bottom margins from buttons (#124)
- Update README.txt and CONTRIBUTING.md (#122)
- Remove dependencies from this repository, move govuk dependecies to /govuk_modules/ (#119)
- Move all govuk frontend toolkit Sass import statements to main.scss (#118)

# 0.1.0

Initial development release.
