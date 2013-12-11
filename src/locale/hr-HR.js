define(['globalize', 'locale/globalize.culture.hr-HR', 'locale/hr-HR/index'],
    function(Globalize, a, moduleLocales) {

    for (var i in moduleLocales) {
        var locale = moduleLocales[i];
        Globalize.addCultureInfo('hr-HR', {
            messages: locale
        });
    }

    Globalize.addCultureInfo('hr-HR', {
        messages: {
            'test': 'test hr-HR',

            'home.text': 'Neki citati:',
        }
    });
});