// Taken from https://github.com/alphagov/service-manual-frontend/blob/master/app/assets/javascripts/govuk/current_location.js

(function(root) {
  "use strict";
  root.GOVUK = root.GOVUK || {};

  root.GOVUK.getCurrentLocation = function(){
    return root.location;
  };
}(window));