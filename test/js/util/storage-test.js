define(['util/storage', 'events/event-manager'],
    function(Storage, EventManager) {

    describe('util/storage-test.js', function() {
        var storage, events;
        before(function() {
            events = new EventManager('util/storage-test');
        });
        afterEach(function() {
            events.clear();
        });
        after(function() {
            storage.events.clear();
        });
        describe('constructor', function() {
            storage = new Storage();
        });
        describe('save()', function() {
            it('should save', function() {
                storage.save('test', {
                    a: 1,
                    b: 2
                });
            });
        });
        describe('load()', function() {
            it('should load', function() {
                var value = storage.load('test');
                expect(value).to.be.ok();
                expect(value.a).to.be(1);
                expect(value.b).to.be(2);
            });
        });
        describe('save() again', function() {
            it('should save and return the previous value', function() {
                var previous = storage.save('test', {
                    c: 3,
                    d: 4
                });
                expect(previous.a).to.be(1);
                expect(previous.b).to.be(2);
            });
        });
        describe('delete()', function() {
            it('should delete and return the previous value', function() {
                var previous = storage.delete('test');
                expect(previous.c).to.be(3);
                expect(previous.d).to.be(4);

                var value = storage.load('test');
                expect(value).to.not.be.ok();
            });
        });
        describe('`login` event', function() {
            it('should save the user to local storage', function() {
                var user = {
                    username: 'john'
                };
                events.dispatch('login', user);
                var usr = storage.load('user');
                expect(user.username).to.be('john');
            });
        });
        describe('`logout` event', function() {
            it('should save the user to local storage', function() {
                events.dispatch('logout');
                var user = storage.load('user');
                expect(user).to.not.be.ok();
            });
        });
    });

});