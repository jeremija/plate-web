/**
 * @module singletons
 */
define(['net/Ajax', 'util/Storage'],
    function(Ajax, Storage) {

    var ajax = new Ajax('singletons');

    var storage = new Storage();

    var exports = {
        ajax: ajax,
        storage: storage,
    };

    return exports;
});