define(['jquery', 'events/event-manager', 'singletons', 'logger'],
    function($, EventManager, singletons, Logger) {

    var ajax = singletons.ajax;
    var router = singletons.router;
    var events = new EventManager('net/authentication');
    var log = new Logger('net/authentication');

    /**
     * Event dispatched after the user has successfully logged in
     * @event EventManager#logged-in
     * @param {User} user
     */

    /**
     * Event dispatched when the user has finished logging out
     * @event EventManager#logged-out
     */

    /**
     * Dispatch this event to forcefully log out the user
     * @event EventManager#logout
     */

    /**
     * @exports authentication
     */
    var authentication = {
        /**
         * Attempts to authenticate the user
         * @param  {Object} p_credentials login credentials
         * @param  {String} p_credentials.username
         * @param  {String} p_credentials.password
         * @fires EventManager#logged-in if authenticated successfully
         * @fires error on error
         */
        login: function(p_credentials) {
            log.debug('attempting to log in: ' + p_credentials.email);
            ajax.post({
                url: '/login',
                data: p_credentials,
                success: function(textStatus, res) {
                    log.debug('user logged in!');
                    // notify logged on user
                    events.dispatch('logged-in', res);
                },
                error: function(textStatus, error) {
                    log.error('error while logging in', error);
                },
                noEvents: true
            });
        },
        /**
         * Logs out the current user
         * @fires logged-out  If logged out successfully
         * @fires error       On error
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
        'logout': function() {
            log.debug('`logout` event, logging out the current user');
            authentication.logout();
        }
    });

    return authentication;
});