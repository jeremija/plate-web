define(['knockout', 'jquery', 'events/event-manager', 'ui/culture'],
    function(ko, $, EventManager, culture) {

    var events = new EventManager('ko.bindingHandlers.localize');

    var locale = ko.observable(culture.locale);
    events.listen({
        'locale-changed': function(p_locale) {
            locale(p_locale);
        }
    });

    /**
     * Localization binding handler for knockout
     * @exports bindingHandlers/localize
     */
    ko.bindingHandlers.localize = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var key = typeof value === 'function' ? value() : value;

            // make knockout call this handler when this value changes
            var loc = locale();

            var text = culture.localize(key);
            $(element).text(text);
        }
    };
});