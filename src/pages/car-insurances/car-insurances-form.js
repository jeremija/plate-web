define(['templates/page', 'data/model', 'knockout', 'singletons'],
    function(Page, Model, ko, singletons) {

    var ajax = singletons.ajax;

    var vm = {
        companies: ko.observableArray(),
        model: new Model({
            getUrl: '/carinsurances/get',
            postUrl: '/carinsurances/save',
            form: {
                name: new Model.FormElement({
                    value: ko.observable(),
                    path: 'name'
                }),
                licensePlate: new Model.FormElement({
                    value: ko.observable(),
                    path: 'licensePlate'
                }),
                policyNumber: new Model.FormElement({
                    value: ko.observable(),
                    path: 'policyNumber'
                }),
                expires: new Model.FormElement({
                    value: ko.observable(),
                    path: 'expires'
                }),
                power: new Model.FormElement({
                    value: ko.observable(),
                    path: 'power'
                }),
                maxAllowedMass: new Model.FormElement({
                    value: ko.observable(),
                    path: 'maxAllowedMass'
                }),
                vehicleType: new Model.FormElement({
                    value: ko.observable(),
                    path: 'vehicleType'
                }),
                company: new Model.FormElement({
                    value: ko.observable(),
                    path: 'company'
                })
            }
        }),
        submit: function() {
            vm.model.save(function(err, data) {

            });
        }
    };

    var page = new Page({
        name: 'car-insurances/car-insurances-form',
        viewModel: vm,
        routes: {
            'carinsurances/new': function() {
                vm.model.clear();
            },
            'carinsurances/edit/{shortId}': function(p_shortId) {
                vm.model.loadRest(p_shortId);
            }
        }
    });

    page.onShow = function() {
        ajax.get({
            url: '/companies/find',
            success: function(textStatus, response) {
                vm.companies(response);
            }
        });
    };

    return page;
});