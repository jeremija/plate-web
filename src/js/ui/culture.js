/**
 * @module ui/culture
 */
define(['extendable', 'globalize', 'events/EventManager', 'logger', 
    'singletons', 'locale/index'],
    function(Extendable, Globalize, EventManager, Logger, singletons) {

    /**
     * Notifies a new locale
     * @event events/EventManager#locale-changed
     * @param {String} p_locale  New locale
     */

    /**
     * @class Localization helper
     * @name Culture
     * @private
     */
    function CultureConstructor() {
        this.log = new Logger('ui/culture');

        this.events = new EventManager('ui/culture', this);

        this.events.listen({
            /**
             * @event events/EventManager#set-locale
             * @param {String} p_locale         New locale to set
             */
            
            /**
             * @listens events/EventManager#set-locale
             */
            'set-locale': function(p_locale) {
                this.setLocale(p_locale);
            }
        });
        
        // load default locale
        var locale = singletons.storage.load('locale');
        this.setLocale(locale || 'en-US');
    }

    var CulturePrototype = /** @lends Culture.prototype */ {
        /**
         * Sets the current locale to p_locale and saves it to local storage.
         * @param p_locale
         * @fires EventManager#locale-changed after the change
         */
        setLocale: function(p_locale) {
            this.locale = p_locale;
            this.log.debug('changed locale to ' + p_locale);
            this.events.dispatch('locale-changed', p_locale);
            singletons.storage.save('locale', p_locale);
        },
        // default locale
        locale: 'en-US',
        localize: function(p_key) {
            return Globalize.localize(p_key, this.locale);
        },
        format: function(p_value, p_pattern) {
            return Globalize.format(p_value, p_pattern, this.locale);
        },
        parseDate: function(p_dateString, p_pattern) {
            return Globalize.parseDate(p_dateString, p_pattern, this.locale);
        },
        parseFloat: function(p_value, p_radix) {
            return Globalize.parseFloat(p_value, p_radix || 10, this.locale);
        }
    };

    var Culture = Extendable.extend(CultureConstructor, CulturePrototype);

    /**
     * Localization helper
     * @type Culture
     */
    var exports = new Culture();

    return exports;
});