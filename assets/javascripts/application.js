/* global $ */
/* global jQuery */
/* global GOVUK */

$(document).ready(function () {
  // Turn off jQuery animation
  jQuery.fx.off = true

  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()

  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js
})

$(window).load(function () {
  // Only set focus for the error example pages
  if ($('.js-error-example').length) {
    // If there is an error summary, set focus to the summary
    if ($('.error-summary').length) {
      $('.error-summary').focus()
      $('.error-summary a').click(function (e) {
        e.preventDefault()
        var href = $(this).attr('href')
        $(href).focus()
      })
    } else {
      // Otherwise, set focus to the field with the error
      $('.error input:first').focus()
    }
  }
})

!function (i) {
  "use strict";
  var r = i.jQuery, s = i.GOVUK || {}, a = {
    _hasScrolled: !1,
    _scrollTimeout: !1,
    _hasResized: !1,
    _resizeTimeout: !1,
    getWindowDimensions: function () {
      return {height: r(i).height(), width: r(i).width()}
    },
    getWindowPositions: function () {
      return {scrollTop: r(i).scrollTop()}
    },
    getElementOffset: function (t) {
      return t.offset()
    },
    init: function () {
      var t = r(".js-stick-at-top-when-scrolling");
      0 < t.length && (a.$els = t, !1 === a._scrollTimeout && (r(i).scroll(a.onScroll), a._scrollTimeout = i.setInterval(a.checkScroll, 50)), !1 === a._resizeTimeout && (r(i).resize(a.onResize), a._resizeTimeout = i.setInterval(a.checkResize, 50))), s.stopScrollingAtFooter && t.each(function (t, e) {
        var n = r(e).find("img");
        if (0 < n.length) {
          var o = new i.Image;
          o.onload = function () {
            s.stopScrollingAtFooter.addEl(r(e), r(e).outerHeight())
          }, o.src = n.attr("src")
        } else s.stopScrollingAtFooter.addEl(r(e), r(e).outerHeight())
      })
    },
    onScroll: function () {
      a._hasScrolled = !0
    },
    onResize: function () {
      a._hasResized = !0
    },
    checkScroll: function () {
      if (!0 === a._hasScrolled) {
        a._hasScrolled = !1;
        var i = a.getWindowPositions().scrollTop, s = a.getWindowDimensions();
        a.$els.each(function (t, e) {
          var n = r(e), o = n.data("scrolled-from");
          o && i < o ? a.release(n) : 768 < s.width && i >= a.getElementOffset(n).top && a.stick(n)
        })
      }
    },
    checkResize: function () {
      if (!0 === a._hasResized) {
        a._hasResized = !1;
        var s = a.getWindowDimensions();
        a.$els.each(function (t, e) {
          var n = r(e);
          if (n.hasClass("js-sticky-resize")) {
            var o = r(".shim"), i = n.parent("div").width();
            o.css("width", i), n.css("width", i)
          }
          s.width <= 768 && a.release(n)
        })
      }
    },
    stick: function (t) {
      if (!t.hasClass("content-fixed")) {
        t.data("scrolled-from", a.getElementOffset(t).top);
        var e = Math.max(t.height(), 1), n = t.width();
        t.before('<div class="shim" style="width: ' + n + "px; height: " + e + 'px">&nbsp;</div>'), t.css("width", n + "px").addClass("content-fixed")
      }
    },
    release: function (t) {
      t.hasClass("content-fixed") && (t.data("scrolled-from", !1), t.removeClass("content-fixed").css("width", ""), t.siblings(".shim").remove())
    }
  };
  s.stickAtTopWhenScrolling = a, i.GOVUK = s
}(window), function (r) {
  "use strict";
  var a = r.jQuery, t = r.GOVUK || {}, c = {
    _pollingId: null, _isPolling: !1, _hasScrollEvt: !1, _els: [], addEl: function (t, e) {
      var n;
      if (t.length) {
        n = parseInt(t.css("top"), 10), n = isNaN(n) ? 0 : n, c.updateFooterTop(), a(r).on("govuk.pageSizeChanged", c.updateFooterTop);
        var o = a("<div></div>");
        o.insertBefore(t);
        var i = o.offset().top - o.position().top;
        o.remove();
        var s = {$fixedEl: t, height: e + n, fixedTop: e + i, state: "fixed"};
        c._els.push(s), c.initTimeout()
      }
    }, updateFooterTop: function () {
      var t = a(".js-footer:eq(0)");
      if (0 === t.length) return 0;
      c.footerTop = t.offset().top - 10
    }, initTimeout: function () {
      !1 === c._hasScrollEvt && (a(window).scroll(c.onScroll), c._hasScrollEvt = !0)
    }, onScroll: function () {
      !1 === c._isPolling && c.startPolling()
    }, startPolling: window.requestAnimationFrame ? function () {
      var t = function () {
        c.checkScroll(), !0 === c._isPolling && c.startPolling()
      };
      c._pollingId = window.requestAnimationFrame(t), c._isPolling = !0
    } : function () {
      c._pollingId = window.setInterval(c.checkScroll, 16), c._isPolling = !0
    }, stopPolling: window.requestAnimationFrame ? function () {
      window.cancelAnimationFrame(c._pollingId), c._isPolling = !1
    } : function () {
      window.clearInterval(c._pollingId), c._isPolling = !1
    }, checkScroll: function () {
      var n = a(window).scrollTop();
      n < c.cachedScrollTop + 2 && n > c.cachedScrollTop - 2 ? c.stopPolling() : (c.cachedScrollTop = n, a.each(c._els, function (t, e) {
        n + e.height > c.footerTop ? c.stick(e) : c.unstick(e)
      }))
    }, stick: function (t) {
      "fixed" === t.state && "fixed" === t.$fixedEl.css("position") && (t.$fixedEl.css({
        position: "absolute",
        top: c.footerTop - t.fixedTop
      }), t.state = "absolute")
    }, unstick: function (t) {
      "absolute" === t.state && (t.$fixedEl.css({position: "", top: ""}), t.state = "fixed")
    }
  };
  t.stopScrollingAtFooter = c, a(r).load(function () {
    a(r).trigger("govuk.pageSizeChanged")
  }), r.GOVUK = t
}(window), function (t) {
  "use strict";
  t.GOVUK = t.GOVUK || {}, t.GOVUK.getCurrentLocation = function () {
    return t.location
  }
}(window), window.GOVUK.Modules = window.GOVUK.Modules || {}, function () {
  "use strict";
  window.GOVUK.Modules.AccordionWithDescriptions = function () {
    function F(t) {
      var e = this;
      this.$subsectionContent = t.find(".js-subsection-content"), this.$subsectionButton = t.find(".js-subsection-button"), this.title = e.$subsectionButton.text(), this.toggle = function () {
        e.isClosed() ? e.open() : e.close()
      }, this.open = function () {
        e.$subsectionContent.removeClass("js-hidden"), t.removeClass("subsection"), t.addClass("subsection--is-open"), e.$subsectionButton.attr("aria-expanded", "true")
      }, this.close = function () {
        e.$subsectionContent.addClass("js-hidden"), t.removeClass("subsection--is-open"), t.addClass("subsection"), e.$subsectionButton.attr("aria-expanded", "false")
      }, this.isClosed = function () {
        return e.$subsectionContent.hasClass("js-hidden")
      }
    }

    function _(t, e) {
      var n = this;
      this.$target = $(e.target), this.track = function () {
        I("pageElementInteraction", n._trackingAction(), {label: n._trackingLabel()})
      }, this._trackingAction = function () {
        return t.isClosed() ? "accordionClosed" : "accordionOpened"
      }, this._trackingLabel = function () {
        return n._clickedOnIcon() ? t.title + " - " + n._iconType() + " Click" : n._clickedOnHeading() ? t.title + " - Heading Click" : t.title + " - Click Elsewhere"
      }, this._clickedOnIcon = function () {
        return n.$target.hasClass("subsection__icon")
      }, this._clickedOnHeading = function () {
        return n.$target.hasClass("js-subsection-button")
      }, this._iconType = function () {
        return t.isClosed() ? "Minus" : "Plus"
      }
    }

    function I(t, e, n) {
      GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(t, e, n)
    }

    this.start = function (n) {
      function e() {
        return $("h1").text()
      }

      function o(t) {
        return t.replace(/\s+/g, "_")
      }

      function t() {
        var t = e();
        return "GOVUK_service_manual_" + (t = (t = o(t)).toLowerCase()) + "_"
      }

      function i() {
        n.prepend('<div class="subsection-controls js-subsection-controls"><button aria-expanded="false">Otvoriť všetko </button></div>')
      }

      function s() {
        n.find(".subsection__title").each(function (t) {
          $(this).wrapInner('<button class="subsection__button js-subsection-button" aria-expanded="false" aria-controls="subsection_content_' + t + '"></button>')
        })
      }

      function r() {
        k.append('<span class="subsection__icon"></span>')
      }

      function a() {
        for (var t = "", e = 0; e < w; e++) t += "subsection_content_" + e + " ";
        (v = n.find(".js-subsection-controls button")).attr("aria-controls", t)
      }

      function c() {
        $.each(n.find(".js-subsection"), function () {
          new F($(this)).close()
        })
      }

      function u() {
        var t, e = l();
        e.length && ((t = n.find(e).parents(".js-subsection")).length && new F(t).open())
      }

      function l() {
        return GOVUK.getCurrentLocation().hash
      }

      function d() {
        n.find(".subsection__content").each(function () {
          var t = $(this).attr("id");
          sessionStorage.getItem(C + t) && p(n.find("#" + t))
        }), b()
      }

      function f() {
        n.find(".subsection--is-open").length && n.find(".subsection--is-open").each(function () {
          var t = $(this).find(".subsection__content").attr("id");
          sessionStorage.setItem(C + t, "Opened")
        })
      }

      function h() {
        n.find(".subsection").length && n.find(".subsection").each(function () {
          var t = $(this).find(".subsection__content").attr("id");
          sessionStorage.removeItem(C + t, t)
        })
      }

      function g() {
        n.find(".subsection__header").on("click", function (t) {
          var e = new F($(this).parent(".js-subsection"));
          return e.toggle(), b(), f(), h(), new _(e, t).track(), !1
        })
      }

      function m() {
        (v = n.find(".js-subsection-controls button")).on("click", function () {
          var o = "";
          return "Otvoriť všetko" == v.text() ? (v.text("Zatvoriť všetko"), v.attr("aria-expanded", "true"), o = "open", I("pageElementInteraction", "accordionAllOpened", {label: "Otvoriť všetko"})) : (v.text("Otvoriť všetko"), v.attr("aria-expanded", "false"), o = "close", I("pageElementInteraction", "accordionAllClosed", {label: "Zatvoriť všetko"})), n.find(".js-subsection").each(function () {
            var t = $(this), e = t.find(".js-subsection-button"), n = t.find(".js-subsection-content");
            "open" == o ? (e.attr("aria-expanded", "true"), n.removeClass("js-hidden"), t.removeClass("subsection"), t.addClass("subsection--is-open")) : (e.attr("aria-expanded", "false"), n.addClass("js-hidden"), t.addClass("subsection"), t.removeClass("subsection--is-open"))
          }), f(), h(), !1
        })
      }

      function p(t) {
        new F(t.parent(".js-subsection")).open(), b()
      }

      function b() {
        n.find(".subsection--is-open").length === w ? v.text("Zatvoriť všetko") : v.text("Otvoriť všetko")
      }

      n.addClass("js-accordion-with-descriptions"), n.removeClass("js-hidden");
      var v, k = n.find(".subsection__header"), w = n.find(".subsection__content").length, C = t();
      i(), s(), r(), a(), c(), d(), u(), g(), m()
    }
  }
}(), function (t, e) {
  "use strict";
  var h = e.$, o = h(e);
  t.HighlightActiveSectionHeading = function () {
    var d = this, t = !0, e = !0, n = 50, f = [];
    d.getWindowDimensions = function () {
      return {height: o.height(), width: o.width()}
    }, d.getWindowPositions = function () {
      return {scrollTop: o.scrollTop()}
    }, d.getElementOffset = function (t) {
      return t.offset()
    }, d.start = function (t) {
      o.resize(d.hasResized), o.scroll(d.hasScrolled), setInterval(d.checkResize, n), setInterval(d.checkScroll, n), d.$anchors = t.find(".js-page-contents a"), d.getAnchors(), d.checkResize(), d.checkScroll()
    }, d.hasResized = function () {
      return t = !0
    }, d.hasScrolled = function () {
      return e = !0
    }, d.checkResize = function () {
      t && (e = !(t = !1))
    }, d.checkScroll = function () {
      e && (e = !1, d.getWindowDimensions().width <= 768 ? d.removeActiveItem() : d.updateActiveNavItem())
    }, d.getAnchors = function () {
      h.each(d.$anchors, function () {
        var t = h(this).attr("href");
        f.push(t)
      })
    }, d.getHeadingPosition = function (t) {
      return t.offset()
    }, d.getNextHeadingPosition = function (t) {
      return t.offset()
    }, d.getFooterPosition = function (t) {
      return t.offset()
    }, d.getDistanceBetweenHeadings = function (t, e) {
      return e - t
    }, d.updateActiveNavItem = function () {
      var u = d.getWindowPositions().scrollTop, l = d.getFooterPosition(h("#footer"));
      h.each(d.$anchors, function (t) {
        var e = f[t], n = f[t + 1], o = h(e), i = h(n), s = d.getHeadingPosition(o);
        if (s) {
          if (s = s.top, s -= 53, n) var r = d.getNextHeadingPosition(i).top;
          var a = d.getDistanceBetweenHeadings(s, r);
          if (a) var c = s <= u && u < s + a; else c = s <= u && u < l.top;
          c && d.setActiveItem(e)
        }
      })
    }, d.setActiveItem = function (t) {
      d.$anchors.removeClass("active"), d.$anchors.filter("[href='" + t + "']").addClass("active")
    }, d.removeActiveItem = function () {
      d.$anchors.removeClass("active")
    }
  }
}(window.GOVUK.Modules, window), function () {
  "use strict";

  function t() {
    this.controller = null, this.view = null, this.start = function (t) {
      this.view = new e(t), this.controller = new n(this.view), this.controller.init()
    }
  }

  function e(t) {
    function e(e) {
      return function (t) {
        t.preventDefault(), e()
      }
    }

    var s = this;
    this.$pageIsUsefulButton = t.find(".js-page-is-useful"), this.$pageIsNotUsefulButton = t.find(".js-page-is-not-useful"), this.$somethingIsWrongButton = t.find(".js-something-is-wrong"), this.$feedbackFormContainer = t.find(".js-feedback-form"), this.$feedbackForm = s.$feedbackFormContainer.find("form"), this.$feedbackFormSubmitButton = s.$feedbackFormContainer.find("[type=submit]"), this.$feedbackFormCloseButton = s.$feedbackFormContainer.find(".js-close-feedback-form"), this.$prompt = t.find(".js-prompt"), this.onPageIsUsefulButtonClicked = function (t) {
      s.$pageIsUsefulButton.on("click", e(t))
    }, this.onPageIsNotUsefulButtonClicked = function (t) {
      s.$pageIsNotUsefulButton.on("click", e(t))
    }, this.onSomethingIsWrongButtonClicked = function (t) {
      s.$somethingIsWrongButton.on("click", e(t))
    }, this.onFeedbackFormCloseButtonClicked = function (t) {
      s.$feedbackFormCloseButton.on("click", e(t))
    }, this.onSubmitFeedbackForm = function (t) {
      s.$feedbackForm.on("submit", e(t))
    }, this.showSuccess = function () {
      s.$prompt.html('<span id="feedback-success-message">Thanks for your feedback.</span>'), s.$prompt.hasClass("js-hidden") && s.toggleFeedbackForm(), s.$prompt.attr("aria-labelledby", "feedback-success-message"), s.$prompt.focus()
    }, this.toggleFeedbackForm = function () {
      s.$prompt.toggleClass("js-hidden"), s.$feedbackFormContainer.toggleClass("js-hidden");
      var t = !s.$feedbackFormContainer.hasClass("js-hidden");
      s.updateAriaAttributes(t), t && $(".form-control", s.$feedbackFormContainer).first().focus()
    }, this.updateAriaAttributes = function (t) {
      s.$feedbackFormContainer.attr("aria-hidden", !t), $("[aria-controls=improveThisPageForm]").attr("aria-expanded", t)
    }, this.feedbackFormContainerData = function () {
      return s.$feedbackFormContainer.find("input, textarea").serialize()
    }, this.feedbackFormContainerTrackEventParams = function () {
      return s.getTrackEventParams(s.$feedbackFormContainer)
    }, this.pageIsUsefulTrackEventParams = function () {
      return s.getTrackEventParams(s.$pageIsUsefulButton)
    }, this.pageIsNotUsefulTrackEventParams = function () {
      return s.getTrackEventParams(s.$pageIsNotUsefulButton)
    }, this.somethingIsWrongTrackEventParams = function () {
      return s.getTrackEventParams(s.$somethingIsWrongButton)
    }, this.getTrackEventParams = function (t) {
      return {category: t.data("track-category"), action: t.data("track-action")}
    }, this.renderErrors = function (t) {
      this.clearErrors();
      var i = [];
      $.each(t, function (o, t) {
        $.each(t, function (t, e) {
          var n = o.charAt(0).toUpperCase() + o.slice(1) + " " + e + ".";
          s.addErrorToField(o, n) || i.push(n)
        })
      }), i.length && s.addGenericError('<h1 class="heading-medium error-summary-heading" id="generic-error-message">There is a problem</h1>' + $("<p>").text(i.join(" ")).html()), s.focusFirstError()
    }, this.clearErrors = function () {
      $(".form-group", s.$feedbackFormContainer).removeClass("error"), $(".error-message, .error-summary", s.$feedbackFormContainer).remove(), $("[name]", s.$feedbackFormContainer).attr({
        "aria-describedby": "",
        "aria-invalid": ""
      })
    }, this.focusFirstError = function () {
      $(".error-summary, .form-group.error .form-control", s.$feedbackFormContainer).first().focus()
    }, this.addErrorToField = function (t, e) {
      var n = s.$feedbackFormContainer.find('[name="' + t + '"]'), o = n.parents(".form-group");
      if (!n.length || !o.length) return !1;
      var i = s.generateIdFromError(e);
      return o.addClass("error"), $("label", o).append($("<span />", {
        "class": "error-message",
        text: e,
        id: i
      })), n.attr({"aria-describedby": i, "aria-invalid": "true"}), !0
    }, this.addGenericError = function (t) {
      var e = $("<div/>", {
        "class": "error-summary",
        role: "group",
        "aria-labelledby": "generic-error-message",
        html: t,
        tabindex: -1
      });
      $(".js-errors", s.$feedbackFormContainer).html(e)
    }, this.generateIdFromError = function (t) {
      return "error-" + t.toString().toLowerCase().trim().replace(/&/g, "-and-").replace(/[\s\W-]+/g, "-")
    }, this.disableSubmitFeedbackButton = function () {
      s.$feedbackFormSubmitButton.prop("disabled", !0)
    }, this.enableSubmitFeedbackButton = function () {
      s.$feedbackFormSubmitButton.removeAttr("disabled")
    }
  }

  function n(e) {
    var n = this;
    this.init = function () {
      n.bindPageIsUsefulButton(), n.bindPageIsNotUsefulButton(), n.bindSomethingIsWrongButton(), n.bindSubmitFeedbackButton(), this.bindCloseFeedbackFormButton(), e.updateAriaAttributes(!1)
    }, this.bindPageIsUsefulButton = function () {
      var t = function () {
        n.trackEvent(e.pageIsUsefulTrackEventParams()), e.showSuccess()
      };
      e.onPageIsUsefulButtonClicked(t)
    }, this.bindPageIsNotUsefulButton = function () {
      var t = function () {
        n.trackEvent(e.pageIsNotUsefulTrackEventParams()), e.toggleFeedbackForm()
      };
      e.onPageIsNotUsefulButtonClicked(t)
    }, this.bindSomethingIsWrongButton = function () {
      var t = function () {
        n.trackEvent(e.somethingIsWrongTrackEventParams()), e.toggleFeedbackForm()
      };
      e.onSomethingIsWrongButtonClicked(t)
    }, this.bindCloseFeedbackFormButton = function () {
      var t = function () {
        e.toggleFeedbackForm()
      };
      e.onFeedbackFormCloseButtonClicked(t)
    }, this.bindSubmitFeedbackButton = function () {
      e.onSubmitFeedbackForm(n.handleSubmitFeedback)
    }, this.handleSubmitFeedback = function () {
      $.ajax({
        type: "POST",
        url: "/contact/govuk/page_improvements",
        data: e.feedbackFormContainerData(),
        beforeSend: e.disableSubmitFeedbackButton
      }).done(function () {
        n.trackEvent(e.feedbackFormContainerTrackEventParams()), e.showSuccess()
      }).fail(function (t) {
        e.enableSubmitFeedbackButton(), 422 == t.status ? e.renderErrors(t.responseJSON.errors) : (e.clearErrors(), e.addGenericError(['<h1 class="heading-medium error-summary-heading" id="generic-error-message">', "  Sorry, we\u2019re unable to receive your message right now. ", "</h1>", "<p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/govuk">contact page</a>.</p>'].join("")), e.focusFirstError())
      })
    }, this.trackEvent = function (t) {
      GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(t.category, t.action)
    }
  }

  window.GOVUK.Modules.ImproveThisPage = t
}(), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (t) {
  "use strict";
  window.GOVUK = window.GOVUK || {}, t.Feedback = function () {
    this.start = function (e) {
      function n(t) {
        t.find('input[type="submit"]').prop("disabled", !0)
      }

      function o(t) {
        t.find('input[type="submit"]').removeAttr("disabled")
      }

      function i() {
        f.$forms.attr("aria-hidden", !0), f.$pageIsNotUsefulButton.attr("aria-expanded", !1), f.$somethingIsWrongButton.attr("aria-expanded", !1)
      }

      function t() {
        f.$somethingIsWrongForm.append('<input type="hidden" name="javascript_enabled" value="true"/>'), f.$somethingIsWrongForm.append($('<input type="hidden" name="referrer">').val(document.referrer || "unknown"))
      }

      function s(t) {
        t.attr("aria-expanded", !0), $("#" + t.attr("aria-controls")).attr("aria-hidden", !1)
      }

      function r(t) {
        f.$activeForm = e.find("#" + t), f.$activeForm.toggleClass(h), f.$prompt.toggleClass(h), !f.$activeForm.hasClass(h) ? f.$activeForm.find(".gem-c-input").first().focus() : f.$activeForm = !1
      }

      function a(t) {
        return {category: t.data("track-category"), action: t.data("track-action")}
      }

      function c(t) {
        GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(t.category, t.action)
      }

      function u(t) {
        "undefined" != typeof(t = ['<h2 class="gem-c-feedback__heading">', "  Sorry, we\u2019re unable to receive your message right now. ", "</h2>", "<p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/govuk">contact page</a>.</p>'].join("")).responseJSON && (t = "undefined" == typeof t.responseJSON.message ? t : t.responseJSON.message), f.$activeForm.find(".js-errors").html(t).removeClass(h).focus()
      }

      function l() {
        f.$promptQuestions.addClass(h), f.$promptSuccessMessage.removeClass(h).focus()
      }

      function d() {
        f.$prompt.removeClass(h), f.$prompt.focus()
      }

      this.$prompt = e.find(".js-prompt"), this.$fields = e.find(".gem-c-feedback__form-field"), this.$forms = e.find(".js-feedback-form"), this.$toggleForms = e.find(".js-toggle-form"), this.$closeForms = e.find(".js-close-form"), this.$activeForm = !1, this.$pageIsUsefulButton = e.find(".js-page-is-useful"), this.$pageIsNotUsefulButton = e.find(".js-page-is-not-useful"), this.$somethingIsWrongButton = e.find(".js-something-is-wrong"), this.$promptQuestions = e.find(".js-prompt-questions"), this.$promptSuccessMessage = e.find(".js-prompt-success"), this.$somethingIsWrongForm = e.find("#something-is-wrong");
      var f = this, h = "js-hidden";
      i(), t(), this.$toggleForms.on("click", function (t) {
        t.preventDefault(), r($(t.target).attr("aria-controls")), c(a($(this))), s($(this))
      }), this.$closeForms.on("click", function (t) {
        t.preventDefault(), r($(t.target).attr("aria-controls")), c(a($(this))), i(), d()
      }), this.$pageIsUsefulButton.on("click", function (t) {
        t.preventDefault(), c(a(f.$pageIsUsefulButton)), l(), d()
      }), e.find("form").on("submit", function (t) {
        t.preventDefault();
        var e = $(this);
        $.ajax({
          type: "POST",
          url: e.attr("action"),
          dataType: "json",
          data: e.serialize(),
          beforeSend: n(e),
          timeout: 6e3
        }).done(function (t) {
          c(a(e)), l(t.message), d(), i(), f.$activeForm.toggleClass(h)
        }).fail(function (t) {
          u(t), o(e)
        })
      })
    }
  }
}(window.GOVUK.Modules), window.GOVUK.stickAtTopWhenScrolling.init(), window.GOVUK.stopScrollingAtFooter.addEl($(".js-stick-at-top-when-scrolling"));


function govspeakBarcharts() {
  $(".govuk-govspeak .js-barchart-table").each(function () {
    $.magnaCharta($(this), {toggleText: "Change between chart and table"})
  })
}

!function (t) {
  var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d = function (t) {
    t = t.replace(/\x0d\x0a/g, "\n");
    for (var e = "", i = 0; i < t.length; i++) {
      var n = t.charCodeAt(i);
      n < 128 ? e += String.fromCharCode(n) : (127 < n && n < 2048 ? e += String.fromCharCode(n >> 6 | 192) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128)), e += String.fromCharCode(63 & n | 128))
    }
    return e
  }, c = function (t) {
    for (var e = "", i = 0, n = c1 = c2 = 0; i < t.length;) (n = t.charCodeAt(i)) < 128 ? (e += String.fromCharCode(n), i++) : 191 < n && n < 224 ? (c2 = t.charCodeAt(i + 1), e += String.fromCharCode((31 & n) << 6 | 63 & c2), i += 2) : (c2 = t.charCodeAt(i + 1), c3 = t.charCodeAt(i + 2), e += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3), i += 3);
    return e
  };
  t.extend({
    base64Encode: function (t) {
      var e, i, n, a, o, s, r, l = "", c = 0;
      for (t = d(t); c < t.length;) a = (e = t.charCodeAt(c++)) >> 2, o = (3 & e) << 4 | (i = t.charCodeAt(c++)) >> 4, s = (15 & i) << 2 | (n = t.charCodeAt(c++)) >> 6, r = 63 & n, isNaN(i) ? s = r = 64 : isNaN(n) && (r = 64), l = l + u.charAt(a) + u.charAt(o) + u.charAt(s) + u.charAt(r);
      return l
    }, base64Decode: function (t) {
      var e, i, n, a, o, s, r = "", l = 0;
      for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < t.length;) e = u.indexOf(t.charAt(l++)) << 2 | (a = u.indexOf(t.charAt(l++))) >> 4, i = (15 & a) << 4 | (o = u.indexOf(t.charAt(l++))) >> 2, n = (3 & o) << 6 | (s = u.indexOf(t.charAt(l++))), r += String.fromCharCode(e), 64 != o && (r += String.fromCharCode(i)), 64 != s && (r += String.fromCharCode(n));
      return r = c(r)
    }
  })
}(jQuery), Function.prototype.bind || (Function.prototype.bind = function (t) {
  if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  var e = Array.prototype.slice.call(arguments, 1), i = this, n = function () {
  }, a = function () {
    return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
  };
  return n.prototype = this.prototype, a.prototype = new n, a
}), function (r) {
  "use strict";

  function o() {
    "function" == typeof r.ga && r.ga.apply(r, arguments)
  }

  var s = r.jQuery, t = r.GOVUK || {}, e = function (t, e) {
    function i() {
      o("create", t, e)
    }

    function n() {
      o("set", "anonymizeIp", !0)
    }

    function a() {
      o("set", "displayFeaturesTask", null)
    }

    "string" == typeof e && (e = {cookieDomain: e}), i(), n(), a()
  };
  e.load = function () {
    var t, e, i, n, a, o, s;
    t = r, e = document, i = "script", n = "https://www.google-analytics.com/analytics.js", a = "ga", t.GoogleAnalyticsObject = a, t[a] = t[a] || function () {
      (t[a].q = t[a].q || []).push(arguments)
    }, t[a].l = 1 * new Date, o = e.createElement(i), s = e.getElementsByTagName(i)[0], o.async = 1, o.src = n, s.parentNode.insertBefore(o, s)
  }, e.prototype.trackPageview = function (t, e, i) {
    var n;
    "string" == typeof t && (n = {page: t}), "string" == typeof e && ((n = n || {}).title = e), "object" == typeof i && (n = s.extend(n || {}, i)), s.isEmptyObject(n) ? o("send", "pageview") : o("send", "pageview", n)
  }, e.prototype.trackEvent = function (t, e, i) {
    var n, a = {hitType: "event", eventCategory: t, eventAction: e};
    "string" == typeof(i = i || {}).label && (a.eventLabel = i.label, delete i.label), (i.value || 0 === i.value) && ("number" != typeof(n = parseInt(i.value, 10)) || isNaN(n) || (i.eventValue = n), delete i.value), i.nonInteraction && (i.nonInteraction = 1), "object" == typeof i && s.extend(a, i), o("send", a)
  }, e.prototype.trackSocial = function (t, e, i, n) {
    var a = {hitType: "social", socialNetwork: t, socialAction: e, socialTarget: i};
    s.extend(a, n), o("send", a)
  }, e.prototype.addLinkedTrackerDomain = function (t, e, i) {
    o("create", t, "auto", {name: e}), o("require", "linker"), o(e + ".require", "linker"), o("linker:autoLink", [i]), o(e + ".linker:autoLink", [i]), o(e + ".set", "anonymizeIp", !0), o(e + ".set", "displayFeaturesTask", null), o(e + ".send", "pageview")
  }, e.prototype.setDimension = function (t, e) {
    o("set", "dimension" + t, String(e))
  }, t.GoogleAnalyticsUniversalTracker = e, r.GOVUK = t
}(window), function (o) {
  "use strict";
  var s = o.jQuery, t = o.GOVUK || {}, e = function (t) {
    this.gifUrl = t, this.dimensions = []
  };
  e.load = function () {
  }, e.prototype.trackPageview = function (t, e, i) {
    var n;
    "string" == typeof t && (n = {page: t}), "string" == typeof e && ((n = n || {}).title = e), "object" == typeof i && (n = s.extend(n || {}, i)), s.isEmptyObject(n) ? this.sendToTracker("pageview") : this.sendToTracker("pageview", n)
  }, e.prototype.trackEvent = function (t, e, i) {
    var n = {eventCategory: t, eventAction: e};
    (i = i || {}).label && (n.eventLabel = i.label, delete i.label), i.value && (n.eventValue = i.value.toString(), delete i.value), "object" == typeof i && s.extend(n, i), this.sendToTracker("event", n)
  }, e.prototype.trackSocial = function (t, e, i, n) {
    var a = {socialNetwork: t, socialAction: e, socialTarget: i};
    s.extend(a, n), this.sendToTracker("social", a)
  }, e.prototype.addLinkedTrackerDomain = function () {
  }, e.prototype.setDimension = function (t, e) {
    this.dimensions["dimension" + t] = e
  }, e.prototype.payloadParams = function (t, e) {
    var i = s.extend({}, e, this.dimensions, {
      eventType: t,
      referrer: o.document.referrer,
      gaClientId: this.gaClientId,
      windowWidth: o.innerWidth,
      windowHeight: o.innerHeight,
      screenWidth: o.screen.width,
      screenHeight: o.screen.height,
      colorDepth: o.screen.colorDepth
    });
    if (o.performance) for (var n in i.navigationType = o.performance.navigation.type.toString(), i.redirectCount = o.performance.navigation.redirectCount.toString(), o.performance.timing) {
      var a = o.performance.timing[n];
      "string" != typeof a && "number" != typeof a || (i["timing_" + n] = a.toString())
    }
    return i
  }, e.prototype.sendData = function (t) {
    var e = this.gifUrl + "?" + s.param(t);
    s.get(e)
  }, e.prototype.sendToTracker = function (e, i) {
    s(o.document).ready(function () {
      o.ga ? o.ga(function (t) {
        this.gaClientId = t.get("clientId"), this.sendData(this.payloadParams(e, i))
      }.bind(this)) : this.sendData(this.payloadParams(e, i))
    }.bind(this))
  }, t.GOVUKTracker = e, o.GOVUK = t
}(window), function (i) {
  "use strict";
  var n = i.GOVUK || {}, a = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g,
    o = /[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9][ABD-HJLNPQ-Z]{2}/gi, s = function (t) {
      if (this.stripPostcodePII = !1, "undefined" != typeof t.stripPostcodePII && (this.stripPostcodePII = !0 === t.stripPostcodePII, delete t.stripPostcodePII), this.trackers = [], "undefined" != typeof t.universalId) {
        var e = t.universalId;
        delete t.universalId, this.trackers.push(new n.GoogleAnalyticsUniversalTracker(e, t))
      }
      if ("undefined" != typeof t.govukTrackerUrl) {
        var i = t.govukTrackerUrl;
        delete t.govukTrackerUrl, this.trackers.push(new n.GOVUKTracker(i))
      }
    }, t = function (t) {
      this.value = t
    };
  s.PIISafe = t, s.prototype.stripPII = function (t) {
    return "string" == typeof t ? this.stripPIIFromString(t) : "[object Array]" === Object.prototype.toString.call(t) || "[object Arguments]" === Object.prototype.toString.call(t) ? this.stripPIIFromArray(t) : "object" == typeof t ? this.stripPIIFromObject(t) : t
  }, s.prototype.stripPIIFromString = function (t) {
    var e = t.replace(a, "[email]");
    return !0 === this.stripPostcodePII ? e.replace(o, "[postcode]") : e
  }, s.prototype.stripPIIFromObject = function (t) {
    if (t instanceof s.PIISafe) return t.value;
    for (var e in t) {
      var i = t[e];
      t[e] = this.stripPII(i)
    }
    return t
  }, s.prototype.stripPIIFromArray = function (t) {
    for (var e = 0, i = t.length; e < i; e++) {
      var n = t[e];
      t[e] = this.stripPII(n)
    }
    return t
  }, s.prototype.sendToTrackers = function (t, e) {
    for (var i = 0, n = this.trackers.length; i < n; i++) {
      var a = this.trackers[i], o = a[t];
      "function" == typeof o && o.apply(a, e)
    }
  }, s.load = function () {
    n.GoogleAnalyticsUniversalTracker.load(), n.GOVUKTracker.load()
  }, s.prototype.defaultPathForTrackPageview = function (t) {
    return this.stripPIIFromString(t.href.substring(t.origin.length).split("#")[0])
  }, s.prototype.trackPageview = function (t) {
    arguments[0] = t || this.defaultPathForTrackPageview(window.location), 0 === arguments.length && (arguments.length = 1), this.sendToTrackers("trackPageview", this.stripPII(arguments))
  }, s.prototype.trackEvent = function () {
    this.sendToTrackers("trackEvent", this.stripPII(arguments))
  }, s.prototype.trackShare = function (t, e) {
    this.sendToTrackers("trackSocial", this.stripPII([t, "share", i.location.pathname, e]))
  }, s.prototype.setDimension = function () {
    this.sendToTrackers("setDimension", this.stripPII(arguments))
  }, s.prototype.addLinkedTrackerDomain = function () {
    this.sendToTrackers("addLinkedTrackerDomain", arguments)
  }, n.Analytics = s, i.GOVUK = n
}(window), function (n) {
  "use strict";
  var a = n.GOVUK || {};
  a.analyticsPlugins = a.analyticsPlugins || {}, a.analyticsPlugins.printIntent = function () {
    var e = function () {
      a.analytics.trackEvent("Print Intent", document.location.pathname), a.analytics.trackPageview("/print" + document.location.pathname)
    };
    if (n.matchMedia) {
      var t = n.matchMedia("print"), i = 0;
      t.addListener(function (t) {
        t.matches || 0 !== i || (e(), i++, setTimeout(function () {
          i = 0
        }, 3e3))
      })
    }
    n.onafterprint && (n.onafterprint = e)
  }, n.GOVUK = a
}(window), function (a) {
  "use strict";
  var o = a.GOVUK || {};
  o.analyticsPlugins = o.analyticsPlugins || {}, o.analyticsPlugins.error = function (t) {
    function n(t) {
      return !t || !e || !!e.test(t)
    }

    var e = (t = t || {}).filenameMustMatch, i = function (t) {
      var e = t.filename, i = e + ": " + t.lineno;
      n(e) && o.analytics.trackEvent("JavaScript Error", t.message, {label: i, value: 1, nonInteraction: !0})
    };
    a.addEventListener ? a.addEventListener("error", i, !1) : a.attachEvent ? a.attachEvent("onerror", i) : a.onerror = i
  }, a.GOVUK = o
}(window), function (t) {
  "use strict";
  var s = t.jQuery, r = t.GOVUK || {};
  r.analyticsPlugins = r.analyticsPlugins || {}, r.analyticsPlugins.mailtoLinkTracker = function () {
    function t(t) {
      var e = o(t), i = {transport: "beacon"}, n = e.attr("href"), a = s.trim(e.text());
      a && (i.label = a), r.analytics.trackEvent("Mailto Link Clicked", n, i)
    }

    function o(t) {
      var e = s(t.target);
      return e.is("a") || (e = e.parents("a")), e
    }

    var e = 'a[href^="mailto:"]';
    s("body").on("click", e, t)
  }, t.GOVUK = r
}(window), function (t) {
  "use strict";
  var l = t.jQuery, c = t.GOVUK || {};
  c.analyticsPlugins = c.analyticsPlugins || {}, c.analyticsPlugins.externalLinkTracker = function (t) {
    function e(t) {
      var e = s(t), i = {transport: "beacon"}, n = e.attr("href"), a = l.trim(e.text());
      if (a && (i.label = a), r !== undefined) {
        var o = n;
        c.analytics.setDimension(r, o)
      }
      c.analytics.trackEvent("External Link Clicked", n, i)
    }

    function s(t) {
      var e = l(t.target);
      return e.is("a") || (e = e.parents("a")), e
    }

    var r = (t = t || {}).externalLinkUploadCustomDimension,
      i = 'a[href^="http"]:not(a[href*="' + c.analyticsPlugins.externalLinkTracker.getHostname() + '"])';
    l("body").on("click", i, e)
  }, c.analyticsPlugins.externalLinkTracker.getHostname = function () {
    return t.location.hostname
  }, t.GOVUK = c
}(window), function (t) {
  "use strict";
  var s = t.jQuery, r = t.GOVUK || {};
  r.analyticsPlugins = r.analyticsPlugins || {}, r.analyticsPlugins.downloadLinkTracker = function (t) {
    function e(t) {
      var e = o(t), i = e.attr("href"), n = {transport: "beacon"}, a = s.trim(e.text());
      a && (n.label = a), r.analytics.trackEvent("Download Link Clicked", i, n)
    }

    function o(t) {
      var e = s(t.target);
      return e.is("a") || (e = e.parents("a")), e
    }

    var i = (t = t || {}).selector;
    i && s("body").on("click", i, e)
  }, t.GOVUK = r
}(window), function () {
  "use strict";

  function t() {
    return $('meta[name="govuk:rendering-application"]').attr("content")
  }

  function e() {
    return $('meta[name="govuk:format"]').attr("content")
  }

  function i() {
    return $('meta[name="govuk:navigation-page-type"]').attr("content")
  }

  function n() {
    return "collections" == t() && "taxon" == e() && "grid" == i()
  }

  function a() {
    return "collections" == t() && "taxon" == e() && "accordion" == i()
  }

  function o() {
    return "collections" == t() && "taxon" == e() && "leaf" == i()
  }

  function s() {
    return "collections" == t() && "mainstream_browse_page" == e()
  }

  function r() {
    return "collections" == t() && "topic" == e()
  }

  function l() {
    return "whitehall" == t() && "placeholder_policy_area" == e()
  }

  function c() {
    return "government-frontend" == t() && "document_collection" == e()
  }

  function u() {
    return "finder-frontend" == t() && "finder" == e()
  }

  function d() {
    return "whitehall" == t() && "finder" == e()
  }

  window.GOVUK = window.GOVUK || {};
  var h = function () {
  };
  h.getNumberOfSections = function () {
    switch (!0) {
      case n():
        return 1 + $(".parent-topic-contents").length;
      case a():
        return $('[data-track-count="accordionSection"]').length;
      case c():
        return $(".document-collection .group-title").length;
      case s():
        return $("#subsection ul:visible").length || $("#section ul").length;
      case r():
        return $(".topics-page nav.index-list").length;
      case l():
        return $(".topic section h1.label").length;
      case u():
      case d():
      case o():
        return 1;
      default:
        var t = $('[data-track-count="sidebarRelatedItemSection"]').length,
          e = $('[data-track-count="sidebarTaxonSection"]').length;
        return t || e
    }
  }, h.getNumberOfLinks = function () {
    switch (!0) {
      case n():
        return $('a[data-track-category="navGridLinkClicked"]').length + $('a[data-track-category="navGridLeafLinkClicked"]').length;
      case a():
        return $('a[data-track-category="navAccordionLinkClicked"]').length;
      case o():
        return $('a[data-track-category="navLeafLinkClicked"]').length;
      case c():
        return $(".document-collection .group-document-list li a").length;
      case s():
        return $("#subsection ul a:visible").length || $("#section ul a").length;
      case r():
        return $(".topics-page .index-list ul a").length || $(".topics-page .topics ul a").length;
      case l():
        return $("section.document-block a").length + $("section .collection-list h2 a").length;
      case d():
        return $(".document-list .document-row h3 a").length;
      case u():
        return $(".finder-frontend-content li.document a").length;
      default:
        return $('a[data-track-category="relatedLinkClicked"]').length
    }
  }, GOVUK.PageContent = h
}(), function () {
  "use strict";

  function t() {
    var t = {
      dimension15: window.httpStatusCode || 200,
      dimension16: GOVUK.cookie("TLSversion") || "unknown",
      dimension95: GOVUK.analytics.gaClientId
    };
    return window.devicePixelRatio && (t.dimension11 = window.devicePixelRatio), t
  }

  function e() {
    var i = {
      section: {dimension: 1},
      format: {dimension: 2},
      themes: {dimension: 3, defaultValue: "other"},
      "content-id": {dimension: 4, defaultValue: "00000000-0000-0000-0000-000000000000"},
      "search-result-count": {dimension: 5},
      "publishing-government": {dimension: 6},
      "political-status": {dimension: 7},
      "analytics:organisations": {dimension: 9},
      "analytics:world-locations": {dimension: 10},
      withdrawn: {dimension: 12, defaultValue: "not withdrawn"},
      "schema-name": {dimension: 17},
      "rendering-application": {dimension: 20},
      "navigation-page-type": {dimension: 32, defaultValue: "none"},
      "user-journey-stage": {dimension: 33, defaultValue: "thing"},
      "navigation-document-type": {dimension: 34, defaultValue: "other"},
      "taxon-slug": {dimension: 56, defaultValue: "other"},
      "taxon-id": {dimension: 57, defaultValue: "other"},
      "taxon-slugs": {dimension: 58, defaultValue: "other"},
      "taxon-ids": {dimension: 59, defaultValue: "other"},
      "content-has-history": {dimension: 39, defaultValue: "false"},
      "navigation-legacy": {dimension: 30, defaultValue: "none"},
      stepnavs: {dimension: 96}
    }, t = $('meta[name^="govuk:"]'), n = {}, a = {};
    return t.each(function () {
      var t = $(this), e = t.attr("name").split("govuk:")[1];
      i[e] && (a[e] = t.attr("content"))
    }), $.each(i, function (t, e) {
      var i = a[t] || e.defaultValue;
      void 0 !== i && (n["dimension" + e.dimension] = i)
    }), n
  }

  function n() {
    return {
      dimension26: GOVUK.PageContent.getNumberOfSections(),
      dimension27: GOVUK.PageContent.getNumberOfLinks(),
      dimension23: $('main[id="content"]').attr("lang") || "unknown"
    }
  }

  function a() {
    var t = $('meta[name^="govuk:ab-test"]'), n = {};
    return t.each(function () {
      var t = $(this), e = parseInt(t.data("analytics-dimension")), i = t.attr("content");
      e && (n["dimension" + e] = i)
    }), n
  }

  window.GOVUK = window.GOVUK || {};
  var i = function () {
  };
  i.getAndExtendDefaultTrackingOptions = function (t) {
    var e = this.customDimensions();
    return $.extend(e, t)
  }, i.customDimensions = function () {
    var i = $.extend({}, t(), e(), n(), a());
    return $.each(i, function (t, e) {
      i[t] = new GOVUK.Analytics.PIISafe(String(e))
    })
  }, GOVUK.CustomDimensions = i
}(), function () {
  "use strict";

  function i() {
    try {
      var t = n.prototype.getCookie("analytics_next_page_call");
      return n.prototype.setCookie("analytics_next_page_call", null), t || {}
    } catch (e) {
      return {}
    }
  }

  window.GOVUK = window.GOVUK || {};
  var n = function (t) {
    "undefined" == typeof t.stripPostcodePII && (t.stripPostcodePII = 0 < $('meta[name="govuk:static-analytics:strip-postcodes"]').length), this.analytics = new GOVUK.Analytics(t);
    var e = i();
    ga(function (t) {
      this.gaClientId = t.get("clientId"), $(window).trigger("gaClientSet"), this.trackPageview(null, null, e), GOVUK.analyticsPlugins.error({filenameMustMatch: /gov\.uk/}), GOVUK.analyticsPlugins.printIntent(), GOVUK.analyticsPlugins.mailtoLinkTracker(), GOVUK.analyticsPlugins.externalLinkTracker({externalLinkUploadCustomDimension: 36}), GOVUK.analyticsPlugins.downloadLinkTracker({selector: 'a[href*="/government/uploads"], a[href*="assets.publishing.service.gov.uk"]'})
    }.bind(this))
  };
  n.load = function () {
    GOVUK.Analytics.load()
  }, n.prototype.trackPageview = function (t, e, i) {
    GOVUK.Ecommerce.start();
    var n = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(i);
    this.analytics.trackPageview(t, e, n)
  }, n.prototype.trackEvent = function (t, e, i) {
    var n = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(i);
    this.analytics.trackEvent(t, e, n)
  }, n.prototype.setDimension = function (t, e, i, n) {
    void 0 !== e && this.analytics.setDimension(t, e, i, n)
  }, n.prototype.trackShare = function (t) {
    var e = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions();
    this.analytics.trackShare(t, e)
  }, n.prototype.addLinkedTrackerDomain = function (t, e, i) {
    this.analytics.addLinkedTrackerDomain(t, e, i)
  }, n.prototype.setOptionsForNextPageview = function (t) {
    if ("object" == typeof t) {
      var e = i();
      $.extend(e, t), this.setCookie("analytics_next_page_call", e)
    }
  }, n.prototype.setCookie = function (t, e) {
    GOVUK.cookie && (e ? GOVUK.cookie(t, JSON.stringify(JSON.stringify(e))) : GOVUK.cookie(t, null))
  }, n.prototype.getCookie = function (t) {
    if (GOVUK.cookie) try {
      return JSON.parse(JSON.parse(GOVUK.cookie(t)))
    } catch (e) {
      return null
    }
  }, n.prototype.stripPII = function (t) {
    return this.analytics.stripPII(t)
  }, GOVUK.StaticAnalytics = n
}(), function () {
  "use strict";
  window.GOVUK = window.GOVUK || {};
  var e = function () {
    function r(t, e, i, n) {
      ga("ec:addImpression", {id: t || e, position: i, list: "Site search results", dimension71: n})
    }

    function l(t, e, i, n, a) {
      t.click(function () {
        ga("ec:addProduct", {
          id: e || i,
          position: n,
          dimension71: a
        }), ga("ec:setAction", "click", {list: "Site search results"}), GOVUK.analytics.trackEvent("UX", "click", GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions({label: "Results"}))
      })
    }

    this.init = function (t) {
      var o = GOVUK.analytics.stripPII(t.attr("data-search-query")).substring(0, 100).toLowerCase(),
        e = t.find("[data-ecommerce-row]"), s = parseInt(t.data("ecommerce-start-index"), 10);
      e.each(function (t, e) {
        var i = $(e), n = i.attr("data-ecommerce-content-id"), a = i.attr("data-ecommerce-path");
        r(n, a, t + s, o), l(i, n, a, t + s, o)
      })
    }
  };
  e.ecLoaded = !1, e.start = function (t) {
    0 < (t = t || $("[data-analytics-ecommerce]")).length && (e.ecLoaded || (ga("require", "ec"), e.ecLoaded = !0), (new e).init(t))
  }, GOVUK.Ecommerce = e
}(), function () {
  "use strict";
  GOVUK.StaticAnalytics.load();
  var t = "www.gov.uk" == document.domain ? ".www.gov.uk" : document.domain, e = "UA-26179049-1",
    i = new GOVUK.StaticAnalytics({
      universalId: e,
      cookieDomain: t,
      allowLinker: !0,
      govukTrackerUrl: "https://assets.publishing.service.gov.uk/static/a"
    });
  GOVUK.analytics = i
}(), function () {
  "use strict";

  function o(t) {
    this.config = this.getConfigForCurrentPath(t), this.SCROLL_TIMEOUT_DELAY = 10, this.config ? (this.enabled = !0, this.trackedNodes = this.buildNodes(this.config), $(window).scroll($.proxy(this.onScroll, this)), this.trackVisibleNodes()) : this.enabled = !1
  }

  window.GOVUK = window.GOVUK || {};
  var t = {
    "/guidance/saving-for-retirement-if-youre-aged-16-to-50": [["Heading", "Keep track of your State Pension"], ["Heading", "Consider ways to improve your State Pension"], ["Heading", "Personal and stakeholder pensions"]],
    "/guidance/planning-for-retirement-if-youre-aged-50-or-over": [["Heading", "Find out your State Pension age"], ["Heading", "Consider ways to improve your State Pension"], ["Heading", "Workplace, personal and stakeholder pensions"], ["Heading", "Personal and stakeholder pensions"]],
    "/guidance/retirement-planning-for-current-pensioners": [["Heading", "If you reached State Pension age before 6 April 2016"], ["Heading", "Other ways to increase your income in retirement"], ["Heading", "Further support in retirement"], ["Heading", "Winter Fuel Payments"]],
    "/government/collections/disability-confident-campaign": [["Heading", "Become a Disability Confident employer"], ["Heading", "Aims and objectives"], ["Heading", "Inclusive communication"]],
    "/government/publications/the-essential-trustee-what-you-need-to-know-cc3/the-essential-trustee-what-you-need-to-know-what-you-need-to-do": [["Heading", "1. About this guidance"], ["Heading", "2. Trustees\u2019 duties at a glance"], ["Heading", "3. Who can be a trustee and how trustees are appointed"], ["Heading", "4. Ensure your charity is carrying out its purposes for the public benefit"], ["Heading", "5. Comply with your charity\u2019s governing document and the law"], ["Heading", "6. Act in your charity\u2019s best interests"], ["Heading", "7. Manage your charity\u2019s resources responsibly"], ["Heading", "8. Act with reasonable care and skill"], ["Heading", "9. Ensure your charity is accountable"], ["Heading", "10. Reduce the risk of liability"], ["Heading", "11. Your charity\u2019s legal structure and what it means"], ["Heading", "12. Charity officers - the chair and treasurer"], ["Heading", "13. Technical terms used in this guidance"]],
    "/guidance/universal-credit-how-it-helps-you-into-work": [["Heading", "Support from your work coach"], ["Heading", "Help available for parents"], ["Heading", "When you can claim Universal Credit"], ["Heading", "More detailed advice"]],
    "/openingupwork": [["Heading", "How Universal Credit makes work pay"], ["Heading", "When you can claim Universal Credit"], ["Heading", "Help and advice"]],
    "/government/publications/spring-budget-2017-documents/spring-budget-2017": [["Heading", "1. Executive summary"], ["Heading", "2. Economic context and public finances"], ["Heading", "3. Policy decisions"], ["Heading", "4. Tax"], ["Heading", "5. Productivity"], ["Heading", "6. Public services and markets"], ["Heading", "7. Annex A: Financing"], ["Heading", "8. Annex B: Office for Budget Responsibility's Economic and fiscal outlook"]]
  };
  o.prototype.getConfigForCurrentPath = function (t) {
    for (var e in t) if (this.normalisePath(window.location.pathname) == this.normalisePath(e)) return t[e]
  }, o.prototype.buildNodes = function (t) {
    for (var e, i, n = [], a = 0; a < t.length; a++) e = o[t[a][0] + "Node"], i = t[a][1], n.push(new e(i));
    return n
  }, o.prototype.normalisePath = function (t) {
    return t.split("/").join("")
  }, o.prototype.onScroll = function () {
    clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout($.proxy(this.trackVisibleNodes, this), this.SCROLL_TIMEOUT_DELAY)
  }, o.prototype.trackVisibleNodes = function () {
    for (var t = 0; t < this.trackedNodes.length; t++) if (this.trackedNodes[t].isVisible() && !this.trackedNodes[t].alreadySeen) {
      this.trackedNodes[t].alreadySeen = !0;
      var e = this.trackedNodes[t].eventData.action, i = this.trackedNodes[t].eventData.label;
      GOVUK.analytics.trackEvent("ScrollTo", e, {label: i, nonInteraction: !0})
    }
  }, o.HeadingNode = function (t) {
    function e(t) {
      for (var e = $("h1, h2, h3, h4, h5, h6"), i = 0; i < e.length; i++) if ($.trim(e.eq(i).text()).replace(/\s/g, " ") == t) return e.eq(i)
    }

    this.$element = e(t), this.eventData = {action: "Heading", label: t}
  }, o.HeadingNode.prototype.isVisible = function () {
    return !!this.$element && this.elementIsVisible(this.$element)
  }, o.HeadingNode.prototype.elementIsVisible = function (t) {
    var e = $(window), i = t.offset().top;
    return i > e.scrollTop() && i < e.scrollTop() + e.height()
  }, $().ready(function () {
    window.GOVUK.scrollTracker = new o(t)
  }), window.GOVUK.ScrollTracker = o
}(), function (t) {
  "use strict";
  var u = t.jQuery, d = t.GOVUK || {};
  d.Modules = d.Modules || {}, d.modules = {
    find: function (t) {
      var e, i = "[data-module]";
      return e = (t = t || u("body")).find(i), t.is(i) && (e = e.add(t)), e
    }, start: function (t) {
      function e(t) {
        return n(i(t))
      }

      function i(t) {
        return t.replace(/-([a-z])/g, function (t) {
          return t.charAt(1).toUpperCase()
        })
      }

      function n(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
      }

      for (var a = this.find(t), o = 0, s = a.length; o < s; o++) {
        var r = u(a[o]), l = e(r.data("module")), c = r.data("module-started");
        "function" != typeof d.Modules[l] || c || ((new d.Modules[l]).start(r), r.data("module-started", !0))
      }
    }
  }, t.GOVUK = d
}(window), function (t, e) {
  "use strict";
  var b = (0, e.$)(e);
  t.StickyElementContainer = function () {
    var w = this;
    w._getWindowDimensions = function () {
      return {height: b.height(), width: b.width()}
    }, w._getWindowPositions = function () {
      return {scrollTop: b.scrollTop()}
    }, w.start = function (e) {
      function t() {
        b.resize(i), b.scroll(n), setInterval(a, v), setInterval(o, v), a(), o(), f.addClass("govuk-sticky-element--enabled")
      }

      function i() {
        g = !0
      }

      function n() {
        m = !0
      }

      function a() {
        if (g) {
          m = !(g = !1);
          var t = w._getWindowDimensions();
          h = e.offset().top, p = e.offset().top + e.height() - t.height
        }
      }

      function o() {
        m && (m = !1, y = w._getWindowPositions().scrollTop, s(), r())
      }

      function s() {
        h < y ? u() : d()
      }

      function r() {
        p < y ? c() : l()
      }

      function l() {
        f.addClass("govuk-sticky-element--stuck-to-window")
      }

      function c() {
        f.removeClass("govuk-sticky-element--stuck-to-window")
      }

      function u() {
        f.removeClass("govuk-sticky-element--hidden")
      }

      function d() {
        f.addClass("govuk-sticky-element--hidden")
      }

      var h, p, f = e.find("[data-sticky-element]"), g = !0, m = !0, v = 50, y = 1;
      t()
    }
  }
}(window.GOVUK.Modules, window), function () {
  "use strict";
  window.GOVUK.Modules.Toggle = function () {
    this.start = function (i) {
      function t() {
        var t = $(this);
        t.attr("role", "button"), t.attr("aria-controls", t.data("controls")), t.attr("aria-expanded", t.data("expanded"));
        var e = n(t);
        e.attr("aria-live", "polite"), e.attr("role", "region"), t.data("$targets", e)
      }

      function e(t) {
        var e = $(t.target), i = "true" === e.attr("aria-expanded"), n = e.data("$targets");
        i ? (e.attr("aria-expanded", !1), n.addClass("js-hidden")) : (e.attr("aria-expanded", !0), n.removeClass("js-hidden"));
        var a = e.data("toggled-text");
        "string" == typeof a && (e.data("toggled-text", e.text()), e.text(a)), t.preventDefault()
      }

      function n(t) {
        var e = "#" + t.attr("aria-controls").split(" ").join(", #");
        return i.find(e)
      }

      var a = "[data-controls][data-expanded]";
      i.on("click", a, e), i.find(a).each(t)
    }
  }
}(), function () {
  "use strict";
  window.GOVUK.Modules.ToggleInputClassOnFocus = function () {
    this.start = function (t) {
      function e() {
        return "" === a.val()
      }

      function i() {
        a.addClass("focus")
      }

      function n() {
        e() && a.removeClass("focus")
      }

      var a = t.find(".js-class-toggle");
      e() || i(), a.on("focus", i), a.on("blur", n)
    }
  }
}(), window.GOVUK.Modules = window.GOVUK.Modules || {}, function () {
  "use strict";
  window.GOVUK.Modules.TrackClick = function () {
    this.start = function (t) {
      function e(t) {
        var e = $(t.target), i = {transport: "beacon"};
        e.is(u) || (e = e.parents(u));
        var n = e.attr("data-track-category"), a = e.attr("data-track-action"), o = e.attr("data-track-label"),
          s = e.attr("data-track-value"), r = e.attr("data-track-dimension"),
          l = e.attr("data-track-dimension-index"), c = e.attr("data-track-options");
        o && (i.label = o), s && (i.value = s), r && l && (i["dimension" + l] = r), c && $.extend(i, JSON.parse(c)), GOVUK.analytics && GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent(n, a, i)
      }

      var u = "[data-track-category][data-track-action]";
      t.is(u) ? t.on("click", e) : t.on("click", u, e)
    }
  }
}(), window.GOVUK.Modules = window.GOVUK.Modules || {}, function (t) {
  "use strict";
  var n = window.$;
  t.CrossDomainTracking = function () {
    function i(t) {
      var e = t.attr("data-tracking-code"), i = t.attr("data-tracking-name"), n = t.prop("hostname");
      "undefined" !== GOVUK.analytics && GOVUK.analytics.addLinkedTrackerDomain(e, i, n)
    }

    this.start = function (t) {
      var e = "[href][data-tracking-code][data-tracking-name]";
      t.is(e) ? i(t) : t.find(e).each(function () {
        i(n(this))
      })
    }
  }
}(window.GOVUK.Modules), $(document).ready(function () {
  GOVUK.modules.start()
}), $(document).ready(function () {
  $(".print-link a").attr("target", "_blank");
  var t = $(".js-search-focus");
  if (t.each(function (t, e) {
    "" !== $(e).val() && $(e).addClass("focus")
  }), t.on("focus", function (t) {
    $(t.target).addClass("focus")
  }), t.on("blur", function (t) {
    "" === $(t.target).val() && $(t.target).removeClass("focus")
  }), window.GOVUK) {
    var e = "label.selectable input[type='radio'], label.selectable input[type='checkbox']";
    new GOVUK.SelectionButtons(e), GOVUK.shimLinksWithButtonRole && GOVUK.shimLinksWithButtonRole.init()
  }
}), function (t) {
  "use strict";
  var a = t.jQuery, e = t.GOVUK || {}, i = function (t, e) {
    this.selectedClass = "selected", this.focusedClass = "focused", this.radioClass = "selection-button-radio", this.checkboxClass = "selection-button-checkbox", e !== undefined && a.each(e, function (t, e) {
      this[t] = e
    }.bind(this)), "string" == typeof t ? (this.selector = t, this.setInitialState(a(this.selector))) : t !== undefined && (this.$elms = t, this.setInitialState(this.$elms)), this.addEvents()
  };
  i.prototype.addEvents = function () {
    "undefined" != typeof this.$elms ? this.addElementLevelEvents() : this.addDocumentLevelEvents()
  }, i.prototype.setInitialState = function (t) {
    t.each(function (t, e) {
      var i = a(e), n = "radio" === i.attr("type") ? this.radioClass : this.checkboxClass;
      i.parent("label").addClass(n), i.is(":checked") && this.markSelected(i)
    }.bind(this))
  }, i.prototype.markFocused = function (t, e) {
    "focused" === e ? t.parent("label").addClass(this.focusedClass) : t.parent("label").removeClass(this.focusedClass)
  }, i.prototype.markSelected = function (t) {
    var e;
    "radio" === t.attr("type") ? (e = t.attr("name"), a(t[0].form).find('input[name="' + e + '"]').parent("label").removeClass(this.selectedClass), t.parent("label").addClass(this.selectedClass)) : t.is(":checked") ? t.parent("label").addClass(this.selectedClass) : t.parent("label").removeClass(this.selectedClass)
  }, i.prototype.addElementLevelEvents = function () {
    this.clickHandler = this.getClickHandler(), this.focusHandler = this.getFocusHandler({level: "element"}), this.$elms.on("click", this.clickHandler).on("focus blur", this.focusHandler)
  }, i.prototype.addDocumentLevelEvents = function () {
    this.clickHandler = this.getClickHandler(), this.focusHandler = this.getFocusHandler({level: "document"}), a(document).on("click", this.selector, this.clickHandler).on("focus blur", this.selector, this.focusHandler)
  }, i.prototype.getClickHandler = function () {
    return function (t) {
      this.markSelected(a(t.target))
    }.bind(this)
  }, i.prototype.getFocusHandler = function (t) {
    var i = "document" === t.level ? "focusin" : "focus";
    return function (t) {
      var e = t.type === i ? "focused" : "blurred";
      this.markFocused(a(t.target), e)
    }.bind(this)
  }, i.prototype.destroy = function () {
    "undefined" != typeof this.selector ? a(document).off("click", this.selector, this.clickHandler).off("focus blur", this.selector, this.focusHandler) : this.$elms.off("click", this.clickHandler).off("focus blur", this.focusHandler)
  }, e.SelectionButtons = i, t.GOVUK = e
}(window), function (r, l) {
  function n(t, e) {
    var i, n, a, o = t.nodeName.toLowerCase();
    return "area" === o ? (n = (i = t.parentNode).name, !(!t.href || !n || "map" !== i.nodeName.toLowerCase()) && (!!(a = r("img[usemap=#" + n + "]")[0]) && s(a))) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o && t.href || e) && s(t)
  }

  function s(t) {
    return r.expr.filters.visible(t) && !r(t).parents().addBack().filter(function () {
      return "hidden" === r.css(this, "visibility")
    }).length
  }

  var t, e, i = 0, a = /^ui-id-\d+$/;
  r.ui = r.ui || {}, r.extend(r.ui, {
    version: "1.10.2",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  }), r.fn.extend({
    focus: (t = r.fn.focus, function (e, i) {
      return "number" == typeof e ? this.each(function () {
        var t = this;
        setTimeout(function () {
          r(t).focus(), i && i.call(t)
        }, e)
      }) : t.apply(this, arguments)
    }), scrollParent: function () {
      var t;
      return t = r.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
        return /(relative|absolute|fixed)/.test(r.css(this, "position")) && /(auto|scroll)/.test(r.css(this, "overflow") + r.css(this, "overflow-y") + r.css(this, "overflow-x"))
      }).eq(0) : this.parents().filter(function () {
        return /(auto|scroll)/.test(r.css(this, "overflow") + r.css(this, "overflow-y") + r.css(this, "overflow-x"))
      }).eq(0), /fixed/.test(this.css("position")) || !t.length ? r(document) : t
    }, zIndex: function (t) {
      if (t !== l) return this.css("zIndex", t);
      if (this.length) for (var e, i, n = r(this[0]); n.length && n[0] !== document;) {
        if (("absolute" === (e = n.css("position")) || "relative" === e || "fixed" === e) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
        n = n.parent()
      }
      return 0
    }, uniqueId: function () {
      return this.each(function () {
        this.id || (this.id = "ui-id-" + ++i)
      })
    }, removeUniqueId: function () {
      return this.each(function () {
        a.test(this.id) && r(this).removeAttr("id")
      })
    }
  }), r.extend(r.expr[":"], {
    data: r.expr.createPseudo ? r.expr.createPseudo(function (e) {
      return function (t) {
        return !!r.data(t, e)
      }
    }) : function (t, e, i) {
      return !!r.data(t, i[3])
    }, focusable: function (t) {
      return n(t, !isNaN(r.attr(t, "tabindex")))
    }, tabbable: function (t) {
      var e = r.attr(t, "tabindex"), i = isNaN(e);
      return (i || 0 <= e) && n(t, !i)
    }
  }), r("<a>").outerWidth(1).jquery || r.each(["Width", "Height"], function (t, i) {
    function n(t, e, i, n) {
      return r.each(a, function () {
        e -= parseFloat(r.css(t, "padding" + this)) || 0, i && (e -= parseFloat(r.css(t, "border" + this + "Width")) || 0), n && (e -= parseFloat(r.css(t, "margin" + this)) || 0)
      }), e
    }

    var a = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), s = {
      innerWidth: r.fn.innerWidth,
      innerHeight: r.fn.innerHeight,
      outerWidth: r.fn.outerWidth,
      outerHeight: r.fn.outerHeight
    };
    r.fn["inner" + i] = function (t) {
      return t === l ? s["inner" + i].call(this) : this.each(function () {
        r(this).css(o, n(this, t) + "px")
      })
    }, r.fn["outer" + i] = function (t, e) {
      return "number" != typeof t ? s["outer" + i].call(this, t) : this.each(function () {
        r(this).css(o, n(this, t, !0, e) + "px")
      })
    }
  }), r.fn.addBack || (r.fn.addBack = function (t) {
    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
  }), r("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (r.fn.removeData = (e = r.fn.removeData, function (t) {
    return arguments.length ? e.call(this, r.camelCase(t)) : e.call(this)
  })), r.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), r.support.selectstart = "onselectstart" in document.createElement("div"), r.fn.extend({
    disableSelection: function () {
      return this.bind((r.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
        t.preventDefault()
      })
    }, enableSelection: function () {
      return this.unbind(".ui-disableSelection")
    }
  }), r.extend(r.ui, {
    plugin: {
      add: function (t, e, i) {
        var n, a = r.ui[t].prototype;
        for (n in i) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([e, i[n]])
      }, call: function (t, e, i) {
        var n, a = t.plugins[e];
        if (a && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType) for (n = 0; n < a.length; n++) t.options[a[n][0]] && a[n][1].apply(t.element, i)
      }
    }, hasScroll: function (t, e) {
      if ("hidden" === r(t).css("overflow")) return !1;
      var i = e && "left" === e ? "scrollLeft" : "scrollTop", n = !1;
      return 0 < t[i] || (t[i] = 1, n = 0 < t[i], t[i] = 0, n)
    }
  })
}(jQuery), function (u, r) {
  var i = 0, l = Array.prototype.slice, a = u.cleanData;
  u.cleanData = function (t) {
    for (var e, i = 0; null != (e = t[i]); i++) try {
      u(e).triggerHandler("remove")
    } catch (n) {
    }
    a(t)
  }, u.widget = function (t, i, e) {
    var n, a, o, s, r = {}, l = t.split(".")[0];
    t = t.split(".")[1], n = l + "-" + t, e || (e = i, i = u.Widget), u.expr[":"][n.toLowerCase()] = function (t) {
      return !!u.data(t, n)
    }, u[l] = u[l] || {}, a = u[l][t], o = u[l][t] = function (t, e) {
      if (!this._createWidget) return new o(t, e);
      arguments.length && this._createWidget(t, e)
    }, u.extend(o, a, {
      version: e.version,
      _proto: u.extend({}, e),
      _childConstructors: []
    }), (s = new i).options = u.widget.extend({}, s.options), u.each(e, function (e, n) {
      var a, o;
      u.isFunction(n) ? r[e] = (a = function () {
        return i.prototype[e].apply(this, arguments)
      }, o = function (t) {
        return i.prototype[e].apply(this, t)
      }, function () {
        var t, e = this._super, i = this._superApply;
        return this._super = a, this._superApply = o, t = n.apply(this, arguments), this._super = e, this._superApply = i, t
      }) : r[e] = n
    }), o.prototype = u.widget.extend(s, {widgetEventPrefix: a ? s.widgetEventPrefix : t}, r, {
      constructor: o,
      namespace: l,
      widgetName: t,
      widgetFullName: n
    }), a ? (u.each(a._childConstructors, function (t, e) {
      var i = e.prototype;
      u.widget(i.namespace + "." + i.widgetName, o, e._proto)
    }), delete a._childConstructors) : i._childConstructors.push(o), u.widget.bridge(t, o)
  }, u.widget.extend = function (t) {
    for (var e, i, n = l.call(arguments, 1), a = 0, o = n.length; a < o; a++) for (e in n[a]) i = n[a][e], n[a].hasOwnProperty(e) && i !== r && (u.isPlainObject(i) ? t[e] = u.isPlainObject(t[e]) ? u.widget.extend({}, t[e], i) : u.widget.extend({}, i) : t[e] = i);
    return t
  }, u.widget.bridge = function (o, e) {
    var s = e.prototype.widgetFullName || o;
    u.fn[o] = function (i) {
      var t = "string" == typeof i, n = l.call(arguments, 1), a = this;
      return i = !t && n.length ? u.widget.extend.apply(null, [i].concat(n)) : i, t ? this.each(function () {
        var t, e = u.data(this, s);
        return e ? u.isFunction(e[i]) && "_" !== i.charAt(0) ? (t = e[i].apply(e, n)) !== e && t !== r ? (a = t && t.jquery ? a.pushStack(t.get()) : t, !1) : void 0 : u.error("no such method '" + i + "' for " + o + " widget instance") : u.error("cannot call methods on " + o + " prior to initialization; attempted to call method '" + i + "'")
      }) : this.each(function () {
        var t = u.data(this, s);
        t ? t.option(i || {})._init() : u.data(this, s, new e(i, this))
      }), a
    }
  }, u.Widget = function () {
  }, u.Widget._childConstructors = [], u.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {disabled: !1, create: null},
    _createWidget: function (t, e) {
      e = u(e || this.defaultElement || this)[0], this.element = u(e), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = u.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = u(), this.hoverable = u(), this.focusable = u(), e !== this && (u.data(e, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function (t) {
          t.target === e && this.destroy()
        }
      }), this.document = u(e.style ? e.ownerDocument : e.document || e), this.window = u(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: u.noop,
    _getCreateEventData: u.noop,
    _create: u.noop,
    _init: u.noop,
    destroy: function () {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(u.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: u.noop,
    widget: function () {
      return this.element
    },
    option: function (t, e) {
      var i, n, a, o = t;
      if (0 === arguments.length) return u.widget.extend({}, this.options);
      if ("string" == typeof t) if (o = {}, t = (i = t.split(".")).shift(), i.length) {
        for (n = o[t] = u.widget.extend({}, this.options[t]), a = 0; a < i.length - 1; a++) n[i[a]] = n[i[a]] || {}, n = n[i[a]];
        if (t = i.pop(), e === r) return n[t] === r ? null : n[t];
        n[t] = e
      } else {
        if (e === r) return this.options[t] === r ? null : this.options[t];
        o[t] = e
      }
      return this._setOptions(o), this
    },
    _setOptions: function (t) {
      var e;
      for (e in t) this._setOption(e, t[e]);
      return this
    },
    _setOption: function (t, e) {
      return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    },
    enable: function () {
      return this._setOption("disabled", !1)
    },
    disable: function () {
      return this._setOption("disabled", !0)
    },
    _on: function (s, r, t) {
      var l, c = this;
      "boolean" != typeof s && (t = r, r = s, s = !1), t ? (r = l = u(r), this.bindings = this.bindings.add(r)) : (t = r, r = this.element, l = this.widget()), u.each(t, function (t, e) {
        function i() {
          if (s || !0 !== c.options.disabled && !u(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? c[e] : e).apply(c, arguments)
        }

        "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || u.guid++);
        var n = t.match(/^(\w+)\s*(.*)$/), a = n[1] + c.eventNamespace, o = n[2];
        o ? l.delegate(o, a, i) : r.bind(a, i)
      })
    },
    _off: function (t, e) {
      e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
    },
    _delay: function (t, e) {
      function i() {
        return ("string" == typeof t ? n[t] : t).apply(n, arguments)
      }

      var n = this;
      return setTimeout(i, e || 0)
    },
    _hoverable: function (t) {
      this.hoverable = this.hoverable.add(t), this._on(t, {
        mouseenter: function (t) {
          u(t.currentTarget).addClass("ui-state-hover")
        }, mouseleave: function (t) {
          u(t.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function (t) {
      this.focusable = this.focusable.add(t), this._on(t, {
        focusin: function (t) {
          u(t.currentTarget).addClass("ui-state-focus")
        }, focusout: function (t) {
          u(t.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function (t, e, i) {
      var n, a, o = this.options[t];
      if (i = i || {}, (e = u.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), e.target = this.element[0], a = e.originalEvent) for (n in a) n in e || (e[n] = a[n]);
      return this.element.trigger(e, i), !(u.isFunction(o) && !1 === o.apply(this.element[0], [e].concat(i)) || e.isDefaultPrevented())
    }
  }, u.each({show: "fadeIn", hide: "fadeOut"}, function (o, s) {
    u.Widget.prototype["_" + o] = function (e, t, i) {
      "string" == typeof t && (t = {effect: t});
      var n, a = t ? !0 === t || "number" == typeof t ? s : t.effect || s : o;
      "number" == typeof(t = t || {}) && (t = {duration: t}), n = !u.isEmptyObject(t), t.complete = i, t.delay && e.delay(t.delay), n && u.effects && u.effects.effect[a] ? e[o](t) : a !== o && e[a] ? e[a](t.duration, t.easing, i) : e.queue(function (t) {
        u(this)[o](), i && i.call(e[0]), t()
      })
    }
  })
}(jQuery), function (a) {
  var o = !1;
  a(document).mouseup(function () {
    o = !1
  }), a.widget("ui.mouse", {
    version: "1.10.2",
    options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
    _mouseInit: function () {
      var e = this;
      this.element.bind("mousedown." + this.widgetName, function (t) {
        return e._mouseDown(t)
      }).bind("click." + this.widgetName, function (t) {
        if (!0 === a.data(t.target, e.widgetName + ".preventClickEvent")) return a.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1
      }), this.started = !1
    },
    _mouseDestroy: function () {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function (t) {
      if (!o) {
        this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
        var e = this, i = 1 === t.which,
          n = !("string" != typeof this.options.cancel || !t.target.nodeName) && a(t.target).closest(this.options.cancel).length;
        return !(i && !n && this._mouseCapture(t)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
          e.mouseDelayMet = !0
        }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t), !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === a.data(t.target, this.widgetName + ".preventClickEvent") && a.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
          return e._mouseMove(t)
        }, this._mouseUpDelegate = function (t) {
          return e._mouseUp(t)
        }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), o = !0))
      }
    },
    _mouseMove: function (t) {
      return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
    },
    _mouseUp: function (t) {
      return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && a.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
    },
    _mouseDistanceMet: function (t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet
    },
    _mouseStart: function () {
    },
    _mouseDrag: function () {
    },
    _mouseStop: function () {
    },
    _mouseCapture: function () {
      return !0
    }
  })
}(jQuery), function (u) {
  var o = 5;
  u.widget("ui.slider", u.ui.mouse, {
    version: "1.10.2",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    _create: function () {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
    },
    _refresh: function () {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
    },
    _createHandles: function () {
      var t, e, i = this.options,
        n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
        a = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", o = [];
      for (e = i.values && i.values.length || 1, n.length > e && (n.slice(e).remove(), n = n.slice(0, e)), t = n.length; t < e; t++) o.push(a);
      this.handles = n.add(u(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (t) {
        u(this).data("ui-slider-handle-index", t)
      })
    },
    _createRange: function () {
      var t = this.options, e = "";
      t.range ? (!0 === t.range && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : u.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
        left: "",
        bottom: ""
      }) : (this.range = u("<div></div>").appendTo(this.element), e = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(e + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : this.range = u([])
    },
    _setupEvents: function () {
      var t = this.handles.add(this.range).filter("a");
      this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
    },
    _destroy: function () {
      this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
    },
    _mouseCapture: function (t) {
      var e, i, n, a, o, s, r, l = this, c = this.options;
      return !c.disabled && (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), e = {
        x: t.pageX,
        y: t.pageY
      }, i = this._normValueFromMouse(e), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (t) {
        var e = Math.abs(i - l.values(t));
        (e < n || n === e && (t === l._lastChangedValue || l.values(t) === c.min)) && (n = e, a = u(this), o = t)
      }), !1 !== this._start(t, o) && (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), s = a.offset(), r = !u(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = r ? {
        left: 0,
        top: 0
      } : {
        left: t.pageX - s.left - a.width() / 2,
        top: t.pageY - s.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, i), this._animateOff = !0))
    },
    _mouseStart: function () {
      return !0
    },
    _mouseDrag: function (t) {
      var e = {x: t.pageX, y: t.pageY}, i = this._normValueFromMouse(e);
      return this._slide(t, this._handleIndex, i), !1
    },
    _mouseStop: function (t) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1
    },
    _detectOrientation: function () {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
    },
    _normValueFromMouse: function (t) {
      var e, i, n, a, o;
      return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), 1 < (n = i / e) && (n = 1), n < 0 && (n = 0), "vertical" === this.orientation && (n = 1 - n), a = this._valueMax() - this._valueMin(), o = this._valueMin() + n * a, this._trimAlignValue(o)
    },
    _start: function (t, e) {
      var i = {handle: this.handles[e], value: this.value()};
      return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i)
    },
    _slide: function (t, e, i) {
      var n, a, o;
      this.options.values && this.options.values.length ? (n = this.values(e ? 0 : 1), 2 === this.options.values.length && !0 === this.options.range && (0 === e && n < i || 1 === e && i < n) && (i = n), i !== this.values(e) && ((a = this.values())[e] = i, o = this._trigger("slide", t, {
        handle: this.handles[e],
        value: i,
        values: a
      }), n = this.values(e ? 0 : 1), !1 !== o && this.values(e, i, !0))) : i !== this.value() && !1 !== (o = this._trigger("slide", t, {
        handle: this.handles[e],
        value: i
      })) && this.value(i)
    },
    _stop: function (t, e) {
      var i = {handle: this.handles[e], value: this.value()};
      this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
    },
    _change: function (t, e) {
      if (!this._keySliding && !this._mouseSliding) {
        var i = {handle: this.handles[e], value: this.value()};
        this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
      }
    },
    value: function (t) {
      return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
    },
    values: function (t, e) {
      var i, n, a;
      if (1 < arguments.length) return this.options.values[t] = this._trimAlignValue(e), this._refreshValue(), void this._change(null, t);
      if (!arguments.length) return this._values();
      if (!u.isArray(t)) return this.options.values && this.options.values.length ? this._values(t) : this.value();
      for (i = this.options.values, n = t, a = 0; a < i.length; a += 1) i[a] = this._trimAlignValue(n[a]), this._change(null, a);
      this._refreshValue()
    },
    _setOption: function (t, e) {
      var i, n = 0;
      switch ("range" === t && !0 === this.options.range && ("min" === e ? (this.options.value = this._values(0), this.options.values = null) : "max" === e && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), u.isArray(this.options.values) && (n = this.options.values.length), u.Widget.prototype._setOption.apply(this, arguments), t) {
        case"orientation":
          this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
          break;
        case"value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;
        case"values":
          for (this._animateOff = !0, this._refreshValue(), i = 0; i < n; i += 1) this._change(null, i);
          this._animateOff = !1;
          break;
        case"min":
        case"max":
          this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
          break;
        case"range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1
      }
    },
    _value: function () {
      var t = this.options.value;
      return t = this._trimAlignValue(t)
    },
    _values: function (t) {
      var e, i, n;
      if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
      if (this.options.values && this.options.values.length) {
        for (i = this.options.values.slice(), n = 0; n < i.length; n += 1) i[n] = this._trimAlignValue(i[n]);
        return i
      }
      return []
    },
    _trimAlignValue: function (t) {
      if (t <= this._valueMin()) return this._valueMin();
      if (t >= this._valueMax()) return this._valueMax();
      var e = 0 < this.options.step ? this.options.step : 1, i = (t - this._valueMin()) % e, n = t - i;
      return 2 * Math.abs(i) >= e && (n += 0 < i ? e : -e), parseFloat(n.toFixed(5))
    },
    _valueMin: function () {
      return this.options.min
    },
    _valueMax: function () {
      return this.options.max
    },
    _refreshValue: function () {
      var e, i, t, n, a, o = this.options.range, s = this.options, r = this, l = !this._animateOff && s.animate,
        c = {};
      this.options.values && this.options.values.length ? this.handles.each(function (t) {
        i = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, c["horizontal" === r.orientation ? "left" : "bottom"] = i + "%", u(this).stop(1, 1)[l ? "animate" : "css"](c, s.animate), !0 === r.options.range && ("horizontal" === r.orientation ? (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({left: i + "%"}, s.animate), 1 === t && r.range[l ? "animate" : "css"]({width: i - e + "%"}, {
          queue: !1,
          duration: s.animate
        })) : (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({bottom: i + "%"}, s.animate), 1 === t && r.range[l ? "animate" : "css"]({height: i - e + "%"}, {
          queue: !1,
          duration: s.animate
        }))), e = i
      }) : (t = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? (t - n) / (a - n) * 100 : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](c, s.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({width: i + "%"}, s.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({width: 100 - i + "%"}, {
        queue: !1,
        duration: s.animate
      }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({height: i + "%"}, s.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({height: 100 - i + "%"}, {
        queue: !1,
        duration: s.animate
      }))
    },
    _handleEvents: {
      keydown: function (t) {
        var e, i, n, a = u(t.target).data("ui-slider-handle-index");
        switch (t.keyCode) {
          case u.ui.keyCode.HOME:
          case u.ui.keyCode.END:
          case u.ui.keyCode.PAGE_UP:
          case u.ui.keyCode.PAGE_DOWN:
          case u.ui.keyCode.UP:
          case u.ui.keyCode.RIGHT:
          case u.ui.keyCode.DOWN:
          case u.ui.keyCode.LEFT:
            if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, u(t.target).addClass("ui-state-active"), !1 === this._start(t, a))) return
        }
        switch (n = this.options.step, e = i = this.options.values && this.options.values.length ? this.values(a) : this.value(), t.keyCode) {
          case u.ui.keyCode.HOME:
            i = this._valueMin();
            break;
          case u.ui.keyCode.END:
            i = this._valueMax();
            break;
          case u.ui.keyCode.PAGE_UP:
            i = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / o);
            break;
          case u.ui.keyCode.PAGE_DOWN:
            i = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / o);
            break;
          case u.ui.keyCode.UP:
          case u.ui.keyCode.RIGHT:
            if (e === this._valueMax()) return;
            i = this._trimAlignValue(e + n);
            break;
          case u.ui.keyCode.DOWN:
          case u.ui.keyCode.LEFT:
            if (e === this._valueMin()) return;
            i = this._trimAlignValue(e - n)
        }
        this._slide(t, a, i)
      }, click: function (t) {
        t.preventDefault()
      }, keyup: function (t) {
        var e = u(t.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(t, e), this._change(t, e), u(t.target).removeClass("ui-state-active"))
      }
    }
  })
}(jQuery);
var swfobject = function () {
  function e() {
    if (!B) {
      try {
        var t = D.getElementsByTagName("body")[0].appendChild(m("span"));
        t.parentNode.removeChild(t)
      } catch (n) {
        return
      }
      B = !0;
      for (var e = H.length, i = 0; i < e; i++) H[i]()
    }
  }

  function t(t) {
    B ? t() : H[H.length] = t
  }

  function i(t) {
    if (typeof $.addEventListener != M) $.addEventListener("load", t, !1); else if (typeof D.addEventListener != M) D.addEventListener("load", t, !1); else if (typeof $.attachEvent != M) c($, "onload", t); else if ("function" == typeof $.onload) {
      var e = $.onload;
      $.onload = function () {
        e(), t()
      }
    } else $.onload = t
  }

  function n() {
    L ? a() : o()
  }

  function a() {
    var e = D.getElementsByTagName("body")[0], i = m(P);
    i.setAttribute("type", A);
    var n = e.appendChild(i);
    if (n) {
      var a = 0;
      !function () {
        if (typeof n.GetVariable != M) {
          var t = n.GetVariable("$version");
          t && (t = t.split(" ")[1].split(","), R.pv = [parseInt(t[0], 10), parseInt(t[1], 10), parseInt(t[2], 10)])
        } else if (a < 10) return a++, setTimeout(arguments.callee, 10);
        e.removeChild(i), n = null, o()
      }()
    } else o()
  }

  function o() {
    var t = G.length;
    if (0 < t) for (var e = 0; e < t; e++) {
      var i = G[e].id, n = G[e].callbackFn, a = {success: !1, id: i};
      if (0 < R.pv[0]) {
        var o = g(i);
        if (o) if (!b(G[e].swfVersion) || R.wk && R.wk < 312) if (G[e].expressInstall && v()) {
          var s = {};
          s.data = G[e].expressInstall, s.width = o.getAttribute("width") || "0", s.height = o.getAttribute("height") || "0", o.getAttribute("class") && (s.styleclass = o.getAttribute("class")), o.getAttribute("align") && (s.align = o.getAttribute("align"));
          for (var r = {}, l = o.getElementsByTagName("param"), c = l.length, u = 0; u < c; u++) "movie" != l[u].getAttribute("name").toLowerCase() && (r[l[u].getAttribute("name")] = l[u].getAttribute("value"));
          y(s, r, i, n)
        } else p(o), n && n(a); else C(i, !0), n && (a.success = !0, a.ref = h(i), n(a))
      } else if (C(i, !0), n) {
        var d = h(i);
        d && typeof d.SetVariable != M && (a.success = !0, a.ref = d), n(a)
      }
    }
  }

  function h(t) {
    var e = null, i = g(t);
    if (i && "OBJECT" == i.nodeName) if (typeof i.SetVariable != M) e = i; else {
      var n = i.getElementsByTagName(P)[0];
      n && (e = n)
    }
    return e
  }

  function v() {
    return !j && b("6.0.65") && (R.win || R.mac) && !(R.wk && R.wk < 312)
  }

  function y(t, e, i, n) {
    _ = n || null, N = {success: !(j = !0), id: i};
    var a = g(i);
    if (a) {
      "OBJECT" == a.nodeName ? (k = l(a), O = null) : (k = a, O = i), t.id = I, (typeof t.width == M || !/%$/.test(t.width) && parseInt(t.width, 10) < 310) && (t.width = "310"), (typeof t.height == M || !/%$/.test(t.height) && parseInt(t.height, 10) < 137) && (t.height = "137"), D.title = D.title.slice(0, 47) + " - Flash Player Installation";
      var o = R.ie && R.win ? "ActiveX" : "PlugIn",
        s = "MMredirectURL=" + $.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + o + "&MMdoctitle=" + D.title;
      if (typeof e.flashvars != M ? e.flashvars += "&" + s : e.flashvars = s, R.ie && R.win && 4 != a.readyState) {
        var r = m("div");
        i += "SWFObjectNew", r.setAttribute("id", i), a.parentNode.insertBefore(r, a), a.style.display = "none", function () {
          4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
        }()
      }
      w(t, e, i)
    }
  }

  function p(t) {
    if (R.ie && R.win && 4 != t.readyState) {
      var e = m("div");
      t.parentNode.insertBefore(e, t), e.parentNode.replaceChild(l(t), e), t.style.display = "none", function () {
        4 == t.readyState ? t.parentNode.removeChild(t) : setTimeout(arguments.callee, 10)
      }()
    } else t.parentNode.replaceChild(l(t), t)
  }

  function l(t) {
    var e = m("div");
    if (R.win && R.ie) e.innerHTML = t.innerHTML; else {
      var i = t.getElementsByTagName(P)[0];
      if (i) {
        var n = i.childNodes;
        if (n) for (var a = n.length, o = 0; o < a; o++) 1 == n[o].nodeType && "PARAM" == n[o].nodeName || 8 == n[o].nodeType || e.appendChild(n[o].cloneNode(!0))
      }
    }
    return e
  }

  function w(t, e, i) {
    var n, a = g(i);
    if (R.wk && R.wk < 312) return n;
    if (a) if (typeof t.id == M && (t.id = i), R.ie && R.win) {
      var o = "";
      for (var s in t) t[s] != Object.prototype[s] && ("data" == s.toLowerCase() ? e.movie = t[s] : "styleclass" == s.toLowerCase() ? o += ' class="' + t[s] + '"' : "classid" != s.toLowerCase() && (o += " " + s + '="' + t[s] + '"'));
      var r = "";
      for (var l in e) e[l] != Object.prototype[l] && (r += '<param name="' + l + '" value="' + e[l] + '" />');
      a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + o + ">" + r + "</object>", F[F.length] = t.id, n = g(t.id)
    } else {
      var c = m(P);
      for (var u in c.setAttribute("type", A), t) t[u] != Object.prototype[u] && ("styleclass" == u.toLowerCase() ? c.setAttribute("class", t[u]) : "classid" != u.toLowerCase() && c.setAttribute(u, t[u]));
      for (var d in e) e[d] != Object.prototype[d] && "movie" != d.toLowerCase() && f(c, d, e[d]);
      a.parentNode.replaceChild(c, a), n = c
    }
    return n
  }

  function f(t, e, i) {
    var n = m("param");
    n.setAttribute("name", e), n.setAttribute("value", i), t.appendChild(n)
  }

  function s(t) {
    var e = g(t);
    e && "OBJECT" == e.nodeName && (R.ie && R.win ? (e.style.display = "none", function () {
      4 == e.readyState ? r(t) : setTimeout(arguments.callee, 10)
    }()) : e.parentNode.removeChild(e))
  }

  function r(t) {
    var e = g(t);
    if (e) {
      for (var i in e) "function" == typeof e[i] && (e[i] = null);
      e.parentNode.removeChild(e)
    }
  }

  function g(t) {
    var e = null;
    try {
      e = D.getElementById(t)
    } catch (i) {
    }
    return e
  }

  function m(t) {
    return D.createElement(t)
  }

  function c(t, e, i) {
    t.attachEvent(e, i), K[K.length] = [t, e, i]
  }

  function b(t) {
    var e = R.pv, i = t.split(".");
    return i[0] = parseInt(i[0], 10), i[1] = parseInt(i[1], 10) || 0, i[2] = parseInt(i[2], 10) || 0, e[0] > i[0] || e[0] == i[0] && e[1] > i[1] || e[0] == i[0] && e[1] == i[1] && e[2] >= i[2]
  }

  function u(t, e, i, n) {
    if (!R.ie || !R.mac) {
      var a = D.getElementsByTagName("head")[0];
      if (a) {
        var o = i && "string" == typeof i ? i : "screen";
        if (n && (T = S = null), !S || T != o) {
          var s = m("style");
          s.setAttribute("type", "text/css"), s.setAttribute("media", o), S = a.appendChild(s), R.ie && R.win && typeof D.styleSheets != M && 0 < D.styleSheets.length && (S = D.styleSheets[D.styleSheets.length - 1]), T = o
        }
        R.ie && R.win ? S && typeof S.addRule == P && S.addRule(t, e) : S && typeof D.createTextNode != M && S.appendChild(D.createTextNode(t + " {" + e + "}"))
      }
    }
  }

  function C(t, e) {
    if (W) {
      var i = e ? "visible" : "hidden";
      B && g(t) ? g(t).style.visibility = i : u("#" + t, "visibility:" + i)
    }
  }

  function d(t) {
    return null != /[\\\"<>\.;]/.exec(t) && typeof encodeURIComponent != M ? encodeURIComponent(t) : t
  }

  var k, O, _, N, S, T, M = "undefined", P = "object", x = "Shockwave Flash", E = "ShockwaveFlash.ShockwaveFlash",
    A = "application/x-shockwave-flash", I = "SWFObjectExprInst", V = "onreadystatechange", $ = window,
    D = document, U = navigator, L = !1, H = [n], G = [], F = [], K = [], B = !1, j = !1, W = !0, R = function () {
      var t = typeof D.getElementById != M && typeof D.getElementsByTagName != M && typeof D.createElement != M,
        e = U.userAgent.toLowerCase(), i = U.platform.toLowerCase(), n = i ? /win/.test(i) : /win/.test(e),
        a = i ? /mac/.test(i) : /mac/.test(e),
        o = !!/webkit/.test(e) && parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")), s = !1, r = [0, 0, 0],
        l = null;
      if (typeof U.plugins != M && typeof U.plugins[x] == P) !(l = U.plugins[x].description) || typeof U.mimeTypes != M && U.mimeTypes[A] && !U.mimeTypes[A].enabledPlugin || (s = !(L = !0), l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), r[0] = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10), r[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, "$1"), 10), r[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0); else if (typeof $.ActiveXObject != M) try {
        var c = new ActiveXObject(E);
        c && (l = c.GetVariable("$version")) && (s = !0, l = l.split(" ")[1].split(","), r = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)])
      } catch (u) {
      }
      return {w3: t, pv: r, wk: o, ie: s, win: n, mac: a}
    }();
  R.w3 && ((typeof D.readyState != M && "complete" == D.readyState || typeof D.readyState == M && (D.getElementsByTagName("body")[0] || D.body)) && e(), B || (typeof D.addEventListener != M && D.addEventListener("DOMContentLoaded", e, !1), R.ie && R.win && (D.attachEvent(V, function () {
    "complete" == D.readyState && (D.detachEvent(V, arguments.callee), e())
  }), $ == top && function () {
    if (!B) {
      try {
        D.documentElement.doScroll("left")
      } catch (t) {
        return setTimeout(arguments.callee, 0)
      }
      e()
    }
  }()), R.wk && function () {
    B || (/loaded|complete/.test(D.readyState) ? e() : setTimeout(arguments.callee, 0))
  }(), i(e))), R.ie && R.win && window.attachEvent("onunload", function () {
    for (var t = K.length, e = 0; e < t; e++) K[e][0].detachEvent(K[e][1], K[e][2]);
    for (var i = F.length, n = 0; n < i; n++) s(F[n]);
    for (var a in R) R[a] = null;
    for (var o in R = null, swfobject) swfobject[o] = null;
    swfobject = null
  });
  return {
    registerObject: function (t, e, i, n) {
      if (R.w3 && t && e) {
        var a = {};
        a.id = t, a.swfVersion = e, a.expressInstall = i, a.callbackFn = n, G[G.length] = a, C(t, !1)
      } else n && n({success: !1, id: t})
    }, getObjectById: function (t) {
      if (R.w3) return h(t)
    }, embedSWF: function (s, r, l, c, u, d, h, p, f, g) {
      var m = {success: !1, id: r};
      R.w3 && !(R.wk && R.wk < 312) && s && r && l && c && u ? (C(r, !1), t(function () {
        l += "", c += "";
        var t = {};
        if (f && typeof f === P) for (var e in f) t[e] = f[e];
        t.data = s, t.width = l, t.height = c;
        var i = {};
        if (p && typeof p === P) for (var n in p) i[n] = p[n];
        if (h && typeof h === P) for (var a in h) typeof i.flashvars != M ? i.flashvars += "&" + a + "=" + h[a] : i.flashvars = a + "=" + h[a];
        if (b(u)) {
          var o = w(t, i, r);
          t.id == r && C(r, !0), m.success = !0, m.ref = o
        } else {
          if (d && v()) return t.data = d, void y(t, i, r, g);
          C(r, !0)
        }
        g && g(m)
      })) : g && g(m)
    }, switchOffAutoHideShow: function () {
      W = !1
    }, ua: R, getFlashPlayerVersion: function () {
      return {major: R.pv[0], minor: R.pv[1], release: R.pv[2]}
    }, hasFlashPlayerVersion: b, createSWF: function (t, e, i) {
      return R.w3 ? w(t, e, i) : undefined
    }, showExpressInstall: function (t, e, i, n) {
      R.w3 && v() && y(t, e, i, n)
    }, removeSWF: function (t) {
      R.w3 && s(t)
    }, createCSS: function (t, e, i, n) {
      R.w3 && u(t, e, i, n)
    }, addDomLoadEvent: t, addLoadEvent: i, getQueryParamValue: function (t) {
      var e = D.location.search || D.location.hash;
      if (e) {
        if (/\?/.test(e) && (e = e.split("?")[1]), null == t) return d(e);
        for (var i = e.split("&"), n = 0; n < i.length; n++) if (i[n].substring(0, i[n].indexOf("=")) == t) return d(i[n].substring(i[n].indexOf("=") + 1))
      }
      return ""
    }, expressInstallCallback: function () {
      if (j) {
        var t = g(I);
        t && k && (t.parentNode.replaceChild(k, t), O && (C(O, !0), R.ie && R.win && (k.style.display = "block")), _ && _(N)), j = !1
      }
    }
  }
}();
!function (t) {
  var e, i;
  t.NOMENSA = t.NOMENSA || {}, t.NOMENSA.uaMatch = function (t) {
    t = t.toLowerCase();
    var e = /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || /(msie) ([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
    return {browser: e[1] || "", version: e[2] || "0"}
  }, i = {}, (e = t.NOMENSA.uaMatch(t.navigator.userAgent)).browser && (i[e.browser] = !0, i.version = e.version), t.NOMENSA.browser = i
}(window), window.NOMENSA = window.NOMENSA || {}, window.NOMENSA.player = window.NOMENSA.player || {}, window.NOMENSA.player.YoutubePlayer = function (t) {
  this.config = t, this.config.playerVars = {
    controls: 0,
    showinfo: 0,
    origin: window.location.protocol + "//" + window.location.hostname,
    rel: 0
  }
}, window.NOMENSA.player.YoutubePlayer.apiLoaded = !1, window.NOMENSA.player.YoutubePlayer.prototype = {
  getYTOptions: function () {
    var e = this, t = {
      height: this.config.flashHeight,
      width: this.config.flashWidth,
      videoId: this.config.media,
      events: {
        onReady: function (t) {
          e.$html.find("iframe").attr({id: e.config.id, role: "presentation"}), e.onPlayerReady(t)
        }, onStateChange: function (t) {
          e.onPlayerStateChange(t.data)
        }
      }
    };
    return t.playerVars = this.config.playerVars, this.config.repeat && (t.playerVars.playlist = this.config.media), t
  }, init: "undefined" != typeof window.postMessage ? function (t) {
    var e = document.createElement("script"), i = document.getElementsByTagName("script")[0];
    this.$html = this.assembleHTML(), this.config.captions && this.getCaptions(), t.html(this.$html), window.NOMENSA.player.PlayerDaemon.addPlayer(this), window.NOMENSA.player.YoutubePlayer.apiLoaded ? this.player = YT.Player("player-" + player.config.id, getOptions(player)) : "undefined" == typeof window.onYouTubeIframeAPIReady && (window.onYouTubeIframeAPIReady = function () {
      window.NOMENSA.player.PlayerDaemon.map(function (t) {
        "undefined" != typeof t.getYTOptions && (t.player = new YT.Player("player-" + t.config.id, t.getYTOptions()))
      }), window.NOMENSA.player.YoutubePlayer.apiLoaded = !0
    }, e.src = "//www.youtube.com/iframe_api", i.parentNode.insertBefore(e, i))
  } : function (t) {
    var n = this;
    this.$html = this.assembleHTML(), this.config.captions && this.getCaptions(), t.html(this.$html), window.NOMENSA.player.PlayerDaemon.addPlayer(this), window.NOMENSA.player.stateHandlers[this.config.id] = function (t) {
      window.NOMENSA.player.PlayerDaemon.getPlayer(n.config.id).onPlayerStateChange(t)
    }, window.onYouTubePlayerReady = function (t) {
      var e = window.NOMENSA.player.PlayerDaemon.getPlayer(t), i = document.getElementById(e.config.id);
      e.player = i, e.cue(), e.getPlayer().addEventListener("onStateChange", "window.NOMENSA.player.stateHandlers." + n.config.id), e.onPlayerReady()
    }
  }, state: {ended: 0, playing: 1, paused: 2, unstarted: -1}, onPlayerReady: function () {
    var i, n = [];
    return function (t) {
      var e = n.length;
      if ("function" == typeof t) n.push(t); else {
        if (0 === e) return !1;
        for (i = 0; i < e; i++) n[i].apply(this, arguments)
      }
    }
  }(), onPlayerStateChange: function (t) {
    1 == t ? (this.play(), this.config.buttons.toggle && this.$html.find(".play").removeClass("play").addClass("pause").text("Pause")) : this.config.repeat && 0 == t && this.play()
  }, getFlashVars: function () {
    var t = {controlbar: "none", file: this.config.media};
    return "" != this.config.image && (t.image = this.config.image), this.config.repeat && (t.repeat = this.config.repeat), t
  }, getFlashParams: function () {
    return {allowScriptAccess: "always", wmode: "transparent"}
  }, generateFlashPlayer: function (t) {
    var e = this, i = this.getFlashVars(), n = this.getFlashParams(),
      a = {id: this.config.id, name: this.config.id},
      o = $("<" + this.config.flashContainer + " />").attr("id", "player-" + this.config.id).addClass("flashReplace").html('This content requires Macromedia Flash Player. You can <a href="http://get.adobe.com/flashplayer/">install or upgrade the Adobe Flash Player here</a>.'),
      s = $("<span />").addClass("video"), r = this.getURL();
    return setTimeout(function () {
      swfobject.embedSWF(r, o.attr("id"), e.config.flashWidth, e.config.flashHeight, "9.0.115", null, i, n, a, e.config.swfCallback),
      window.NOMENSA.browser.mozilla && 2 <= parseInt(window.NOMENSA.browser.version, 10) && e.$html.find("object").attr("tabindex", "-1")
    }, 0), t.append(s.append(o)), t
  }, generateVideoPlayer: function (t) {
    if ("undefined" == typeof window.postMessage) return this.generateFlashPlayer(t);
    var e = $("<" + this.config.flashContainer + " />").attr("id", "player-" + this.config.id),
      i = $("<span />").addClass("video");
    return t.append(i.append(e)), t
  }, getPlayer: function () {
    return this.player
  }, is_html5: !1, play: function () {
    this.player.playVideo(), this.setSliderTimeout(), this.config.captionsOn && this.captions && this.setCaptionTimeout()
  }, pause: function () {
    this.player.pauseVideo(), this.clearSliderTimeout(), this.config.captionsOn && this.captions && this.clearCaptionTimeout()
  }, ffwd: function () {
    var t = this.getCurrentTime() + this.config.playerSkip, e = this.getDuration();
    e < t && (t = e), this.seek(t)
  }, rewd: function () {
    var t = this.getCurrentTime() - this.config.playerSkip;
    t < 0 && (t = 0), this.seek(t)
  }, mute: function () {
    var t = this.$html.find("button.mute");
    this.player.isMuted() ? (this.player.unMute(), t.hasClass("muted") && t.removeClass("muted")) : (this.player.mute(), t.addClass("muted"))
  }, volup: function () {
    var t = this.player.getVolume();
    100 <= t ? t = 100 : t += this.config.volumeStep, this.player.setVolume(t), this.updateVolume(t)
  }, voldwn: function () {
    var t = this.player.getVolume();
    t <= 0 ? t = 0 : t -= this.config.volumeStep, this.player.setVolume(t), this.updateVolume(t)
  }, getDuration: function () {
    return this.player.getDuration()
  }, getCurrentTime: function () {
    return this.player.getCurrentTime()
  }, getBytesLoaded: function () {
    return this.player.getVideoBytesLoaded()
  }, getBytesTotal: function () {
    return this.player.getVideoBytesTotal()
  }, seek: function (t) {
    this.player.seekTo(t, !0), this.config.captionsOn && this.captions && (this.$html.find(".caption").remove(), this.clearCaptionTimeout(), this.setCaptionTimeout(), this.getPreviousCaption())
  }, cue: function () {
    this.player.cueVideoById(this.config.media)
  }, toggleCaptions: function () {
    var t = this, e = this.$html.find(".captions");
    e.hasClass("captions-off") ? (e.removeClass("captions-off").addClass("captions-on"), t.getPreviousCaption(), t.setCaptionTimeout(), t.config.captionsOn = !0) : (e.removeClass("captions-on").addClass("captions-off"), t.clearCaptionTimeout(), t.$html.find(".caption").remove(), t.config.captionsOn = !1)
  }
}, window.NOMENSA = window.NOMENSA || {}, window.NOMENSA.player = window.NOMENSA.player || {}, window.NOMENSA.player.MediaplayerDecorator = function (t) {
  var e = t;
  for (var i in this.config = e.config, this.player = e.player, this.state = e.state, e) "function" == typeof e[i] && (this[i] = function (t) {
    return function () {
      return e[t].apply(this, arguments)
    }
  }(i))
}, window.NOMENSA.player.MediaplayerDecorator.prototype.generatePlayerContainer = function () {
  var t = $("<" + this.config.playerContainer + " />").css(this.config.playerStyles).addClass("player-container");
  return window.NOMENSA.browser.msie && t.addClass("player-container-ie player-container-ie-" + window.NOMENSA.browser.version.substring(0, 1)), t
}, window.NOMENSA.player.MediaplayerDecorator.prototype.assembleHTML = function () {
  var t = this.generatePlayerContainer();
  return this.generateVideoPlayer(t).append(this.getControls())
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getURL = function () {
  return [this.config.url, this.config.id].join("")
}, window.NOMENSA.player.MediaplayerDecorator.prototype.createButton = function (t, e) {
  var i = [t, this.config.id].join("-");
  return $("<button />").append(e).addClass(t).attr({
    title: t,
    id: i
  }).addClass("ui-corner-all ui-state-default").hover(function () {
    $(this).addClass("ui-state-hover")
  }, function () {
    $(this).removeClass("ui-state-hover")
  }).focus(function () {
    $(this).addClass("ui-state-focus")
  }).blur(function () {
    $(this).removeClass("ui-state-focus")
  }).click(function (t) {
    t.preventDefault()
  })
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getFuncControls = function () {
  var t = this, e = $("<div>");
  e[0].className = "player-controls";
  var i = [];
  if (t.config.buttons.toggle) {
    var n = t.createButton("play", "Play").attr({"aria-live": "assertive"}).click(function () {
      $(this).hasClass("play") ? ($(this).removeClass("play").addClass("pause").attr({
        title: "Pause",
        id: "pause-" + t.config.id
      }).text("Pause"), t.play()) : ($(this).removeClass("pause").addClass("play").attr({
        title: "Play",
        id: "play-" + t.config.id
      }).text("Play"), t.pause())
    });
    i.push(n)
  } else {
    var a = t.createButton("play", "Play").click(function () {
      t.play()
    }), o = t.createButton("pause", "Pause").click(function () {
      t.pause()
    });
    i.push(a), i.push(o)
  }
  if (t.config.buttons.rewind) {
    var s = t.createButton("rewind", "Rewind").click(function () {
      t.rewd()
    });
    i.push(s)
  }
  if (t.config.buttons.forward) {
    var r = t.createButton("forward", "Forward").click(function () {
      t.ffwd()
    });
    i.push(r)
  }
  if (t.config.captions) {
    var l = t.createButton("captions", "Captions").click(function () {
      t.toggleCaptions()
    }), c = 1 == t.config.captionsOn ? "captions-on" : "captions-off";
    l.addClass(c), i.push(l)
  }
  for (var u = 0; u < i.length; u += 1) e[0].appendChild(i[u][0]);
  return e
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getVolControls = function () {
  for (var t = this, e = $("<div>").addClass("volume-controls"), i = t.createButton("mute", "Mute").click(function () {
    t.mute()
  }), n = t.createButton("vol-up", '+<span class="ui-helper-hidden-accessible"> Volume Up</span>').click(function () {
    t.volup()
  }), a = [i, t.createButton("vol-down", '-<span class="ui-helper-hidden-accessible"> Volume Down</span>').click(function () {
    t.voldwn()
  }), n, $("<span />").attr({
    id: "vol-" + t.config.id,
    "class": "vol-display"
  }).text("100%")], o = 0; o < a.length; o += 1) e[0].appendChild(a[o][0]);
  return e
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getSliderBar = function () {
  for (var t = $("<span />").addClass("ui-helper-hidden-accessible").html("<p>The timeline slider below uses WAI ARIA. Please use the documentation for your screen reader to find out more.</p>"), e = $("<span />").addClass("current-time").attr({id: "current-" + this.config.id}).text("00:00:00"), i = this.getSlider(), n = $("<span />").addClass("duration-time").attr({id: "duration-" + this.config.id}).text("00:00:00"), a = $("<div />").addClass("timer-bar").append(t), o = [e, i, n], s = 0; s < o.length; s += 1) a[0].appendChild(o[s][0]);
  return a
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getSlider = function () {
  var n = this, t = $("<span />").attr("id", "slider-" + this.config.id).slider({
    orientation: "horizontal",
    change: function (t, e) {
      var i = e.value / 100 * n.getDuration();
      n.seek(i)
    }
  });
  t.find("a.ui-slider-handle").attr({
    role: "slider",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": "0",
    "aria-valuetext": "0 percent",
    title: "Slider Control"
  });
  var e = $("<span />").addClass("progress-bar").attr({
      id: "progress-bar-" + this.config.id,
      tabindex: "-1"
    }).addClass("ui-progressbar-value ui-widget-header ui-corner-left").css({width: "0%", height: "95%"}),
    i = $("<span />").attr({
      id: "loaded-bar-" + this.config.id,
      tabindex: "-1"
    }).addClass("loaded-bar ui-progressbar-value ui-widget-header ui-corner-left").css({
      height: "95%",
      width: "0%"
    });
  return t.append(e, i)
}, window.NOMENSA.player.MediaplayerDecorator.prototype.setSliderTimeout = function () {
  var t = this;
  t.sliderInterval == undefined && (t.sliderInterval = setInterval(function () {
    t.updateSlider()
  }, t.config.sliderTimeout))
}, window.NOMENSA.player.MediaplayerDecorator.prototype.clearSliderTimeout = function () {
  var t = this;
  t.sliderInterval != undefined && (t.sliderInterval = clearInterval(t.sliderInterval))
}, window.NOMENSA.player.MediaplayerDecorator.prototype.updateSlider = function () {
  var t = "undefined" != typeof this.duration ? this.duration : this.getDuration(),
    e = "boolean" == typeof this.duration_found && this.duration_found, i = this.getCurrentTime(), n = 0;
  0 < t ? (n = i / t * 100, n = parseInt(n, 10)) : t = 0, e || ($("#duration-" + this.config.id).html(this.formatTime(parseInt(t, 10))), this.duration_found = !0), $("#slider-" + this.config.id).find("a.ui-slider-handle").attr({
    "aria-valuenow": n,
    "aria-valuetext": n.toString() + " percent"
  }).css("left", n.toString() + "%"), $("#progress-bar-" + this.config.id).attr({
    "aria-valuenow": n,
    "aria-valuetext": n.toString() + " percent"
  }).css("width", n.toString() + "%"), this.updateLoaderBar(), this.updateTime(i)
}, window.NOMENSA.player.MediaplayerDecorator.prototype.updateLoaderBar = function () {
  var t = this.getBytesLoaded() / this.getBytesTotal() * 100;
  t = parseInt(t, 10), isFinite(t) || (t = 0), $("#loaded-bar-" + this.config.id).attr({
    "aria-valuetext": t.toString() + " percent",
    "aria-valuenow": t
  }).css("width", t.toString() + "%")
}, window.NOMENSA.player.MediaplayerDecorator.prototype.formatTime = function (t) {
  var e = 0, i = 0, n = 0;
  60 <= t ? (n = t - 60 * (i = parseInt(t / 60, 10)), 60 <= i && (e = parseInt(i / 60, 10), i -= parseInt(60 * e, 10))) : n = t;
  for (var a = [e, i, n], o = 0; o < a.length; o += 1) a[o] = a[o] < 10 ? "0" + a[o].toString() : a[o].toString();
  return a.join(":")
}, window.NOMENSA.player.MediaplayerDecorator.prototype.updateTime = function (t) {
  var e = this.formatTime(parseInt(t, 10));
  this.$html.find("#current-" + this.config.id).html(e)
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getControls = function () {
  var t = $("<span />").addClass("ui-corner-bottom").addClass("control-bar"),
    e = $("<a />").attr("href", "http://www.nomensa.com?ref=logo").html("Accessible Media Player by Nomensa").addClass("logo");
  t.append(e);
  for (var i = [this.getFuncControls(), this.getVolControls(), this.getSliderBar()], n = 0; n < i.length; n += 1) t[0].appendChild(i[n][0]);
  return t
}, window.NOMENSA.player.MediaplayerDecorator.prototype.updateVolume = function (t) {
  $("#vol-" + this.config.id).text(t.toString() + "%");
  var e = this.$html.find("button.mute");
  0 == t ? e.addClass("muted") : e.hasClass("muted") && e.removeClass("muted")
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getCaptions = function () {
  var e = this;
  if (e.config.captions) {
    $.ajax({
      url: e.config.captions, success: function (t) {
        0 < $(t).find("p").length && (e.captions = $(t).find("p"))
      }
    })
  }
}, window.NOMENSA.player.MediaplayerDecorator.prototype.toggleCaptions = function () {
  var t = this, e = this.$html.find(".captions");
  e.hasClass("captions-off") ? (e.removeClass("captions-off").addClass("captions-on"), t.getPreviousCaption(), t.setCaptionTimeout(), t.config.captionsOn = !0) : (e.removeClass("captions-on").addClass("captions-off"), t.clearCaptionTimeout(), t.$html.find(".caption").remove(), t.config.captionsOn = !1)
}, window.NOMENSA.player.MediaplayerDecorator.prototype.syncCaptions = function () {
  var t;
  if (this.captions) {
    var e = this.getCurrentTime();
    e = this.formatTime(parseInt(e, 10)), 1 == (t = this.captions.filter('[begin="' + e + '"]')).length && this.insertCaption(t)
  }
}, window.NOMENSA.player.MediaplayerDecorator.prototype.insertCaption = function (t) {
  if (1 == this.$html.find(".caption").length) this.$html.find(".caption").text(t.text()); else {
    var e = $("<div>").text(t.text());
    e[0].className = "caption", this.$html.find(".video").prepend(e)
  }
}, window.NOMENSA.player.MediaplayerDecorator.prototype.getPreviousCaption = function (t) {
  var e;
  t == undefined && (t = this.getCurrentTime());
  var i = this.formatTime(parseInt(t, 10));
  if (this.captions) {
    for (e = this.captions.filter('[begin="' + i + '"]'); 1 != e.length && 0 < t;) t--, i = this.formatTime(parseInt(t, 10)), e = this.captions.filter('[begin="' + i + '"]');
    1 == e.length && this.insertCaption(e)
  }
}, window.NOMENSA.player.MediaplayerDecorator.prototype.destroyPlayerInstance = function () {
  return !1
}, window.NOMENSA.player.MediaplayerDecorator.prototype.destroy = function () {
  this.clearSliderTimeout(), this.clearCaptionTimeout(), this.destroyPlayerInstance(), this.$html.remove()
}, window.NOMENSA.player.MediaplayerDecorator.prototype.setCaptionTimeout = function () {
  var t = this;
  t.captionInterval == undefined && (t.captionInterval = setInterval(function () {
    t.syncCaptions()
  }, 500))
}, window.NOMENSA.player.MediaplayerDecorator.prototype.clearCaptionTimeout = function () {
  this.captionInterval != undefined && (this.captionInterval = clearInterval(this.captionInterval))
}, window.NOMENSA = window.NOMENSA || {}, window.NOMENSA.player = window.NOMENSA.player || {}, jQuery(function (t) {
  t(window).resize(function () {
    t(".player-container").each(function () {
      580 < t(this).width() ? t(this).addClass("player-wide") : t(this).removeClass("player-wide")
    })
  })
}), "undefined" == typeof window.postMessage && (window.NOMENSA.player.stateHandlers = {}), window.NOMENSA.player.PlayerManager = function () {
  var i = {};
  this.getPlayer = function (t) {
    return i[t] != undefined ? i[t] : null
  }, this.addPlayer = function (t) {
    return i[t.config.id] = t, !0
  }, this.removePlayer = function (t) {
    i[t] != undefined && (i[t].destroy(), delete i[t])
  }, this.map = function (t) {
    var e;
    for (e in i) t(i[e])
  }
}, window.NOMENSA.player.PlayerDaemon = new window.NOMENSA.player.PlayerManager;
var html5_methods = {
  play: function () {
    this.player.play(), this.setSliderTimeout(), this.config.captionsOn && this.captions && this.setCaptionTimeout()
  }, pause: function () {
    this.player.pause(), this.clearSliderTimeout(), this.config.captionsOn && this.captions && this.clearCaptionTimeout()
  }, ffwd: function () {
    var t = this.getCurrentTime() + this.config.playerSkip;
    this.seek(t)
  }, rewd: function () {
    var t = this.getCurrentTime() - this.config.playerSkip;
    t < 0 && (t = 0), this.seek(t)
  }, mute: function () {
    var t = this.$html.find("button.mute");
    this.player.muted ? (this.player.muted = !1, t.hasClass("muted") && t.removeClass("muted")) : (this.player.muted = !0, t.addClass("muted"))
  }, volup: function () {
    var t = 100 * this.player.volume;
    t < 100 - this.config.volumeStep ? t += this.config.volumeStep : t = 100, this.player.volume = t / 100, this.updateVolume(Math.round(t))
  }, voldwn: function () {
    var t = 100 * this.player.volume;
    t > this.config.volumeStep ? t -= this.config.volumeStep : t = 0, this.player.volume = t / 100, this.updateVolume(Math.round(t))
  }, getDuration: function () {
    return this.player.duration
  }, getCurrentTime: function () {
    return this.player.currentTime
  }, getBytesLoaded: function () {
    return this.player.buffered.end(0)
  }, getBytesTotal: function () {
    return this.player.duration
  }, seek: function (t) {
    this.player.currentTime = t
  }, cue: function () {
  }
};
!function (d) {
  d.fn.player = function (t, e) {
    function o() {
      this.config = s, d.extend(!0, this, r, e), this.is_html5 = !1;
      var t = n(this);
      t && this.config.useHtml5 ? (this.config.media = t.src, this.is_html5 = !0, this.$html = this.assembleHTML5(t.container, t.mimetype), d.extend(this, html5_methods)) : (this.config.media instanceof Array && "undefined" != typeof this.config.media.push && (this.config.media = this.config.media[0]), this.$html = this.assembleHTML()), this.config.captions && this.getCaptions()
    }

    var i = {
      id: "media_player",
      url: window.location.protocol + "//www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=",
      media: "8LiQ-bLJaM4",
      repeat: !1,
      captions: null,
      captionsOn: !0,
      flashWidth: "100%",
      flashHeight: "300px",
      playerStyles: {height: "100%", width: "100%"},
      sliderTimeout: 350,
      flashContainer: "span",
      playerContainer: "span",
      image: "",
      playerSkip: 10,
      volumeStep: 10,
      buttons: {forward: !0, rewind: !0, toggle: !0},
      logoURL: "http://www.nomensa.com?ref=logo",
      useHtml5: !0,
      swfCallback: null
    }, s = d.extend(!0, {}, i, t), n = function (t) {
      var e, i, n, a, o, s, r = t.config.media;
      if (a = function (t) {
        if ((e = document.createElement(t.container)).canPlayType != undefined && ("maybe" == (n = e.canPlayType(t.mimetype)).toLowerCase() || "probably" == n.toLowerCase())) return !0
      }, "string" == typeof r && a(i = l(r))) return i.src = r, i;
      if (r instanceof Array && "undefined" != typeof r.push) for (o = 0, s = r.length; o < s; o++) if (a(i = l(r[o]))) return i.src = r[o], i;
      return !1
    }, a = function (t) {
      var e = "", i = "video";
      switch (t) {
        case"mp4":
        case"m4v":
          e = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
          break;
        case"ogg":
        case"ogv":
          e = 'video/ogg; codecs="theora, vorbis"';
          break;
        case"webm":
          e = 'video/webm; codecs="vp8, vorbis"';
          break;
        case"mp3":
          e = "audio/mpeg", i = "audio"
      }
      return {mimetype: e, container: i}
    }, l = function (t) {
      var e = t.lastIndexOf(".");
      if (-1 != e) {
        var i = t.substring(e + 1);
        return a(i)
      }
      return null
    }, c = function () {
      return !!window.NOMENSA.browser.mozilla && 2 <= parseInt(window.NOMENSA.browser.version, 10)
    }, r = {
      generatePlayerContainer: function () {
        var t = d("<" + this.config.playerContainer + " />").css(this.config.playerStyles).addClass("player-container");
        return window.NOMENSA.browser.msie && t.addClass("player-container-ie player-container-ie-" + window.NOMENSA.browser.version.substring(0, 1)), t
      }, getFlashVars: function () {
        var t = {controlbar: "none", file: this.config.media};
        return "" != this.config.image && (t.image = this.config.image), this.config.repeat && (t.repeat = this.config.repeat), t
      }, getFlashParams: function () {
        return {allowScriptAccess: "always", wmode: "transparent"}
      }, getURL: function () {
        return [this.config.url, this.config.id].join("")
      }, generateFlashPlayer: function (t) {
        var e = this, i = this.getFlashVars(), n = this.getFlashParams(),
          a = {id: this.config.id, name: this.config.id},
          o = d("<" + this.config.flashContainer + " />").attr("id", "player-" + this.config.id).addClass("flashReplace").html('This content requires Macromedia Flash Player. You can <a href="http://get.adobe.com/flashplayer/">install or upgrade the Adobe Flash Player here</a>.'),
          s = d("<span />").addClass("video"), r = this.getURL();
        return setTimeout(function () {
          swfobject.embedSWF(r, o.attr("id"), e.config.flashWidth, e.config.flashHeight, "9.0.115", null, i, n, a, e.config.swfCallback), c() && e.$html.find("object").attr("tabindex", "-1")
        }, 0), t.append(s.append(o)), t
      }, generateHTML5Player: function (t, e, i) {
        var n = d("<span />");
        n[0].className = "video";
        var a = d("<" + e + " />").attr({
          id: this.config.id,
          src: this.config.media,
          type: i
        }).css({width: "100%", height: "50%"});
        return "" != d.trim(this.config.image) && a.attr({poster: d.trim(this.config.image)}), t.append(n.append(a))
      }, createButton: function (t, e) {
        var i = [t, this.config.id].join("-");
        return d("<button />").append(e).addClass(t).attr({
          title: t,
          id: i
        }).addClass("ui-corner-all ui-state-default").hover(function () {
          d(this).addClass("ui-state-hover")
        }, function () {
          d(this).removeClass("ui-state-hover")
        }).focus(function () {
          d(this).addClass("ui-state-focus")
        }).blur(function () {
          d(this).removeClass("ui-state-focus")
        }).click(function (t) {
          t.preventDefault()
        })
      }, getFuncControls: function () {
        var t = this, e = d("<div>");
        e[0].className = "player-controls";
        var i, n = [];
        if (t.config.buttons.toggle) {
          var a = t.createButton("play", "Play").attr({"aria-live": "assertive"}).click(function () {
            d(this).hasClass("play") ? (d(this).removeClass("play").addClass("pause").attr({
              title: "Pause",
              id: "pause-" + t.config.id
            }).text("Pause"), t.play()) : (d(this).removeClass("pause").addClass("play").attr({
              title: "Play",
              id: "play-" + t.config.id
            }).text("Play"), t.pause())
          });
          n.push(a)
        } else {
          var o = t.createButton("play", "Play").click(function () {
            t.play()
          }), s = t.createButton("pause", "Pause").click(function () {
            t.pause()
          });
          n.push(o), n.push(s)
        }
        if (t.config.buttons.rewind) {
          var r = t.createButton("rewind", "Rewind").click(function () {
            t.rewd()
          });
          n.push(r)
        }
        if (t.config.buttons.forward) {
          var l = t.createButton("forward", "Forward").click(function () {
            t.ffwd()
          });
          n.push(l)
        }
        if (t.config.captions) {
          var c = t.createButton("captions", "Captions").click(function () {
            t.toggleCaptions()
          }), u = 1 == t.config.captionsOn ? "captions-on" : "captions-off";
          c.addClass(u), n.push(c)
        }
        for (i = 0; i < n.length; i += 1) e[0].appendChild(n[i][0]);
        return e
      }, getVolControls: function () {
        var t, e = this, i = d("<div>").addClass("volume-controls"),
          n = e.createButton("mute", "Mute").click(function () {
            e.mute()
          }),
          a = e.createButton("vol-up", '+<span class="ui-helper-hidden-accessible"> Volume Up</span>').click(function () {
            e.volup()
          }),
          o = [n, e.createButton("vol-down", '-<span class="ui-helper-hidden-accessible"> Volume Down</span>').click(function () {
            e.voldwn()
          }), a, d("<span />").attr({id: "vol-" + e.config.id, "class": "vol-display"}).text("100%")];
        for (t = 0; t < o.length; t += 1) i[0].appendChild(o[t][0]);
        return i
      }, getSliderBar: function () {
        var t,
          e = d("<span />").addClass("ui-helper-hidden-accessible").html("<p>The timeline slider below uses WAI ARIA. Please use the documentation for your screen reader to find out more.</p>"),
          i = d("<span />").addClass("current-time").attr({id: "current-" + this.config.id}).text("00:00:00"),
          n = this.getSlider(),
          a = d("<span />").addClass("duration-time").attr({id: "duration-" + this.config.id}).text("00:00:00"),
          o = d("<div />").addClass("timer-bar").append(e), s = [i, n, a];
        for (t = 0; t < s.length; t += 1) o[0].appendChild(s[t][0]);
        return o
      }, getSlider: function () {
        var n = this, t = d("<span />").attr("id", "slider-" + this.config.id).slider({
          orientation: "horizontal",
          change: function (t, e) {
            var i = e.value / 100 * n.getDuration();
            n.seek(i)
          }
        });
        t.find("a.ui-slider-handle").attr({
          role: "slider",
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-valuenow": "0",
          "aria-valuetext": "0 percent",
          title: "Slider Control"
        });
        var e = d("<span />").addClass("progress-bar").attr({
            id: "progress-bar-" + this.config.id,
            tabindex: "-1"
          }).addClass("ui-progressbar-value ui-widget-header ui-corner-left").css({width: "0%", height: "95%"}),
          i = d("<span />").attr({
            id: "loaded-bar-" + this.config.id,
            tabindex: "-1"
          }).addClass("loaded-bar ui-progressbar-value ui-widget-header ui-corner-left").css({
            height: "95%",
            width: "0%"
          });
        return t.append(e, i)
      }, setSliderTimeout: function () {
        var t = this;
        t.sliderInterval == undefined && (t.sliderInterval = setInterval(function () {
          t.updateSlider()
        }, t.config.sliderTimeout))
      }, clearSliderTimeout: function () {
        var t = this;
        t.sliderInterval != undefined && (t.sliderInterval = clearInterval(t.sliderInterval))
      }, updateSlider: function () {
        var t = "undefined" != typeof this.duration ? this.duration : this.getDuration(),
          e = "boolean" == typeof this.duration_found && this.duration_found, i = this.getCurrentTime(),
          n = 0;
        0 < t ? (n = i / t * 100, n = parseInt(n, 10)) : t = 0, e || (d("#duration-" + this.config.id).html(this.formatTime(parseInt(t, 10))), this.duration_found = !0), d("#slider-" + this.config.id).find("a.ui-slider-handle").attr({
          "aria-valuenow": n,
          "aria-valuetext": n.toString() + " percent"
        }).css("left", n.toString() + "%"), d("#progress-bar-" + this.config.id).attr({
          "aria-valuenow": n,
          "aria-valuetext": n.toString() + " percent"
        }).css("width", n.toString() + "%"), this.updateLoaderBar(), this.updateTime(i)
      }, updateLoaderBar: function () {
        var t = this.getBytesLoaded() / this.getBytesTotal() * 100;
        t = parseInt(t, 10), isFinite(t) || (t = 0), d("#loaded-bar-" + this.config.id).attr({
          "aria-valuetext": t.toString() + " percent",
          "aria-valuenow": t
        }).css("width", t.toString() + "%")
      }, formatTime: function (t) {
        var e = 0, i = 0, n = 0;
        60 <= t ? (n = t - 60 * (i = parseInt(t / 60, 10)), 60 <= i && (e = parseInt(i / 60, 10), i -= parseInt(60 * e, 10))) : n = t;
        var a, o = [e, i, n];
        for (a = 0; a < o.length; a += 1) o[a] = o[a] < 10 ? "0" + o[a].toString() : o[a].toString();
        return o.join(":")
      }, updateTime: function (t) {
        var e = this.formatTime(parseInt(t, 10));
        this.$html.find("#current-" + this.config.id).html(e)
      }, getControls: function () {
        var t = d("<span />").addClass("ui-corner-bottom").addClass("control-bar"),
          e = d("<a />").attr("href", "http://www.nomensa.com?ref=logo").html("Accessible Media Player by Nomensa").addClass("logo");
        t.append(e);
        var i, n = [this.getFuncControls(), this.getVolControls(), this.getSliderBar()];
        for (i = 0; i < n.length; i += 1) t[0].appendChild(n[i][0]);
        return t
      }, assembleHTML: function () {
        var t = this.generatePlayerContainer();
        return this.generateFlashPlayer(t).append(this.getControls())
      }, assembleHTML5: function (t, e) {
        var i = this.generatePlayerContainer();
        return this.generateHTML5Player(i, t, e).append(this.getControls())
      }, updateVolume: function (t) {
        d("#vol-" + this.config.id).text(t.toString() + "%");
        var e = this.$html.find("button.mute");
        0 == t ? e.addClass("muted") : e.hasClass("muted") && e.removeClass("muted")
      }, getCaptions: function () {
        var e = this;
        if (e.config.captions) {
          d.ajax({
            url: e.config.captions, success: function (t) {
              0 < d(t).find("p").length && (e.captions = d(t).find("p"))
            }
          })
        }
      }, syncCaptions: function () {
        var t;
        if (this.captions) {
          var e = this.getCurrentTime();
          e = this.formatTime(parseInt(e, 10)), 1 == (t = this.captions.filter('[begin="' + e + '"]')).length && this.insertCaption(t)
        }
      }, insertCaption: function (t) {
        if (1 == this.$html.find(".caption").length) this.$html.find(".caption").text(t.text()); else {
          var e = d("<div>").text(t.text());
          e[0].className = "caption", this.$html.find(".video").prepend(e)
        }
      }, getPreviousCaption: function (t) {
        var e;
        t == undefined && (t = this.getCurrentTime());
        var i = this.formatTime(parseInt(t, 10));
        if (this.captions) {
          for (e = this.captions.filter('[begin="' + i + '"]'); 1 != e.length && 0 < t;) t--, i = this.formatTime(parseInt(t, 10)), e = this.captions.filter('[begin="' + i + '"]');
          1 == e.length && this.insertCaption(e)
        }
      }, destroyPlayerInstance: function () {
        return !1
      }, destroy: function () {
        this.clearSliderTimeout(), this.clearCaptionTimeout(), this.destroyPlayerInstance(), this.$html.remove()
      }, setCaptionTimeout: function () {
        var t = this;
        t.captionInterval == undefined && (t.captionInterval = setInterval(function () {
          t.syncCaptions()
        }, 500))
      }, clearCaptionTimeout: function () {
        this.captionInterval != undefined && (this.captionInterval = clearInterval(this.captionInterval))
      }, play: function () {
        this.player.playVideo(), this.setSliderTimeout(), this.config.captionsOn && this.captions && this.setCaptionTimeout()
      }, pause: function () {
        this.player.pauseVideo(), this.clearSliderTimeout(), this.config.captionsOn && this.captions && this.clearCaptionTimeout()
      }, ffwd: function () {
        var t = this.getCurrentTime() + this.config.playerSkip;
        this.seek(t)
      }, rewd: function () {
        var t = this.getCurrentTime() - this.config.playerSkip;
        t < 0 && (t = 0), this.seek(t)
      }, mute: function () {
        var t = this.$html.find("button.mute");
        this.player.isMuted() ? (this.player.unMute(), t.hasClass("muted") && t.removeClass("muted")) : (this.player.mute(), t.addClass("muted"))
      }, volup: function () {
        var t = this.player.getVolume();
        t < 100 - this.config.volumeStep ? t += this.config.volumeStep : t = 100, this.player.setVolume(t), this.updateVolume(t)
      }, voldwn: function () {
        var t = this.player.getVolume();
        t > this.config.volumeStep ? t -= this.config.volumeStep : t = 0, this.player.setVolume(t), this.updateVolume(t)
      }, getDuration: function () {
        return this.player.getDuration()
      }, getCurrentTime: function () {
        return this.player.getCurrentTime()
      }, getBytesLoaded: function () {
        return this.player.getVideoBytesLoaded()
      }, getBytesTotal: function () {
        return this.player.getVideoBytesTotal()
      }, seek: function (t) {
        this.player.seekTo(t), this.config.captionsOn && this.captions && (this.$html.find(".caption").remove(), this.clearCaptionTimeout(), this.setCaptionTimeout(), this.getPreviousCaption())
      }, cue: function () {
        this.player.cueVideoById(this.config.media)
      }, toggleCaptions: function () {
        var t = this, e = this.$html.find(".captions");
        e.hasClass("captions-off") ? (e.removeClass("captions-off").addClass("captions-on"), t.getPreviousCaption(), t.setCaptionTimeout(), t.config.captionsOn = !0) : (e.removeClass("captions-on").addClass("captions-off"), t.clearCaptionTimeout(), t.$html.find(".caption").remove(), t.config.captionsOn = !1)
      }
    };
    return this.each(function (t) {
      var e, i, n = d(this), a = function (t) {
        580 < t.$html.width() && t.$html.addClass("player-wide"), t.is_html5 && (t.player = document.getElementById(t.config.id))
      };
      s.url.match(/^(http|https)\:\/\/www\.youtube\.com/) ? (e = new window.NOMENSA.player.YoutubePlayer(s), (i = new window.NOMENSA.player.MediaplayerDecorator(e)).onPlayerReady(function () {
        a(i), this.getPlayer().setLoop(!0)
      }), i.init(n)) : (i = new o(t), n.html(i.$html), a(i), window.NOMENSA.player.PlayerDaemon.addPlayer(i))
    })
  }
}(jQuery), function (c) {
  "use strict";

  function t() {
    function s() {
      var t = document.location.protocol;
      return "file:" == t && (t = "https:"), t
    }

    function r(t) {
      if (-1 < t.indexOf("youtube.com")) {
        var e, i, n, a = {};
        if (1 === (o = t.split("?")).length) return;
        for (e = 0, i = (o = o[1].split("&")).length; e < i; e++) a[(n = o[e].split("="))[0]] = n[1];
        return a.v
      }
      var o;
      if (-1 < t.indexOf("youtu.be")) return (o = t.split("/")).pop()
    }

    function l(t) {
      return "off" != t.attr("data-youtube-player")
    }

    function t(t) {
      t.find("a[href*='youtube.com'], a[href*='youtu.be']").each(function (t) {
        var e = c(this);
        if (l(e)) {
          var i = r(e.attr("href"));
          if (void 0 !== i) {
            var n = c('<span class="media-player" />'), a = e.siblings(".captions");
            e.parent().replaceWith(n);
            var o = s();
            n.player({
              id: "youtube-" + t,
              media: i,
              captions: 0 < a.length ? a.attr("href") : null,
              url: o + "//www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid="
            })
          }
        }
      })
    }

    return {getProtocol: s, enhanceYoutubeVideoLinks: t}
  }

  window.GOVUK = window.GOVUK || {}, GOVUK.enhanceYoutubeVideoLinks = new t, GOVUK.enhanceYoutubeVideoLinks.enhanceYoutubeVideoLinks(c(".govuk-govspeak:not(.disable-youtube)"))
}(jQuery), function (u) {
  var i = function () {
    this.init = function (t, e) {
      var i = {
        outOf: 65,
        applyOnInit: !0,
        toggleText: "Toggle between chart and table",
        autoOutdent: !1,
        outdentAll: !1
      };
      this.options = u.extend({}, i, e);
      var n = function () {
        for (var t, e = 3, i = document.createElement("div"), n = i.getElementsByTagName("i"); i.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", e < 10 && n[0];) ;
        return 4 < e ? e : t
      }();
      return this.ENABLED = !(n && n < 8), this.$table = t, this.$graph = u("<div/>").attr("aria-hidden", "true"), this.$graph.attr("class", this.$table.attr("class")).addClass("mc-chart"), this.options.stacked = this.$table.hasClass("mc-stacked"), this.options.negative = this.$table.hasClass("mc-negative"), this.options.multiple = !this.options.stacked && (this.$table.hasClass("mc-multiple") || 2 < this.$table.find("tbody tr").first().find("td").length), this.options.autoOutdent = this.options.autoOutdent || this.$table.hasClass("mc-auto-outdent"), this.options.outdentAll = this.options.outdentAll || this.$table.hasClass("mc-outdented"), this.options.multiple && this.$graph.addClass("mc-multiple"), this.options.hasCaption = !!this.$table.find("caption").length, this.ENABLED && (this.apply(), this.options.applyOnInit || this.toggle()), this
    }
  };
  i.prototype.construct = {}, i.prototype.construct.thead = function () {
    var t = u("<div />", {"class": "mc-thead"}), e = u("<div />", {"class": "mc-tr"}), i = "";
    return this.$table.find("th").each(function (t, e) {
      i += '<div class="mc-th">', i += u(e).html(), i += "</div>"
    }), e.append(i), t.append(e), t
  }, i.prototype.construct.tbody = function () {
    var a = u("<div />", {"class": "mc-tbody"});
    return this.$table.find("tbody tr").each(function (t, e) {
      var i = u("<div />", {"class": "mc-tr"}), n = "";
      u(e).find("td").each(function (t, e) {
        n += '<div class="mc-td">', n += u(e).html(), n += "</div>"
      }), i.append(n), a.append(i)
    }), a
  }, i.prototype.construct.caption = function () {
    return this.$table.find("caption").clone()
  }, i.prototype.construct.toggleLink = function () {
    var e = this;
    return u("<a />", {
      href: "#",
      "class": "mc-toggle-link",
      text: this.options.toggleText
    }).on("click", function (t) {
      e.toggle(t)
    })
  }, i.prototype.constructChart = function () {
    var t = this.construct.thead.call(this), e = this.construct.tbody.call(this),
      i = this.construct.toggleLink.call(this);
    if (this.options.hasCaption) {
      var n = this.construct.caption.call(this);
      this.$graph.append(n)
    }
    this.$table.before(i), this.$graph.append(t), this.$graph.append(e)
  }, i.prototype.apply = function () {
    this.ENABLED && (this.constructChart(), this.addClassesToHeader(), this.calculateMaxWidth(), this.applyWidths(), this.insert(), this.$table.addClass("visually-hidden"), this.applyOutdent())
  }, i.prototype.toggle = function (t) {
    this.$graph.toggle(), this.$table.toggleClass("visually-hidden"), t && t.preventDefault()
  }, i.prototype.utils = {
    isFloat: function (t) {
      return !isNaN(parseFloat(t))
    }, stripValue: function (t) {
      var e = new RegExp("\\,|\xa3|%|[a-z]", "gi");
      return t.replace(e, "")
    }, returnMax: function (t) {
      for (var e = 0, i = 0; i < t.length; i++) t[i] > e && (e = t[i]);
      return e
    }, isNegative: function (t) {
      return t < 0
    }
  }, i.prototype.addClassesToHeader = function () {
    var t = this.$graph.find(".mc-th").filter(":not(:first)");
    this.options.stacked && (t.last().addClass("mc-stacked-header mc-header-total"), t = t.filter(":not(:last)")), t.addClass("mc-key-header").filter(":not(.mc-stacked-header)").each(function (t, e) {
      u(e).addClass("mc-key-" + (t + 1))
    })
  }, i.prototype.calculateMaxWidth = function () {
    var r = this, l = [], c = 0;
    this.$graph.find(".mc-tr").each(function (t, e) {
      var i = u(e), n = i.find(".mc-td:not(:first)");
      if (r.options.stacked) {
        n.last().addClass("mc-stacked-total");
        n = n.filter(":not(:last)")
      }
      i.find(".mc-td:first").addClass("mc-key-cell");
      var s = 0;
      n.each(function (t, e) {
        var i = u(e).addClass("mc-bar-cell").addClass("mc-bar-" + (t + 1)), n = r.utils.stripValue(i.text());
        if (r.utils.isFloat(n)) {
          var a = parseFloat(n, 10), o = Math.abs(a);
          0 === a && i.addClass("mc-bar-zero"), r.options.negative && (r.utils.isNegative(a) ? (i.addClass("mc-bar-negative"), c < o && (c = o)) : i.addClass("mc-bar-positive")), a = o, r.options.stacked ? s += a : (s = a, l.push(a))
        }
      }), r.options.stacked && l.push(s)
    });
    var t = {};
    return t.max = parseFloat(r.utils.returnMax(l), 10), t.single = parseFloat(this.options.outOf / t.max, 10), this.options.negative && (t.marginLeft = parseFloat(c, 10) * t.single, t.maxNegative = parseFloat(c, 10)), t
  }, i.prototype.applyWidths = function () {
    this.dimensions = this.calculateMaxWidth();
    var l = this;
    this.$graph.find(".mc-tr").each(function (t, e) {
      var i = u(e);
      i.find(".mc-bar-cell:not(.mc-bar-zero)").length;
      i.find(".mc-bar-cell").each(function (t, e) {
        var i = u(e), n = parseFloat(l.utils.stripValue(i.text()), 10), a = n * l.dimensions.single,
          o = Math.abs(n), s = Math.abs(a);
        if (l.options.negative) if (i.hasClass("mc-bar-positive")) i.css("margin-left", l.dimensions.marginLeft + "%"); else if (o < l.dimensions.maxNegative) {
          var r = (l.dimensions.maxNegative - o) * l.dimensions.single;
          i.css("margin-left", r + "%")
        }
        i.wrapInner("<span />"), i.css("width", s + "%")
      })
    })
  }, i.prototype.insert = function () {
    this.$table.after(this.$graph)
  }, i.prototype.applyOutdent = function () {
    var r = this;
    this.$graph.find(".mc-bar-cell");
    this.$graph.find(".mc-bar-cell").each(function (t, e) {
      var i = u(e), n = parseFloat(r.utils.stripValue(i.text()), 10), a = i.children("span"), o = a.width() + 10,
        s = i.width();
      parseFloat(i[0].style.width, 10), i.height();
      r.options.stacked ? s < o && 0 < n && i.addClass("mc-value-overflow") : (0 === n && i.addClass("mc-bar-outdented"), r.options.autoOutdent && s < o || r.options.outdentAll ? (i.addClass("mc-bar-outdented"), a.css({
        "margin-left": "100%",
        display: "inline-block"
      })) : i.addClass("mc-bar-indented"))
    })
  }, u.magnaCharta = function (t, e) {
    return (new i).init(t, e)
  }
}(jQuery), $(govspeakBarcharts), function (t) {
  "use strict";
  var e = t.jQuery, i = t.GOVUK || {};
  i.shimLinksWithButtonRole = {
    init: function () {
      e(document).on("keydown", '[role="button"]', function (t) {
        32 === t.which && (t.preventDefault(), t.target.click())
      })
    }
  }, t.GOVUK = i
}(window);