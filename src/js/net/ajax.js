define(['jquery', 'extendable'], function($, Extendable) {

    /**
     * Jquery ajax calls wrapper
     * @exports Ajax
     */
    var Ajax = {
        /**
         * Init ajax
         * @param  {Loader} p_loader loader displa
         * @return {Ajax}            an instance of Ajax
         */
        init: function(p_loader) {
            return this.extend({
                loader: p_loader
            });
        },
        /**
         * Send a GET request to the server
         * @param  {Object} p_params parameters
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {Object} p_params.data         Data to be sent to the server.
         */
        get: function(p_params) {
            this._ajaxRequest(p_params, 'GET');
        },
        /**
         * Send a POST request to the server
         * @param  {[type]} p_params [description]
         * @return {[type]}          [description]
         */
        post: function(p_params) {
            this._ajaxRequest(p_params, 'POST');
        },
        _ajaxRequest: function(p_params, p_type) {
            var self = this;
            var loader = this.loader;

            $.ajax({
                complete: function(jqXHR, textStatus) {
                    loader.hide();
                    p_params.complete(textStatus);
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: p_params.data,
                error: function(jqXHR, textStatus, errorThrown) {
                    //TODO determine real status
                    p_params.error(textStatus, errorThrown);
                },
                success: function(data, textStatus, jqXHR) {
                    p_params.success(data, textStatus);
                },
                type: p_type || 'GET',
                url: p_params.url
            });
        }
    };

    return Extendable.extend(Ajax);
});