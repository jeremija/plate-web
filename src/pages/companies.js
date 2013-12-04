define(['templates/page', 'knockout', 'singletons'],
    function(Page, ko, singletons, authentication) {

    var ajax = singletons.ajax;

    var vm = {
        companies: ko.observableArray()
    };

    var page = new Page({
        name: 'companies',
        viewModel: vm
    });

    page.onShow = function() {
        ajax.get({
            url: '/companies/find',
            success: function(p_status, response) {
                if (!response) return; //todo report error
                vm.companies(response.data);
            },
            fail: function(p_status, errorThrown) {

            }
        });
    };

    return page;
});