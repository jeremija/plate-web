define(['modules/messagesMod', 'events/EventManager', 'jquery'],
    function(messagesMod, EventManager, $) {


    describe('modules/messagesMod-test', function() {
        var events;
        before(function() {
            events = new EventManager('messagesMod-test');
            $('<div>').attr('id', 'messagesMod').appendTo('#test');
        });

        afterEach(function() {
            $('#messagesMod').html('');
        });

        after(function() {
            messagesMod.clear();
            $('#test').html('');
        });

        describe('instance', function() {
            it('should be ok', function() {
                expect(messagesMod).to.be.ok();
                messagesMod.listen();
            });
        });

        describe('`msg-error` event', function() {
            it('should create a new error message', function() {
                events.dispatch('msg-error', 'an-error-message');
                var $el = $('div.alert.alert-danger.alert-dismissable');
                expect($el.length).to.be(1);
                expect($el.find('span').text()).to.be('an-error-message');
            });
        });

        describe('`msg-warn` event', function() {
            it('should create a new warning message', function() {
                events.dispatch('msg-warn', 'a-warning-message');
                var $el = $('div.alert.alert-warning.alert-dismissable');
                expect($el.length).to.be(1);
                expect($el.find('span').text()).to.be('a-warning-message');
            });
        });

        describe('`msg-info` event', function() {
            it('should create a new info message', function() {
                events.dispatch('msg-info', 'an-info-message');
                var $el = $('div.alert.alert-info.alert-dismissable');
                expect($el.length).to.be(1);
                expect($el.find('span').text()).to.be('an-info-message');
            });
        });

        describe('`msg-success` event', function() {
            it('should create a new success message', function() {
                events.dispatch('msg-success', 'a-success-message');
                var $el = $('div.alert.alert-success.alert-dismissable');
                expect($el.length).to.be(1);
                expect($el.find('span').text()).to.be('a-success-message');
            });
        });
    });
});