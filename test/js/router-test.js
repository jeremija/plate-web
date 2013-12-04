define(['router', 'crossroads', 'hasher', 'events/event-manager',
    'templates/page'],
    function(Router, crossroads, hasher, EventManager, Page) {

    describe('router-test.js', function() {
        var router, events, page;
        before(function() {
            events = new EventManager('router-test');
            page = new Page({
                name: 'a-page',
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
            events.clear();
            router.events.clear();
        });
        it('should be ok and a constructor', function() {
            expect(Router).to.be.ok();
            expect(Router).to.be.a('function');
        });
        describe('constructor', function() {
            it('should setup crossroads and hasher', function() {
                router = new Router({});
                // hasher.setHash('test-hash');
                // expect(router.lastUrl).to.be('test-hash');
            });
        });
        describe('registerPage() and `redirect` event', function() {
            it('should register a page', function() {
                router.registerPage(page);
            });
            it('should call `/page/a-page/new` handler', function() {
                events.dispatch('redirect', '/page/a-page/new');
                expect(page.viewModel.data).to.be('new-data');
            });
            it('should call `/page/a-page/edit/123` handler', function() {
                events.dispatch('redirect', '/page/a-page/edit/123');
                expect(page.viewModel.data).to.be('123');
            });
        });
        describe('unregisterPage()', function() {
            it('should unregister a page', function() {
                router.unregisterPage(page);
            });
            it('should not react to `/page/a-page/new` url', function() {
                page.viewModel.data = undefined;
                events.dispatch('redirect', '/page/a-page/new');
                expect(page.viewModel.data).to.be(undefined);
            });
            it('should not react to `/page/a-page/edit/123` url', function() {
                events.dispatch('redirect', '/page/a-page/edit/123');
                expect(page.viewModel.data).to.be(undefined);
            });
        });
    });
});