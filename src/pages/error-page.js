define(['templates/page'], function(Page) {
    // do nothing
    return new Page({
        name: 'error-page',
        states: {
            'error': function() {}
        }
    });
});