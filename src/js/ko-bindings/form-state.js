define(['knockout', 'jquery'], function(ko, $) {

    var SUCCESS_TIMEOUT = 1000;

    iconStateMap = {
        'idle'      : 'glyphicon glyphicon-ok-circle',
        'loading'   : 'glyphicon glyphicon-ok-circle',
        'loaded'    : 'glyphicon glyphicon-ok-circle',
        'saving'    : 'glyphicon glyphicon-ok-circle',
        'saved'     : 'glyphicon glyphicon-ok-sign',
        'save-error': 'glyphicon glyphicon-minus-sign',
        'load-error': 'glyphicon glyphicon-minus-sign'
    };

    ko.bindingHandlers.formState = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            if (typeof value !== 'function') {
                throw new Error('state should be an observable');
            }
            var state = value();

            if (element.timeout) {
                window.clearTimeout(element.timeout);
                element.timeout = undefined;
            }

            var $el = $(element);
            var iconElement = $el.children('span.glyphicon')[0];
            if (!iconElement) {
                iconElement = $('<span>').prependTo($el)[0];
            }

            iconElement.className = iconStateMap[state] || 'glyphicon';

            if (state === 'load-error' || state === 'save-error') {
                $el.removeClass('btn-success');
                $el.addClass('btn-danger');
            }
            else {
                $el.removeClass('btn-danger');
                $el.addClass('btn-success');
            }

            switch(state) {
                case 'saved':
                    element.timeout = window.setTimeout(function() {
                        iconElement.className = iconStateMap.idle;
                    }, SUCCESS_TIMEOUT);
                    $el.removeAttr('disabled');
                    break;
                case 'loading':
                case 'saving':
                case 'load-error':
                    $el.attr('disabled', 'disabled');
                    break;
                default:
                    $el.removeAttr('disabled');
            }
        }
    };

    return {
        setSuccessTimeout: function(p_value) {
            SUCCESS_TIMEOUT = p_value;
        },
        iconStateMap: iconStateMap
    };
});