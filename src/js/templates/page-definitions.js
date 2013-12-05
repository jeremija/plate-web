define([
    'pages/login-page',

    'pages/page1',
    'pages/page2',
    'pages/error-page',
    'pages/companies-page',
], function() {

    return {
        pages: [].slice.call(arguments)
    };
});