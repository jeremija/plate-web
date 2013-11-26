define(['extendable', 'jquery', 'logger'], function(Extendable, $, Logger) {

    /**
     * Abstract page
     * @exports Page
     */
    var Page = {
        /**
         * Initializes the page. Throws an error if the page was already
         * initialized
         * @param {HTMLElement} p_element   The page's root element
         * @return {Page}                   A new instance of Page
         */
        init: function(p_element) {
            if (this.initialized) {
                log.error('Page already initialized');
                throw Error('Page for \'' + p_element.id + '\' initialized');
            }

            this.log = Logger.init(p_element.id);
            this.id = p_element.id;
            this.element = p_element;
            this.initialized = true;
        },
        /**
         * Shows the page element
         * @return {Page}
         */
        show: function() {
            this.log.debug('showing page');
            $(this.element).show();
            return this;
        },
        /**
         * Hides the page element
         * @return {Page}
         */
        hide: function() {
            this.log.debug('hiding page');
            $(this.element).hide();
            return this;
        }
    };

    return Extendable.extend(Page);
});