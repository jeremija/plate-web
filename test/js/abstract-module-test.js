define(['abstract-module', 'jquery', 'knockout'], function(Module, $, ko) {
    describe('module-test.js', function() {
        it('should be ok', function() {
            expect(Module).to.be.ok();
        });
        var mod, el;
        before(function() {
            var $el = $('<div>').attr('id', 'module-id').hide().
                appendTo('#test');
            $('<span>').attr('id', 'testObservableSpan').
                attr('data-bind', 'text: testObservable').appendTo($el);
            el = $el[0];
        });
        after(function() {
            // clean knockout bindings before removing the DOM
            ko.cleanNode(el);
            $('#test').html('');
        });
        describe('init()', function() {
            it('should be a function', function() {
                expect(Module.init).to.be.a('function');
            });
            it('should create a new instance of Module', function() {
                mod = Module.init({
                    viewModel: {
                        testObservable: ko.observable()
                    }
                });
                expect(Module.isPrototypeOf(mod)).to.be(true);
            });
        });
        describe('bind()', function() {
            it('should be a function', function() {
                expect(mod.bind).to.be.a('function');
            });
            it('should bind the viewModel to the element', function() {
                mod.bind(el);
                mod.viewModel.testObservable('test1234');
                expect($('#testObservableSpan').text()).to.be('test1234');
            });
        });
        describe('show()', function() {
            it('should show the element', function() {
                mod.show();
                expect($(el).is(':visible')).to.be(true);
            });
        });
        describe('hide()', function() {
            it('should hide the element', function() {
                mod.hide();
                expect($(el).is(':visible')).to.be(false);
            });
        });
    });
});