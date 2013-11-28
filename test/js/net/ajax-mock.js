define(['net/ajax'], function(Ajax) {

    var mocks;

    function clearMocks() {
        mocks = {
            GET: {},
            POST: {}
        };
    }

    function mockRequest(p_url, p_data, p_type, p_response) {
        var data = p_data ? JSON.stringify(p_data) : 'undefined';
        var urlMock = mocks[p_type][p_url];
        if (!urlMock) {
            urlMock = {};
        }
        urlMock[data] = p_responseData;
        mocks.GET[p_url] = mock;
    }

    Ajax._ajaxRequest = function(p_params, p_type) {
        var type = (p_type === 'GET' || p_type === 'POST') ? p_type : 'GET';

        var urlMock = mocks[p_type][p_params.url];
        if (!urlMock) {
            p_params.error(404);
        }
        var data = p_params.data ? JSON.stringify(p_params.data) : 'undefined';

        var mockedData = urlMock[data];


    };

    Ajax.mockGet = function(p_url, p_data, p_responseData) {
        mockRequest(p_url, p_data, 'GET', p_responseData);
    };

    Ajax.mockPost = function(p_url, p_data, p_responseData) {
        mockRequest(p_url, p_data, 'POST', p_responseData);
    };
    Ajax.clearMocks = function() {
        clearMocks();
    };

    return Ajax;
});