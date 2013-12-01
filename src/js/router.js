define(['extendable', 'crossroads', 'hasher', 'logger', 'ui/menu'],
    function(Extendable, crossroads, hasher, Logger, menu) {

    var log = new Logger('router');

    /**
     * @class Module for handling navigation
     * @name Router
     * @extends {Extendable}
     * @param {Object} p_params Configuration object
     * @param {Object} p_params                    configuration object
     * @param {Function} p_params.onRouteChange    callback function to
     * execute when the route changes
     */
    function Router(p_params) {
        this.onRouteChange = p_params.onRouteChange;

        this._setupCrossroads();
        this._setupHasher();
    }

    var RouterPrototype = /** @lends Router.prototype */ {
        _setupCrossroads: function() {
            var self = this;

            crossroads.addRoute('{pageName}');
            crossroads.routed.add(function(request, data) {
                if (self.onRouteChange) {
                    log.debug('route changed to: ', data.params);
                    self.onRouteChange.apply(self, data.params);
                    menu.markCurrentMenuItem(request);
                }
            });
        },
        _setupHasher: function() {
            function parseHash(newHash, oldHash) {
                crossroads.parse(newHash);
            }
            hasher.initialized.add(parseHash);
            hasher.changed.add(parseHash);
            hasher.init();
        },
        go: function(p_url) {
            hasher.setHash(p_url);
        }
    };

    return Extendable.extend(Router, RouterPrototype);
});