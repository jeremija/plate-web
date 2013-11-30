define(['templates/page', 'knockout', 'singletons'], function(Page, ko, singletons) {

    var ajax = singletons.ajax;

    var page = new Page({
        name: 'login',
        viewModel: {
            form: {
                email: ko.observable(),
                password: ko.observable()
            },
            login: function() {
                var data = {
                    email: this.form.email(),
                    password: this.form.password()
                };
                ajax.post({
                    url: '/login',
                    data: data,
                    success: function(textStatus, data) {
                        if (data.err) {
                            log.debug('wrong username or password');
                            // notify wrong password
                            return;
                        }
                        log.debug('user logged in!');
                        // set logged on user
                    },
                    error: function() {
                        // notify error
                    },
                    complete: function() {
                    }
                });
            },
        }
    });

    var log = page.log;

    return page;
});