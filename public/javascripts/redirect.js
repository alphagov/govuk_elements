;(function (global) {
  'use strict'

  var GOVUK = global.GOVUK || {}

  var FragmentRedirect = function (newRoutes) {
    this.baseURL = window.location.protocol + '//' + window.location.host
    this.newRoutes = newRoutes
  }

  FragmentRedirect.prototype = {
    getNewRouteFor: function (fragment) {
      var route = false

      if (typeof this.newRoutes[fragment] !== 'undefined') {
        route = this.baseURL + this.newRoutes[fragment]
      }

      return route
    },
    init: function () {
      var newRoute = this.getNewRouteFor(window.location.hash)

      if (newRoute) {
        window.location.href = newRoute
      }
    }
  }

  GOVUK.FragmentRedirect = FragmentRedirect

  global.GOVUK = GOVUK
})(window)
