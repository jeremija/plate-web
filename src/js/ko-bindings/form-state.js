define(['knockout', 'jquery', 'events/EventManager', 'ui/culture'],
    function(ko, $, EventManager, culture) {

    stateIcons = {
        'idle'      : 'glyphicon glyphicon-ok-circle',
        'loading'   : 'glyphicon glyphicon-ok-circle',
        'loaded'    : 'glyphicon glyphicon-ok-circle',
        'saving'    : 'glyphicon glyphicon-ok-sign',
        'saved'     : 'glyphicon glyphicon-ok-circle',
        'edited'    : 'glyphicon glyphicon-ok-circle',
        'save-error': 'glyphicon glyphicon-minus-sign',
        'load-error': 'glyphicon glyphicon-minus-sign'
    };

    var events = new EventManager('ko.bindingHandlers.localize');

    var locale = ko.observable(culture.locale);
    events.listen({
        'locale-changed': function(p_locale) {
            locale(p_locale);
        }
    });

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
        'edited': function($el) {
            if ($el.attr('disabled')) return;
            removeError($el);
            showTooltip($el, 'common.clickToSave');
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
        locale();
        var title = culture.localize(key);
        $el.attr('title', title).tooltip('fixTitle').tooltip('show');
    }

    /**
     * Reads the form state and updates the submit button's tooltip, color and
     * icon. Add this binding only to a submit button
     * @function external:ko/BindingHandlers#formState
     * @param {Observable} formState   Observable which can contain any of these
     * strings: 'idle', 'loading', 'loaded', 'saving', 'edited', 'saved',
     * 'save-error', 'load-error'
     * @listens events/EventManager#locale-changed
     */
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

    var errorTypes = {
        'required': 'validation.required',
        'number': 'validation.number',

        'default': 'validation.invalid'
    };

    function getFieldErrorKey(fieldError) {
        var type = fieldError.type;
        if (type === 'user defined') return fieldError.message;
        return errorTypes[type] || errorTypes.default;
    }

    function localizeFieldError(fieldError) {
        locale();
        var key = getFieldErrorKey(fieldError);
        return culture.localize(key) || key;
    }

    /**
     * Validation error returned by the server
     * @external ValidationError
     * @property {String} message    Error message in English. If the type is
     * 'user defined', it will be an error key.
     * @property {String} path
     * @property {String} type       Known values are 'required', 'number',
     * 'user defined' but may be something else
     * @property {String} value      The invalid value
     */

    /**
     * Reads the object with invalid fields properties and adds the `.has-error`
     * class to fields which have the same name. Also adds `bs.tooltip` to the
     * input item. Use this binding on a `form` element.
     * @function external:ko/BindingHandlers#invalidFields
     * @param {Observable} invalidFields   A map of invalid fields as keys.
     * Values are a {@link external:ValidationError} objects.
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.invalidFields = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $fields = $(element).find('.form-group > [name]');

            // remove the tooltips
            $fields.data('tooltip', false);

            var fieldErrors = ko.utils.unwrapObservable(valueAccessor());
            fieldErrors = fieldErrors || {};

            $fields.each(function() {
                var $this = $(this);
                var field = $this.attr('name');
                var fieldError = fieldErrors[field];
                if (fieldError) {
                    // element is invalid
                    $this.parent().addClass('has-error');
                    var errorText = localizeFieldError(fieldError);
                    // set the tooltip
                    $this.tooltip()
                        .attr('title', errorText).tooltip('fixTitle');
                    // reset the focus event to display the new tooltip
                    if ($this.is(':focus')) $this.focus();
                }
                else {
                    // element is valid
                    $this.parent().removeClass('has-error');
                    // destroy the tooltip
                    $this.tooltip('destroy');
                }
            });
        }
    };

    return {
        stateIcons: stateIcons
    };
});