/**
 * @module modules/messagesMod
 */
define(['events/EventManager', 'jquery', 'ui/culture'],
    function(EventManager, $, culture) {

    var events = new EventManager('ui/messages');

    /**
     * Sends an error message to the UI
     * @event events/EventManager#msg-error
     */

    /**
     * Sends a warning message to the UI
     * @event events/EventManager#msg-warn
     */

    /**
     * Sends an info message to the UI
     * @event events/EventManager#msg-info
     */

    /**
     * Sends a success message to the UI
     * @event events/EventManager#msg-success
     */

    function createMessageElement(p_alertType, p_titleKey, p_msg) {
        var msg = culture.localize(p_msg) || p_msg;
        var title = culture.localize(p_titleKey) || p_titleKey;

        var css = 'alert alert-' + p_alertType + ' alert-dismissable';
        var $el = $('<div>').addClass(css);
        var $button = $('<button>').addClass('close')
            .attr('data-dismiss', 'alert')
            .attr('aria-hidden', 'true')
            .html('&times;');

        var $title = $('<strong>').text(title);
        var $msg = $('<span>').text(msg);
        var $text = $('<p>').append($title).append('&nbsp;').append($msg);

        $el.hide();
        $el.append($button).append($text).prependTo('#messages-mod');
        $el.fadeIn().delay(3000).fadeOut();
    }

    function listen() {
        events.listen({
            /**
             * @listens events/EventManager#msg-error
             */
            'msg-error': function(p_key) {
                createMessageElement('danger', 'error', p_key);
            },
            /**
             * @listens events/EventManager#msg-warn
             */
            'msg-warn': function(p_key) {
                createMessageElement('warning', 'warning', p_key);
            },
            /**
             * @listens events/EventManager#msg-info
             */
            'msg-info': function(p_key) {
                createMessageElement('info', 'info', p_key);
            },
            /**
             * @listens events/EventManager#msg-success
             */
            'msg-success': function(p_key) {
                createMessageElement('success', 'success', p_key);
            },
            /**
             * @listens events/EventManager#page-loading-end
             */
            'page-loading-end': function(err, page) {
                // clear messages on page change
                // if (page.name !== 'error-page') {
                //     $('#messages-mod').children().remove();
                // }
            }
        });
    }

    var exports = {
        /**
         * Sets event bindings
         */
        listen: function() {
            listen();
        },
        /**
         * Clears event bindings
         */
        clear: function() {
            events.clear();
        }
    };

    return exports;
});