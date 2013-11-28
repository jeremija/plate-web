define(['util/queue', 'extendable'], function(Queue, Extendable) {


    /**
     * Adds a timer to the queue
     * @exports QueuedTimer
     * @extends {Queue}
     */
    var QueuedTimer = {
        /**
         * @param  {Number} p_delay      Timer delay
         * @return {QueuedTimer}         A new instance of QueuedTimer
         */
        init: function(p_delay) {
            return this.extend({
                _timer: null,
                delay: p_delay || 400
            });
        },
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

    return Queue.init().extend(QueuedTimer);
});