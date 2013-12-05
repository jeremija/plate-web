// require(['jquery', 'router', 'amd-page-loader', 'templates/page', 'singletons',
//     'logger', 'events/event-manager'],
//     function($, Router, PageLoader, Page, singletons, Logger, EventManager) {
require([
    'jquery',
    'logger',
    'templates/template-loader',
    'templates/page-manager',
    'router',
    'templates/page-binder',
    'templates/page-definitions'
    ],
    function(
        $,
        Logger,
        TemplateLoader,
        PageManager,
        Router,
        PageBinder,
        pageDefinitions) {

    var log = new Logger('app');

    function onReady() {
        // initialize bootstrap
        require(['bootstrap']);

        // initialize static modules
        require(['modules/user-mod', 'ui/menu'], function(userMod, menu) {
            userMod.bind(document.getElementById('user-mod'));
        });

        // initialize module for loading templates
        var templateLoader = new TemplateLoader({
            name: 'template-loader',
            selector: 'pages',
            pagePrefix: 'page-'
        });

        // initialize page binder (listens to `page-route-found` and
        // `page-route-not-found`)
        var pageBinder = new PageBinder({
            name: 'pageBinder',
            errorRoute: 'error',
            templateLoader: templateLoader,
            templatePath: '/pages',
            templateExtension: '.html'
        });

        // pageManager will initialize the router
        var router = new Router({
            name: 'router'
        });

        var pageManager = new PageManager({
            name: 'page-manager(app)',
            pages: pageDefinitions.pages,
            router: router
        });

        log.debug('started');
    }

    $(document).ready(onReady);
});