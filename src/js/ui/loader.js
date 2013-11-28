define(['extendable', 'util/queued-timer', 'jquery', 'signals'],
    function(Extendable, QueuedTimer, $, signals) {

    var Signal = signals.Signal;

    /**
     * @exports Loader
     * @extends {Extendable}
     */
    var Loader = {
        /**
         * Returns a new instance of Loader
         * @param  {Object} p_params           Configuration object
         * @param  {String} p_params.selector  jquery's element selector, for
         * example '#loader'
         * @param  {Number} p_params.duration  hide animation duration
         * @param  {Number} p_params.hideDelay Delay before the hiding starts
         * @return {Loader}                    A new instance of Loader
         */
        init: function(p_params) {
            return this.extend({
                selector: p_params.selector,
                duration: p_params.duration || 400,
                _queuedTimer: QueuedTimer.init(p_params.hideDelay || 400),
                /**
                 * Current loader state. States can be: 'visible',
                 * 'timed', 'hiding', and 'hidden'
                 * @type {String}
                 */
                state: 'hidden',
                stateChanged: new Signal()
            });
        },
        show: function() {
            var timer = this._queuedTimer;
            // add a queue request
            timer.add();
            // stop hide timer if any requests for hiding
            timer.stop();
            // show loader
            $(this.selector).show();
            this._setState('visible');
        },
        hide: function() {
            var timer = this._queuedTimer;
            // remove the queue request
            timer.remove();
            // if there are no more show requests,
            if (timer.size() === 0) {
                timer.start(this._hideAnimate, this);
                this._setState('timed');
            }
        },
        _hideAnimate: function() {
            this._setState('hiding');
            var self = this;
            $(this.selector).fadeOut(this.duration, function() {
                self._setState('hidden');
            });
        },
        _setState: function(p_newState) {
            var oldState = this.state;
            this.state = p_newState;

            this.stateChanged.dispatch(p_newState, oldState);
        }
    };

    return Extendable.extend(Loader);
});