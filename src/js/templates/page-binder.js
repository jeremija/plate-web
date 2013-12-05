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
     * the page show/hide method calls and page state changes.
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
                this.log.debug('handling page route', p_data.stateUrl);
                this.changePage(p_data.page, p_data.stateUrl, p_data.stateArgs);
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
         * it will be shown and it's state callback applied.
         *
         * If the new page is not yet bound to an element, it's template
         * will be loaded.
         * @param  {Page}   p_page        Page
         * @param  {String} p_stateUrl    State url
         * @param  {Array}  p_stateArgs   Arguments for the state callback
         */
        changePage: function(p_page, p_stateUrl, p_stateArgs) {
            this.events.dispatch('page-loading-start');
            this._setLastPage(p_page);

            if (p_page.bindingsApplied) {
                this._applyStateCallback(p_page, p_stateUrl, p_stateArgs);
                p_page.show();
                this.events.dispatch('page-loading-end', undefined, p_page);
                return;
            }

            this._loadPageTemplate(p_page, p_stateUrl, p_stateArgs);
        },
        _loadPageTemplate: function(p_page, p_stateUrl, p_stateArgs) {
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
                self._applyStateCallback(p_page, p_stateUrl, p_stateArgs);
                p_page.show();
                self.events.dispatch('page-loading-end', undefined, p_page);
            });
        },
        _setLastPage: function(p_page) {
            if (this.lastPage) this.lastPage.hide();
            this.lastPage = p_page;
        },
        _applyStateCallback: function(p_page, p_stateUrl, p_stateArgs) {
            var callback = p_page.states[p_stateUrl];
            if (!callback || typeof callback !== 'function') {
                this.log.warn('invalid callback for state ' + p_stateUrl);
                return;
            }
            this.log.debug('applying callback for state ' + p_stateUrl);
            callback.apply(p_page, p_stateArgs);
        }
    };

    return Extendable.extend(PageBinder, PageBinderPrototype);
});