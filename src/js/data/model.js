define(['knockout', 'extendable', 'net/ajax'], function(ko, Extendable, Ajax) {

    // TODO add test and signals for notifying loading

    /**
     * @class Model
     * @name Model
     * @extends {Extendable}
     * @param {Object} p_params            Configuration object
     * @param {String} p_params.getUrl     Url for fetching the data
     * @param {String} p_params.postUrl    Url for posting the data
     */
    function Model(p_params) {
        this.getUrl = p_params.getUrl;
        this.postUrl = p_params.postUrl;
        this.data = ko.observable();
    }

    var ModelPrototype = {
        save: function() {
            throw new Error('not implemented');
        },
        load: function() {
            throw new Error('not implemented');
        }
    };

    return Extendable.extend(Model, ModelPrototype);
});