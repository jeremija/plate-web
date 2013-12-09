define(['events/event-manager'], function(EventManager) {

    var events = new EventManager('breadcrumbs-manager');

    var lastRoute;

    function listen() {
        events.listen({
            'page-route-found': function(p_data) {
                lastRoute = p_data.routeUrl;
                events.dispatch('breadcrumb-pop');
            },
            'page-loading-end': function(err, page) {
                if (typeof lastRoute === 'string') {
                    events.dispatch('breadcrumb-add', {
                        title: 'bc.' + lastRoute,
                        href: '#/' + lastRoute
                    });
                }
                lastRoute = undefined;
            }
        });
    }

    return {
        listen: function() {
            listen();
        },
        clear: function() {
            events.clear();
        }
    };

});