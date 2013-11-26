var require = {
    //  baseUrl: 'js',
    paths: {
        'bower': '../../bower_components',
        'pages': '../pages',

        'jquery': '../../bower_components/jquery/jquery',
        'extendable': '../../bower_components/extendable.js/dist/extendable',
        'amd-page-loader': '../../bower_components/amd-page-loader/dist/amd-page-loader',
        // 'sammy': '../../bower_components/sammy/lib/sammy'
        'signals': '../../bower_components/js-signals/dist/signals',
        'crossroads': '../../bower_components/crossroads.js/dist/crossroads',
        'hasher': '../../bower_components/hasher/dist/js/hasher',
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
        // 'sammy': {
        //     deps: ['jquery'],
        //     exports: 'Sammy'
        // }
    }
};
