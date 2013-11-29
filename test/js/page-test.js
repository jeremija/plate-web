require(['page', 'jquery', 'bindable'], function(Page, $, Bindable) {
    describe('page-test.js', function() {
        after(function() {
            $('#test').html('');
        });

        it('should be ok and a constructor', function() {
            expect(Page).to.be.ok();
            expect(typeof Page).to.be('function');
        });
        var page, el;
        describe('constructor', function() {
            it('should create a new Page instance', function() {
                page = new Page({
                    id: 'test-page-name'
                });
                expect(page instanceof Page).to.be(true);
                expect(Bindable.prototype.isPrototypeOf(page)).to.be.ok();
                expect(page.id).to.be('test-page-name');
            });
        });
        describe('bind()', function() {
            before(function() {
                el = $('<div>').attr('id', 'test-page-id').appendTo('#test')[0];
            });
            it('should be a function', function() {
                expect(page.bind).to.be.a('function');
            });
            it('should bind an element to the page', function() {
                page.bind(el);
            });
        });
        describe('hide()', function() {
            it('should be a function', function() {
                expect(page.hide).to.be.a('function');
            });
            it('should hide page dom', function() {
                page.hide();
                expect($(el).is(':visible')).to.be(false);
            });
        });
        describe('show()', function() {
            it('should be defined', function() {
                expect(page.show).to.be.a('function');
            });
            it('should show page dom', function() {
                page.show();
                expect($(el).is(':visible')).to.be(true);
            });
        });
    });
});