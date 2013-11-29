define(['pages/error', 'templates/page'], function(errorPage, Page) {
    describe('error-test.js', function() {
        it('should be instance of Page', function() {
            expect(errorPage instanceof Page).to.be(true);
        });
    });
});