define(['ui/loader', 'signals', 'jquery'], function(Loader, signals, $) {
    describe('ui/loader.js', function() {
        before(function() {
            $('<div>').attr('id', 'loader').appendTo('#test').hide();
        });
        after(function() {
            $('#test').html('');
        });
        var loader;
        describe('init()', function() {
            it('should be a function', function() {
                expect(Loader.init).to.be.a('function');
            });
            it('should return a new instance of Loader', function() {
                loader = Loader.init({
                    selector: '#loader',
                    duration: 20,
                    hideDelay: 10
                });
                expect(loader.state).to.be('hidden');
            });
        });
        describe('stateChanged', function() {
            it('should be a signal', function() {
                var Signal = signals.Signal;
                expect(loader.stateChanged instanceof Signal).to.be(true);
            });
        });
        describe('show()', function() {
            it('should be a function', function() {
                expect(loader.show).to.be.a('function');
            });
            it('should show the `#loader`', function() {
                loader.show();
                expect($('#loader').is(':visible')).to.be(true);
                expect(loader.state).to.be('visible');
            });
        });
        describe('hide()', function() {
            it('should be a function', function() {
                expect(loader.hide).to.be.a('function');
            });
            it('should start to hide the loader after timeout', function(done) {
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('timed');
                    expect(p_old).to.be('visible');
                    var time = new Date().getTime();
                    // do not propagade to the next handler
                    loader.stateChanged.halt();
                });
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hiding');
                    expect(p_old).to.be('timed');
                    var time = new Date().getTime();
                    loader.stateChanged.halt();
                });
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hidden');
                    expect(p_old).to.be('hiding');
                    done();
                });

                var start = new Date().getTime();
                loader.hide();
            });
            it('should postpone hide', function(done) {
                // no delay
                loader.show();
                expect(loader.state).to.be('visible');

                var listener = loader.stateChanged.addOnce(
                    function(p_new, p_old) {
                        expect(p_new).to.be('timed');
                        expect(p_old).to.be('visible');
                        loader.stateChanged.halt();
                        // detach this callback
                        listener.detach();
                        // hide again
                        loader.hide();
                    });
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('timed');
                    expect(p_old).to.be('timed');
                    loader.stateChanged.halt();
                });
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hiding');
                    expect(p_old).to.be('timed');
                    loader.stateChanged.halt();
                });
                loader.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hidden');
                    expect(p_old).to.be('hiding');
                    done();
                });

                loader.hide();
            });
        });
    });
});