define(['extendable', 'events/event-manager', 'router', 'jquery'],

    function(Extendable, EventManager, Router, $) {

    /**
     * @class It has a list of all the {@link Page} instances in the application
     * and listens to `login` and `logout` events to register or unregister the
     * routes (states) of the pages.
     * @name PageManager
     * @param {Object} p_params           Configuration object
     * @param {String} p_params.name      Page manager name
     * @param {Array}  p_params.pages     A list of {@link Page}s
     * @param {Router} p_params.router    Router instance
     * @listens login
     * @listens logout
     */
    function PageManager(p_params) {
        this.name = p_params.name;
        this.router = p_params.router;

        this.publicPages = [];
        this.protectedPages = [];
        this._setPages(p_params.pages);

        this.events = new EventManager(this.name, this);
        this.events.listen({
            'login': function(p_user) {
                this._registerPages(this.protectedPages);
            },
            'logout': function() {
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