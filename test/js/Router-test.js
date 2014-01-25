define(['jquery', 'Router', 'crossroads', 'hasher', 'events/EventManager',
    'templates/Page'],
    function($, Router, crossroads, hasher, EventManager, Page) {

    describe('Router-test.js', function() {
        var router, events, page, doneCallback;
        before(function() {
            crossroads.addRoute('', function() {});
            crossroads.addRoute('error', function() {});

            events = new EventManager('router-test');
            page = new Page({
                name: 'test-page',
                viewModel: {
                    data: undefined
                },
                routes: {
                    'page/a-page/new': function() {
                        this.viewModel.data = 'new-data';
                    },
                    'page/a-page/edit/{id}': function(id) {
                        this.viewModel.data = id;
                    }
                }
            });
        });
        after(function() {
            crossroads.removeAllRoutes();
            router.clear();
        });
        afterEach(function() {
            events.clear();
            hasher.setHash('');
        });
        it('should be ok and a constructor', function() {
            expect(Router).to.be.ok();
            expect(Router).to.be.a('function');
        });
        describe('constructor', function() {
            it('should setup crossroads and hasher', function() {
                router = new Router({
                    name: 'router-test',
                });
                router.init();
            });
        });
        describe('registerPage() and `redirect` event', function() {
            it('should register a page', function() {
                router.registerPage(page);
            });
            it('should emit `page-found` event for `page/a-page/new`',
                function(done) {

                events.listen({
                    'page-route-found': function(data) {
                        expect(data).to.be.ok();
                        expect(data.page).to.be(page);
                        expect(data.routeUrl).to.be('page/a-page/new');
                        expect(data.routeArgs).to.be.an('array');
                        expect(data.routeArgs.length).to.be(0);
                        done();
                    }
                });
                events.dispatch('redirect', 'page/a-page/new');
            });
            it('should emit `page-found` event for `page/a-page/edit/123`',
                function(done) {

                events.listen({
                    'page-route-found': function(data) {
                        expect(data).to.be.ok();
                        expect(data.page).to.be(page);
                        expect(data.routeUrl).to.be('page/a-page/edit/{id}');
                        expect(data.routeArgs).to.be.an('array');
                        expect(data.routeArgs.length).to.be(1);
                        expect(data.routeArgs[0]).to.be('123');
                        done();
                    }
                });
                events.dispatch('redirect', 'page/a-page/edit/123');
            });
        });
        describe('`subpage` event for `page/a-page/new#page/a-page/edit/123',
            function(done) {

            it('should emit `page-route-found` for `....edit/123`', function(done) {
                events.listen({
                    'page-route-found': function(data) {
                        expect(data).to.be.ok();
                        expect(data.page).to.be(page);
                        expect(data.routeUrl).to.be('page/a-page/edit/{id}');
                        expect(data.routeArgs).to.be.an('array');
                        expect(data.routeArgs.length).to.be(1);
                        expect(data.routeArgs[0]).to.be('123');
                        expect(data.routesPath).to.be.ok();
                        expect(data.routesPath.literal).to.be(
                            'route1#route2#route3#page/a-page/edit/123');
                        expect(data.routesPath.abstract).to.be(
                            'route1#route2#route3#page/a-page/edit/{id}');
                        done();
                    }
                });
                router.routesPath.literal = 'route1#route2#route3';
                router.routesPath.abstract = 'route1#route2#route3';
                events.dispatch('subpage', 'page/a-page/edit/123');
            });
        });
        describe('unregisterPage()', function() {
            it('should unregister a page', function() {
                router.unregisterPage(page);
            });
            it('should not react to `page/a-page/new` url', function(done) {
                events.listen({
                    'page-route-not-found': function(p_url) {
                        expect(p_url).to.be('page/a-page/new');
                        done();
                    }
                });
                events.dispatch('redirect', 'page/a-page/new');
            });
            it('should not react to `page/a-page/edit/123` url', function(done) {
                events.listen({
                    'page-route-not-found': function(p_url) {
                        expect(p_url).to.be('page/a-page/edit/123');
                        done();
                    }
                });
                events.dispatch('redirect', 'page/a-page/edit/123');
            });
        });
    });
});