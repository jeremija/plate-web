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
            it('should create a new Page instance', function() {
                page = Page.create();
                expect(Page.isPrototypeOf(page)).to.be(true);
                expect(page.init).to.be.a('function');
                el = document.createElement('div');
                el.id = 'test-page-id';
                page.init(el);
                expect(page.initialized).to.be(true);
                expect(page.init).to.throwError();
                expect(page.element).to.be(el);
                expect(page.id).to.be(el.id);

                $(el).appendTo('#test');
            });
        });
        describe('hide()', function() {
            it('should be defined', function() {
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