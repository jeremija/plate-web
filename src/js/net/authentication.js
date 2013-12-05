define(['jquery', 'events/event-manager', 'singletons', 'logger'],
    function($, EventManager, singletons, Logger) {

    var ajax = singletons.ajax;
    var router = singletons.router;
    var events = new EventManager('net/authentication');
    var log = new Logger('net/authentication');

    /**
     * @event EventManager#logged-in
     * @param {User} user
     */

    /**
     * @event EventManager#logged-out
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
            log.debug('attempting to log in' + p_credentials.email);
            ajax.post({
                url: '/login',
                data: p_credentials,
                success: function(textStatus, res) {
                    if (res.err) {
                        log.debug('wrong username or password');
                        // TODO notify wrong password
                        events.dispatch('error', 'error.login.credentials');
                        return;
                    }
                    log.debug('user logged in!');
                    // notify logged on user
                    events.dispatch('logged-in', res.data);
                },
                error: function() {
                    log.error('error while logging in');
                    events.dispatchError('error.server.login');
                }
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
                    // router.go('login');
                },
                error: function() {
                    log.error('error while logging out');
                    events.dispatchError('error.server.logout');
                }
            });
        }
    };

    return authentication;
});