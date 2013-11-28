define(['knockout', 'extendable', 'net/ajax'], function(ko, Extendable, Ajax) {

    // TODO add test and signals for notifying loading

    var Model = {
        init: function(p_params) {
            return this.extend({
                getUrl: p_params.getUrl,
                postUrl: p_params.postUrl,
                data: ko.observable()
            });
        },
        save: function() {
            throw new Error('not implemented');
        },
        load: function() {
            throw new Error('not implemented');
        }
    };

    return Extendable.extend(Model);
});