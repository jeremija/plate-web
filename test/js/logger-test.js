define(['logger'], function(Logger) {
    describe('logger-test.js', function() {
        it('should be ok', function() {
            expect(Logger).to.be.ok();
        });
        var log;
        describe('init()', function() {
            it('should be ok', function() {
                expect(Logger.init).to.be.a('function');
                log = Logger.init('name');
                expect(Logger.isPrototypeOf(log)).to.be(true);
                expect(log).to.be.ok();
            });
        });
        describe('debug()', function() {
            it('should be ok', function() {
                expect(log.warn).to.be.a('function');
                var args = log.warn('one', 'two');
                expect(args).to.be.an('array');
                expect(args.join()).to.be('name> ,one,two');
            });
        });
        describe('warn()', function() {
            it('should be ok', function() {
                expect(log.warn).to.be.a('function');
                var args = log.warn('three', 'four');
                expect(args).to.be.an('array');
                expect(args.join()).to.be('name> ,three,four');
            });
        });
        describe('error()', function() {
            it('should be ok', function() {
                expect(log.error).to.be.a('function');
                var args = log.warn('five', 'six');
                expect(args).to.be.an('array');
                expect(args.join()).to.be('name> ,five,six');
            });
        });
    });
});