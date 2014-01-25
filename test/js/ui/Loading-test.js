define(['ui/Loading', 'signals', 'jquery'], function(Loading, signals, $) {
    describe('ui/loading.js', function() {
        before(function() {
            $('<div>').attr('id', 'loading').appendTo('#test').hide();
        });
        after(function() {
            $('#test').html('');
        });
        var loading;
        it('should be ok and a constructor', function() {
            expect(Loading).to.be.ok();
            expect(Loading).to.be.a('function');
        });
        describe('constructor', function() {
            it('should return a new instance of Loading', function() {
                loading = new Loading({
                    selector: '#loading',
                    duration: 20,
                    hideDelay: 10
                });
                expect(loading.state).to.be('hidden');
            });
        });
        describe('stateChanged', function() {
            it('should be a signal', function() {
                var Signal = signals.Signal;
                expect(loading.stateChanged instanceof Signal).to.be(true);
            });
        });
        describe('show()', function() {
            it('should be a function', function() {
                expect(loading.show).to.be.a('function');
            });
            it('should show the `#loading`', function() {
                loading.show();
                expect($('#loading').is(':visible')).to.be(true);
                expect(loading.state).to.be('visible');
            });
        });
        describe('hide()', function() {
            it('should be a function', function() {
                expect(loading.hide).to.be.a('function');
            });
            it('should start hiding the loading after timeout', function(done) {
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('timed');
                    expect(p_old).to.be('visible');
                    var time = new Date().getTime();
                    // do not propagade to the next handler
                    loading.stateChanged.halt();
                });
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hiding');
                    expect(p_old).to.be('timed');
                    var time = new Date().getTime();
                    loading.stateChanged.halt();
                });
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hidden');
                    expect(p_old).to.be('hiding');
                    done();
                });

                var start = new Date().getTime();
                loading.hide();
            });
            it('should postpone hide', function(done) {
                // no delay
                loading.show();
                expect(loading.state).to.be('visible');

                var listener = loading.stateChanged.addOnce(
                    function(p_new, p_old) {
                        expect(p_new).to.be('timed');
                        expect(p_old).to.be('visible');
                        loading.stateChanged.halt();
                        // detach this callback
                        listener.detach();
                        // hide again
                        loading.hide();
                    });
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('timed');
                    expect(p_old).to.be('timed');
                    loading.stateChanged.halt();
                });
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hiding');
                    expect(p_old).to.be('timed');
                    loading.stateChanged.halt();
                });
                loading.stateChanged.addOnce(function(p_new, p_old) {
                    expect(p_new).to.be('hidden');
                    expect(p_old).to.be('hiding');
                    done();
                });

                loading.hide();
            });
        });
    });
});