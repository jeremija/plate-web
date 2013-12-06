define(['templates/page'], function(Page) {
    var homePage = new Page({
        name: 'home-page',
        states: {
            '': function() {}
        }
    });

    return homePage;
});