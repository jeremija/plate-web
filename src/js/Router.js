define(['extendable', 'crossroads', 'hasher', 'logger', 'events/EventManager',
    'templates/Page', 'templates/TemplateLoader'],
    function(Extendable, crossroads, hasher, Logger, EventManager, Page,
        TemplateLoader) {

    /**
     * @event events/EventManager#page-route-found
     * @param {Object} params                   Event object
     * @param {Page}   params.page              Page instance
     * @param {String} params.routeUrl          Url of the route
     * @param {Array}  params.routeArgs         Arguments for the route
     * @param {Object} params.routesPath        Routes path object containing
     * literal and abstract route
     */

    /**
     * @event events/EventManager#page-route-not-found
     * @param {String} p_url               Url of the route
     */

    /**
     * @event events/EventManager#redirect
     * @param {String} p_url               The url to redirect to
     */

    /**
     * @event events/EventManager#subpage
     * @param {String} p_url               The url to redirect to, but the
     * current page will be remebered as the parent page
     */

    /**
     * @class Module for handling navigation
     * @name Router
     * @extends {Extendable}
     * @param {Object} p_params                  Configuration object
     * @param {String} p_params.name             Name of the router
     * @listens events/EventManager#redirect
     * @fires EventManager#page-route-found      If route found
     * @fires EventManager#page-route-not-found  If route not found
     */
    function Router(p_params) {
        this.name = p_params.name;
        this.log = new Logger(this.name, this.constructor.name);

        this.events = new EventManager(this.log.name, this);
        this.events.listen({
            'redirect': function(p_url) {
                this.log.debug('redirecting to `' + p_url + '`');
                this.go(p_url);
            },
            'subpage': function(p_url) {
                var url = this.routesPath.literal + '#' + p_url;
                this.log.debug('redirecting to `' + url + '`');
                this.go(url);
            }
        });

        this.urlBindings = {};

        this.initialized = false;
        /**
         * The full route path
         * @type {Object}
         */
        this.routesPath = {
            abstract: '',
            literal: ''
        };
        /**
         * Last routed url
         * @type {String}
         */
        this.lastUrl = undefined;
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

                this.events.dispatch('msg-error', 'common.route.not.found');
                this.go('error');
            }, this);
        },
        _setupHasher: function() {
            var self = this;
            function parseHash(newHash, oldHash) {
                var routes = newHash.split('#');
                self.routesPath.literal = newHash;
                self.routesPath.abstract = self._getAbstractUrls(routes);
                crossroads.parse(routes[routes.length - 1]);
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
                    routeArgs: [].slice.call(arguments),
                    routesPath: this.routesPath
                });
            }, this);

            this.urlBindings[p_routeUrl] = {
                route: route,
                page: p_page
            };
        },
        _getAbstractUrl: function(p_routeUrl) {
            for (var abstractUrl in this.urlBindings) {
                var urlBinding = this.urlBindings[abstractUrl];
                var route = urlBinding.route;
                if (route.match(p_routeUrl)) {
                    return abstractUrl;
                }
            }
            return false;
        },
        _getAbstractUrls: function(p_routes) {
            var url = '';
            for (var i in p_routes) {
                var route = p_routes[i];
                if (url.length) url += '#';
                var abstractUrl = this._getAbstractUrl(route);
                url += abstractUrl ? abstractUrl : route;
            }
            return url;
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