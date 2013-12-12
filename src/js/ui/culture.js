define(['globalize', 'events/event-manager', 'logger', 'singletons',
    'locale/index'],
    function(Globalize, EventManager, Logger, singletons) {

    var log = new Logger('ui/culture');

    var events = new EventManager('ui/culture');

    /**
     * Localize helper
     * @exports localizer
     */
    var culture = {
        setLocale: function(p_locale) {
            var self = this;
            self.locale = p_locale;
            log.debug('changed locale to ' + p_locale);
            events.dispatch('locale-changed', p_locale);
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

    var locale = singletons.storage.load('locale');

    // load default locale
    culture.setLocale(locale || 'en-US');

    return culture;
});