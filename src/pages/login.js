define(['templates/page', 'knockout', 'singletons', 'net/authentication'],
    function(Page, ko, singletons, authentication) {

    var ajax = singletons.ajax;
    var router = singletons.router;

    var vm = {
        form: {
            email: ko.observable(),
            password: ko.observable()
        },
        login: function() {
            var self = this;
            var data = {
                email: this.form.email(),
                password: this.form.password()
            };
            this.form.password('');

            authentication.login(data);
        }
    };

    var page = new Page({
        name: 'login',
        viewModel: vm,
        events: {
            'login': function(p_user) {
                this.log.debug('login event');
                router.go('page1');
            },
        }
    });

    return page;
});