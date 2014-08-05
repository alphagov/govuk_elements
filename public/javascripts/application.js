$(document).ready(function() {

  // Example - Highlight grid

  if ($('.js-highlight-grid').length>0) {

    $('.js-highlight-grid').click(function(e) {

      e.preventDefault();
      var html = $('html');

      if ($('.is-inner-block-highlight').length>0) {
        // Don't add more than once
      } else {
        $('.grid .inner-block').wrapInner('<div class="is-inner-block-highlight"></div>');
      }

      if (html.hasClass('example-highlight-grid')) {
          html.removeClass('example-highlight-grid');
      } else {
          html.addClass('example-highlight-grid');
      }

    });

  }

  // Example - Add aria support to details
  // See /javascripts/vendor/details.polyfill.js

  // govuk_frontend_tookit selection-buttons.js
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  GOVUK.selectionButtons($blockLabels);

});
