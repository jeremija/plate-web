define(['net/Ajax'], function(Ajax) {

    var mocks;

    function clearMocks() {
        mocks = {
            GET: {},
            POST: {}
        };
    }

    clearMocks();

    // mock main ajax function
    Ajax.prototype._ajaxRequest = function(p_params, p_type) {

        var self = this;

        setTimeout(function() {
            var type = (p_type === 'GET' || p_type === 'POST') ? p_type : 'GET';

            var urlMock = mocks[p_type][p_params.url];
            var status;
            if (!urlMock) {
                status = 'error';
                p_params.error(status, 'NOT FOUND');
            }
            else {
                var data = p_params.data ?
                    JSON.stringify(p_params.data) : 'undefined';

                var mockedData = urlMock[data];

                if (mockedData.error) {
                    status = 'error';
                    self._ajaxHandleError(p_params, status, mockedData.error);
                }
                else {
                    status = 'success';
                    p_params.success(status, mockedData.data);
                }
            }
            p_params.complete(status);
        }, this);

    };

    Ajax.prototype.mockRequest = function(p_url, p_data, p_type, p_response) {
        var data = p_data ? JSON.stringify(p_data) : 'undefined';
        var urlMock = mocks[p_type][p_url];
        if (!urlMock) {
            urlMock = {};
        }
        urlMock[data] = p_response;
        mocks[p_type][p_url] = urlMock;
    };


    Ajax.prototype.mockGet = function(p_url, p_data, p_response) {
        this.mockRequest(p_url, p_data, 'GET', p_response);
    };

    Ajax.prototype.mockPost = function(p_url, p_data, p_response) {
        this.mockRequest(p_url, p_data, 'POST', p_response);
    };

    Ajax.prototype.clearMocks = function() {
        clearMocks();
    };

    return Ajax;
});