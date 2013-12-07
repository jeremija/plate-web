define(['templates/page'], function(Page) {
    var homePage = new Page({
        name: 'home-page',
        routes: {
            '': function() {}
        }
    });

    return homePage;
});