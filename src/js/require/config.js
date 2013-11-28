var require = {
    //  baseUrl: 'js',
    paths: {
        'bower': '../../bower_components',
        'pages': '../pages',

        'jquery': '../../bower_components/jquery/jquery',
        'extendable': '../../bower_components/extendable.js/dist/extendable',
        'amd-page-loader': '../../bower_components/amd-page-loader/dist/amd-page-loader',
        'signals': '../../bower_components/js-signals/dist/signals',
        'crossroads': '../../bower_components/crossroads.js/dist/crossroads',
        'hasher': '../../bower_components/hasher/dist/js/hasher',
        'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap',
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
        }
    }
};
