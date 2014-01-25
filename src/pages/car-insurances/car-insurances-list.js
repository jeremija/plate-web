define(['templates/Page', 'knockout', 'singletons'],
    function(Page, ko, singletons) {

    var ajax = singletons.ajax;

    var vm = {
        carInsurances: ko.observableArray(),
        remove: function(p_carInsurance) {
            var shortId = p_carInsurance.shortId;
            ajax.post({
                url: '/carinsurances/delete',
                data: {
                    shortId: shortId
                },
                success: function(p_status, response) {
                    vm.carInsurances.remove(p_carInsurance);
                },
                noEvents: true
            });
        }
    };

    var carInsurancesList = new Page({
        name: 'car-insurances/car-insurances-list',
        viewModel: vm,
        routes: {
            'carinsurances/list': function() {
                ajax.get({
                    url: '/carinsurances/find',
                    success: function(p_status, response) {
                        if (!response) return;
                        vm.carInsurances(response);
                    }
                });
            },
            'carinsurances/list/{companyShortId}': function(companyShortId) {
                ajax.get({
                    url: '/carinsurances/find/' + companyShortId,
                    success: function(p_status, response) {
                        if (!response) return;
                        vm.carInsurances(response);
                    }
                });
            }
        }
    });

    return carInsurancesList;

});