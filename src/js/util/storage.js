define(['extendable', 'events/event-manager', 'logger'],
    function(Extendable, EventManager, Logger) {

    this.localStorageSupported = localStorage &&
        typeof localStorage.setItem === 'function' &&
        typeof localStorage.getItem === 'function';

    /**
     * @class Wrapper for localStorage
     * @name Storage
     * @listens EventManager#logged-in
     * @listens EventManager#logged-out
     */
    function Storage() {
        if (!localStorageSupported) {
            log.warn('localStorage not supported on this browser, some ' +
                'persistence features may be disabled');
        }

        this.events = new EventManager('util/storage', this);

        this.events.listen({
            'logged-in': function(p_user) {
                this.save('user', p_user);
                this.save('last-email', p_user.email);
            },
            'logged-out': function() {
                this.delete('user');
            }
        });
    }

    var StoragePrototype = /** @lends Storage.prototype */ {
        log: new Logger('util/storage'),
        /**
         * Stores the item to the local storage
         * @param  {String} p_key   The key to store the item under
         * @param  {*}      p_value Value to store
         * @return {*}              The previous value
         */
        save: function(p_key, p_value) {
            if (!localStorageSupported) return undefined;

            var previousValue = this.load(p_key);

            var json;
            try {
                json = JSON.stringify(p_value);
            }
            catch(err) {
                json = p_value;
            }

            localStorage.setItem(p_key, json);

            return previousValue;
        },
        /**
         * Gets the item from local storage
         * @param  {String} p_key
         * @return {Object}            The stored object
         */
        load: function(p_key) {
            if (!localStorageSupported) return undefined;

            var item = localStorage.getItem(p_key);

            var value;
            try {
                value = JSON.parse(item);
            }
            catch(err) {
                value = item;
            }

            return value;
        },
        /**
         * Deletes the item from local storage
         * @param  {String} p_key Key
         * @return {*}            Previously stored value
         */
        delete: function(p_key) {
            if (!localStorageSupported) return undefined;

            var value = this.load(p_key);
            localStorage.removeItem(p_key);
            return value;
        },
        enabled: localStorageSupported
    };

    return Extendable.extend(Storage, StoragePrototype);
});