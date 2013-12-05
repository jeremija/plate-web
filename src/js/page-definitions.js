define([
    'pages/page1',
    'pages/page2',
    'pages/error',
    'pages/companies',
], function() {

    return {
        pages: [].slice.call(arguments)
    };
});