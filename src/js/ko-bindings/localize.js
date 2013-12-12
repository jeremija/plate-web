define(['knockout', 'jquery', 'events/event-manager', 'ui/culture'],
    function(ko, $, EventManager, culture) {

    var events = new EventManager('ko.bindingHandlers.localize');

    var locale = ko.observable(culture.locale);
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

    // ko.bindingHandlers.dateText = {
    //     update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    //         var value = valueAccessor();
    //         var date = typeof value === 'function' ? value() : value;
    //         date = Date.parse(date);
    //         date = isNaN(date) ? '' : culture.format(new Date(date), 'd');
    //         $(element).text(date);
    //     }
    // };

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

    ko.bindingHandlers.number = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (element.tagName !== 'INPUT') return;

            var observable = valueAccessor();

            ko.utils.registerEventHandler(element, 'change', function() {
                var formattedNumber = $(element).val();
                var value = culture.parseFloat(formattedNumber);

                var previousValue = observable.peek();
                observable(isNaN(value) ? undefined : value);
                // send a valueHasMutated to force the call of the update
                // in case the user has entered the handler in case
                // user has entered the same value twice
                if (previousValue === value) observable.valueHasMutated();
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            locale();
            allBindings = allBindings();

            var decimalSpaces = isNaN(allBindings.decimalSpaces) ?
                2 : allBindings.decimalSpaces;
            var n = 'n' + decimalSpaces;

            var value = ko.utils.unwrapObservable(valueAccessor());
            var formattedNumber = culture.format(value, n);

            var setValue = element.tagName === 'INPUT' ? 'val' : 'text';
            $(element)[setValue](formattedNumber);
        }
    };
});