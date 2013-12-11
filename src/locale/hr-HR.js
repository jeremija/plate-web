define(['globalize', '../locale/globalize.culture.hr-HR'],
    function(Globalize, a) {

    Globalize.addCultureInfo('hr-HR', {
        messages: {
            'test': 'test hr-HR',

            'error.validation': 'Došlo je do pogreške u validaciji podataka',
            'error.save': 'Podaci nisu spremljeni',
            'error.load': 'Došlo je do pogreške pri dohvaćanju podataka',

            'menu.companies': 'Tvrtke',
            'menu.carinsurances': 'Vozila',
            'menu.logout': 'Odjava',
            'menu.email': 'E-Mail',
            'menu.password': 'Password',

            'bc.home': 'Početna',
            'bc.page1': 'Stranica 1',
            'bc.page2': 'Stranica 2',

            'bc.companies/new': 'Nova tvrtka',
            'bc.companies/edit/{shortId}': 'Uređivanje tvrkte',
            'bc.companies/list': 'Popis tvrtki',
            'bc.carinsurances/new': 'Novo vozilo',
            'bc.carinsurances/edit/{shortId}': 'Uređivanje osiguranog vozila',
            'bc.carinsurances/list': 'Popis osiguranih vozila',

            'common.action': 'Akcija',
            'common.delete': 'Izbriši',
            'common.save': 'Spremi',
            'common.saving': 'Spremam...',
            'common.saved': 'Podaci uspješno spremljeni',
            'common.loading': 'Učitavam...',
            'common.reload': 'Ponovno učitaj',

            'home.text': 'Neki citati:',

            'companies.name': 'Ime',
            'companies.oib': 'Oib',

            'carinsurances.name': 'Ime',
            'carinsurances.carYear': 'Godište',
            'carinsurances.licensePlate': 'Reg. oznaka',
            'carinsurances.policyNumber': 'Br. police',
            'carinsurances.expires': 'Skadenca',
            'carinsurances.power': 'Snaga (kW)',
            'carinsurances.maxAllowedMass': 'NDM (kg)',
            'carinsurances.vehicleType': 'Tip',
            'carinsurances.company': 'Tvrtka',
        }
    });
});