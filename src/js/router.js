define(['extendable', 'crossroads', 'hasher', 'logger', 'events/event-manager',
    'templates/page', 'templates/template-loader'],
    function(Extendable, crossroads, hasher, Logger, EventManager, Page,
        TemplateLoader) {

    /**
     * @event EventManager#page-route-found
     * @param {Object} params              Event object
     * @param {Page}   params.page         Page instance
     * @param {String} params.routeUrl     Url of the route
     * @param {Array}  params.routeArgs    Arguments for the route
     */

    /**
     * @event EventManager#page-route-not-found
     * @param {String} p_url               Url of the route
     */

    /**
     * @event EventManager#redirect
     * @param {String} p_url               The url to redirect to
     */

    /**
     * @class Module for handling navigation
     * @name Router
     * @extends {Extendable}
     * @param {Object} p_params             Configuration object
     * @param {String} p_params.name        Name of the router
     * @listens redirect
     * @fires page-route-found              If route found
     * @fires page-route-not-found          If route not found
     */
    function Router(p_params) {
        this.name = p_params.name;
        this.log = new Logger(this.name);

        this.events = new EventManager(this.names, this);
        this.events.listen({
            'redirect': function(p_url) {
                this.log.debug('redirecting to `' + p_url + '`');
                this.go(p_url);
            }
        });

        this.urlBindings = {};
        this.lastUrl = undefined;

        this.initialized = false;
    }

    var RouterPrototype = /** @lends Router.prototype */ {
        init: function() {
            this.initialized = true;
            this._setupCrossroads();
            this._setupHasher();
        },
        /**
         * Adds the binding on crossroads' routed and bypassed bingdinsgs.
         * Adds the properties bypassedBinding and routedBinding
         */
        _setupCrossroads: function() {
            var self = this;

            // ignore previous state (trigger the same route twice)
            crossroads.ignoreState = true;

            this._routedBinding = crossroads.routed.add(
                function(request, data) {

                this.log.debug('routed: `' + request + '`');
                this.lastUrl = request;
            }, this);

            this._bypassedBinding = crossroads.bypassed.add(function(request) {
                this.log.error('route not found: `' + request + '`');
                this.events.dispatch('page-route-not-found', request);
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
            this._hasherInitializedBinding = hasher.initialized.add(parseHash);
            this._hasherChangedBinding = hasher.changed.add(parseHash);
            hasher.init();
        },
        /**
         * Changes the location to p_url. Use `redirect` event instead.a
         * @param  {String} p_url
         */
        go: function(p_url) {
            hasher.setHash(p_url);
        },
        _registerUrl: function(p_routeUrl, p_callback, p_page) {
            if (typeof p_callback !== 'function') {
                throw new Error('p_callback for `' + p_routeUrl +
                    '` should be a function');
            }

            if (p_routeUrl in this.urlBindings) {
                throw new Error('handler for `' + url + '` already registered');
            }

            var route = crossroads.addRoute(p_routeUrl);
            route.matched.add(function() {
                var args = [].slice.call(arguments);
                this.events.dispatch('page-route-found', {
                    page: p_page,
                    routeUrl: p_routeUrl,
                    routeArgs: [].slice.call(arguments)
                });
            }, this);

            this.urlBindings[p_routeUrl] = {
                route: route,
                page: p_page
            };
        },
        _unregisterUrl: function(p_routeUrl) {
            var urlBinding = this.urlBindings[p_routeUrl];
            if (!urlBinding) return;

            crossroads.removeRoute(urlBinding.route);
            delete this.urlBindings[p_routeUrl];
        },
        registerPage: function(page) {
            if (page instanceof Page === false) {
                throw new Error('page is not an instance of Page');
            }

            var routes = page.routes;

            var routesCount = 0;
            for (var routeUrl in routes) {
                var routeHandler = routes[routeUrl];
                this._registerUrl(routeUrl, routeHandler, page);
                routesCount++;
            }
            if (!routesCount) {
                this.log.warn('page `' + page.name + '` has no defined routes');
            }
        },
        unregisterPage: function(page) {
            if (page instanceof Page === false) {
                throw new Error('page is not an instance of Page');
            }

            var routes = page.routes;

            for (var routeUrl in routes) {
                this._unregisterUrl(routeUrl);
            }
        },
        clear: function() {
            this.events.clear();
            this._routedBinding.detach();
            this._bypassedBinding.detach();
            this._hasherInitializedBinding.detach();
            this._hasherChangedBinding.detach();
            crossroads.removeAllRoutes();
        }
    };

    return Extendable.extend(Router, RouterPrototype);
});