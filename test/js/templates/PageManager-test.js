define(['templates/PageManager', 'templates/Page', 'events/EventManager'],
    function(PageManager, Page, EventManager) {

    describe('templates/PageManager-test.js', function() {
        var events, routerMock, registeredPages = [], unregisteredPages = [];
        before(function() {
            events = new EventManager('PageManager-test');
            routerMock = {
                registerPage: function(p_page) {
                    registeredPages.push(p_page);
                },
                unregisterPage: function(p_page) {
                    unregisteredPages.push(p_page);
                },
                init: function() {
                    this.initialized = true;
                }
            };
        });
        after(function() {
            pageManager.events.clear();
            // pageManager.router.unregisterPage(page1);
        });
        afterEach(function() {
            events.clear();
        });
        beforeEach(function() {
            pageState1 = undefined;
            pageState2 = undefined;
        });
        var pageManager, page1, page2, pageState1, pageState2;
        describe('constructor', function() {
            it('should be ok', function() {
                page1 = new Page({
                    name: 'test-page'
                });
                page2 = new Page({
                    name: 'test-page',
                    requireLogin: true
                });
                pageManager = new PageManager({
                    name: 'PageManager',
                    pages: [page1, page2],
                    router: routerMock
                });
                expect(pageManager).to.be.ok();
            });
            it('should have registered page1', function() {
                expect(registeredPages.length).to.be(1);
                expect(registeredPages[0]).to.be(page1);
            });
        });
        describe('`logged-in` event', function() {
            it('should register page2 after the login event', function() {
                events.dispatch('logged-in', {});
                expect(registeredPages.length).to.be(2);
                expect(registeredPages[0]).to.be(page1);
                expect(registeredPages[1]).to.be(page2);
            });
        });
        describe('`logged-out` event', function() {
            it('should unregister page2 after the logout event', function() {
                events.dispatch('logged-out');
                // this didn't change because of mock, this test is to make
                // sure that nothing more was registered in the mean time
                expect(registeredPages.length).to.be(2);
                expect(unregisteredPages.length).to.be(1);
                expect(unregisteredPages[0]).to.be(page2);
            });
        });
    });
});