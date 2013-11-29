define(['signals', 'logger'], function(signals, Logger) {
    var Signal = signals.Signal;

    var log = new Logger('event-manager');

    /**
     * Main module for managing events
     * @exports {eventManager}
     */
    var eventManager = {
        _localeSignal: new Signal(),
        _eventSignals: {},
        _moduleSignalBindings: {},
        /**
         * Updates the events with new event handlers. If there is already a
         * signal binding for the specific module and event name, it will be
         * detached.
         * @param  {Object} moduleBindings [description]
         * @param  {Object} p_handlers     [description]
         * @private
         */
        _updateEventHandlers: function(moduleBindings, p_handlers) {
            var eventSignals = this._eventSignals;

            for (var eventName in p_handlers) {

                var signalBinding = moduleBindings[eventName];
                if (signalBinding) {
                    // disable existing binding if it exists
                    signalBinding.detach();
                }

                var eventSignal = eventSignals[eventName] || new Signal();
                var eventHandler = p_handlers[eventName];
                moduleBindings[eventName] = eventSignal.add(eventHandler);
                eventSignals[eventName] = eventSignal;
            }
        },
        /**
         * Enables or disables the signal bindings
         * @param {Object} moduleBindings bindings for specific module
         * @param {Boolean} p_active
         * @private
         */
        _setActive: function(moduleBindings, p_active) {
            for (var eventName in moduleBindings) {
                var signalBinding = moduleBindings[eventName];
                signalBinding.active = p_active ? true : false;
            }
        },
        /**
         * Adds event listeners for the specific identifier
         * @param  {String} p_id listener id
         * @param  {Object} p_handlers    Object with event name as keys,
         * event callback as values.
         */
        listen: function(p_id, p_handlers) {
            var moduleBindings = this._moduleSignalBindings[p_id];

            if (!moduleBindings) {
                moduleBindings = this._moduleSignalBindings[p_id] = {};
            }

            if (p_handlers) {
                this._updateEventHandlers(moduleBindings, p_handlers);
            }
            else {
                this._setActive(moduleBindings, true);
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
                log.warn('no listeners for event ' + p_eventName);
                return;
            }

            [].splice.call(arguments, 0, 1);
            eventSignal.dispatch.apply(eventSignal, arguments);
        },
        /**
         * Ignore events for the specific id
         * @param  {String} p_id
         */
        ignore: function(p_id) {
            var moduleBindings = this._moduleSignalBindings[p_id] || {};
            this._setActive(moduleBindings, false);
        },
        /**
         * Detaches all signal bindings for the specific module
         * @param  {String} p_id module id
         */
        clear: function(p_id) {
            var moduleBindings = this._moduleSignalBindings[p_id] || {};
            for (var eventName in moduleBindings) {
                var signalBinding = moduleBindings[eventName];
                signalBinding.detach();
            }
            delete this._moduleSignalBindings[p_id];
        },
        /**
         * Add listener for locale changed
         * @param {Function} p_handler callback function to handle locale change
         * @return {SignalBinding} signals js' SignalBinding object
         */
        addLocalizeListener: function(p_handler) {
            return this._localeSignal.add(p_handler);
        },
        changeLocale: function(p_locale) {
            this._localeSignal.dispatch(p_locale);
        }
    };

    return eventManager;
});