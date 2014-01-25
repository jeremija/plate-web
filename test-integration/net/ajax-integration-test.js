define(['net/Ajax', 'events/EventManager'], function(Ajax, EventManager) {
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
                    },
                    invalid: function() {
                        fail();
                    }
                });
            });
        });

        describe('post() validation error', function() {
            it('should call invalid handler', function(done) {
                var errorCalled = false, invalidCalled = false;
                ajax.post({
                    url: '/test/validation-error',
                    data: undefined,
                    success: function(textStatus) {
                        fail();
                    },
                    error: function(textStatus, err) {
                        errorCalled = true;
                        expect(err.name).to.be('ValidationError');
                        expect(err.key).to.be('error.validation');
                        expect(err.details).to.be.ok();
                        expect(err.details.errors).to.be.ok();
                    },
                    invalid: function(errors) {
                        invalidCalled = true;
                        expect(errors).to.be.ok();
                        expect(errors.field1).to.be.ok();
                    },
                    complete: function(textStatus) {
                        expect(errorCalled).to.be(true);
                        expect(invalidCalled).to.be(true);
                        done();
                    }
                });
            });
        });
    });
});