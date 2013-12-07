define(['net/ajax', 'util/storage'],
    function(Ajax, Storage) {

    var ajax = new Ajax('singletons');

    var storage = new Storage();

    return {
        ajax: ajax,
        storage: storage,
    };
});