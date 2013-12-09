define(['events/event-manager'], function(EventManager) {

    var events = new EventManager('breadcrumbs-manager');

    var routes;

    function listen() {
        events.listen({
            'page-route-found': function(p_data) {
                var literalRoutes = p_data.routesPath.literal.split('#');
                var abstractRoutes = p_data.routesPath.abstract.split('#');
                routes = [];
                for (var i in literalRoutes) {
                    var l = literalRoutes[i];
                    var a = abstractRoutes[i];
                    routes.push({
                        literal: l,
                        abstract: a
                    });
                }
            },
            'page-loading-end': function(err, page) {
                if (err || !routes) return;
                events.dispatch('breadcrumbs-set', routes);
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