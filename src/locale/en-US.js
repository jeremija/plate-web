define(['globalize', '../locale/globalize.culture.en-US'],
    function(Globalize, a) {

    Globalize.addCultureInfo('en-US', {
        messages: {
            'test': 'test en-US',

            'error.validation': 'Error while validation the data',

            'menu.companies': 'Companies',
            'menu.carinsurances': 'Vehicle ins.',
            'menu.logout': 'Log out',
            'menu.email': 'E-Mail',
            'menu.password': 'Zaporka',

            'bc.home': 'Home',
            'bc.page1': 'Page 1',
            'bc.page2': 'Page 2',

            'bc.companies/new': 'New Company',
            'bc.companies/edit/{shortId}': 'Edit Company',
            'bc.companies/list': 'Companies List',
            'bc.carinsurances/new': 'New insured vehicle',
            'bc.carinsurances/edit/{shortId}': 'Edit insured vehicle',
            'bc.carinsurances/list': 'Car Insurances List',

            'common.action': 'Action',
            'common.delete': 'Delete',
            'common.save': 'Save',
            'common.reload': 'Reload',

            'home.text': 'Some quotes:',

            'companies.name': 'Name',
            'companies.oib': 'Oib',

            'carinsurances.name': 'Name',
            'carinsurances.licensePlate': 'Tag',
            'carinsurances.policyNumber': 'Policy No.',
            'carinsurances.expires': 'Expires',
            'carinsurances.power': 'Power',
            'carinsurances.maxAllowedMass': 'MAM',
            'carinsurances.vehicleType': 'Type',
            'carinsurances.company': 'Company',
        }
    });
});