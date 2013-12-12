define(['modules/ask-yes-no-mod', 'jquery', 'knockout', 'events/event-manager'],
    function(yesno, $, ko, EventManager) {

    describe('modules/ask-yes-no-mod-test', function() {
        var $el, events, ctx = { yes: 0, no: 0 };
        before(function() {
            $el = $('<div>').attr('id', 'askyesno').addClass('modal')
                .append($('<span>')
                    .attr('id', 'yes').attr('data-bind', 'click: yes'))
                .append($('<span>')
                    .attr('id', 'no').attr('data-bind', 'click: no'))
                .append($('<span>')
                    .attr('id', 'msg').attr('data-bind', 'text: message'))
                .appendTo('#test');
            yesno.bind($el[0]);
            $el.hide(0);
            events = new EventManager('modules/ask-yes-no-mod-test');
        });
        after(function() {
            ko.cleanNode($el[0]);
            $('#test').html('');
        });

        function dispatchYesNoEvent() {
            events.dispatch('ask-yes-no', {
                context: ctx,
                yes: function() {
                    this.yes++;
                },
                no: function() {
                    this.no++;
                },
                message: 'test'
            });
        }

        describe('modal', function() {
            it('should create a hidden modal', function() {
                expect($el.is(':visible')).to.be(false);
            });
            it('should show on `ask-yes-no` event', function() {
                dispatchYesNoEvent();
                var msg = $el.find('#msg').text();
                expect(msg).to.be('test');
                expect($el.is(':visible')).to.be(true);
            });
            it('no() should hide and execute `no` callback', function() {
                $el.find('#no').click();
                expect($el.is(':visible')).to.be(false);
                expect(ctx.yes).to.be(0);
                expect(ctx.no).to.be(1);
            });
            it('should show again on `ask-yes-no` event', function() {
                dispatchYesNoEvent();
                var msg = $el.find('#msg').text();
                expect(msg).to.be('test');
                expect($el.is(':visible')).to.be(true);
            });
            it('yes() should hide and execute `yes` callback', function() {
                $el.find('#yes').click();
                expect($el.is(':visible')).to.be(false);
                expect(ctx.yes).to.be(1);
                expect(ctx.no).to.be(1);
            });
        });
    });
});