require(['jquery', 'router', 'amd-page-loader', 'page', 'singletons'],
    function($, Router, PageLoader, Page, singletons) {

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

        loading.hide();
    }

    function pageError(err) {
        pageLoader.load('error')
            .success(pageLoaded)
            // if it fails to load fallback page, don't go in the loop
            .fail(undefined);
    }

    var loading = singletons.loading;

    Router.init({
        onRouteChange: function(p_pageId) {
            loading.show();

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