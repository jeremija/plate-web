require(['page', 'jquery'], function(Page, $) {
    describe('page-test.js', function() {
        after(function() {
            $('#test').html('');
        });

        it('should be ok', function() {
            expect(Page).to.be.ok();
        });
        var page, el;
        describe('init()', function() {
            it('should be a function', function() {
                expect(Page.init).to.be.a('function');
            });
            it('should create a new Page instance', function() {
                page = Page.init({
                    name: 'test-page-name'
                });

                expect(Page.isPrototypeOf(page)).to.be(true);
                expect(page.name).to.be('test-page-name');
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
                expect(Page.show).to.be.a('function');
            });
            it('should show page dom', function() {
                page.show();
                expect($(el).is(':visible')).to.be(true);
            });
        });
    });
});