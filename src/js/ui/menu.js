/**
 * @module ui/menu
 */
define(['jquery', 'events/EventManager', 'logger'],
    function($, EventManager, Logger) {

    var log = new Logger('menu');
    var events = new EventManager('menu');

    log.debug('registering `page-route-found` listener');

    function closeNavbar(event) {
        var $menuToggle = $('#menu-toggle');
        if (!$menuToggle.is(':visible')) {
            return;
        }
        $menuToggle.click();
    }

    function closeBackdrop(event) {
        var $menu = $('#menu');
        if (!$menu.is(':visible') || $menu.hasClass('collapsing')) {
            return;
        }
        closeNavbar(event);
    }

    var $navbarBackdrop = $('#menu .navbar-backdrop');
    $navbarBackdrop.on('touchstart', closeBackdrop);
    $navbarBackdrop.on('click', closeBackdrop);
    $('#menu .nav a').click(closeNavbar);

    /**
     * Object with util functions for the menu
     */
    var exports = {
        _unmarkAll: function($a) {
            // remove all active
            $a.each(function() {
                $(this).parent().removeClass('active');
            });
        },
        /**
         * Marks the currently selected menu item as active. This is done by
         * comparing the current hash and the current
         * @param  {String} request hash string afte the '#/'
         */
        markCurrentMenuItem: function(request) {
            var $a = $('#menu .nav a');

            this._unmarkAll($a);

            if (request === '') {
                $a.filter('.home').parent().addClass('active');
                return;
            }

            var matcher = new RegExp('#\/' + request);

            request = '#/' + request;

            var $activeLi;

            $a.each(function() {
                if (this.href && this.href.match(matcher)) {
                    $activeLi = $(this).parents('li');
                }
            });


            if ($activeLi && $activeLi.length) {
                // mark the active
                $activeLi.addClass('active');
            }
        },
        listen: function() {
            events.listen({
                /**
                 * @listens events/EventManager#page-route-found
                 */
                'page-route-found': function(params) {
                    menu.markCurrentMenuItem(params.routeUrl);
                }
            });
        },
        clear: function() {
            events.clear();
        }
    };

    var menu = exports;

    return exports;

});