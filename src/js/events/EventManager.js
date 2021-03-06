define(['extendable', 'signals', 'logger'],
    function(Extendable, signals, Logger) {

    var Signal = signals.Signal;

    /**
     * @class Module for dispatching events
     * @name events/EventManager
     * @param {String} p_name Name of the module
     * @param {Object} p_context Set the execution context (`this` variable)
     */
    function EventManager(p_name, p_context) {
        // not used anywhere right now
        this.name = p_name;
        this.log = new Logger(this.name, 'EventManager');
        this.context = p_context;
        this._moduleSignalBindings = {};
    }

    var EventManagerPrototype = /** @lends events/EventManager.prototype */ {
        /**
         * A map with event name as the key, Signal as the value
         * @type {Object}
         * @private
         */
        _eventSignals: {},
        /**
         * Not used yet
         * @type {Array}
         * @private
         */
        _names: [],
        /**
         * Updates the events with new event handlers. If there is already a
         * signal binding for the specific module and event name, it will be
         * detached.
         * @param  {Object} p_handlers     Map with event names as keys,
         * event handlers (Function callbacks) as value
         * @private
         */
        _updateEventHandlers: function(p_handlers) {
            var moduleBindings = this._moduleSignalBindings;
            var eventSignals = this._eventSignals;

            for (var eventName in p_handlers) {

                var signalBinding = moduleBindings[eventName];
                if (signalBinding) {
                    // disable existing binding if it exists
                    signalBinding.detach();
                }

                var eventSignal = eventSignals[eventName] || new Signal();
                var eventHandler = p_handlers[eventName];
                moduleBindings[eventName] =
                    eventSignal.add(eventHandler, this.context);
                eventSignals[eventName] = eventSignal;
            }
        },
        /**
         * Enables or disables the signal bindings for the specific module
         * @param {Boolean} p_active
         * @private
         */
        _setActive: function(p_active) {
            var moduleBindings = this._moduleSignalBindings;

            for (var eventName in moduleBindings) {
                var signalBinding = moduleBindings[eventName];
                signalBinding.active = p_active ? true : false;
            }
        },
        /**
         * Adds event listeners for the specific identifier. If an event
         * listener for a specific event name is already present, it will be
         * detached and the new one will be used instead.
         * @param  {Object} p_handlers    Object with event name as keys,
         * event callback as values.
         */
        listen: function(p_handlers) {
            if (p_handlers) {
                this._updateEventHandlers(p_handlers);
            }
            else {
                this._setActive(true);
            }
        },
        /**
         * Dispatch event
         * @param  {String} p_eventName
         * @param  {...Object} p_arguments Arguments that will be dispatched
         */
        dispatch: function(p_eventName, p_arguments) {
            var eventSignal = this._eventSignals[p_eventName];
            if (!eventSignal) {
                this.log.warn('dispatch() no listeners: `' + p_eventName + '`');
                return;
            }
            var args = [].slice.call(arguments);
            args.splice(0, 1);
            this.log.debug(
                'dispatch() `' + p_eventName + '`:', args);
            eventSignal.dispatch.apply(eventSignal, args);
        },
        /**
         * Dispatches the {@link events/EventManager#event:msg-error} event and
         * logs out the user if necceessarry
         * @param  {String} p_key               Error string for localization
         * @param  {Boolean} p_logout           Flag to log out the user
         * @fires events/EventManager#msg-error
         * @fires events/EventManager#logout
         */
        dispatchError: function(p_key, p_logout) {
            this.dispatch('msg-error', p_key);
            if (p_logout) this.dispatch('logout');
        },
        /**
         * Ignore events for the current module
         */
        ignore: function() {
            this._setActive(false);
        },
        /**
         * Detaches all signal bindings for the specific module
         */
        clear: function() {
            var moduleBindings = this._moduleSignalBindings;
            for (var eventName in moduleBindings) {
                var signalBinding = moduleBindings[eventName];
                signalBinding.detach();
            }
            this._moduleSignalBindings = {};
        }
    };

    return Extendable.extend(EventManager, EventManagerPrototype);
});