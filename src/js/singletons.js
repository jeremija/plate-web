define(['net/ajax', 'ui/loading'], function(Ajax, Loading) {

    var loading = new Loading({
        selector: '#loading',
        duration: 200,
        hideDelay: 100
    });

    var ajax = new Ajax(loading);

    return {
        ajax: ajax,
        loading: loading
    };
});