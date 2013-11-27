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
                loader = Loader.init('#loader', 5);
            });
        });
        describe('shown signal', function() {
            it('should be a Signal instance', function() {
                expect(loader.shown instanceof signals.Signal).to.be(true);
            });
        });
        describe('hidden signal', function() {
            it('should be a Signal instance', function() {
                expect(loader.hidden instanceof signals.Signal).to.be(true);
            });
        });
        describe('show()', function() {
            it('should be a function', function() {
                expect(loader.show).to.be.a('function');
            });
            it('should dispatch `shown` event on show', function(done) {
                function onShow() {
                    done();
                }
                loader.shown.addOnce(onShow);
                loader.show();
            });
        });
        describe('hide()', function() {
            it('should be a function', function() {
                expect(loader.hide).to.be.a('function');
            });
            it('should dispatch `hidden` event on hide', function(done) {
                function onHide() {
                    done();
                }
                loader.hidden.addOnce(onHide);
                loader.hide();
            });
        });
    });
});