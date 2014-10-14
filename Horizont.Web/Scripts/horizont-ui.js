//----------------------------------------------------------------------------
// COMBOBOX

$.widget("ui.combobox", {
    options: {
        classes: "",
        source: function (request, response) { },
        select: function (event, ui) { },
        change: function (event, ui) { },
        close: function (event, ui) { },
        response: function (event, ui) { }
    },  
    _create: function () {
        var wrapper = this.wrapper = $("<span>")
            .addClass("jquery-ui-smoothness ui-combobox");

        var input = this.element
            .wrap(wrapper)
            .autocomplete({
                delay: 0,
                minLength: 0,
                source: this.options.source,
                select: this.options.select,
                change: this.options.change,
                close: this.options.close,
                response: this.options.response
            })
            .attr("title", "")
            .removeClass("ui-corner-all")
            .addClass("ui-state-default ui-combobox-input")
            .addClass("ui-widget-content")
            .addClass(this.options.classes);

        $("<a>")
            .attr("tabIndex", -1)
            .attr("title", "Показать все элементы")
            .insertAfter(input)
            .button({
                icons: {
                    primary: "ui-icon-triangle-1-s"
                },
                text: false
            })
            .removeClass("ui-corner-all")
            .addClass("ui-corner-right ui-combobox-toggle")
            .click(function () {
                if (input.attr("disabled"))
                    return;
                if (input.autocomplete("widget").is(":visible")) {
                    input.autocomplete("close");
                    return;
                }
                input.autocomplete("search", "");
                input.focus();
            })
            .width(30);
    },

    destroy: function () {
        $.Widget.prototype.destroy.call(this);
    }
});

//----------------------------------------------------------------------------
// DIALOG

function initDialog() {
    $(".hz-dialog").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        width: "auto",
        height: "auto"
    });

    $(".hz-dialog-button").hover(function () {
        $(this).toggleClass("hz-button-state-hover");
    });
    $(".hz-dialog-button").focus(function () {
        $(this).addClass("hz-button-state-hover");
    });
    $(".hz-dialog-button").blur(function () {
        $(this).removeClass("hz-button-state-hover");
    });
    $(".hz-dialog-button").mousedown(function () {
        $(this).addClass("hz-button-state-active");
    });
    $(".hz-dialog-button").mouseup(function () {
        $(this).removeClass("hz-button-state-active");
    });
    $(".hz-dialog-close-button").click(function () {
        var dlg = $(this).closest(".hz-dialog");
        dlg.dialog("close");
    });

    $(".hz-dialog").css("display", "block");
}

//----------------------------------------------------------------------------
// DATETIME PICKER

function initDateTimePicker() {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd.mm.yy', firstDay: 1,
        isRTL: false
    };
    $.timepicker.regional['ru'] = {
        timeOnlyTitle: 'Выберите время',
        timeText: 'Время',
        hourText: 'Часы',
        minuteText: 'Минуты',
        secondText: 'Секунды',
        currentText: 'Теперь',
        closeText: 'Закрыть',
        ampm: false
    };

    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $.timepicker.setDefaults($.timepicker.regional['ru']);

    var _gotoToday = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function(id) {
         _gotoToday.call( this, id ); 
         var target = $(id), 
             inst = this._getInst(target[0]);
    
        //Added by Ryan Waterer on 1/30/2009 to have it return 
        // the value when the person selects the "Today" button
         this._selectDate(id, this._formatDate(inst,
             inst.selectedDay, inst.drawMonth, inst.drawYear));
    }

    $('.hz-date').datepicker({
        showButtonPanel: true
    });
    $('.hz-time').timepicker({
        showButtonPanel: true
    });
}

