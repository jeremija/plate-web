define([
    'pages/home-page',
    'pages/error-page',
    'pages/companies/companies-list',
    'pages/companies/companies-form',
    'pages/car-insurances/car-insurances-list',
    'pages/car-insurances/car-insurances-form'
], function() {

    return {
        pages: [].slice.call(arguments)
    };
});