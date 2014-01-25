define(['templates/Page', 'data/Model', 'knockout'], function(Page, Model, ko) {

    var vm = {
        model: new Model({
            getUrl: '/companies/get',
            postUrl: '/companies/save',
            form: {
                name: new Model.FormElement({
                    value: ko.observable(),
                    path: 'name'
                }),
                oib: new Model.FormElement({
                    value: ko.observable(),
                    path: 'oib'
                })
            }
        }),
        submit: function() {
            vm.model.save(function(err, data) {

            });
        }
    };

    var page = new Page({
        name: 'companies/companies-form',
        viewModel: vm,
        routes: {
            'companies/new': function() {
                vm.model.clear();
            },
            'companies/edit/{shortId}': function(p_shortId) {
                vm.model.loadRest(p_shortId);
            }
        }
    });

    return page;
});