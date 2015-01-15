/**
 * ----------------------------------------------------------------------------------------------------------------------------------
 *  jQuery WordCount plugin
 *  @author Anthony S. Wu
 *  @date January 15, 2015
 *  @version 0.7.0
 *
 *  Note:
 *      Change "bind" function to "on", for jQuery version > 1.8
 * ----------------------------------------------------------------------------------------------------------------------------------
 */
 (function($){

  $.fn.wordcount = function(options, callback, callback2) {

    var defaults = {
      max_word: 100,
      max_word_message: "Max Word Exceeded. ",
      wc_target: "#wordcount",
      wc_target_wrapper: "wc-counting",
      wc_target_indicator: "wc-indicator",
      wc_target_indicator_wrapper: "span",
      wc_target_indicator_message: "Remaining Wordcount: ",
      warn_at: 0,
      warn_class: "warning"
    };

    options = $.extend(defaults, options);

    function wccheck(callback, this_obj) {
      // Update Word Count
      var wc = this_obj.iwcount();
      this_obj.closest("." + options.wc_target_wrapper).find("." + options.wc_target_indicator).text(options.wc_target_indicator_message + " " + (parseInt(options.max_word, 10) - parseInt(wc, 10)));

      if((options.max_word - wc) <= options.warn_at) {
        this_obj.closest("." + options.wc_target_wrapper).find("." + options.wc_target_indicator).addClass(options.warn_class);
      }
      else {
        this_obj.closest("." + options.wc_target_wrapper).find("." + options.wc_target_indicator).removeClass(options.warn_class);
      }

      if(wc > options.max_word) {
        if(typeof callback == 'function'){
          callback.call(this);
        }
      }
      else if(wc <= options.max_word){
        if(typeof callback2 == 'function'){
          callback2.call(this);
        }
      }
    }

    return this.each(function() {
      // Save for reference
      var this_obj = $(this);

      // Init setup for target objects.
      this_obj.wrap('<div class="' + options.wc_target_wrapper + '">');
      this_obj.closest("." + options.wc_target_wrapper).append('<' + options.wc_target_indicator_wrapper + ' class="' + options.wc_target_indicator + '"></' + options.wc_target_indicator_wrapper + '>');

      // Init
      wccheck(callback, this_obj);

      // Actions
      this_obj.bind("keyup change keypress", function(e) {
        wccheck(callback, this_obj);
      });

      // Bind with click function.
      this_obj.closest("form").find("[type=submit]").bind("click", function(e) {
        wccheck(callback, this_obj);
      });
      // Bind with form submit function, in case hack submit directly from JavaScript console.
      this_obj.closest("form").bind("submit", function(e) {
        wccheck(callback, this_obj);
      });
    });
  };

  // Standalone function detection wordcount.
  $.fn.iwcount = function() {

    var text = $.trim($(this).val());
    var word_limit = 16;

    if(text === "") {
      return 0;
    }
    var text_tokens = text.split(" ");
    var word_count = 0;

    for(var i = 0, c = text_tokens.length; i < c; i++) {

      if(text_tokens[i].match(/[\u30A0-\u30FF]/) || text_tokens[i].match(/[\u3040-\u309F]/) || text_tokens[i].match(/[\u4E00-\u9FBF]/)) {
        word_count += text_tokens[i].length;
      }
      else if(text_tokens[i].length > word_limit) {
        word_count += Math.ceil(text_tokens[i].match(/.{1,3}/g).length / word_limit);
      }
      else {
        word_count++;
      }
    }
    return word_count;

  };

})(jQuery);