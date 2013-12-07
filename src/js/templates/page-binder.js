define(['extendable', 'logger', 'events/event-manager'],
    function(Extendable, Logger, EventManager) {

    /**
     * @event EventManager#page-loading-start
     */

    /**
     * @event EventManager#page-loading-end
     * @param {Error} err
     * @param {Page}  page
     */

    /**
     * @class This object handles the `page-route-found` event and coordinates
     * the page show/hide method calls and page route changes.
     * It also listens to `page-route-not-found` event and redirects to the
     * error page.
     * @name PageBinder
     * @param {Object} p_params                         Configuration object
     * @param {String} p_params.name                    Name
     * @param {String} p_params.errorRoute              Route for the error page
     * @param {TemplateLoader} p_params.templateLoader  Template loader object
     * for loading html templates.
     * @param {String} p_params.templatePath            Path for loading
     * templates (defaults to `/pages`)
     * @param {String} p_params.templateExtension       Extension for loading
     * templates (defautls to `.html`)
     *
     * @listens page-route-found
     * @listens page-route-not-found
     * @fires page-loading-start
     * @fires page-loading-end
     */
    function PageBinder(p_params) {
        this.name = p_params.name;
        this.errorRoute = p_params.errorRoute;

        this.templateLoader = p_params.templateLoader;
        this.templatePath = p_params.templatePath || '/pages';
        this.templateExtension = p_params.templateExtension || '.html';

        this.log = new Logger(p_params.name);

        this.events = new EventManager(this.name, this);
        this.events.listen({
            'page-route-found': function(p_data) {
                this.log.debug('handling page route', p_data.routeUrl);
                this.changePage(p_data.page, p_data.routeUrl, p_data.routeArgs);
            },
            'page-route-not-found': function(p_route) {
                this.log.debug('redirecting to error route `' +
                    this.errorRoute + '`');
                this._redirectError();
            }
        });

        this.lastPage = null;
        this.lastPageTime = 0;
    }

    var PageBinderPrototype = /** @lends PageBinder.prototype */ {
        _redirectError: function() {
            this.events.dispatch('redirect', this.errorRoute);
        },
        _getTemplateUrl: function(p_name) {
            return this.templatePath + '/' + p_name + this.templateExtension;
        },
        /**
         * Hiddes the current page (if any). If the new page is already bound,
         * it will be shown and it's route callback applied.
         *
         * If the new page is not yet bound to an element, it's template
         * will be loaded.
         * @param  {Page}   p_page        Page
         * @param  {String} p_routeUrl    Route url
         * @param  {Array}  p_routeArgs   Arguments for the route callback
         */
        changePage: function(p_page, p_routeUrl, p_routeArgs) {
            this.events.dispatch('page-loading-start');
            this._setLastPage(p_page);

            if (p_page.bindingsApplied) {
                this._applyRouteCallback(p_page, p_routeUrl, p_routeArgs);
                p_page.show();
                this.events.dispatch('page-loading-end', undefined, p_page);
                return;
            }

            this._loadPageTemplate(p_page, p_routeUrl, p_routeArgs);
        },
        _loadPageTemplate: function(p_page, p_routeUrl, p_routeArgs) {
            var url = this._getTemplateUrl(p_page.name);
            var self = this;
            this.templateLoader.load(url, function(err, el) {
                if (err) {
                    self.log.error('unable to load template ' + url);
                    self.events.dispatch('page-loading-end', err);
                    self._redirectError();
                    return;
                }

                p_page.bind(el);
                self._applyRouteCallback(p_page, p_routeUrl, p_routeArgs);
                p_page.show();
                self.events.dispatch('page-loading-end', undefined, p_page);
            });
        },
        _setLastPage: function(p_page) {
            if (this.lastPage) this.lastPage.hide();
            this.lastPage = p_page;
        },
        _applyRouteCallback: function(p_page, p_routeUrl, p_routeArgs) {
            var callback = p_page.routes[p_routeUrl];
            if (!callback || typeof callback !== 'function') {
                this.log.warn('invalid callback for route ' + p_routeUrl);
                return;
            }
            this.log.debug('applying callback for route ' + p_routeUrl);
            callback.apply(p_page, p_routeArgs);
        }
    };

    return Extendable.extend(PageBinder, PageBinderPrototype);
});