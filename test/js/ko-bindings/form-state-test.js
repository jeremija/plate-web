define(['knockout', 'jquery', 'ko-bindings/form-state'], function(ko, $, formStateHandler) {

    describe('ko-bindings/form-state-test.js', function() {
        var $el, vm, icon, button, icons = formStateHandler.iconStateMap;
        before(function() {
            var a = $('#test');
            $el = $('#test').append('<div id="form-state-test"><button data-bind="formState: $data.state"></button></div>');
            vm = {
                state: ko.observable()
            };
            formStateHandler.setSuccessTimeout(10);
        });
        after(function() {
            ko.cleanNode($el[0]);
            $('#test').html('');
        });

        describe('ko.applyBindings()', function() {
            it('should apply bindings with no errors', function() {
                ko.applyBindings(vm, $el[0]);
                icon = $el.find('span.glyphicon')[0];
                button = $el.find('button')[0];
                expect(icon).to.be.ok();
                expect(button).to.be.ok();
            });
        });
        describe('state `idle`', function() {
            it('should change icon', function() {
                vm.state('idle');
                expect(icon.className).to.be(icons.idle);
            });
        });
        describe('state `loading`', function() {
            it('should change icon', function() {
                vm.state('loading');
                expect(icon.className).to.be(icons.loading);
            });
        });
        describe('state `saved`', function() {
            it('should change icon', function() {
                vm.state('saved');
                expect(icon.className).to.be(icons.saved);
            });
            it('should change icon again after a timeout', function(done) {
                setTimeout(function() {
                    expect(icon.className).to.not.be(icons.saved);
                    expect(icon.className).to.be(icons.idle);
                    done();
                }, 15);
            });
        });
    });

});