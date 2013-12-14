define(['knockout', 'jquery', 'ko-bindings/form-state', 'bootstrap'], function(ko, $, formStateHandler, bootstrap) {

    describe('ko-bindings/form-state-test.js', function() {
        var $el, $field1, $field2,
            vm, icon, button, icons = formStateHandler.stateIcons;
        before(function() {
            $el = $('<div>').attr('id', 'form-state-test')
                .append(
                    $('<form>').attr('id', 'test-form')
                        .attr('data-bind', 'invalidFields: invalidFields')
                        .append($('<div>').addClass('form-group')
                            .append($('<input>').attr('name', 'field1')))
                        .append($('<div>').addClass('form-group')
                            .append($('<input>').attr('name', 'field2')))
                        .append(
                            $('<button>')
                                .attr('data-bind', 'formState: $data.state')))
                .appendTo('#test');

            $field1 = $el.find('[name="field1"]');
            $field2 = $el.find('[name="field2"]');

            vm = {
                state: ko.observable(),
                invalidFields: ko.observable()
            };
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
        describe('`formState` binding', function() {
            it('should change icon for state `idle`', function() {
                vm.state('idle');
                expect(icon.className).to.be(icons.idle);
            });
            it('should change icon for state `loading`', function() {
                vm.state('loading');
                expect(icon.className).to.be(icons.loading);
            });
            it('should change icon for state `saved`', function() {
                vm.state('saved');
                expect(icon.className).to.be(icons.saved);
            });
        });
        describe('`invalidFields binding`', function() {
            it('should invalidate `field1`', function() {
                vm.invalidFields({
                    field1: {
                        type: 'required.key'
                    }
                });
                expect($field1.parent().hasClass('has-error')).to.be(true);
                expect($field1.data('bs.tooltip')).to.be.ok();

                expect($field2.parent().hasClass('has-error')).to.be(false);
                expect($field2.data('bs.tooltip')).to.not.be.ok();
            });
            it('should invalidate `field2`', function() {
                vm.invalidFields({
                    field2: {
                        type: 'custom.user.error.key'
                    }
                });
                expect($field1.parent().hasClass('has-error')).to.be(false);
                expect($field1.data('bs.tooltip')).to.not.be.ok();

                expect($field2.parent().hasClass('has-error')).to.be(true);
                expect($field2.data('bs.tooltip')).to.be.ok();
            });
            it('should invalidate both `field1` and `field2`', function() {
                vm.invalidFields({
                    field1: {},
                    field2: {}
                });
                expect($field1.parent().hasClass('has-error')).to.be(true);
                expect($field1.data('bs.tooltip')).to.be.ok();
                expect($field2.parent().hasClass('has-error')).to.be(true);
                expect($field2.data('bs.tooltip')).to.be.ok();
            });
            it('should mark both fields as valid', function() {
                vm.invalidFields(null);
                expect($field1.parent().hasClass('has-error')).to.be(false);
                expect($field1.data('bs.tooltip')).to.not.be.ok();
                expect($field2.parent().hasClass('has-error')).to.be(false);
                expect($field2.data('bs.tooltip')).to.not.be.ok();
            });
        });
    });
});