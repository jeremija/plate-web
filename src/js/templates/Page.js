define(['jquery', 'knockout', 'logger', 'templates/Bindable'],
    function($, ko, Logger, Bindable) {

    /**
     * @class Page
     * @name templates/Page
     * @extends {Bindable}
     * @param {Object}  p_params                 Configuration object, see also
     * {@link Bindable} constructor description.
     * @param {Array}   p_params.routes          Array of strings which define
     * @param {Boolean} p_params.requireLogin    Redirect to login if not logged
     * in module routes
     */
    function Page(p_params) {
        this.superclass(p_params);
        this.routes = p_params.routes || {};
        this.requireLogin = p_params.requireLogin ? true : false;
    }

    var PagePrototype = /** @lends Page.prototype */ {};

    return Bindable.extend(Page, PagePrototype);
});