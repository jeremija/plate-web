define(['events/event-manager', 'templates/bindable'],
    function(EventManager, Bindable) {

    var userMod;
    describe('user-mod-test', function() {
        var events, user;
        before(function(done) {
            events = new EventManager('user-mod-test');
            user = {
                email: 'test@test.com'
            };
            require(['modules/user-mod'], function(p_userMod) {
                userMod = p_userMod;
                done();
            });
        });
        after(function() {
            // do not listen for events
            userMod.hide(); // or userMod.events.ignore()
        });
        it('should be ok', function() {
            expect(userMod).to.be.ok();
            expect(userMod instanceof Bindable).to.be(true);
            // to make it listen to the events
            // userMod.show(); // or userMod.events.listen()
        });
        describe('`logged-in` event', function() {
            it('should listen to the event', function() {
                events.dispatch('logged-in', user);
                expect(userMod.viewModel.user()).to.be(user);
            });
        });
        describe('`logged-out` event', function() {
            it('should listen to the event', function() {
                events.dispatch('logged-out');
                expect(userMod.viewModel.user()).to.be(undefined);
            });
        });
    });
});