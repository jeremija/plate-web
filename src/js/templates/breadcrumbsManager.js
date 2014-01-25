/**
 * @module templates/breadcrumbsManager
 */
define(['events/EventManager', 'ui/culture'], function(EventManager, culture) {

    var events = new EventManager('breadcrumbsManager');

    var routes;
    var route;

    function listen() {
        events.listen({
            /**
             * @listens events/EventManager#page-route-found
             */
            'page-route-found': function(p_data) {
                route = p_data.routeUrl;
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
            /**
             * @listens events/EventManager#page-loading-end
             */
            'page-loading-end': function(err, page) {
                if (err || !routes) return;
                events.dispatch('set-breadcrumbs', routes);
            }
        });
    }

    var exports = {
        /**
         * Listen to `page-route-found` and `page-loading-end` events
         */
        listen: function() {
            listen();
        },
        /**
         * Stop listening to events. This function is now only used in unit
         * testing
         */
        clear: function() {
            events.clear();
        }
    };

    return exports;

});