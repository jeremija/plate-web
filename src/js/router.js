define(['extendable', 'crossroads', 'hasher', 'logger', 'ui/menu',
    'events/event-manager'],
    function(Extendable, crossroads, hasher, Logger, menu, EventManager) {


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

        this.log = new Logger('router');

        this.events = new EventManager('router', this);
        this.events.listen({
            'redirect': function(p_url) {
                this.log.debug('redirecting to ' + p_url);
                this.go(p_url);
            }
        });

        this._setupCrossroads();
        this._setupHasher();
    }

    var RouterPrototype = /** @lends Router.prototype */ {
        _setupCrossroads: function() {
            var self = this;

            crossroads.addRoute('{pageName}');
            crossroads.routed.add(function(request, data) {
                if (self.onRouteChange) {
                    self.log.debug('route changed to: ', data.params);
                    menu.markCurrentMenuItem(request);
                    self.onRouteChange.apply(self, data.params);
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