define(['extendable', 'jquery', 'logger', 'knockout'],
    function(Extendable, $, Logger, ko) {

    /**
     * @class Bindable class which can bind the view model to the DOM
     * @name Bindable
     * @extends {Extendable}
     * @param {Object} p_params              Configuration object
     * @param {String} p_params.id           Identification
     * @param {Object} p_params.viewModel    ViewModel object to bind to the
     * element. {@see Bindable.bind}
     */
    function Bindable(p_params) {
        var params = p_params || {};

        this.log = new Logger(params.id);
        this.bindingsApplied = false;

        this.id = p_params.id;
        this.viewModel = p_params.viewModel;
    }

    var BindablePrototype = /** @lends Bindable.prototype */ {
        /**
         * Binds the element to the module
         * @param  {HTMLElement} p_element
         * @return {Bindable}               itself
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
         * @return {Bindable} itself
         */
        show: function() {
            this.log.debug('showing module');

            this.onShow();
            $(this.element).show();

            return this;
        },
        /**
         * Hides the module
         * @return {Bindable} itself
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

    return Extendable.extend(Bindable, BindablePrototype);
});