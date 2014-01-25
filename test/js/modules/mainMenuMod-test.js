define(['modules/mainMenuMod', 'templates/Bindable', 'events/EventManager', 
    'knockout'], 
    function(mainMenuMod, Bindable, EventManager, ko) {

    var events, viewModel;
    before(function() {
        events = new EventManager('modules/mainMenuMod-test');
    });
    afterEach(function() {
        events.clear();
    });

    describe('modules/mainMenuMod-test.js', function() {
        it('should be a Bindable', function() {
            expect(mainMenuMod instanceof Bindable).to.be(true);
        });
        describe('viewModel', function() {
            it('should be an object', function() {
                viewModel = mainMenuMod.viewModel;
                expect(viewModel).to.be.an('object');
            });
            it('should have `loggedIn` observable', function() {
                expect(ko.isObservable(viewModel.loggedIn)).to.be(true);
            });
        });
        describe('`logged-in` event', function() {
            it('should set the loggedIn observable to true', function() {
                viewModel.loggedIn(undefined);
                // {} is supposed to be a user
                events.dispatch('logged-in', {});
                expect(viewModel.loggedIn()).to.be(true);
            });
        });
        describe('`logged-out` event', function() {
            it('should set the loggedIn observable to false', function() {
                viewModel.loggedIn(undefined);
                events.dispatch('logged-out');
                expect(viewModel.loggedIn()).to.be(false);
            });
        });
    });
});