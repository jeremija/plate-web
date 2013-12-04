define(['jquery', 'knockout', 'logger', 'templates/bindable'],
    function($, ko, Logger, Bindable) {

    /**
     * @class Page
     * @name Page
     * @extends {Bindable}
     * @param {Object} p_params               Configuration object, see also
     * {@link Bindable} constructor description.
     * @param {Array} p_params.states         Array of strings which define
     * @param {Boolean} p_params.requireLogin Redirect to login if not logged in
     * module states
     */
    function Page(p_params) {
        this.superclass(p_params);
        this.states = p_params.states || {};
        this.requireLogin = p_params.requireLogin ? true : false;
    }

    var PagePrototype = /** @lends Page.prototype */ {};

    return Bindable.extend(Page, PagePrototype);
});