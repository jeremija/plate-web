if (console && console.log) {
    console.log(
        '\n *************************************************************' +
        '\n * Starting plate-web integration tests.                     *' +
        '\n * the server running and a valid serverUrl variable set in  *' +
        '\n * test-integration/config/require-config.js                 *' +
        '\n *************************************************************');
    console.log('\nserverUrl: ' + serverUrl);
}
//
// Integration tests list
//
var tests = [
    'test/net/ajax-integration-test'
];