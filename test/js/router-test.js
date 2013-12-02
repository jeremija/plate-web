define(['router', 'crossroads', 'hasher', 'events/event-manager'], function(
    Router, crossroads, hasher, EventManager) {

    var events;
    before(function() {
        events = new EventManager('router-test');
    });
    after(function() {
        crossroads.removeAllRoutes();
        events.clear();
    });

    describe('router-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Router).to.be.ok();
            expect(Router).to.be.a('function');
        });
        describe('constructor', function() {
            var lastRoute, router;
            it('should setup crossroads and hasher', function() {
                new Router({
                    onRouteChange: function(p_route) {
                        lastRoute = p_route;
                    }
                });

                hasher.setHash('test-hash');

                expect(lastRoute).to.be('test-hash');

                hasher.setHash();
            });
            it('should listen for `redirect` event', function() {
                events.dispatch('redirect', 'testurl');
                expect(lastRoute).to.be('testurl');
            });
        });
    });
});