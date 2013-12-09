define(['events/event-manager', 'knockout', 'templates/bindable'],
    function(EventManager, ko, Bindable) {

    var bcArray = [];

    function setLastBcActive(p_active) {
        var bc = bcArray[bcArray.length - 1];
        if (!bc) return;
        bc.active(p_active ? true : false);
    }

    var vm = {
        breadcrumbs: ko.observableArray(bcArray)
    };

    var breadcrumbsMod = new Bindable({
        name: 'breadcrumbs-mod',
        viewModel: vm,
        events: {
            'breadcrumb-add': function(p_breadcrumb) {
                if (p_breadcrumb.title === 'bc.') {
                    // do not display breadcrumb for homepage
                    return;
                }
                setLastBcActive(false);

                p_breadcrumb.active = ko.observable(true);
                this.viewModel.breadcrumbs.push(p_breadcrumb);
            },
            'breadcrumb-remove': function(p_breadcrumb) {
                this.viewModel.breadcrumbs.remove(p_breadcrumb);
                setLastBcActive(true);
            },
            'breadcrumb-pop': function() {
                this.viewModel.breadcrumbs.pop();
                setLastBcActive(true);
            },
            'breadcrumbs-removeAll': function() {
                this.viewModel.breadcrumbs.removeAll();
            }
        },
        visible: true
    });

    events = breadcrumbsMod.events;

    return breadcrumbsMod;
});