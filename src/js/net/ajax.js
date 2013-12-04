define(['jquery', 'extendable', 'logger'], function($, Extendable, Logger) {

    /**
     * @class Wrapped jQuery.ajax calls
     * @name Ajax
     * @param  {Loading} p_loading loading display
     * @return {Ajax}              an instance of Ajax
     */
    function Ajax(p_loading) {
        this.loading = p_loading;
        this.log = new Logger('ajax');
    }

    var AjaxPrototype = /** @lends Ajax.prototype **/ {
        /**
         * Handle error graceefully
         * @param  {Error} err
         * @private
         */
        _handleError: function(err) {
            this.log.error('error while executing ajax callback: ' + err.stack);
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

            var msg = (p_type || 'GET') + ' ' + p_params.url + '  ';
            this.log.debug(msg);

            $.ajax({
                complete: function(jqXHR, textStatus) {
                    if (p_params.complete) {
                        // try {
                            p_params.complete(textStatus);
                        // }
                        // catch (err) {
                        //     self._handleError(err);
                        // }
                    }
                    loading.hide();
                },
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                data: p_params.data ? JSON.stringify(p_params.data) : undefined,
                error: function(jqXHR, textStatus, errorThrown) {
                    self.log.debug(msg + ' ' + textStatus + ': ' + errorThrown);
                    if (p_params.error) {
                        // try {
                            p_params.error(textStatus, errorThrown);
                        // }
                        // catch(err) {
                        //     self._handleError(err);
                        // }
                    }
                },
                success: function(data, textStatus, jqXHR) {
                    self.log.debug(msg + ' ' + textStatus);
                    if (p_params.success) {
                            self.log.debug('success', data);
                        // try {
                            p_params.success(textStatus, data);
                        // }
                        // catch(err) {
                        //     self._handleError(err);
                        // }
                    }
                },
                type: p_type || 'GET',
                url: p_params.url
            });
        }
    };

    return Extendable.extend(Ajax, AjaxPrototype);
});