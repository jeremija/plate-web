define(['extendable', 'jquery', 'signals'], function(Extendable, $, signals) {
    var Signal = signals.Signal;

    /**
     * @exports Loader
     * @extends {Extendable}
     */
    var Loader = {
        /**
         * Returns a new instance of Loader
         * @param  {String} p_selector jquery's element selector, for example
         * '#loader'
         * @param  {Number} p_duration fadeIn/fadeOut animation duration
         * @return {Loader}            A new instance of Loader
         */
        init: function(p_selector, p_duration) {
            return this.extend({
                shown: new Signal(),
                hidden: new Signal(),
                selector: p_selector,
                duration: p_duration || 400
            });
        },
        show: function() {
            var self = this,
                args = arguments;
            $(this.selector).fadeIn(this.duration, function() {
                self.shown.dispatch.apply(self.shown, args);
            });
        },
        hide: function() {
            var self = this,
                args = arguments;
            $(this.selector).fadeOut(this.duration, function() {
                self.hidden.dispatch.apply(self.hidden, args);
            });
        },
        shown: new Signal(),
        hidden: new Signal()
    };

    return Extendable.extend(Loader);
});