define(['page', 'knockout', 'singletons'], function(Page, ko, singletons) {

    var ajax = singletons.ajax;

    var page = Page.init({
        name: 'login',
        viewModel: {
            email: ko.observable('test'),
            password: ko.observable('test'),
            login: function() {
                var data = {
                    email: this.email(),
                    password: this.password()
                };
                ajax.post({
                    url: '/login',
                    data: data,
                    success: function(data) {
                        if (data.err) {
                            // notify wrong password
                            return;
                        }
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

    return page;
});