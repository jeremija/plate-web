define(['globalize', '../locale/globalize.culture.en-US'],
    function(Globalize, a) {

    Globalize.addCultureInfo('en-US', {
        messages: {
            'test': 'test en-US',

            'error.validation': 'Error while validation the data',

            'menu.companies': 'Companies',
            'menu.logout': 'Log out',
            'menu.email': 'E-Mail',
            'menu.password': 'Zaporka',

            'bc.home': 'Home',
            'bc.page1': 'Page 1',
            'bc.page2': 'Page 2',

            'bc.companies/new': 'New Company',
            'bc.companies/edit/{shortId}': 'Edit Company',
            'bc.companies/list': 'Companies List',

            'common.action': 'Action',
            'common.delete': 'Delete',
            'common.save': 'Save',

            'home.text': 'This is a home page',

            'companies.name': 'Name',
            'companies.oib': 'Oib',

        }
    });
});