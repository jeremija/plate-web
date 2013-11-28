require.baseUrl = '../src/js';
require.paths.test = '../../test';
// require.urlArgs = "bust=" +  (new Date()).getTime();

// mock Ajax
require.map['*']['net/ajax'] = 'test/js/net/ajax-mock';
require.map['test/js/net/ajax-mock'] = {
    'net/ajax': 'net/ajax'
};