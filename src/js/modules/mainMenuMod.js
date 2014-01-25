/**
 * @module modules/mainMenuMod
 */
define(['templates/Bindable', 'knockout', 'singletons'],
    function(Bindable, ko, singletons) {

    var storage = singletons.storage;

    /**
     * @type {Bindable}
     */
    var exports = new Bindable({
        name: 'mainMenuMod',
        viewModel: {
            loggedIn: ko.observable(storage.load('user') ? true : false)
        }
    });

    exports.events.listen({
        /**
         * @listens events/EventManager#logged-in
         */
        'logged-in': function(p_user) {
            this.viewModel.loggedIn(true);
        },
        /**
         * @listens events/EventManager#logged-out
         */
        'logged-out': function() {
            this.viewModel.loggedIn(false);
        }
    });

    return exports;
});