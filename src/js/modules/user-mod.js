define(['templates/bindable', 'knockout', 'singletons', 'net/authentication'],
    function(Bindable, ko, singletons, authentication) {

    var ajax = singletons.ajax;

    var vm = {
        user: ko.observable(),
        loggedIn: ko.observable(false),
        logout: function(p_data) {
            authentication.logout();
        }
    };

    var userMod = new Bindable({
        name: 'user-mod',
        viewModel: vm,
        events: {
            'logged-in': function(p_user) {
                this.log.debug('logged-in event, setting user: ', p_user);
                this.viewModel.user(p_user);
                this.viewModel.loggedIn(true);
            },
            'logged-out': function() {
                this.log.debug('logged-out event, unsetting user');
                this.viewModel.loggedIn(false);
                this.viewModel.user(undefined);
            }
        },
        visible: true
    });

    // var element = document.getElementById('user-mod');
    // userMod.bind(element);

    return userMod;
});