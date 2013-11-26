define(['extendable'], function(Extendable) {
    /**
     * Logger object
     * @exports Logger
     */
    var Logger = {
        /**
         * Disable logger or all loggers if set to prototype
         * @type {Boolean}
         */
        disabled: false,
        /**
         * Log filter. 0: debug|warn|error, 1: warn|error, 2: error
         * @type {Number}
         */
        threshold: 0,
        /**
         * Creates a new instance of Logger
         * @param  {[type]} p_name name of the logger
         * @return {Logger}
         */
        init: function(p_name) {
            return this.extend({
                name: p_name,
            });
        },
        _getArray: function(p_args) {
            var args = [].slice.call(p_args);
            args.splice(0, 0, this.name + '> ');
            return args;
        },
        _log: function(p_type, p_args) {
            var args = this._getArray(p_args);
            if (!this.disabled && console && console[p_type]) {
                console[p_type].apply(console, args);
            }
            return args;
        },
        /**
         * Log debug
         */
        debug: function() {
            if (this.threshold === 0) {
                return this._log('debug', arguments);
            }
        },
        /**
         * Log warn
         */
        warn: function() {
            if (this.threshold <= 1) {
                return this._log('warn', arguments);
            }
        },
        /**
         * Log error
         */
        error: function() {
            return this._log('error', arguments);
        }
    };

    return Extendable.extend(Logger);
});