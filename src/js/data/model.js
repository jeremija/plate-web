define(['knockout', 'extendable', 'singletons', 'util/traversal'],
    function(ko, Extendable, singletons, traversal) {

    var ajax = singletons.ajax;

    /**
     *
     * @param {Object} p_params Configuration object
     * @param {Observable} p_params.value     If defined, must be an Observable.
     * @param {String}     p_params.path       Path to the property in the data
     * object.
     */
    function FormElement(p_params) {
        if (p_params.value && typeof p_params.value !== 'function' &&
            p_params.value.subscribe !== 'function') {
            throw new Error('p_params.value must be an observable');
        }
        if (typeof p_params.path !== 'string') {
            throw new Error('p_params.path must be a string');
        }

        this.value = p_params.value || ko.observable();
        this.path = p_params.path;
    }

    FormElementConstructor = Extendable.extend(FormElement);

    /**
     * @class Model
     * @name Model
     * @extends {Extendable}
     * @param {Object}     p_params            Configuration object
     * @param {String}     p_params.getUrl     Url for fetching the data
     * @param {String}     p_params.postUrl    Url for posting the data
     * @param {Observable} p_params.data       Initial data
     * @param {Object}     p_params.form       Object mapping
     */
    function Model(p_params) {
        this.getUrl = p_params.getUrl;
        this.postUrl = p_params.postUrl;
        /**
         * Raw data
         * @type {Observable}
         */
        this.data = ko.observable(p_params.data || {});
        /**
         * Object of observables which can be used for direct binding
         * @type {FormElement}
         */
        this.form = p_params.form || {};
        /**
         * A map of invalid fields in the form
         * @type {Object}
         */
        this.invalidFields = ko.observable();
        /**
         * State of the model. Can be one of the following:
         * 'loading', 'loaded', 'saving', 'saved', 'save-error', 'load-error'
         * @type {Observable}
         */
        this.state = ko.observable('idle');
        this._subscribe();
    }

    var ModelPrototype = /** @lends Model.prototype */ {
        _subscribe: function() {
            var self = this;
            var form = this.form;

            function createSubscribeCallback(p_path) {
                return function(p_value) {
                    var data = self.data();
                    traversal.setProp(data, p_path, p_value);
                };
            }

            for (var name in form) {
                var obj = form[name];
                obj.value.subscribe(createSubscribeCallback(obj.path));
            }
        },
        /**
         * This will add the fields defined in the form to the data object,
         * but the initial values should be undefined
         */
        _resetObservables: function() {
            var data = this.data();
            var form = this.form;

            for (var name in form) {
                var obj = form[name];
                var value = traversal.getProp(data, obj.path);
                obj.value(value);
            }
        },
        // _preSave: function() {
        //     var data = this.data();
        //     var form = this.form;

        //     for (var name in form) {
        //         var obj = form[name];
        //         var value = obj.value();
        //         traversal.setProp(data, obj.path, value);
        //     }
        // },
        /**
         * @param  {String}   p_type     Type of ajax request: 'get' or 'post'
         * @param  {String}   p_url      Url to send the ajax request to
         * @param  {Object}   p_data     Data to send
         * @param  {Function} p_callback Callback to execute on finish
         * @private
         */
        _sendRequest: function(p_type, p_url, p_data, p_callback) {
            this.state(p_type === 'post' ? 'saving' : 'loading');

            if (typeof p_url !== 'string') {
                throw new Error('wrong url ' + p_url);
            }

            var self = this;
            // send an ajax post or get request, depending on the p_type
            return ajax[p_type]({
                url: p_url,
                data: p_data,
                error: function(textStatus, error) {
                    self.state(p_type === 'post' ? 'save-error' : 'load-error');
                    var err = new Error(textStatus);
                    err.cause = error;
                    if (p_callback) {
                        p_callback.call(self, err);
                    }
                },
                invalid: function(errors) {
                    self.invalidFields(errors);
                },
                success: function(textStatus, p_data) {
                    self.state(p_type === 'post' ? 'saved' : 'loaded');
                    self.invalidFields(null);
                    self.data(p_data);
                    self._resetObservables();
                    if (p_callback) {
                        p_callback.call(self, undefined, p_data);
                    }
                },
                complete: function(textStatus) {
                },
                noEvents: true
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
            // this._preSave();
            return this._sendRequest('post', this.postUrl, data, p_callback);
        },
        /**
         * Get the model to the server. Updates (replaces) the current model
         * with server response if successful.
         * @param  {Object} p_key      Filter parameters
         * @param  {Function} p_callback Callback function(err, data) to execute
         * on finish
         */
        load: function(p_key, p_callback) {
            this.state('idle');
            return this._sendRequest('get', this.getUrl, p_key, p_callback);
        },
        loadRest: function(p_key, p_callback) {
            this.state('idle');
            return this._sendRequest('get',
                this.getUrl + '/' + p_key, p_callback);
        },
        /**
         * Clears the data, resets the observables, sets the state to `idle`
         * and clears the `invalidFields` observable
         */
        clear: function() {
            this.data({});
            this._resetObservables();
            this.state('idle');
            this.invalidFields(null);
        }
    };

    var ModelConstructor =  Extendable.extend(Model, ModelPrototype);
    ModelConstructor.FormElement = FormElement;
    return ModelConstructor;
});