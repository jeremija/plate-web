define(['jquery', 'ui/menu'], function($, menu) {
    describe('ui/menu-test.js', function() {
        it('should be ok', function() {
            expect(menu).to.be.ok();
        });
        var $menu;
        before(function() {
            $menu = $('<div>').attr('id', 'menu');
            var $ul = $('<ul>').addClass('nav').appendTo($menu);

            $ul.append('<li><a href="#/link1">link1</a></li>');
            $ul.append('<li><a href="#/link2">link2</a></li>');
            var $submenu = $('<li>').appendTo($ul);

            $submenu = $('<ul>').appendTo($submenu);
            $submenu.append('<li><a href="#/link3">link3</a></li>');
            $submenu.append('<li><a href="#/link4">link4</a></li>');

            $menu.appendTo('#test');
        });
        after(function() {
            $('#test').html('');
        });
        describe('markCurrentMenuItem()', function() {
            it('should be a function', function() {
                expect(menu.markCurrentMenuItem).to.be.a('function');
            });
            it('should mark link1', function() {
                menu.markCurrentMenuItem('link1');

                var $active = $menu.find('.active');
                expect($active.length).to.be(1);
                var $a = $active.children('a');
                expect($a.length).to.be(1);
                expect($a[0].href.match(/#\/link1$/)).to.be.ok();
            });

            it('should mark link2 and unmark link1', function() {
                menu.markCurrentMenuItem('link2');

                expect($menu.find('.active').length).to.be(1);
                expect($menu.find('.active > a').length).to.be(1);
                expect($menu.find('.active > a')[0].href.match(/#\/link2$/)).to.be.ok();
            });

            it('should mark link3 and unmark link2', function() {
                menu.markCurrentMenuItem('link3');

                // submenu should also be marked
                expect($menu.find('.active').length).to.be(2);
                expect($menu.find('.active > ul > li.active').length).to.be(1);
                expect($menu.find('.active > ul > li.active > a').length)
                    .to.be(1);
                expect($menu.find('.active > ul > li.active > a')[0].href
                    .match(/#\/link3$/)).to.be.ok();
            });
        });
    });
});