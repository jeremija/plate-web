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
    'templates/page-definitions',

    'ui/menu',
    'net/authentication',
    'modules/user-mod'
    ],
    function(
        $,
        Logger,
        TemplateLoader,
        PageManager,
        Router,
        PageBinder,
        pageDefinitions,

        menu,
        authentication,
        userMod) {

    var log = new Logger('app');

    function onReady() {
        // initialize bootstrap
        require(['bootstrap']);

        // initialize static modules
        userMod.bind(document.getElementById('user-mod'));

        // initialize module for loading templates
        var templateLoader = new TemplateLoader({
            name: 'app',
            selector: 'pages',
            pagePrefix: 'page-'
        });

        // initialize page binder (listens to `page-route-found` and
        // `page-route-not-found`)
        var pageBinder = new PageBinder({
            name: 'app',
            errorRoute: 'error',
            templateLoader: templateLoader,
            templatePath: '/pages',
            templateExtension: '.html'
        });

        // pageManager will initialize the router
        var router = new Router({
            name: 'app'
        });

        var pageManager = new PageManager({
            name: 'app',
            pages: pageDefinitions.pages,
            router: router
        });

        log.debug('started');
    }

    $(document).ready(onReady);
});