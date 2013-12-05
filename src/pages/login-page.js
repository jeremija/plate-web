define(['templates/page', 'knockout', 'net/authentication'],
    function(Page, ko, authentication) {

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
        name: 'login-page',
        viewModel: vm,
        events: {
            'logged-in': function(p_user) {
                this.log.debug('login event');
                // router.go('page1');
            },
        },
        states: {
            'logged-in': function() {}
        }
    });

    return page;
});