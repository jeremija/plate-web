define(['knockout', 'templates/Bindable', 'ui/culture'],
    function(ko, Bindable, culture) {

    var languageMod = new Bindable({
        name: 'language-mod',
        events: {
            'locale-changed': function(p_locale) {
                this.viewModel.locale(p_locale);
            }
        },
        viewModel: {
             cultures: ko.observableArray([{
                name: 'English',
                code: 'en-US'
            }, {
                name: 'Hrvatski',
                code: 'hr-HR'
            }]),
            locale: ko.observable(),
            changeLocale: function(p_locale) {
                culture.setLocale(p_locale.code);
            },
            isActiveLocale: function(locale) {
                if (this.locale() === locale.code) {
                    return true;
                }
            }
        }
    });

    return languageMod;

});