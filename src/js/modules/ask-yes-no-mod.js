define(['knockout', 'jquery', 'templates/bindable'], function(ko, $, Bindable) {

    var vm = {
        yesCallback: undefined,
        noCallback: undefined,
        message: ko.observable(),
        context: undefined,
        yes: function(data, event) {
            $(askYesNoMod.element).modal('hide');
            if (vm.yesCallback) vm.yesCallback.call(vm.context, vm.data);
        },
        no: function(data, event) {
            $(askYesNoMod.element).modal('hide');
            if (vm.noCallback) vm.noCallback.call(vm.context, vm.data);
        },
        data: undefined
    };

    var askYesNoMod = new Bindable({
        name: 'ask-yes-no-mod',
        viewModel: vm,
        events: {
            /**
             * Event which shows the modal dialog with yes no buttonss
             * @event EventManager#ask-yes-no
             * @param  {Object} p_params            Configuration object
             * @param  {String} p_params.message    Will be localized
             * @param  {Function} p_params.yes      Callback on yes click
             * @param  {Function} p_params.no       Callback on no click
             * @param  {Object} p_params.context    Context in which the
             * @param  {Object} p_params.data       Data to send as callback
             * argument
             */
            'ask-yes-no': function(p_params) {
                var config = p_params || {};
                vm.message(config.message);
                vm.yesCallback = config.yes;
                vm.noCallback = config.no;
                vm.context = config.context;
                vm.data = config.data;
                $(this.element).modal('show');
            }
        },
        visible: true
    });

    askYesNoMod.onBind = function() {
        $(this.element).modal({
            show: false
        });
    };

    return askYesNoMod;
});