define(['ui/loading-listener', 'events/event-manager'],
    function(LoadingListener, EventManager) {

    describe('ui/loading-listener-test.js', function() {

        var loadingMock, showCount = 0, hideCount = 0;
        var events;
        before(function() {
            loadingMock = {
                show: function() {
                    showCount++;
                },
                hide: function() {
                    hideCount++;
                }
            };
            events = new EventManager('loading-page-listener-test');
        });

        after(function() {
            loadingListener.events.clear();
        });

        var loadingListener;
        describe('constructor', function() {
            it('should create a new instance', function() {
                loadingListener = new LoadingListener({
                    name: 'test',
                    loading: loadingMock
                });
                expect(loadingListener).to.be.ok();
            });
        });
        describe('`page-loading-start` event', function() {
            it('should show loading', function() {
                events.dispatch('page-loading-start');
                expect(showCount).to.be(1);
                expect(hideCount).to.be(0);
            });
        });
        describe('`page-loading-end` event', function() {
            it('should show loading', function() {
                events.dispatch('page-loading-end');
                expect(showCount).to.be(1);
                expect(hideCount).to.be(1);
            });
        });
                describe('`ajax-start` event', function() {
            it('should show loading', function() {
                events.dispatch('ajax-start');
                expect(showCount).to.be(2);
                expect(hideCount).to.be(1);
            });
        });
        describe('`ajax-end` event', function() {
            it('should show loading', function() {
                events.dispatch('ajax-end');
                expect(showCount).to.be(2);
                expect(hideCount).to.be(2);
            });
        });
    });
});