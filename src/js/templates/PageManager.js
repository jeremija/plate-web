define(['extendable', 'events/EventManager', 'Router', 'jquery', 'logger'],

    function(Extendable, EventManager, Router, $, Logger) {

    /**
     * @class It has a list of all the {@link Page} instances in the application
     * and listens to `logged-in` and `logged-out` events to register or
     * unregister the routes of the pages.
     * @name templates/PageManager
     * @param {Object} p_params           Configuration object
     * @param {String} p_params.name      Page manager name
     * @param {Array}  p_params.pages     A list of {@link Page}s
     * @param {Router} p_params.router    Router instance
     * @listens events/EventManager#logged-in
     * @listens events/EventManager#logged-out
     */
    function PageManager(p_params) {
        this.name = p_params.name;
        this.log = new Logger(this.name);
        this.router = p_params.router;

        this.publicPages = [];
        this.protectedPages = [];
        this._setPages(p_params.pages);

        this.events = new EventManager(this.log.name, this);
        this.events.listen({
            'logged-in': function(p_user) {
                this._registerPages(this.protectedPages);
            },
            'logged-out': function() {
                this._unregisterPages(this.protectedPages);
            }
        });

        this._registerPages(this.publicPages);

        if (!this.router.initialized) {
            this.router.init();
        }
    }

    var PageManagerPrototype = /** @lends PageManager.prototype */ {
        /**
         * Divides the pages into `protectedPages` and `publicPages`, depending
         * on the `requireLogin` property of {@link Page} instance.
         * @param {Page} p_pages
         */
        _setPages: function(p_pages) {
            for (var i in p_pages) {
                var page = p_pages[i];
                if (!page || !page.name) {
                    this.log.warn('skipped page, it was not defined properly');
                    continue;
                }

                if (page.requireLogin) this.protectedPages.push(page);
                else this.publicPages.push(page);
            }
        },
        /**
         * Registers the pages to the router
         * @param  {Array} p_pages    an array of {@link Page}s to register
         */
        _registerPages: function(p_pages) {
            for (var i in p_pages) {
                var page = p_pages[i];
                this.router.registerPage(page);
            }
        },
        /**
         * Unregisters the pages from the router
         * @param  {Array} p_pages    an aray of {@link Page}s to unregister
         */
        _unregisterPages: function(p_pages) {
            for (var i in p_pages) {
                var page = p_pages[i];
                this.router.unregisterPage(page);
            }
        }
    };

    return Extendable.extend(PageManager, PageManagerPrototype);

});