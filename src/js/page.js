define(['jquery', 'knockout', 'logger', 'bindable'],
    function($, ko, Logger, Bindable) {

    /**
     * @class Page
     * @name Page
     * @extends {Bindable}
     * @param {Object} p_params Configuration {@see Bindable} constructor params
     */
    function Page(p_params) {
        this.superclass(p_params);
    }

    var PagePrototype = /** @lends Page.prototype */ {};

    return Bindable.extend(Page, PagePrototype);
});