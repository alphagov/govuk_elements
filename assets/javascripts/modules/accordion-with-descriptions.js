// Taken from https://github.com/alphagov/service-manual-frontend/blob/master/app/assets/javascripts/modules/accordion-with-descriptions.js

window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  "use strict";

  Modules.AccordionWithDescriptions = function() {

    this.start = function($element) {

      // Indicate that js has worked
      $element.addClass('js-accordion-with-descriptions');

      // Prevent FOUC, remove class hiding content
      $element.removeClass('js-hidden');

      var $subsectionHeaders = $element.find('.subsection__header');
      var totalSubsections = $element.find('.subsection__content').length;

      var $openOrCloseAllButton;
      var GOVUKServiceManualTopic = serviceManualTopicPrefix();

      addOpenCloseAllButton();
      addButtonsToSubsections();
      addIconsToSubsections();
      addAriaControlsAttrForOpenCloseAllButton();

      closeAllSections();
      checkSessionStorage();
      openLinkedSection();

      bindToggleForSubsections();
      bindToggleOpenCloseAllButton();

      function getserviceManualTopic() {
        return $('h1').text();
      }

      function replaceSpacesWithUnderscores(str) {
        return str.replace(/\s+/g,"_");
      }

      function serviceManualTopicPrefix() {
        var topic = getserviceManualTopic();
        topic = replaceSpacesWithUnderscores(topic);
        topic = topic.toLowerCase();

        return "GOVUK_service_manual_" + topic + "_";
      }

      function addOpenCloseAllButton() {
        $element.prepend( '<div class="subsection-controls js-subsection-controls"><button aria-expanded="false">Otvoriť všetko</button></div>' );
      }

      function addButtonsToSubsections() {
        var $subsectionTitle = $element.find('.subsection__title');

        // Wrap each title in a button, with aria controls matching the ID of the subsection
        $subsectionTitle.each(function(index) {
          $(this).wrapInner( '<button class="subsection__button js-subsection-button" aria-expanded="false" aria-controls="subsection_content_' + index +'"></button>' );
        });
      }

      function addIconsToSubsections() {
        $subsectionHeaders.append( '<span class="subsection__icon"></span>' );
      }

      function addAriaControlsAttrForOpenCloseAllButton() {
        // For each of the sections, create a string with all the subsection content IDs
        var ariaControlsValue = "";
        for (var i = 0; i < totalSubsections; i++) {
          ariaControlsValue += "subsection_content_"+i+" ";
        }

        $openOrCloseAllButton = $element.find('.js-subsection-controls button');

        // Set the aria controls for the open/close all button value for all content items
        $openOrCloseAllButton.attr('aria-controls', ariaControlsValue);
      }

      function closeAllSections() {
        $.each($element.find('.js-subsection'), function () {
          var subsectionView = new SubsectionView($(this));
          subsectionView.close();
        });
      }

      function openLinkedSection() {
        var anchor = getActiveAnchor(),
            $subsection;

        if (!anchor.length) {
          return;
        }

        $subsection = $element.find(anchor).parents('.js-subsection');

        if ($subsection.length) {
          var subsectionView = new SubsectionView($subsection);
          subsectionView.open();
        }
      }

      function getActiveAnchor() {
        return GOVUK.getCurrentLocation().hash;
      }

      function checkSessionStorage() {

        var $subsectionContent = $element.find('.subsection__content');

        $subsectionContent.each(function(index) {
          var subsectionContentId = $(this).attr('id');
          if(sessionStorage.getItem(GOVUKServiceManualTopic+subsectionContentId)){
            openStoredSections($element.find("#"+subsectionContentId));
          }
        });

        setOpenCloseAllText();
      }

      function setSessionStorage() {
        var isOpenSubsections = $element.find('.subsection--is-open').length;
        if (isOpenSubsections) {
          var $openSubsections = $element.find('.subsection--is-open');
          $openSubsections.each(function(index) {
            var subsectionOpenContentId = $(this).find('.subsection__content').attr('id');
            sessionStorage.setItem( GOVUKServiceManualTopic+subsectionOpenContentId , 'Opened');
          });
        }
      }

      function removeSessionStorage() {
        var isClosedSubsections = $element.find('.subsection').length;
        if (isClosedSubsections) {
          var $closedSubsections = $element.find('.subsection');
          $closedSubsections.each(function(index) {
            var subsectionClosedContentId = $(this).find('.subsection__content').attr('id');
            sessionStorage.removeItem( GOVUKServiceManualTopic+subsectionClosedContentId , subsectionClosedContentId);
          });
        }
      }

      function bindToggleForSubsections() {
        $element.find('.subsection__header').on('click', function(event) {
          var $subsectionHeader = $(this);
          var $subsection = $subsectionHeader.parent('.js-subsection');
          var subsectionView = new SubsectionView($subsection);

          subsectionView.toggle();
          setOpenCloseAllText();
          setSessionStorage();
          removeSessionStorage();

          var subsectionToggleClick = new SubsectionToggleClick(subsectionView, event);
          subsectionToggleClick.track();

          return false;
        });
      }

      function bindToggleOpenCloseAllButton() {
        $openOrCloseAllButton = $element.find('.js-subsection-controls button');
        $openOrCloseAllButton.on('click', function(e) {
          var action = '';

          // update button text
          if ($openOrCloseAllButton.text() == "Otvoriť všetko") {
            $openOrCloseAllButton.text("Zatvoriť všetko");
            $openOrCloseAllButton.attr("aria-expanded", "true");
            action = 'open';

            track('pageElementInteraction', 'accordionAllOpened', {
              label: 'Otvoriť všetko'
            });
          } else {
            $openOrCloseAllButton.text("Otvoriť všetko");
            $openOrCloseAllButton.attr("aria-expanded", "false");
            action = 'close';

            track('pageElementInteraction', 'accordionAllClosed', {
              label: 'Close All'
            });
          }

          $element.find('.js-subsection').each(function() {
            var $subsection = $(this);
            var $button = $subsection.find('.js-subsection-button');
            var $subsectionContent = $subsection.find('.js-subsection-content');

            if (action == 'open') {
              $button.attr("aria-expanded", "true");
              $subsectionContent.removeClass('js-hidden');
              $subsection.removeClass('subsection');
              $subsection.addClass('subsection--is-open');
            } else {
              $button.attr("aria-expanded", "false");
              $subsectionContent.addClass('js-hidden');
              $subsection.addClass('subsection');
              $subsection.removeClass('subsection--is-open');
            }
          });

          // Add any open sections to Session Storage
          setSessionStorage();

          // Remove any closed sections from Session Storage
          removeSessionStorage();

          return false;
        });
      }

      function openStoredSections($sectionContent) {
        var $subsection = $sectionContent.parent('.js-subsection');
        var subsectionView = new SubsectionView($subsection);
        subsectionView.open();

        setOpenCloseAllText();
      }

      function setOpenCloseAllText() {
        var openSubsections = $element.find('.subsection--is-open').length;
        // Find out if the number of is-opens == total number of sections
        if (openSubsections === totalSubsections) {
          $openOrCloseAllButton.text('Zatvoriť všetko');
        } else {
          $openOrCloseAllButton.text('Otvoriť všetko');
        }
      }

      function isSubsectionClosed($subsection) {
        var $subsectionContent = $subsection.find('.js-subsection-content');

        return $subsectionContent.hasClass('js-hidden');
      }

    }

    function SubsectionView ($subsectionElement) {
      var that = this;

      // The 'Content' is the container of links to guides
      this.$subsectionContent = $subsectionElement.find('.js-subsection-content');
      // The 'Button' is a button element that is wrapped around the title for
      // accessibility reasons
      this.$subsectionButton = $subsectionElement.find('.js-subsection-button');

      this.title = that.$subsectionButton.text();

      this.toggle = function () {
        if (that.isClosed()) {
          that.open();
        } else {
          that.close();
        }
      }

      this.open = function () {
        // Show the subsection content
        that.$subsectionContent.removeClass('js-hidden');
        // Swap the plus and minus sign
        $subsectionElement.removeClass('subsection');
        $subsectionElement.addClass('subsection--is-open');
        // Tell impaired users that the section is open
        that.$subsectionButton.attr("aria-expanded", "true");
      }

      this.close = function () {
        // Hide the subsection content
        that.$subsectionContent.addClass('js-hidden');
        // Swap the plus and minus sign
        $subsectionElement.removeClass('subsection--is-open');
        $subsectionElement.addClass('subsection');
        // Tell impaired users that the section is closed
        that.$subsectionButton.attr("aria-expanded", "false");
      }

      this.isClosed = function () {
        return that.$subsectionContent.hasClass('js-hidden');
      }
    }

    // A contructor for an object that represents a click event on a subsection which
    // handles the complexity of sending different tracking labels to Google Analytics
    // depending on which part of the subsection the user clicked.
    function SubsectionToggleClick (subsectionView, event) {
      var that = this;

      this.$target = $(event.target);

      this.track = function () {
        track('pageElementInteraction', that._trackingAction(), { label: that._trackingLabel() });
      }

      this._trackingAction = function () {
        return (subsectionView.isClosed() ? 'accordionClosed' : 'accordionOpened');
      }

      this._trackingLabel = function () {
        if (that._clickedOnIcon()) {
          return subsectionView.title + ' - ' + that._iconType() + ' Click';
        } else if (that._clickedOnHeading()) {
          return subsectionView.title + ' - Heading Click';
        } else {
          return subsectionView.title + ' - Click Elsewhere';
        }
      }

      this._clickedOnIcon = function () {
        return that.$target.hasClass('subsection__icon');
      }

      this._clickedOnHeading = function () {
        return that.$target.hasClass('js-subsection-button');
      }

      this._iconType = function () {
        return (subsectionView.isClosed() ? 'Minus' : 'Plus');
      }
    }

    // A helper that sends an custom event request to Google Analytics if
    // the GOVUK module is setup
    function track(category, action, options) {
      if (GOVUK.analytics && GOVUK.analytics.trackEvent) {
        GOVUK.analytics.trackEvent(category, action, options);
      }
    }
  };
})(window.GOVUK.Modules);