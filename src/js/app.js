// require(['jquery', 'router', 'amd-page-loader', 'templates/page', 'singletons',
//     'logger', 'events/event-manager'],
//     function($, Router, PageLoader, Page, singletons, Logger, EventManager) {
require([
    'jquery',
    'bootstrap',
    'logger',
    'templates/template-loader',
    'templates/page-manager',
    'router',
    'templates/page-binder',
    'templates/page-definitions',
    'templates/breadcrumbs-manager',

    'ui/menu',
    'ui/loading',
    'ui/loading-listener',
    'ui/culture',
    'net/authentication',
    'modules/breadcrumbs-mod',
    'modules/messages-mod',
    'modules/user-mod',

    'ko-bindings/index'
    ],
    function(
        $,
        bootstrap,
        Logger,
        TemplateLoader,
        PageManager,
        Router,
        PageBinder,
        pageDefinitions,
        breadcrumbsManager,

        menu,
        Loading,
        LoadingListener,
        culture,
        authentication,
        breadcrumbsMod,
        messagesMod,
        userMod) {

    var log = new Logger('app');

    function onReady() {
        var loadingListener = new LoadingListener({
            name: 'app',
            loading: new Loading({
                selector: '#loading',
                duration: 200,
                hideDelay: 100
            })
        });

        // initialize static modules
        userMod.bind(document.getElementById('user-mod'));
        breadcrumbsMod.bind(document.getElementById('breadcrumbs-mod'));
        messagesMod.listen();

        // initialize managers
        breadcrumbsManager.listen();

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