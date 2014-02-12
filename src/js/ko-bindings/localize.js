define(['knockout', 'jquery', 'events/EventManager', 'ui/culture'],
    function(ko, $, EventManager, culture) {

    var events = new EventManager('ko.bindingHandlers.localize');

    var locale = ko.observable(culture.locale);
    events.listen({
        'locale-changed': function(p_locale) {
            locale(p_locale);
        }
    });

    function getLocalizedText(value) {
        var key = typeof value === 'function' ? value() : value;

        // make knockout call this handler when this value changes
        var loc = locale();

        return culture.localize(key) || key;
    }

    /**
     * Knockout's binding handlers. The BindingHandlers are documented as
     * functions, even though they are infact objects. The paramters described
     * show the parameters which can be used in the `data-bind` attribute in the
     * HTML.
     * @see {@link http://knockoutjs.com/documentation/custom-bindings.html}
     * @external ko/BindingHandlers
     */

    /**
     * Sets the element's text property
     * @function external:ko/BindingHandlers#localize
     * @param {(String|Observable)} localize      key to localize
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.localize = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var text = getLocalizedText(valueAccessor());
            $(element).text(text);
        }
    };

    /**
     * Sets the element's placeholder property
     * @function external:ko/BindingHandlers#placeholder
     * @param {(String|Observable)} placeholder   key to localize
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.placeholder = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var text = getLocalizedText(valueAccessor());
            element.placeholder = text;
        }
    };

    /**
     * Adds a tooltip to the element
     * @function external:ko/BindingHandlers#tooltip
     * @param {Object}  config                    Configuration object
     * @param {Boolean} [config.animation=true]   Animate the tooltip while
     * showing or hiding
     * @param {String}  [config.trigger='manual'] See bootstrap's manual for
     * valid values
     * @param {String}  [config.placement='top']  Valid values are 'top',
     * 'right', 'bottom', 'left'
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.tooltip = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var config = valueAccessor() || {};
            $(element).tooltip({
                animation: config.animation === false ? false : true,
                trigger: config.trigger || 'manual',
                placement: config.placement
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var config = valueAccessor() || {};

            if (element.timeout) window.clearTimeout(element.timeout);

            var delay = config.delay || 2000;
            var visible = ko.utils.unwrapObservable(config.visible);
            var title = getLocalizedText(config.title);
            // var title =
            //     culture.localize(ko.utils.unwrapObservable(config.title));

            $(element).attr('title', title)
                .tooltip('fixTitle')
                .tooltip(visible ? 'show' : 'hide');

            if (delay > 0) {
                element.timeout = window.setTimeout(function() {
                    $(element).tooltip('hide');
                    config.visible(false);
                }, delay);
            }
        }
    };

    /**
     * Formats the date and set's the element's value (for input elements) or
     * text with formatted date string. If the input string is changed, it
     * updates the value with an ISO Date string or '' if input date is invalid.
     * @function external:ko/BindingHandlers#date
     * @param {Date|Number|String} date
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.date = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (element.tagName !== 'INPUT') return;

            var observable = valueAccessor();

            ko.utils.registerEventHandler(element, 'change', function() {
                // parse date
                var dateString = $(element).val();
                var date = culture.parseDate(dateString, 'd');

                var previousValue = observable.peek();
                var value;
                if (date) {
                    value = date.toISOString();
                    observable(value);
                }
                else {
                    value = '';
                    observable('');
                    element.value = '';
                }
                if (previousValue === value) observable.valueHasMutated();
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            locale();

            var value = valueAccessor();
            var date = typeof value === 'function' ? value() : value;

            date = Date.parse(date);
            date = isNaN(date) ? '' : culture.format(new Date(date), 'd');

            var setValue = element.tagName === 'INPUT' ? 'val' : 'text';
            $(element)[setValue](date);
        }
    };

    function formatNumber(value, allBindings) {
        locale();
        allBindings = allBindings();

        var decimalSpaces = isNaN(allBindings.decimalSpaces) ?
            2 : allBindings.decimalSpaces;
        var n = 'n' + decimalSpaces;

        var formattedNumber = culture.format(value, n);

        return formattedNumber;
    }

    /**
     * Formats the number to a string and updates the element's value or text,
     * depending on the element.tagName value. If the input string is changed,
     * the value is updated with correct number value or 0 if number is
     * invalid.
     * @function external:ko/BindingHandlers#number
     * @param {Number} number             value to format
     * @param {Number} [decimalSpaces=2]  number of decimal spaces for formatted
     * value
     * @listens events/EventManager#locale-changed
     */
    ko.bindingHandlers.number = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (element.tagName !== 'INPUT') return;

            var observable = valueAccessor();

            ko.utils.registerEventHandler(element, 'change', function() {
                var formattedNumber = $(element).val();
                var value = culture.parseFloat(formattedNumber);
                value = isNaN(value) ? 0 : value;

                var previousValue = observable.peek();
                observable(value);
                // send a valueHasMutated to force the call of the update
                // in case the user has entered the handler in case
                // user has entered the same value twice
                if (previousValue === value) observable.valueHasMutated();
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var formattedNumber = formatNumber(value, allBindings);

            var setValue = element.tagName === 'INPUT' ? 'val' : 'text';
            $(element)[setValue](formattedNumber);
        }
    };

    ko.bindingHandlers.km = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            var meters = false;
            if (value < 1) {
                value *= 1000;
                meters = true;
            }

            var formattedNumber = culture.format(value, meters ? 'n0' : 'n2');
            formattedNumber += meters ? ' m' : ' km';

            $(element).text(formattedNumber);
        }
    };
});