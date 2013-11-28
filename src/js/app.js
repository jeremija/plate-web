require(['jquery', 'router', 'amd-page-loader', 'ui/loader', 'page'],
    function($, Router, PageLoader, Loader, Page) {

    var pageLoader = PageLoader.init({
        selector: '#pages',
        htmlPrefix: 'pages',
        jsPrefix: '../pages'
    });

    var lastModule;

    function pageLoaded(module, element, expired) {
        if (expired) {
            return;
        }

        if (!Page.isPrototypeOf(module)) {
            throw Error('module for ' + element.id + ' should be a Page');
        }

        if (!module.initialized) module.init(element);
        module.show();

        lastModule = module;

        loader.hide();
    }

    function pageError(err) {
        pageLoader.load('error')
            .success(pageLoaded)
            // if it fails to load fallback page, don't go in the loop
            .fail(undefined);
    }

    var loader = Loader.init({
        selector: '#loader',
        duration: 200,
        hideDelay: 100
    });

    Router.init({
        onRouteChange: function(p_pageId) {
            loader.show();

            if (lastModule) {
                lastModule.hide();
                lastModule = undefined;
            }

            pageLoader.load(p_pageId)
                .success(pageLoaded)
                .fail(pageError);
        }
    });

    // initialize bootstrap
    $(document).ready(function() {
        require(['bootstrap']);
    });
});