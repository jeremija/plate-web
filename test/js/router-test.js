define(['router', 'crossroads', 'hasher'], function(
    Router, crossroads, hasher) {

    after(function() {
        crossroads.removeAllRoutes();
    });

    describe('router-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Router).to.be.ok();
            expect(Router).to.be.a('function');
        });
        describe('constructor', function() {
            var lastRoute;
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
        });
    });
});