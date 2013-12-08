define('templates/page', 'data/model', function(Page, Model) {

    var vm = {
        model: new Model({
            getUrl: 'companies/get',
            postUrl: 'companies/save',
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
        })
    };

    var form = new Page({
        name: 'companies/companies-form',
        viewModel: vm,
        routes: {
            'companies/new': function() {},
            'companies/edit/{shortId}': function(p_shortId) {
                vm.model.loadRest(p_shortId);
            }
        }
    });

});