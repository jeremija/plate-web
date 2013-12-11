define(['knockout', 'events/event-manager'], function(ko, EventManager) {
    ko.bindingHandlers.yesno = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var events = new EventManager('ko-bindings/yesno');

            ko.utils.registerEventHandler(element, 'click', function(event) {
                var config = valueAccessor();

                events.dispatch('ask-yes-no', {
                    message: config.msg,
                    yes: config.yes,
                    no: config.no,
                    context: bindingContext.$root,
                    data: bindingContext.$data
                });
            });
        }
    };
});
