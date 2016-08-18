(function(Modules) {
  "use strict";

  Modules.RadioToggle = function() {
    this.start = function(element) {
      var $radios = element.find('input[type="radio"]').parent('[data-target]'),
          radioGroups = {};

      $radios.each(function() {
        var $radio = $(this),
            target = $radio.data('target'),
            $target = $('#' + target);

        radioGroups[$radio.attr('name')] = true;

        $radio.attr('aria-controls', target);
        $radio.on('radioValueChanged', toggle);

        function toggle() {
          var state = $radio.is(':checked');
          target.toggleClass('js-hidden');
          setAriaAttr(state);
        }

        function setAriaAttr(state) {
          $radio.attr('aria-expanded', state);
          $target.attr('aria-hidden', !state);
        }
      });

      listenToChangesOnRadioGroups();
      triggerToggles();

      function listenToChangesOnRadioGroups() {
        $.map(radioGroups, function(v, radioGroupName) {
          element.on('change', 'input[type="radio"][name="'+radioGroupName+'"]', triggerToggles);
        });
      }

      function triggerToggles() {
        $radios.trigger('radioValueChanged');
      }
    };
  };

})(window.GOVUK.Modules);
