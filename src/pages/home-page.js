define(['templates/Page', 'knockout'], function(Page, ko) {

    var previous;
    function generateRandomNumber(p_max) {
        var current = previous;
        while(previous === current) {
            current = Math.floor(Math.random() * p_max);
        }
        previous = current;
        return current;
    }

    var quotes = [{
        text: 'Foolproof systems don\'t take into account the ingenuity of ' +
            'fools.',
        author: 'Gene Brown'
    }, {
        text: 'If debugging is the process of removing software bugs, then ' +
            'programming must be the process of putting them in.',
        author: 'Edsger Dijkstra'
    }, {
        text: 'Rules of Optimization:\n' +
            'Rule 1: Don\'t do it.\n' +
            'Rule 2 (for experts only): Don\'t do it yet.',
        author: 'Michael A. Jackson'
    }, {
        text: 'Walking on water and developing software from a specification ' +
            'are easy if both are frozen',
        author: ' Edward V Berard'
    }, {
        text: 'It\'s hard enough to find an error in your code when you\'re ' +
            'looking for it; it\'s even harder when you\'ve assumed your ' +
            'code is error-free.',
        author: 'Steve McConnell'
    }];

    var vm = {
        randomQuote: ko.observable(),
        reloadQuote: function() {
            var quote = quotes[generateRandomNumber(quotes.length)];
            this.randomQuote(quote);
        }
    };

    var homePage = new Page({
        name: 'home-page',
        routes: {
            '': function() {}
        },
        viewModel: vm
    });

    homePage.onShow = function() {
        this.viewModel.reloadQuote();
    };

    return homePage;
});