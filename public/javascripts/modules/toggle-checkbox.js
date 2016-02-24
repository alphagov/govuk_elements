(function(Modules) {
  "use strict";

  Modules.CheckboxToggle = function() {
    this.start = function(element) {
      var $checkboxes = element.find('input[type="checkbox"][data-target]');

      $checkboxes.each(function() {
        var $checkbox = $(this),
            target = $checkbox.data('target'),
            $target = $('#' + target);

        $checkbox.attr('aria-controls', target);
        toggle();
        $checkbox.on('click', toggle);

        function toggle() {
          var state = $checkbox.is(':checked');
          $target.toggle(state);
          setAriaAttr(state)
        }

        function setAriaAttr(state) {
          $checkbox.attr('aria-expanded', state);
          $target.attr('aria-hidden', !state);
        }
      });
    };
  };

})(window.GOVUK.Modules);
