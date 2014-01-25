define(['extendable'], function(Extendable) {

    /**
     * @class
     * @name MenuItem
     * @param {String}   p_key      Menu item key used for localization
     * @param {Function} p_callback Callback to call when the item is clicked.
     */
    function MenuItemConstructor(p_key, p_callback) {
        this.key = p_key;
        this.onClick = p_callback;
    }

    var MenuItemPrototype = /** @lends MenuItem.prototype */ {

    };

    var MenuItem = Extendable.extend(MenuItemConstructor, MenuItemPrototype);

    /**
     * A MenuItem which is a divider
     * @type {MenuItem}
     */
    MenuItem.divider = new MenuItem('divider');

    return MenuItem;
});