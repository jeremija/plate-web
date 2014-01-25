/**
 * @module ui/pageMenuMod
 */
define(['templates/Bindable', 'knockout'], function(Bindable, ko) {
    
    /**
     * Notify the menu items for the current page.
     * @event events/EventManager#page-menu
     * @param {Object} menu        Menu items to display. Should be an
     * object literal where key is the localization key and value is a 
     * callback to be executed on item click. An exception is when the
     * key's value is 'divider' - the value can be anything. This will
     * result with a menu divider, instead of the menu item.
     * @param {Object} context     the context of the menu callbacks
     */
    
    
    /**
     * @type {Bindable}
     */
    var exports = new Bindable({
        viewModel: {
            menuItems: ko.observableArray(),
            menuContext: ko.observable()
        }
    });

    function hideMenu() {
        exports.viewModel.menuItems([]);
        exports.viewModel.menuContext(undefined);
    }

    exports.events.listen({
        /**
         * Sets the page menu and it's context
         * @listens events/EventManager#page-menu
         * @param  {Array}  menuItems
         * @param  {Object} context
         */
        'page-menu': function(menuItems, context) {
            if (!menuItems || !menuItems.length) {
                hideMenu();
                return;
            }
            this.viewModel.menuItems(menuItems);
            this.viewModel.menuContext(context);
        },
        /**
         * Hide menu items on page change
         * @listens events/EventManager#page-route-found
         */
        'page-route-found': hideMenu,
    });

    return exports;
});