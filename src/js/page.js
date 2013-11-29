define(['extendable', 'jquery', 'logger', 'abstract-module', 'knockout'],
    function(Extendable, $, Logger, Module, ko) {

    /**
     * Abstract page
     * @exports Page
     * @extends {AbstractModule}
     */
    var Page = {
        /**
         * Initializes the page. Throws an error if the page was already
         * initialized
         * @param {Object} p_params               Configuration object
         * @param {String} p_params.id            Page id (not the element id)
         * @param {Object} p_params.viewModel     The page's viewModel
         * @return {Page}                         A new instance of Page
         */
        init: function(p_params) {
            var params = p_params || {};
            // return this.extend(params);
            return Module.init(params);
        }
    };

    return Module.extend(Page);
});