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

            'home.text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed sollicitudin leo, in scelerisque felis. Donec varius risus vitae est accumsan vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed at eros dui. Duis erat orci, iaculis eu volutpat in, suscipit at mi. Vivamus non vulputate nunc. Pellentesque eget sapien et nulla sodales interdum. Proin suscipit elit vel interdum imperdiet. Duis posuere gravida leo id convallis. Integer vel pellentesque tellus. Integer odio arcu, dignissim eget quam a, congue dictum dui.',
        }
    });
});