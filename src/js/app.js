require(['jquery', 'router', 'amd-page-loader', 'templates/page', 'singletons', 'logger'],
    function($, Router, PageLoader, Page, singletons, Logger) {

    var log = new Logger('app');

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

        if (module instanceof Page === false) {
            throw Error('module for ' + element.id + ' should be a Page');
        }

        if (!module.bindingsApplied) module.bind(element);

        module.show();

        lastModule = module;

        loading.hide();
    }

    function pageError(err) {
        log.error('error loading page: ' + err.message + '. ' + err.stack);
        pageLoader.load('error')
            .success(pageLoaded);
            // TODO fix don't go into endless loop if failed to load error page
    }

    var loading = singletons.loading;

    singletons.router = new Router({
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
        require(['modules/user-mod'], function(userMod) {
            userMod.bind(document.getElementById('user-mod'));
        });
    });
});