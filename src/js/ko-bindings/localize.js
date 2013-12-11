define(['knockout', 'jquery', 'events/event-manager', 'ui/culture'],
    function(ko, $, EventManager, culture) {

    var events = new EventManager('ko.bindingHandlers.localize');

    var locale = ko.observable();
    events.listen({
        'locale-changed': function(p_locale) {
            locale(p_locale);
        }
    });

    function getLocalizedText(valueAccessor) {
        var value = valueAccessor();
        var key = typeof value === 'function' ? value() : value;

        // make knockout call this handler when this value changes
        var loc = locale();

        return culture.localize(key) || key;
    }

    /**
     * Localization binding handler for knockout
     * @exports bindingHandlers/localize
     */
    ko.bindingHandlers.localize = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var text = getLocalizedText(valueAccessor);
            $(element).text(text);
        }
    };

    /**
     * Localization binding handler for knockout
     * @exports bindingHandlers/localize
     */
    ko.bindingHandlers.placeholder = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var text = getLocalizedText(valueAccessor);
            element.placeholder = text;
        }
    };

    ko.bindingHandlers.tooltip = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var config = valueAccessor() || {};
            $(element).tooltip({
                trigger: config.trigger || 'manual',
                placement: config.placement
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var config = valueAccessor() || {};

            if (element.timeout) window.clearTimeout(element.timeout);

            var delay = config.delay || 2000;
            var visible = ko.utils.unwrapObservable(config.visible);
            var title =
                culture.localize(ko.utils.unwrapObservable(config.title));

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

    ko.bindingHandlers.dateText = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var date = typeof value === 'function' ? value() : value;
            date = Date.parse(date);
            date = isNaN(date) ? '' : culture.format(new Date(date), 'd');
            $(element).text(date);
        }
    };

    ko.bindingHandlers.dateValue = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var observable = valueAccessor();

            ko.utils.registerEventHandler(element, 'change', function() {
                // parse date
                var dateString = $(element).val();
                var date = culture.parseDate(dateString, 'd');
                if (date) {
                    observable(date.toISOString());
                }
                else {
                    observable('');
                    element.value = '';
                }
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            locale();

            var value = valueAccessor();
            var date = typeof value === 'function' ? value() : value;

            date = Date.parse(date);
            date = isNaN(date) ? '' : culture.format(new Date(date), 'd');

            $(element).val(date);
        }
    };

    ko.bindingHandlers.numberValue = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var observable = valueAccessor();
            ko.utils.registerEventHandler(element, 'change', function() {
                var formattedNumber = $(element).val();
                var value = culture.parseFloat(formattedNumber);
                if (value) {
                    observable(value);
                }
                else {
                    element.value = '';
                }
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            locale();

            var value = ko.utils.unwrapObservable(valueAccessor());
            var formattedNumber = culture.format(value, 'n2');
            $(element).val(formattedNumber);
        }
    };
});