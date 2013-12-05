define(['extendable', 'jquery'],
    function(Extendable, $) {

    /**
     * @class for loading html templates
     * @name TemplateLoader
     * @param {Object}  p_params               Configuration object
     * @param {String}  p_params.name          Name
     * @param {String}  p_params.selector      Id of the element to append the
     * pages to.
     * @param {String}  p_params.pagePrefix    Prefix for page ids
     */
    var TemplateLoader = function(p_params) {
        this.name = p_params.name;

        this.pagePrefix = p_params.pagePrefix || 'page-';
        this.$el = $('#' + p_params.selector);
    };

    var TemplateLoaderPrototype = /** @lends TemplateLoader.prototype */ {
        _getPageId: function(p_path) {
            var pagePrefix = this.pagePrefix || 'page-';
            // replace all non-letters and non-numbers with an underscore
            return pagePrefix + p_path.replace(/[^a-zA-Z0-9\-]/g, '_');
        },
        /**
         * Loads the html for the page or shows the already loaded page.
         * @param  {String} p_url          Url of the html template for the
         * page
         * @param  {Function} p_callback   Callback to execute when loading
         * is done
         */
        load: function(p_url, p_callback) {
            var id = this._getPageId(p_url);

            $page = $('<div>').attr('id', id).appendTo(this.$el);
            $page.load(p_url, function(response, status, xhr) {
                if (status === 'error') {
                    var err = new Error('Failed to load ' + p_url + ': ' + xhr.status);
                    if (p_callback) p_callback(err);
                    else throw err;
                    return;
                }
                var el = $page[0];
                p_callback(undefined, el);
            });
        }
    };

    return Extendable.extend(TemplateLoader, TemplateLoaderPrototype);
});