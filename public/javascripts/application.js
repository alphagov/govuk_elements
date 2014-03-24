$(document).ready(function () {
    
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

  // Example - Form focus styles
  
  if ($('.form').length>0) {

      $(".block-label input").focus(function() {
        $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
        $("label").removeClass("add-focus");
      });
      
  }
  
});