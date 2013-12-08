define(['net/ajax', 'events/event-manager'], function(Ajax, EventManager) {
    describe('net/ajax-integration-test.js', function() {

        var events;
        before(function() {
            events = new EventManager('ajax-integration-test');
        });

        afterEach(function() {
            events.clear();
        });

        var ajax;
        describe('constructor', function() {
            it('should create new instance', function() {
                ajax = new Ajax('ajax-integration-test', serverUrl);
                expect(ajax).to.be.ok();
            });
        });

        describe('get() success', function() {
            it('should fetch data from the server', function(done) {
                var successCalled = false;
                ajax.get({
                    url: '/test/success',
                    data: undefined,
                    success: function(textStatus, data){
                        successCalled = true;
                        expect(data).to.be('data-received');
                    },
                    error: function(textStatus, data) {
                        fail();
                    },
                    complete: function(textStatus) {
                        expect(successCalled).to.be(true);
                        done();
                    },
                });
            });
        });

        describe('get() error', function() {
            it('should result in error 500', function(done) {
                var i = 0;
                function finished() {
                    i++;
                    if (i === 2) done();
                }
                events.listen({
                    'msg-error': function(p_key) {
                        expect(p_key).to.be('error.server');
                        finished();
                    }
                });
                var errorCalled = false;
                ajax.get({
                    url:  '/test/error',
                    data: undefined,
                    success: function(textStatus) {
                        fail();
                    },
                    error: function(textStatus, error) {
                        errorCalled = true;
                        expect(textStatus).to.be('error');
                        expect(error).to.be.ok();
                        expect(error.key).to.be('error.server');
                    },
                    complete: function(textStatus) {
                        expect(textStatus).to.be('error');
                        expect(errorCalled).to.be(true);
                        finished();
                    }
                });
            });
        });
    });
});