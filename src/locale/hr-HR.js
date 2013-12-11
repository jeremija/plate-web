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

            'home.text': 'Etiam quis lectus libero. Mauris nec interdum diam, sit amet sollicitudin urna. Aenean tristique elementum ipsum, in suscipit mi. Sed egestas, dolor placerat tristique fermentum, metus ante dapibus felis, ut tempor felis est in nisi. Ut nec aliquet odio. Mauris nec arcu in mauris tempus sagittis. Pellentesque ultrices viverra turpis, nec eleifend nibh sollicitudin et. Nunc placerat ut mauris eu tristique. Maecenas mauris turpis, bibendum et nisl id, fermentum euismod neque. Pellentesque sagittis aliquet elit, id facilisis mauris. Fusce lobortis nisi nec tellus tempus, ut placerat sem ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis risus felis, in rutrum sapien blandit eu.',
        }
    });
});