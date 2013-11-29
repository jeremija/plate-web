define(['logger'], function(Logger) {
    describe('logger-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Logger).to.be.ok();
            expect(Logger).to.be.a('function');
        });
        var log;
        describe('constructor', function() {
            it('should be ok', function() {
                log = new Logger('name');
                expect(log instanceof Logger).to.be(true);
                expect(Logger.prototype.isPrototypeOf(log)).to.be(true);
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