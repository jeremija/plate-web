define(['jquery', 'extendable', 'logger', 'events/event-manager'],
    function($, Extendable, Logger, EventManager) {

    /**
     * Event dispatched when an ajax request starts
     * @event EventManager#ajax-start
     */

    /**
     * Event dispatched when an ajax request completes
     * @event EventManager#ajax-end
     */

    /**
     * @class Wrapped jQuery.ajax calls
     * @name Ajax
     * @param {String} p_name      Name of the instance
     * @param {String} p_urlPrefix Prefix for the url
     */
    function Ajax(p_name, p_urlPrefix) {
        this.log = new Logger(p_name, this.constructor.name);
        this.urlPrefix = p_urlPrefix || '';
        this.events = new EventManager(this.log.name);
    }

    var AjaxPrototype = /** @lends Ajax.prototype **/ {
        _xhrErrorHandlers: {
            401: function() {
                this.log.debug('got error 401, logging out');
                this.events.dispatch('logout');
            },
            500: function() {
                this.log.debug('got error 500');
            }
        },
        /**
         * Handle error graceefully
         * @param  {Error} err
         * @private
         */
        _handleError: function(err) {
            this.log.error('error while executing ajax callback: ' + err.stack);
        },
        _getErrorData: function(jqXHR) {
            var errorData;
            try {
                errorData = JSON.parse(jqXHR.responseText);
            } catch (err) {}
            return errorData || {};
        },
        /**
         * Send a GET request to the server
         * @param  {Object} p_params parameters
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {String} p_params.url          Url
         * @param {Object} p_params.data         Data to be sent to the server.
         * @param {Function} p_params.success    Success callback
         * @param {Function} p_params.error      Error callback
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {String} p_params.noEvents     If true, does not dispatch the
         * `ajax-start` and `ajax-end` events
         * @fires EventManager#ajax-start        Before ajax request is placed
         * @fires EventManager#ajax-end          After ajax request completes
         * @fires EventManager#msg-error         If an error ocurrs (regardless
         * of the noEvents setting)
         */
        get: function(p_params) {
            return this._ajaxRequest(p_params, 'GET');
        },
        /**
         * Send a GET request to the server
         * @param  {Object} p_params parameters
         * @param {String} p_params.url          Url
         * @param {Object} p_params.data         Data to be sent to the server.
         * @param {Function} p_params.success    Success callback
         * @param {Function} p_params.error      Error callback
         * @param {Function} p_params.invalid    Callback when there is
         * a validation error. The default error callback will no matter if
         * this is present or not.
         * be used. The default error callback will be called too!
         * @param {Function} p_params.complete   A function to be called when
         * the request finishes.
         * @param {String} p_params.noEvents     If true, does not dispatch the
         * `ajax-start` and `ajax-end` events
         * @fires EventManager#ajax-start        Before ajax request is placed
         * @fires EventManager#ajax-end          After ajax request completes
         * @fires EventManager#msg-error         If an error ocurrs (regardless
         * of the noEvents setting)
         */
        post: function(p_params) {
            return this._ajaxRequest(p_params, 'POST');
        },
        _ajaxRequest: function(p_params, p_type) {
            if (!p_params.noEvents) {
                this.events.dispatch('ajax-start');
            }

            var msg = (p_type || 'GET') + ' ' + p_params.url + '  ';
            this.log.debug(msg);

            return $.ajax({
                context: this,
                url: this.urlPrefix + p_params.url,
                data: p_params.data ? JSON.stringify(p_params.data) : undefined,
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                type: p_type || 'GET',
                statusCode: this._xhrErrorHandlers,
                success: function(data, textStatus, jqXHR) {
                    this.log.debug(msg + ' ' + textStatus);
                    if (p_params.success) {
                        this.log.debug('success', data);
                        // try {
                            p_params.success(textStatus, data.data);
                        // }
                        // catch(err) {
                        //     this._handleError(err);
                        // }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    this.log.debug(msg + ' ' + textStatus + ': ' + errorThrown);

                    var data = this._getErrorData(jqXHR);
                    var error = data.error;
                    this.log.error('received an error response:', data);
                    if (error && error.key &&
                        error.name !== 'ValidationError') {
                        this.events.dispatch('msg-error', error.key);
                    }

                    if (p_params.invalid && error &&
                        error.name === 'ValidationError') {
                        var details = error.details;
                        var errors = details ? details.errors : {};
                        p_params.invalid(errors);
                    }

                    if (p_params.error) {
                        // try {
                            p_params.error(textStatus, data.error);
                        // }
                        // catch(err) {
                        //     this._handleError(err);
                        // }
                    }
                },
                complete: function(jqXHR, textStatus) {
                    if (p_params.complete) {
                        // try {
                            p_params.complete(textStatus);
                        // }
                        // catch (err) {
                        //     this._handleError(err);
                        // }
                    }
                    if (!p_params.noEvents) {
                        this.events.dispatch('ajax-end');
                    }
                }
            });
        }
    };

    return Extendable.extend(Ajax, AjaxPrototype);
});