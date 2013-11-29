define(['events/event-manager', 'signals'], function(eventManager, signals) {
    var Signal = signals.Signal;

    describe('events/event-manager-test.js', function() {
        it('should be ok', function() {
            expect(eventManager).to.be.ok();
        });
        var triggered1, triggered2, triggered3;
        beforeEach(function() {
            triggered1 = false;
            triggered2 = false;
            triggered3 = false;
        });
        describe('listen()', function() {
            it('should be a function', function() {
                expect(eventManager.listen).to.be.a('function');
            });
            it('should add event listeners per module', function() {
                eventManager.listen('identifier1', {
                    'event1': function(arg1, arg2) {
                        expect(arg1).to.be('arg1');
                        expect(arg2).to.be('arg2');
                        triggered1 = true;
                    },
                    'event2': function(arg1, arg2) {
                        triggered2 = true;
                    }
                });
                eventManager.listen('identifier2', {
                    'event1': function(arg1, arg2) {
                        expect(arg1).to.be('arg1');
                        expect(arg2).to.be('arg2');
                        triggered3 = true;
                    }
                });
            });
        });
        describe('dispatch()', function() {
            it('should be a function', function() {
                expect(eventManager.dispatch).to.be.a('function');
            });
            it('should trigger event1', function() {
                eventManager.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(true);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
            it('should trigger event2', function() {
                eventManager.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(true);
                expect(triggered3).to.be(false);
            });
        });
        describe('ignore()', function() {
            it('should be a function', function() {
                expect(eventManager.ignore).to.be.a('function');
            });
            it('should prevent id1 event1 fcn from being called', function() {
                eventManager.ignore('identifier1');

                eventManager.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
            it('should prevent id1 event2 fcn from being called', function() {
                eventManager.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(false);
            });
        });
        describe('listen() after ignore()', function() {
            it('should reenable listeners for identifier', function() {
                eventManager.listen('identifier1');

                eventManager.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(true);
                expect(triggered3).to.be(false);

                triggered2 = false;

                eventManager.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(true);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
        });
        describe('clear()', function() {
            it('should be a function', function() {
                expect(eventManager.clear).to.be.a('function');
            });
            it('should remove the event handlers for identifier', function() {
                eventManager.clear('identifier1');
                eventManager.dispatch('event1', 'arg1', 'arg2');
                eventManager.dispatch('event2', 'arg1', 'arg2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
                eventManager.clear('identifier2');
            });
            it('should not be listening for events after listen()', function() {
                eventManager.listen('identifier1');
                eventManager.listen('identifier2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered2).to.be(false);
            });
        });
        var newLocale, binding;
        describe('addLocalizeListener()', function() {
            it('should be a function', function() {
                expect(eventManager.addLocalizeListener).to.be.a('function');
            });
            it('should add a listener for a change locale signal', function() {
                binding = eventManager.addLocalizeListener(function(p_locale) {
                    newLocale = p_locale;
                });
            });
        });
        describe('changeLocale()', function() {
            it('should be a function', function() {
                expect(eventManager.changeLocale).to.be.a('function');
            });
            it('should trigger change locale listener', function() {
                eventManager.changeLocale('en');
                expect(newLocale).to.be('en');
                binding.detach();
            });
        });
    });

    return eventManager;
});