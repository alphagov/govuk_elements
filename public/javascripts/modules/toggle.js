/*
  Toggle the display of elements

  Use `data-controls` and `data-expanded` to indicate the
  starting state and the IDs of the elements that the toggle
  controls. This is synonymous with ARIA attributes, which
  get added when starting.
*/
(function(Modules) {
  "use strict";

  Modules.Toggle = function() {
    this.start = function($el) {
      var toggleSelector = '[data-controls][data-expanded]';

      $el.on('click', toggleSelector, toggle);
      $el.find(toggleSelector).each(addAriaAttrs);

      // Add the ARIA attributes with JavaScript
      // If the JS fails and there's no interactive elements, having
      // no aria attributes is an accurate representation.
      function addAriaAttrs() {
        var $toggle = $(this);
        $toggle.attr('role', 'button');
        $toggle.attr('aria-controls', $toggle.data('controls'));
        $toggle.attr('aria-expanded', $toggle.data('expanded'));

        var $targets = getTargetElements($toggle);
        $targets.attr('aria-live', 'polite');
        $targets.attr('role', 'region');
        $toggle.data('$targets', $targets);
      }

      function toggle(event) {
        var $toggle = $(event.target),
            expanded = $toggle.attr('aria-expanded') === "true",
            $targets = $toggle.data('$targets');

        if (expanded) {
          $toggle.attr('aria-expanded', false);
          $targets.addClass('js-hidden');
        } else {
          $toggle.attr('aria-expanded', true);
          $targets.removeClass('js-hidden');
        }

        event.preventDefault();
      }

      function getTargetElements($toggle) {
        var ids = $toggle.attr('aria-controls').split(' '),
            selector = '#' + ids.join(', #');

        return $el.find(selector);
      }
    };
  };

})(window.GOVUK.Modules);
