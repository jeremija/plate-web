define(['events/event-manager', 'signals'], function(EventManager, signals) {
    var Signal = signals.Signal;

    describe('events/event-manager-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(EventManager).to.be.ok();
            expect(EventManager).to.be.a('function');
        });
        var events, events2;
        it('should create new instance', function() {
            events = new EventManager('name1');
            // set a different context for events2
            events2 = new EventManager('name2', {
                a: 'value-of-a'
            });
        });
        var triggered1, triggered2, triggered3, triggeredErrorEvent;
        beforeEach(function() {
            triggered1 = false;
            triggered2 = false;
            triggered3 = false;
            triggeredErrorEvent = false;
        });
        describe('listen()', function() {
            it('should be a function', function() {
                expect(events.listen).to.be.a('function');
            });
            it('should add event listeners per module', function() {
                events.listen({
                    'event1': function(arg1, arg2) {
                        expect(arg1).to.be('arg1');
                        expect(arg2).to.be('arg2');
                        triggered1 = true;
                    },
                    'event2': function(arg1, arg2) {
                        triggered2 = true;
                    }
                });
                events2.listen({
                    'event1': function(arg1, arg2) {
                        expect(arg1).to.be('arg1');
                        expect(arg2).to.be('arg2');
                        // check the context
                        expect(this.a).to.be('value-of-a');
                        triggered3 = true;
                    },
                    'error': function() {
                        triggeredErrorEvent = true;
                    }
                });
            });
        });
        describe('dispatch()', function() {
            it('should be a function', function() {
                expect(events.dispatch).to.be.a('function');
            });
            it('should trigger event1', function() {
                events.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(true);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
            it('should trigger event2', function() {
                events.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(true);
                expect(triggered3).to.be(false);
            });
        });
        describe('dispatchError()', function() {
            it('should dispatch `error` event', function() {
                expect(triggeredErrorEvent).to.be(false);
                events.dispatchError();
                expect(triggeredErrorEvent).to.be(true);
            });
        });
        describe('ignore()', function() {
            it('should be a function', function() {
                expect(events.ignore).to.be.a('function');
            });
            it('should prevent id1 event1 fcn from being called', function() {
                events.ignore();

                events.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
            it('should prevent id1 event2 fcn from being called', function() {
                events.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(false);
            });
        });
        describe('listen() after ignore()', function() {
            it('should reenable listeners for identifier', function() {
                events.listen();

                events.dispatch('event2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(true);
                expect(triggered3).to.be(false);

                triggered2 = false;

                events.dispatch('event1', 'arg1', 'arg2');
                expect(triggered1).to.be(true);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
        });
        describe('clear()', function() {
            it('should be a function', function() {
                expect(events.clear).to.be.a('function');
            });
            it('should remove the event handlers for identifier', function() {
                events.clear();
                events.dispatch('event1', 'arg1', 'arg2');
                events.dispatch('event2', 'arg1', 'arg2');
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered3).to.be(true);
            });
            it('should not be listening for events after listen()', function() {
                events2.clear();
                events.listen();
                events2.listen();
                expect(triggered1).to.be(false);
                expect(triggered2).to.be(false);
                expect(triggered2).to.be(false);
            });
        });
    });

});