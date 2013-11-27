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
        loader.show('error');
    }

    var loader = Loader.init('#loader', 200);
    loader.shown.add(function(p_pageId) {
        if (lastModule) {
            lastModule.hide();
            lastModule = undefined;
        }
        pageLoader.load(p_pageId)
            .success(pageLoaded)
            .fail(pageError);
    });

    Router.init({
        onRouteChange: function(pageId) {
            loader.show(pageId);
        }
    });

    // initialize bootstrap
    $(document).ready(function() {
        require(['bootstrap']);
    });
});