define(['knockout', 'extendable', 'singletons'],
    function(ko, Extendable, singletons) {

    var ajax = singletons.ajax;

    // TODO add test and signals for notifying loading

    /**
     * @class Model
     * @name Model
     * @extends {Extendable}
     * @param {Object} p_params            Configuration object
     * @param {String} p_params.getUrl     Url for fetching the data
     * @param {String} p_params.postUrl    Url for posting the data
     * @param {String} p_params.data       Initial data
     */
    function Model(p_params) {
        this.getUrl = p_params.getUrl;
        this.postUrl = p_params.postUrl;
        this.data = ko.observable(p_params.data);
    }

    var ModelPrototype = /** @lends Model.prototype */ {
        /**
         * @param  {String}   p_type     Type of ajax request: 'get' or 'post'
         * @param  {String}   p_url      Url to send the ajax request to
         * @param  {Object}   p_data     Data to send
         * @param  {Function} p_callback Callback to execute on finish
         * @private
         */
        _sendRequest: function(p_type, p_url, p_data, p_callback) {
            if (typeof p_url !== 'string') {
                throw new Error('wrong url ' + p_url);
            }

            var self = this;
            // send an ajax post or get request, depending on the p_type
            ajax[p_type]({
                url: p_url,
                data: p_data,
                error: function(textStatus, errorThrown) {
                    var err = new Error(textStatus + ': ' + errorThrown);
                    if (!p_callback) {
                        throw err;
                    }
                    p_callback.call(self, err);
                },
                success: function(textStatus, p_data) {
                    self.data(p_data);
                    p_callback.call(self, undefined, p_data);
                },
                complete: function(textStatus) {
                    // do nothing
                }
            });
        },
        /**
         * Posts the model to the server. Updates the current model with the
         * response from the server if succssful.
         * @param  {Function} p_callback Callback function(err, data) to
         * call on finish.
         */
        save: function(p_callback) {
            var data = this.data();
            this._sendRequest('post', this.postUrl, data, p_callback);
        },
        /**
         * Get the model to the server. Updates (replaces) the current model
         * with server response if successful.
         * @param  {Object} p_key      Filter parameters
         * @param  {Function} p_callback Callback function(err, data) to execute
         * on finish
         */
        load: function(p_key, p_callback) {
            this._sendRequest('get', this.getUrl, p_key, p_callback);
        }
    };

    return Extendable.extend(Model, ModelPrototype);
});