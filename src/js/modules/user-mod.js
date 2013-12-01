define(['templates/bindable', 'knockout', 'singletons', 'net/authentication'],
    function(Bindable, ko, singletons, authentication) {

    var ajax = singletons.ajax;

    var vm = {
        user: ko.observable(),
        loggedIn: ko.observable(false),
        logout: function(p_data) {
            authentication.logout();
        }
        // logout: function(p_data) {
        //     ajax.get({
        //         url: '/logout',
        //         error: function() {
        //         },
        //         success: function() {
        //             userMod.events.dispatch('logout');
        //         }
        //     });
        // }
    };

    var userMod = new Bindable({
        name: 'user-mod',
        viewModel: vm,
        events: {
            'login': function(p_user) {
                this.log.debug('login event, setting user: ', p_user);
                this.viewModel.user(p_user);
                this.viewModel.loggedIn(true);
            },
            'logout': function() {
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