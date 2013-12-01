define(['events/event-manager', 'singletons', 'logger'],
    function(EventManager, singletons, Logger) {

    var ajax = singletons.ajax;
    var router = singletons.router;
    var events = new EventManager('net/authentication');
    var log = new Logger('net/authentication');

    /**
     * @exports authentication
     */
    var authentication = {
        logout: function(p_credentials) {
            log.debug('attempting to log out');
            ajax.get({
                url: '/logout',
                success: function() {
                    events.dispatch('logout');
                    router.go('login');
                },
                error: function() {
                    log.error('error while logging out');
                    events.dispatch('error', 'error.logout');
                }
            });
        },
        login: function(p_credentials) {
            log.debug('attempting to log in' + p_credentials.email);
            ajax.post({
                url: '/login',
                data: p_credentials,
                success: function(textStatus, res) {
                    if (res.err) {
                        log.debug('wrong username or password');
                        // notify wrong password
                        return;
                    }
                    log.debug('user logged in!');
                    // set logged on user
                    events.dispatch('login', res.data);
                },
                error: function() {
                    events.dispatch('error', 'error.login');
                    // notify error
                }
            });
        }
    };

    return authentication;
});