$(document).ready(function() {

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js

});

$(window).load(function() {

  // Only set focus for the error example pages
  if ($(".js-error-example").length) {

    // If there is an error summary, set focus to the summary
    if ($(".error-summary").length) {
      $(".error-summary").focus();
      $(".error-summary a").click(function(e) {
        e.preventDefault();
        var href = $(this).attr("href");
        $(href).focus();
      });
    }
    // Otherwise, set focus to the field with the error
    else {
      $(".error input:first").focus();
    }
  }

});

