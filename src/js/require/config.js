var require = {
    //  baseUrl: 'js',
    paths: {
        'bower': '../../bower_components',
        'pages': '../pages',
        'locale': '../locale',

        'jquery': '../lib/jquery',
        'extendable': '../lib/extendable',
        'amd-page-loader': '../lib/amd-page-loader',
        'signals': '../lib/signals',
        'crossroads': '../lib/crossroads',
        'hasher': '../lib/hasher',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'knockout': '../lib/knockout',
        'globalize': '../lib/globalize'
    },
    map: {
        '*': {
            //enable jquery's no conflict mode
            'jquery' : 'require/jquery-private',
        },
        'require/jquery-private': {
            'jquery': 'jquery'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'globalize': {
            deps: ['jquery'],
            exports: 'Globalize'
        }
    }
};
