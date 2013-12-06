define(['net/ajax', 'ui/loading', 'util/storage'],
    function(Ajax, Loading, Storage) {

    var loading = new Loading({
        selector: '#loading',
        duration: 200,
        hideDelay: 100
    });

    var ajax = new Ajax(loading);

    var storage = new Storage();

    return {
        ajax: ajax,
        loading: loading,
        storage: storage,
    };
});