define(['extendable', 'crossroads', 'hasher', 'logger', 'ui/menu',
    'events/event-manager', 'templates/page'],
    function(Extendable, crossroads, hasher, Logger, menu, EventManager, Page) {


    /**
     * @class Module for handling navigation
     * @name Router
     * @extends {Extendable}
     * @param {Object} p_params         Configuration object
     * @param {Object} p_params         configuration object
     * @param {String} p_params.name    Name of the router
     */
    function Router(p_params) {
        this.name = p_params.name;
        this.log = new Logger(this.name);

        this.events = new EventManager(this.names, this);
        this.events.listen({
            'redirect': function(p_url) {
                this.log.debug('redirecting to ' + p_url);
                this.go(p_url);
            }
        });

        this._setupCrossroads();
        this._setupHasher();

        this.urlBindings = {};
        this.lastUrl = undefined;
    }

    var RouterPrototype = /** @lends Router.prototype */ {
        _setupCrossroads: function() {
            var self = this;

            crossroads.routed.add(function(request, data) {
                this.log.debug('routed: ' + request);
                this.lastUrl = request;
            }, this);

            crossroads.bypassed.add(function(request) {
                this.log.error('route not found: ' + request);
                // if the `error` route was not found, this won't go into the
                // infinite loop because crossroads only reacts to a change of
                // hash. when this is called the second time, the hash will
                // already be `error`.
                this.go('error');
            }, this);
        },
        _setupHasher: function() {
            function parseHash(newHash, oldHash) {
                crossroads.parse(newHash);
            }
            hasher.initialized.add(parseHash);
            hasher.changed.add(parseHash);
            hasher.init();
        },
        /**
         * Changes the location to p_url. Use `redirect` event instead.
         * @param  {[type]} p_url [description]
         * @return {[type]}       [description]
         */
        go: function(p_url) {
            hasher.setHash(p_url);
        },
        _registerUrl: function(p_stateUrl, p_callback, p_page) {
            if (typeof p_callback !== 'function') {
                throw new Error('p_callback for ' + p_stateUrl +
                    ' should be a function');
            }

            if (p_stateUrl in this.urlBindings) {
                throw new Error('handler for ' + url + ' already registered');
            }

            var route = crossroads.addRoute(p_stateUrl);
            // route.matched.add(p_callback, p_page);

            var self = this;
            route.matched.add(function() {
                self.events.dispatch('load-page', p_page);
                p_callback.apply(p_page, arguments);
            });

            this.urlBindings[p_stateUrl] = {
                route: route,
                page: p_page
            };
        },
        _unregisterUrl: function(p_stateUrl) {
            var urlBinding = this.urlBindings[p_stateUrl];
            if (!urlBinding) return;

            crossroads.removeRoute(urlBinding.route);
        },
        registerPage: function(page) {
            if (page instanceof Page === false) {
                throw new Error('page is not an instance of Page');
            }

            var states = page.states;

            var statesCount = 0;
            for (var stateUrl in states) {
                var stateHandler = states[stateUrl];
                this._registerUrl(stateUrl, stateHandler, page);
                statesCount++;
            }
            if (!statesCount) {
                this.log.warn('page ' + page.name + ' has no defined states');
            }
        },
        unregisterPage: function(page) {
            if (page instanceof Page === false) {
                throw new Error('page is not an instance of Page');
            }

            var states = page.states;

            for (var stateUrl in states) {
                this._unregisterUrl(stateUrl);
            }
        }
    };

    return Extendable.extend(Router, RouterPrototype);
});