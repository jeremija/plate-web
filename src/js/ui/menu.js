define(['jquery', 'events/event-manager'],
    function($, EventManager) {

    var events = new EventManager('menu');

    events.listen({
        'page-route-found': function(params) {
            menu.markCurrentMenuItem(params.stateUrl);
        }
    });

    var $MENU = $('#menu .nav');
    /**
     * Object with util functions for the menu
     * @exports menu
     */
    var menu = {
        /**
         * Marks the currently selected menu item as active. This is done by
         * comparing the current hash and the current
         * @param  {String} request hash string afte the '#/'
         */
        markCurrentMenuItem: function(request) {
            var $a = $('#menu .nav a');
            var matcher = new RegExp('#\/' + request);

            request = '#/' + request;

            var $activeLi;

            $a.each(function() {
                if (this.href && this.href.match(matcher)) {
                    $activeLi = $(this).parents('li');
                }
            });

            // remove all active
            $a.each(function() {
                $(this).parent().removeClass('active');
            });

            if ($activeLi && $activeLi.length) {
                // mark the active
                $activeLi.addClass('active');
            }

        }
    };

    return menu;

});