define(['templates/page-manager', 'templates/page', 'events/event-manager'],
    function(PageManager, Page, EventManager) {

    describe('templates/page-manager-test.js', function() {
        var events;
        before(function() {
            events = new EventManager('page-manager-test');
        });
        after(function() {
            pageManager.events.clear();
            pageManager.router.events.clear();
            // pageManager.router.unregisterPage(page2);
            pageManager.router.unregisterPage(page1);
            events.clear();
        });
        beforeEach(function() {
            pageState1 = undefined;
            pageState2 = undefined;
        });
        var pageManager, page1, page2, page3, pageState1, pageState2, pageState3;
        describe('constructor', function() {
            it('should be ok', function() {
                page1 = new Page({
                    name: 'page1',
                    states: {
                        'test/page1/{id}': function(id) {
                            pageState1 = id;
                        }
                    }
                });
                page2 = new Page({
                    name: 'page2',
                    states: {
                        'test/page2/{id}': function(id) {
                            pageState2 = id;
                        }
                    },
                    requireLogin: true
                });
                page3 = new Page({
                    name: 'page3',
                    states: {
                        'test/page3/{id}': function(id) {
                            pageState3 = id;
                        }
                    }
                });
                pageManager = new PageManager({
                    name: 'page-manager',
                    pages: [page1, page2, page3]
                });
                expect(pageManager).to.be.ok();
            });
            it('should react to test/page1/123 redirect', function() {
                events.dispatch('redirect', 'test/page1/123');
                expect(pageState1).to.be('123');
            });
            it('should not react to test/page2/456 redirect', function() {
                events.dispatch('redirect', 'test/page2/456');
                expect(pageState2).to.not.be.ok();
            });
            it('should react to test/page3/789 redirect', function() {
                events.dispatch('redirect', 'test/page3/789');
                expect(pageState3).to.be('789');
            });
        });
        describe('`login` event', function() {
            it('should react to test/page1/123 redirect', function() {
                events.dispatch('login', {});
                events.dispatch('redirect', 'test/page1/123');
                expect(pageState1).to.be('123');
            });
            it('should react to test/page2/456 redirect', function() {
                events.dispatch('redirect', 'test/page2/456');
                expect(pageState2).to.be('456');
            });
            it('should react to test/page3/789 redirect', function() {
                events.dispatch('redirect', 'test/page3/789');
                expect(pageState3).to.be('789');
            });
        });
        describe('`logout` event', function() {
            it('should react to test/page1/123 redirect', function() {
                events.dispatch('logout', {});
                events.dispatch('redirect', 'test/page1/123');
                expect(pageState1).to.be('123');
            });
            it('should not react to test/page2/456 redirect', function() {
                events.dispatch('redirect', 'test/page2/456');
                expect(pageState2).to.be(undefined);
            });
            it('should react to test/page3/789 redirect', function() {
                events.dispatch('redirect', 'test/page3/789');
                expect(pageState3).to.be('789');
            });
        });
    });
});