define(['util/Queue', 'extendable'], function(Queue, Extendable) {

    /**
     * @class  Adds a timer to the queue
     * @name util/QueuedTimer
     * @extends {Queue}
     * @param {Number} [p_delay=400] timer delay
     */
    function QueuedTimer(p_delay) {
        this.superclass();

        this._timer = null;
        this.delay = p_delay || 400;
    }

    var QueuedTimerPrototype = {
        /**
         * Starts the timeout
         * @param {Function} p_callback Function to execute when timed out
         * @param {Object} p_self       Varibable as the `this` context
         */
        start: function(p_callback, p_self) {
            this.stop();

            var self = this;
            this._timer = window.setTimeout(function() {
                self.execute();
                if (p_callback) {
                    p_callback.call(p_self);
                }
            }, this.delay);
        },
        stop: function() {
            if (this._timer) {
                window.clearTimeout(this._timer);
                this._timer = null;
            }
        },
        isRunning: function() {
            return this._timer ? true : false;
        },
        reset: function() {
            this.stop();
            this.clear();
        }
    };

    return Queue.extend(QueuedTimer, QueuedTimerPrototype);
});