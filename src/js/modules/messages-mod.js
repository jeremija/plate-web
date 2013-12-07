define(['events/event-manager', 'jquery'], function(EventManager, $) {
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

    function createMessageElement(p_alertType, p_title, p_msg) {
        var css = 'alert alert-' + p_alertType + ' alert-dismissable';
        var $el = $('<div>').attr('class', css);
        var $button = $('<button>').attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .attr('aria-hidden', 'true')
            .html('&times;');

        var $title = $('<strong>').text(p_title);
        var $msg = $('<span>').text(p_msg);
        var $text = $('<p>').append($title).append($msg);

        $el.append($button).append($text).appendTo('#messages-mod');
    }

    function listen() {
        events.listen({
            'msg-error': function(p_key) {
                createMessageElement('danger', 'Error!', p_key);
            },
            'msg-warn': function(p_key) {
                createMessageElement('warning', 'Warning!', p_key);
            },
            'msg-info': function(p_key) {
                createMessageElement('info', 'Info!', p_key);
            },
            'msg-success': function(p_key) {
                createMessageElement('success', 'Success!', p_key);
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
    return {
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
});