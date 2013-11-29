define(['extendable', 'jquery', 'logger', 'knockout'],
    function(Extendable, $, Logger, ko) {

    /**
     * Abstract AbstractModule
     * @exports AbstractModule
     * @extends {Extendable}
     */
    var AbstractModule = {
        /**
         * Initializes the module.
         * @param {Object} p_params               Configuration object
         * @param {String} p_params.id            Module id (not the element id)
         * @param {Object} p_params.viewModel     The module's viewModel
         * @return {AbstractModule}               A new instance of  Module
         */
        init: function(p_params) {
            var params = p_params || {};

            params.log = Logger.init(params.name);
            params.bindingsApplied = false;

            return this.extend(params);
        },
        /**
         * Binds the element to the module
         * @param  {HTMLElement} p_element
         * @return {AbstractModule}         itself
         */
        bind: function(p_element) {
            if (!p_element) {
                throw new Error('p_element not defined for mod ' + this.id);
            }

            this.element = p_element;

            if (this.bindingsApplied) {
                throw new Error('Bindings already applied for mod ' + this.id);
            }

            this.bindingsApplied = true;

            if (!this.viewModel) {
                this.log.warn('bind() binding failed: no viewModel set');
                return this;
            }

            ko.applyBindings(this.viewModel, p_element);
            this.log.debug('bind() binding applied');

            return this;
        },
        /**
         * Shows the module
         * @return {AbstractModule} itself
         */
        show: function() {
            this.log.debug('showing module');

            this.onShow();
            $(this.element).show();

            return this;
        },
        /**
         * Hides the module
         * @return {AbstractModule} itself
         */
        hide: function() {
            this.log.debug('hiding module');

            this.onHide();
            $(this.element).hide();

            return this;
        },
        /**
         * Method called just before the module becomes visible. Does nothing,
         * override it for custom actions.
         */
        onShow: function() {

        },
        /**
         * Method called after the module is hidden. Does nothing, override it
         * for custom actions.
         */
        onHide: function() {

        }
    };

    return Extendable.extend(AbstractModule);
});