define(['net/Ajax'], function(Ajax) {
    describe('net/ajax-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Ajax).to.be.ok();
            expect(Ajax).to.be.a('function');
        });
        var ajax;
        describe('constructor', function() {
            it('should create a new instance of Ajax', function() {
                ajax = new Ajax();
                expect(ajax instanceof Ajax).to.be(true);
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