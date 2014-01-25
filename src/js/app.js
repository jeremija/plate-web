require([
    'jquery',
    'bootstrap',
    'ko-bindings/index',
    'logger',
    'templates/TemplateLoader',
    'templates/PageManager',
    'Router',
    'templates/PageBinder',
    'pages/index',
    'templates/breadcrumbsManager',

    'ui/menu',
    'ui/Loading',
    'ui/LoadingListener',
    'ui/culture',
    'net/authentication',

    'modules/index'

    ],
    function(
        $,
        bootstrap,
        koBindingsIndex,
        Logger,
        TemplateLoader,
        PageManager,
        Router,
        PageBinder,
        pagesIndex,
        breadcrumbsManager,

        menu,
        Loading,
        LoadingListener,
        culture,
        authentication,

        modulesIndex

        ) {

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

        // initialize managers
        breadcrumbsManager.listen();

        // initialize menu
        menu.listen();

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
            templatePath: 'pages',
            templateExtension: '.html'
        });

        // pageManager will initialize the router
        var router = new Router({
            name: 'app'
        });

        var pageManager = new PageManager({
            name: 'app',
            pages: pagesIndex.pages,
            router: router
        });

        log.debug('started');
    }

    $(document).ready(onReady);
});