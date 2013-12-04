define(['extendable', 'jquery', 'logger', 'knockout', 'events/event-manager',
    'ui/culture'],
    function(Extendable, $, Logger, ko, EventManager, culture) {

    /**
     * @class Bindable class which can bind the view model to the DOM
     * @name Bindable
     * @extends {Extendable}
     * @param {Object} p_params              Configuration object
     * @param {String} p_params.name         Identification
     * @param {Object} p_params.viewModel    ViewModel object to bind to the
     * @param {Object} p_params.events       Events to listen to. The
     * `locale-changed` event will be listened automatically
     * @param {Boolean} p_params.visible     If not visible, does not listen
     * to the events. Defaults to false.
     * element. See {@link Bindable.bind}
     */
    function Bindable(p_params) {
        var params = p_params || {};

        this.log = new Logger(params.name);
        this.bindingsApplied = false;

        this.name = p_params.name;
        this.viewModel = p_params.viewModel || {};
        this.viewModel.locale = ko.observable(culture.locale);

        // set the event execution context to this bindable instance
        this.events = new EventManager(params.name, this);
        var listenedEvents = p_params.events || {};
        listenedEvents['locale-changed'] =  function(p_locale) {
            this.viewModel.locale(p_locale);
        };
        this.events.listen(listenedEvents);
        // ignore events until shown
        if (p_params.visible !== true) {
            this.events.ignore();
        }
    }

    var BindablePrototype = /** @lends Bindable.prototype */ {
        /**
         * Binds the element to the module
         * @param  {HTMLElement} p_element
         * @return {Bindable}               itself
         */
        bind: function(p_element) {
            if (p_element instanceof HTMLElement === false) {
                throw new Error('p_element not defined for mod ' + this.name);
            }

            this.element = p_element;

            if (this.bindingsApplied) {
                throw new Error('Bindings already applied for mod ' + this.name);
            }

            this.bindingsApplied = true;

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

            // start listening to events
            this.events.listen();

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

            // ignore events when hidden
            this.events.ignore();

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