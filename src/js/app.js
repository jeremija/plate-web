require(['router', 'amd-page-loader'], function(Router, PageLoader) {
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

        if (!module.initialized) module.init(element);
        module.show();

        lastModule = module;
    }

    Router.init({
        onRouteChange: function(pageId) {
            if (lastModule) lastModule.hide();
            pageLoader.load(pageId).success(pageLoaded);
        }
    });
});