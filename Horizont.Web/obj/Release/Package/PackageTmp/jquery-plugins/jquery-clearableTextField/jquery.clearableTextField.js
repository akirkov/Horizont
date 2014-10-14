(function ($) {
    $.fn.clearableTextField = function (fnCallBack) {
        if ($(this).length > 0) {
            if (!$(this).hasClass('clear_button_wrapper')) {
                $(this).wrap('<div class="clear_button_wrapper" style="margin:0;padding:0;position:relative; display:inline;" />');
            }
            var wrap = $(this).parent();

            $("#" + $(this).attr("id") + "_clear_button").live("click", fnCallBack);

            $(this).bind('keyup change paste cut', onSomethingChanged);
            $(this).each(function () {
                $(this).data('original-padding-right', $(this).css('padding-right'));
                $(this).data('original-width', $(this).width());
                trigger($(this));
            });
        }
    }

    $.fn.fnRemoveClearButton = function () {
        removeButton($(this));
    }

    $.fn.fnAddClearButton = function () {
        addButton($(this));
    }

    $.fn.fnTriggerClearButton = function () {
        trigger($(this));
    }

    function addButton(input) {
        if (input.attr('has_clearable_button') != "1") {
            input.attr('has_clearable_button', "1");

            var wrap = $(this).parent();
            // appends div

            var id = input.attr("id") + "_clear_button";
            input.after("<div class='text_clear_button' id='" + id +"'></div>");

            var clear_button = input.next();
            var w = clear_button.outerHeight(), h = clear_button.outerHeight();

            input.css('padding-right', parseInt(input.data('original-padding-right')) + w + 5);
            input.width(input.width() - w - 5);

            var pos = input.position();
            var style = {};
            style['left'] = pos.left + input.outerWidth(false) - (w + 6);
            var offset = Math.round((input.outerHeight(true) - h) / 2.0);
            style['top'] = pos.top + offset;

            clear_button.css(style);

            clear_button.click(function () {
                input.val('');
                trigger(input);
                input.focus();
            });
        }
    };
    function removeButton(input) {
        var clear_button = input.next();

        if (input.attr('has_clearable_button') == "1") {
            input.removeAttr('has_clearable_button');
            clear_button.remove();
            var w = clear_button.width();

            input.css('padding-right', parseInt(input.data('original-padding-right')));
            input.width(input.data('original-width'));
        }
    };

    function trigger(input) {
        if (input.val().length > 0) {
            addButton(input);
        } else {
            removeButton(input);
        }
    };

    function onSomethingChanged() {
        trigger($(this));
    }

})(jQuery);
