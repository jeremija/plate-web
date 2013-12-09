define(['templates/page', 'knockout', 'singletons', 'jquery'],
    function(Page, ko, singletons, $) {

    var ajax = singletons.ajax;

    var vm = {
        companies: ko.observableArray(),
        remove: function(p_company) {
            var shortId = p_company.shortId;
            ajax.post({
                url: '/companies/delete',
                data: {
                    shortId: shortId
                },
                success: function(p_status, response) {
                    vm.companies.remove(p_company);
                },
                noEvents: true
            });
        }
    };

    var page = new Page({
        name: 'companies/companies-list',
        viewModel: vm,
        routes: {
            'companies/list': function() {
                ajax.get({
                    url: '/companies/find',
                    success: function(p_status, response) {
                        if (!response) return; //todo report error
                        vm.companies(response);
                    },
                    noEvents: true
                });
            },
        }
    });

    page.onShow = function() {
    };

    return page;
});