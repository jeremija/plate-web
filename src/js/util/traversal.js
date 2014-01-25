/**
 * @module util/traversal
 */
define([], function() {

    var exports = {
        /**
         * Copies first-level properties from source to destination
         * @param  {Object} p_src  Source
         * @param  {Object} p_dest Destination
         */
        copyProperties: function(p_src, p_dest) {
            if (!p_dest) throw new Error('p_dest must be defined');
            p_src = p_src || {};

            for (var prop in p_src) {
                if (p_src.hasOwnProperty(prop)) {
                    p_dest[prop] = p_src[prop];
                }
            }
        },
        /**
         * Gets the property from an object
         * @param  {Object} p_object   object to retrieve the property from
         * @param  {String} p_property in the form of 'prop1.prop2.prop3'
         * @return {*}                 previous value
         */
        getProp: function(p_object, p_property) {
            var path = p_property.split('.');
            var obj = p_object;
            for (var i in path) {
                var name = path[i];
                if (name in obj) {
                    obj = obj[name];
                    continue;
                }
                return;
            }
            return obj;
        },
        /**
         * Sets the property to an object. If the subproperties don't exist,
         * they will be created
         * @param {Object} p_object   object to set the property to
         * @param {String} p_property path to set the property to
         * @param {Object} p_value    value
         * @returns {*}               previous value
         */
        setProp: function(p_object, p_property, p_value) {
            var path = p_property.split('.');
            var obj = p_object;

            var propertyName = path.pop();
            var previous;
            for (var i in path) {
                var name = path[i];
                if (name in obj && typeof obj[name] === 'object') {
                    obj = obj[name];
                    continue;
                }
                previous = obj[name];
                obj = obj[name] = {};
            }
            if (!previous) {
                previous = obj[propertyName];
            }
            obj[propertyName] = p_value;
            return previous;
        },
        copyPropertiesToObservables: function(p_src, p_dest) {

        }
    };

    return exports;
});