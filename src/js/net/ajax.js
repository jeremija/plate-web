define(['jquery', 'extendable'], function($, Extendable) {

    /**
     * Jquery ajax calls wrapper
     * @exports Ajax
     */
    var Ajax = {
        /**
         * Init ajax
         * @param  {Loading} p_loading loading display
         * @return {Ajax}              an instance of Ajax
         */
        init: function(p_loading) {
            return this.extend({
                loading: p_loading
            });
        },
        /**
         * Send a GET request to the server
         * @param  {Object} p_params parameters
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {Function} p_params.success    Success callback
         * @param {Function} p_params.error      Error callback
         * @param {Object} p_params.data         Data to be sent to the server.
         * @param {String} p_params.url          Url
         */
        get: function(p_params) {
            this._ajaxRequest(p_params, 'GET');
        },
        /**
         * Send a GET request to the server
         * @param  {Object} p_params parameters
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {Function} p_params.success    Success callback
         * @param {Function} p_params.error      Error callback
         * @param {Object} p_params.data         Data to be sent to the server.
         * @param {String} p_params.url          Url
         */
        post: function(p_params) {
            this._ajaxRequest(p_params, 'POST');
        },
        _ajaxRequest: function(p_params, p_type) {
            var self = this;
            var loading = this.loading;
            loading.show();

            $.ajax({
                complete: function(jqXHR, textStatus) {
                    loading.hide();
                    if (p_params.complete) {
                        p_params.complete(textStatus);
                    }
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: p_params.data ? JSON.stringify(p_params.data) : undefined,
                error: function(jqXHR, textStatus, errorThrown) {
                    if (p_params.error) {
                        p_params.error(textStatus, errorThrown);
                    }
                },
                success: function(data, textStatus, jqXHR) {
                    if (p_params.success) {
                        p_params.success(data);
                    }
                },
                type: p_type || 'GET',
                url: p_params.url
            });
        }
    };

    return Extendable.extend(Ajax);
});