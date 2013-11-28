define(['net/ajax'], function(Ajax) {
    describe('net/ajax-test.js', function() {
        it('should be ok', function() {
            expect(Ajax).to.be.ok();
        });
        var ajax;
        describe('init()', function() {
            it('should be a function', function() {
                expect(Ajax.init).to.be.a('function');
            });
            it('should create a new instance of Ajax', function() {
                ajax = Ajax.init();
                expect(Ajax.isPrototypeOf(ajax)).to.be(true);
            });
        });
        describe('get()', function() {
            it('should be a function', function() {
                expect(ajax.get).to.be.a('function');
            });
        });
        describe('post()', function() {
            it('should be a function', function() {
                expect(ajax.post).to.be.a('function');
            });
        });
    });
});