define(['knockout', 'jquery', 'ui/culture'], function(ko, $, culture) {

    stateIcons = {
        'idle'      : 'glyphicon glyphicon-ok-circle',
        'loading'   : 'glyphicon glyphicon-ok-circle',
        'loaded'    : 'glyphicon glyphicon-ok-circle',
        'saving'    : 'glyphicon glyphicon-ok-sign',
        'saved'     : 'glyphicon glyphicon-ok-circle',
        'save-error': 'glyphicon glyphicon-minus-sign',
        'load-error': 'glyphicon glyphicon-minus-sign'
    };

    stateHandlers = {
        'idle': function($el) {
            removeError($el);
            $el.removeAttr('disabled').tooltip('hide');
        },
        'loading': function($el) {
            showTooltip($el, 'common.loading');
            $el.attr('disabled', 'disabled');
        },
        'loaded': function($el) {
            $el.removeAttr('disabled').tooltip('hide');
        },
        'saving': function($el) {
            $el.removeAttr('disabled');
            showTooltip($el, 'common.saving');
        },
        'saved': function($el) {
            $el.removeAttr('disabled');
            removeError($el);
            showTooltip($el, 'common.saved');
        },
        'save-error': function($el) {
            $el.removeAttr('disabled');
            showError($el);
            showTooltip($el, 'error.save');
        },
        'load-error': function($el) {
            showError($el);
            showTooltip($el, 'error.load');
        }
    };

    function setIcon($el, state) {
        var iconElement = $el.children('span.glyphicon')[0];
        iconElement.className = stateIcons[state] || 'glyphicon';
    }

    function showError($el, key) {
        $el.removeClass('btn-success').addClass('btn-danger');
    }

    function removeError($el) {
        $el.removeClass('btn-danger').addClass('btn-success');
    }

    function showTooltip($el, key) {
        var title = culture.localize(key);
        $el.attr('title', title).tooltip('fixTitle').tooltip('show');
    }

    ko.bindingHandlers.formState = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $el = $(element);
            $('<span>').addClass('glyphicon').prependTo($el);
            $el.tooltip({
                // title: 'blaaaa',
                trigger: 'manual'
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            if (typeof value !== 'function') {
                throw new Error('state should be an observable');
            }
            var state = value();

            var $el = $(element);

            setIcon($el, state);

            var handler = stateHandlers[state];
            if (handler) handler($el);
        }
    };

    ko.bindingHandlers.invalidFields = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $fields = $(element).find('.form-group > [name]');

            var invalidFields = ko.utils.unwrapObservable(valueAccessor());
            invalidFields = invalidFields || {};

            $fields.each(function() {
                var field = $(this).attr('name');
                if (invalidFields[field]) {
                    $(this).parent().addClass('has-error');
                }
                else {
                    $(this).parent().removeClass('has-error');
                }
            });
        }
    };

    return {
        stateIcons: stateIcons
    };
});