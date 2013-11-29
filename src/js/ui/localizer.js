define(['globalize', 'events/event-manager', 'logger'],
    function(Globalize, eventManager, Logger) {

    var log = new Logger('localizer');

    /**
     * Localize helper
     * @exports localizer
     */
    var localizer = {
        setLocale: function(p_locale) {
            var self = this;
            require(['../locale/' + p_locale], function() {
                self.locale = p_locale;
                log.debug('loaded locale ' + p_locale);

                eventManager.changeLocale(p_locale);
            }, function(err) {
                log.error('unable to load locale ' + p_locale, err);
            });
        },
        locale: '',
        localize: function(p_key) {
            return Globalize.localize(p_key, this.locale);
        }
    };

    // load default locale
    // localizer.setLocale('en-US');

    return localizer;
});