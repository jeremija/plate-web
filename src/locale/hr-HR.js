define(['globalize', '../locale/globalize.culture.hr-HR'],
    function(Globalize, a) {

    Globalize.addCultureInfo('hr-HR', {
        messages: {
            'test': 'test hr-HR',

            'error.validation': 'Došlo je do pogreške u validaciji podataka',

            'bc.home': 'Početna',
            'bc.page1': 'Stranica 1',
            'bc.page2': 'Stranica 2',

            'bc.companies/new': 'Nova tvrtka',
            'bc.companies/edit/{shortId}': 'Uređivanje tvrkte',
            'bc.companies/list': 'Popis tvrtki',
        }
    });
});