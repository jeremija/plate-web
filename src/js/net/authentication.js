/**
 * @module net/authentication
 */
define(['jquery', 'events/EventManager', 'singletons', 'logger'],
    function($, EventManager, singletons, Logger) {

    var ajax = singletons.ajax;
    var events = new EventManager('net/authentication');
    var log = new Logger('net/authentication');

    /**
     * Event dispatched after the user has successfully logged in
     * @event events/EventManager#logged-in
     * @param {User} user
     */

    /**
     * Event dispatched when the user has finished logging out
     * @event events/EventManager#logged-out
     */

    /**
     * Dispatch this event to forcefully log out the user
     * @event events/EventManager#logout
     */

    /**
     * @type {Object}
     */
    var exports = {
        /**
         * Attempts to authenticate the user
         * @param  {Object} p_credentials login credentials
         * @param  {String} p_credentials.username
         * @param  {String} p_credentials.password
         * @param  {Function} p_callback(textStatus, res.data) to call on
         * success or error.
         * @fires EventManager#logged-in if authenticated successfully
         * @fires EventManager#error on error
         */
        login: function(p_credentials, p_callback) {
            log.debug('attempting to log in: ' + p_credentials.email);
            ajax.post({
                url: '/login',
                data: p_credentials,
                success: function(textStatus, res) {
                    log.debug('user logged in!');
                    // notify logged on user
                    events.dispatch('logged-in', res);
                    if (p_callback) p_callback(textStatus, res.data);
                },
                error: function(textStatus, error) {
                    log.error('error while logging in', error);
                    if (p_callback) p_callback(textStatus, error);
                },
                noEvents: true
            });
        },
        /**
         * Logs out the current user
         * @fires EventManager#logged-out  If logged out successfully
         * @fires EventManager#error       On error
         */
        logout: function() {
            log.debug('attempting to log out');
            ajax.get({
                url: '/logout',
                success: function() {
                    events.dispatch('logged-out');
                    events.dispatch('redirect', '');
                },
                error: function() {
                    log.error('error while logging out');
                    events.dispatchError('error.server.logout');
                },
                noEvents: true
            });
        }
    };

    events.listen({
        /**
         * @listens events/EventManager#logout
         */
        'logout': function() {
            log.debug('`logout` event, logging out the current user');
            exports.logout();
        }
    });

    return exports;
});