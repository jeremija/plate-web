define(['templates/Page', 'knockout', 'singletons', 'jquery'],
    function(Page, ko, singletons, $) {

    var ajax = singletons.ajax;

    var vm = {
        companies: ko.observableArray(),
        remove: function(p_company) {
            // page.events.dispatch('ask-yes-no', 'common.confirm.delete',
                // function() {

                    ajax.post({
                        url: '/companies/delete',
                        data: {
                            shortId: p_company.shortId,
                            _id: p_company._id
                        },
                        success: function(p_status, response) {
                            vm.companies.remove(p_company);
                        },
                        noEvents: true
                    });
                // });
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

    return page;
});