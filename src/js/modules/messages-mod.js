define(['events/event-manager', 'jquery', 'ui/culture'],
    function(EventManager, $, culture) {

    var events = new EventManager('ui/messages');

    /**
     * Sends an error message to the UI
     * @event EventManager#msg-error
     */

    /**
     * Sends a warning message to the UI
     * @event EventManager#msg-warn
     */

    /**
     * Sends an info message to the UI
     * @event EventManager#msg-info
     */

    /**
     * Sends a success message to the UI
     * @event EventManager#msg-success
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
            'msg-error': function(p_key) {
                createMessageElement('danger', 'error', p_key);
            },
            'msg-warn': function(p_key) {
                createMessageElement('warning', 'warning', p_key);
            },
            'msg-info': function(p_key) {
                createMessageElement('info', 'info', p_key);
            },
            'msg-success': function(p_key) {
                createMessageElement('success', 'success', p_key);
            },
            'page-loading-end': function(err, page) {
                // clear messages on page change
                // if (page.name !== 'error-page') {
                //     $('#messages-mod').children().remove();
                // }
            }
        });
    }

    /**
     * @exports messagesMod
     * @listens EventManager#msg-error
     * @listens EventManager#msg-warn
     * @listens EventManager#msg-info
     * @listens EventManager#msg-success
     */
    var messagesMod = {
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

    return messagesMod;
});