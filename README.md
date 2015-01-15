# Japanese Word Count Plug-in
------------------------------------------------------------
jQuery plug-in of word counting, primary targeted Japanese characters.

Current Version: 0.7.0


## Requirement
------------------------------------------------------------
jQuery 1.3.2+


## Usage
------------------------------------------------------------
```js
$(function() {
    var t1 = "#message";
    var t2 = "[name='button[bCheck]']";

    $(t1).wordcount({
        wc_target_indicator_wrapper: "div",
        wc_target_indicator_message: "Remaining words: ",
        max_word: 200
    }, function() {
        // what to do when max limit is reached
    }, function() {
        // what to do when max limit is not reached
    });

});
```


## ToDo:
------------------------------------------------------------
- Convert to jQuery 1.8+
- Add / Enhance a working demo
- Convert underscore variable to camelCase


## Browser Capability
------------------------------------------------------------



## License
------------------------------------------------------------
MIT License