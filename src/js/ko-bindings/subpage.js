define(['knockout', 'events/event-manager', 'jquery'],
    function(ko, EventManager, $) {

    var events = new EventManager('ko-bindings/subpage');

    ko.bindingHandlers.subpage = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var subpageUrl = typeof value === 'function' ? value() : value;
            element.subpageUrl = subpageUrl;

            $(element).on('click', function() {
                events.dispatch('subpage', this.subpageUrl);
            });
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var subpageUrl = typeof value === 'function' ? value() : value;
            element.subpageUrl = subpageUrl;
        }
    };

});