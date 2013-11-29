(function() {
    mocha.setup('bdd')
        .globals(['jQuery*'])
        .checkLeaks();

    function run() {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    }

    require(['logger'], function(Logger) {
        // disable log output in tests
        Logger.prototype.disabled = true;

        require(tests, function() {
            run();
        });
    });

}());