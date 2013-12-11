define(['globalize', 'locale/globalize.culture.en-US', 'locale/en-US/index'],
    function(Globalize, a, moduleLocales) {

    for (var i in moduleLocales) {
        var locale = moduleLocales[i];
        Globalize.addCultureInfo('en-US', {
            messages: locale
        });
    }

    Globalize.addCultureInfo('en-US', {
        messages: {
            'test': 'test en-US',

            'home.text': 'Some quotes:',
        }
    });
});