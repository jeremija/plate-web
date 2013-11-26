require(['router', 'crossroads', 'hasher'], function(
    Router, crossroads, hasher) {

    after(function() {
        crossroads.removeAllRoutes();
    });

    describe('router-test.js', function() {
        describe('init()', function() {
            it('should be ok', function() {
                expect(Router).to.be.ok();
                expect(Router.init).to.be.a('function');
            });
            var lastRoute;
            it('should setup crossroads and hasher', function() {
                Router.init({
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