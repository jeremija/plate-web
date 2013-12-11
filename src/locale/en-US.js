define(['globalize', '../locale/globalize.culture.en-US'],
    function(Globalize, a) {

    Globalize.addCultureInfo('en-US', {
        messages: {
            'test': 'test en-US',

            'error': 'Error!',
            'warning': 'Warning!',
            'info': 'Info!',
            'success': 'Success!',
            'error.validation': 'Error while validation the data',
            'error.authentication': 'E-mail and password do not match',
            'error.not.authorized': 'You are not authorized for that action',
            'error.save': 'Unable to save',
            'error.load': 'An error occurred while loading the data',

            'menu.companies': 'Companies',
            'menu.carinsurances': 'Vehicles',
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
            'bc.carinsurances/list': 'Insured vehicles',

            'common.action': 'Action',
            'common.delete': 'Delete',
            'common.save': 'Save',
            'common.saving': 'Saving...',
            'common.saved': 'Saved successfully',
            'common.loading': 'Loading...',
            'common.reload': 'Reload',

            'home.text': 'Some quotes:',

            'companies.name': 'Name',
            'companies.oib': 'Oib',

            'carinsurances.name': 'Name',
            'carinsurances.carYear': 'Car year',
            'carinsurances.licensePlate': 'Tag',
            'carinsurances.policyNumber': 'Policy No.',
            'carinsurances.expires': 'Expiry date',
            'carinsurances.power': 'Power (kW)',
            'carinsurances.maxAllowedMass': 'MAM (kg)',
            'carinsurances.vehicleType': 'Type',
            'carinsurances.company': 'Company',
        }
    });
});