define(['globalize', 'events/event-manager', 'logger'],
    function(Globalize, EventManager, Logger) {

    var log = new Logger('ui/culture');

    var events = new EventManager('ui/culture');

    /**
     * Localize helper
     * @exports localizer
     */
    var culture = {
        setLocale: function(p_locale) {
            var self = this;
            require(['../locale/' + p_locale], function() {
                self.locale = p_locale;
                log.debug('loaded locale ' + p_locale);
                events.dispatch('locale-changed', p_locale);
            }, function(err) {
                log.error('unable to load locale ' + p_locale, err);
            });
        },
        // default locale
        locale: 'en-US',
        localize: function(p_key) {
            return Globalize.localize(p_key, this.locale);
        }
    };

    // load default locale
    // culture.setLocale('en-US');

    return culture;
});