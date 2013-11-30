define(['templates/bindable', 'knockout'], function(Bindable, ko) {

    var vm = {
        user: ko.observable()
    };

    var userMod = new Bindable({
        name: 'user-mod',
        viewModel: vm,
        events: {
            'login': function(p_user) {
                this.viewModel.user(p_user);
            },
            'logout': function() {
                this.viewModel.user(undefined);
            }
        }
    });

    // var element = document.getElementById('user-mod');
    // userMod.bind(element);

    return userMod;
});