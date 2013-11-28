define(['net/ajax', 'ui/loading'], function(Ajax, Loading) {

    var loading = Loading.init({
        selector: '#loading',
        duration: 200,
        hideDelay: 100
    });

    var ajax = Ajax.init(loading);

    return {
        ajax: ajax,
        loading: loading
    };
});