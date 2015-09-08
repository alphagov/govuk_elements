// Redirect all the existing URLs with fragment identifiers in to the new section
(function () {
  'use strict';


  var getNewRouteFor = function (fragment) {
    var baseURL = window.location.protocol + '//' +window.location.host;
    var newRoutes = {
      '#guide-layout': '/layout',
      '#layout-spacing': '/layout/#layout-spacing',
      '#layout-grid-unit-proportions': '/layout/#layout-grid-unit-proportions',
      '#guide-typography': '/typography',
      '#typography-headings': '/typography/#typography-headings',
      '#typography-lead-paragraph': '/typography/#typography-lead-paragraph',
      '#typography-body-copy': '/typography/#typography-body-copy',
      '#typography-links': '/typography/#typography-links',
      '#typography-lists': '/typography/#typography-lists',
      '#typography-inset-text': '/typography/#typography-inset-text',
      '#typography-hidden-text': '/typography/#typography-hidden-text',
      '#guide-colour': '/colour',
      '#colour-contrast': '/colour/#colour-contrast',
      '#colour-sass-variables': '/colour/#colour-sass-variables',
      '#colour-status-colours': '/colour/#colour-status-colours',
      '#colour-greyscale-palette': '/colour/#colour-greyscale-palette',
      '#colour-extended-palette': '/colour/#colour-extended-palette',
      '#guide-icons-images': '/icons-images',
      '#icons': '/icons-images/#icons',
      '#images': '/icons-images/#images',
      '#guide-data': '/data',
      '#data-visualisation': '/data/#data-visualisation',
      '#data-in-a-table': '/data/#data-in-a-table',
      '#guide-forms': '/form-elements',
      '#form-optional-fields': '/form-elements/#form-optional-fields',
      '#form-labels': '/form-elements/#form-labels',
      '#form-fields': '/form-elements/#form-fields',
      '#form-fieldsets': '/form-elements/#form-fieldsets',
      '#form-focus-states': '/form-elements/#form-focus-states',
      '#form-spacing': '/form-elements/#form-spacing',
      '#form-hint-text': '/form-elements/#form-hint-text',
      '#form-select-boxes': '/form-elements/#form-select-boxes',
      '#form-radio-buttons': '/form-elements/#form-radio-buttons',
      '#form-checkboxes': '/form-elements/#form-checkboxes',
      '#form-inset-form-elements': '/form-elements/#form-toggle-content',
      '#guide-buttons': '/buttons',
      '#buttons-button-text': '/buttons/#button-text',
      '#buttons-creating-buttons': '/buttons/#creating-buttons',
      '#buttons-disabled-buttons': '/buttons/#button-disabled',
      '#guide-errors': '/errors',
      '#error-message-examples': '/errors/#examples',
      '#guide-alpha-beta': '/alpha-beta-banners',
      '#guide-alpha-beta-govuk': '/alpha-beta-banners/#alpha-banner',
      '#alpha-beta-creating-banners': '/alpha-beta-banners/#creating-phase-banners'
    };

    if (newRoutes[fragment] !== 'undefined') {
      return baseURL + newRoutes[fragment];
    }

    return false;
  };

  var fragment = window.location.hash;
  var newRoute;

  if (fragment === '') {
    return;
  }
  newRoute = getNewRouteFor(fragment);

  if (newRoute) {
    window.location.href = newRoute;
  }

}());
