define(['templates/bindable', 'knockout'], function(Bindable, ko) {

    var vm = {
        user: ko.observable()
    };

    var userMod = new Bindable({
        id: 'user-mod',
        viewModel: vm
    });

    // userMod.listen({
    //     'login': function() {
    //         // action on logout
    //     },
    //     'logout': function() {
    //         // action on login
    //     }
    // });



    // var element = document.getElementById('user-mod');
    // userMod.bind(element);

    return userMod;
});