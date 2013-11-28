define(['knockout', 'extendable', 'net/ajax'], function(ko, Extendable, ajax) {

    var Model = {
        init: function(p_params) {
            return this.extend({
                getUrl: p_params.getUrl,
                postUrl: p_params.postUrl,
                data: ko.observable()
            });
        },


    };

    return Extendable.extend(Model);
});