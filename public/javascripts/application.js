$(document).ready(function() {

  // Hide jQuery animation
  jQuery.fx.off = true;

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

  // Reveal hidden content
  // Checkboxes
  $(".block-label input[type='checkbox']").click(function() {

    var $checkbox = $(this);
    var $checkboxLabel = $(this).parent();

    var $dataTarget = $checkboxLabel.attr('data-target');

    // Set aria-controls
    $checkbox.attr('aria-controls', $dataTarget);

    // Show or hide, set aria-expanded and aria-hidden
    if (typeof $dataTarget !== typeof undefined && $dataTarget !== false) {

      $('#'+$dataTarget).toggle(function() {
        if ($(this).css('display')==='none') {
          $(this).removeAttr('aria-hidden','false');
          $(this).removeAttr('aria-expanded','true');
          $(this).attr('aria-hidden', 'true');
          $(this).attr('aria-expanded', 'false');
        }
        else {
          $(this).removeAttr('aria-hidden','true');
          $(this).removeAttr('aria-expanded','false');
          $(this).prop('aria-hidden', 'false');
          $(this).prop('aria-expanded', 'true');
        }
      });

    }

  });

  // Radio buttons
  $(".block-label input[type='radio']").click(function() {

    var $radio = $(this);
    var $radioGroupName = $(this).attr('name');
    var $radioLabel = $(this).parent();

    var $dataTarget = $radioLabel.attr('data-target');

    // Set aria-controls
    $radio.attr('aria-controls', $dataTarget);

    // Show or hide, set aria-expanded and aria-hidden
    if (typeof $dataTarget !== "undefined") {
      $('#'+$dataTarget).attr('aria-hidden','false').attr('aria-expanded','true').show();
    }
    else {
      $(".block-label input[name=" + $radioGroupName + "]").each(function() {
        var groupDataTarget = $(this).parent().attr('data-target');
        $('#'+groupDataTarget).attr('aria-hidden','true').attr('aria-expanded','false').hide();
      });
    }

  });


});