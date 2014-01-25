define(['templates/Bindable', 'jquery', 'knockout'], function(Bindable, $, ko) {
    describe('bindable-test.js', function() {
        it('should be a constructor', function() {
            expect(Bindable).to.be.ok();
            expect(Bindable).to.be.a('function');
        });
        var bindable, el;
        before(function() {
            var $el = $('<div>').attr('id', 'bindable-id').hide().
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
        describe('constructor', function() {
            it('should create a new instance of Bindable', function() {
                bindable = new Bindable({
                    viewModel: {
                        testObservable: ko.observable()
                    }
                });
                expect(bindable instanceof Bindable).to.be(true);
                expect(Bindable.prototype.isPrototypeOf(bindable)).to.be(true);
            });
        });
        describe('bind()', function() {
            it('should be a function', function() {
                expect(bindable.bind).to.be.a('function');
            });
            it('should bind the viewModel to the element', function() {
                bindable.bind(el);
                bindable.viewModel.testObservable('test1234');
                expect($('#testObservableSpan').text()).to.be('test1234');
            });
        });
        describe('show()', function() {
            it('should show the element', function() {
                bindable.show();
                expect($(el).is(':visible')).to.be(true);
            });
        });
        describe('hide()', function() {
            it('should hide the element', function() {
                bindable.hide();
                expect($(el).is(':visible')).to.be(false);
            });
        });
    });
});