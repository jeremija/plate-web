define([
    'pages/home-page',
    'pages/page1',
    'pages/page2',
    'pages/error-page',
    'pages/companies/companies-list',
    'pages/companies/companies-form'
], function() {

    return {
        pages: [].slice.call(arguments)
    };
});