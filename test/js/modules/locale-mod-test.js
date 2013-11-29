define(['modules/locale-mod', 'templates/bindable', 'events/event-manager'],
    function(localeMod, Bindable, eventManager) {

    describe('modules/locale-mod-test.js', function() {
        it('should be ok', function() {
            expect(localeMod).to.be.ok();
            expect(localeMod instanceof Bindable);
        });
        describe('viewModel', function() {
            it('should be ok', function() {
                expect(localeMod.viewModel).to.be.ok();
            });
            describe('viewModel.localize()', function() {
                it('should dispatch changeLocale event', function() {
                    localeMod.viewModel.localize('hr-HR');
                    //
                });
            });
        });
    });
});