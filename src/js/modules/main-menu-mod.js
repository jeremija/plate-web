define(['templates/bindable', 'knockout', 'singletons'],
    function(Bindable, ko, singletons) {

    var storage = singletons.storage;

    var mainMenuMod = new Bindable({
        name: 'main-menu-mod',
        viewModel: {
            loggedIn: ko.observable(storage.load('user') ? true : false)
        }
    });

    mainMenuMod.events.listen({
        'logged-in': function(p_user) {
            this.viewModel.loggedIn(true);
        },
        'logged-out': function() {
            this.viewModel.loggedIn(false);
        }
    });

    return mainMenuMod;
});