define(['extendable', 'jquery', 'logger', 'signals', 'knockout'],
    function(Extendable, $, Logger, signals, ko) {

    /**
     * Abstract page
     * @exports Page
     * @extends {Extendable}
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

            params.log = Logger.init(params.name);
            params.bindingsApplied = false;

            return this.extend(params);
        },
        bind: function(p_element) {
            if (!p_element) {
                throw new Error('p_element not defined for page ' + this.id);
            }

            this.element = p_element;

            if (this.bindingsApplied) {
                throw new Error('Bindings already applied for page ' + this.id);
            }

            this.bindingsApplied = true;

            if (!this.viewModel) {
                this.log.warn('bind() no viewModel set');
                return;
            }

            ko.applyBindings(this.viewModel, p_element);
            this.log.debug('bind() bindings applied');
        },
        /**
         * Shows the page element
         * @return {Page}
         */
        show: function() {
            this.log.debug('showing page');

            this.onShow();
            $(this.element).show();

            return this;
        },
        /**
         * Hides the page element
         * @return {Page}
         */
        hide: function() {
            this.log.debug('hiding page');

            this.onHide();
            $(this.element).hide();

            return this;
        },
        /**
         * Method called by init(). Does nothing, override it for custom
         * actions.
         */
        onInit: function() {

        },
        /**
         * Method called just before the element becomes visible. Does nothing,
         * override it for custom actions.
         */
        onShow: function() {

        },
        /**
         * Method called after the element is hidden. Does nothing, override it
         * for custom actions.
         */
        onHide: function() {

        }
    };

    return Extendable.extend(Page);
});