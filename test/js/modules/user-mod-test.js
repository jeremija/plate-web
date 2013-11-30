define(['modules/user-mod', 'events/event-manager', 'templates/bindable'],
    function(userMod, EventManager, Bindable) {

    describe('user-mod-test', function() {
        var events, user;
        before(function() {
            events = new EventManager('user-mod-test');
            user = {
                email: 'test@test.com'
            };
        });
        after(function() {
            // do not listen for events
            userMod.hide(); // or userMod.events.ignore()
        });
        it('should be ok', function() {
            expect(userMod).to.be.ok();
            expect(userMod instanceof Bindable).to.be(true);
            // to make it listen to the events
            userMod.show(); // or userMod.events.listen()
        });
        describe('`login` event', function() {
            it('should listen to the event', function() {
                events.dispatch('login', user);
                expect(userMod.viewModel.user()).to.be(user);
            });
        });
        describe('`logout` event', function() {
            it('should listen to the event', function() {
                events.dispatch('logout');
                expect(userMod.viewModel.user()).to.be(undefined);
            });
        });
    });
});