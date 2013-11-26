describe('require/config-test.js', function() {
    it('should load all modules without problems', function(done) {
        var modules = [
            'jquery',
            'extendable',
            'amd-page-loader',
            // 'sammy'
        ];

        require(modules, function() {
            var args = [].slice.call(arguments);
            for (var i in args) {
                var arg = args[i];
                expect(arg).to.be.ok();
            }
            done();
        }, function(err) {
            done(err);
        });
    });
});