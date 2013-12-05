define(['jquery', 'router', 'crossroads', 'hasher', 'events/event-manager',
    'templates/page'],
    function($, Router, crossroads, hasher, EventManager, Page) {

    describe('router-test.js', function() {
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
                states: {
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
                        expect(data.stateUrl).to.be('page/a-page/new');
                        expect(data.stateArgs).to.be.an('array');
                        expect(data.stateArgs.length).to.be(0);
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
                        expect(data.stateUrl).to.be('page/a-page/edit/{id}');
                        expect(data.stateArgs).to.be.an('array');
                        expect(data.stateArgs.length).to.be(1);
                        expect(data.stateArgs[0]).to.be('123');
                        done();
                    }
                });
                events.dispatch('redirect', 'page/a-page/edit/123');
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