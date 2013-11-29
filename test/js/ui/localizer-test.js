define(['ui/localizer', 'events/event-manager'],
    function(localizer, eventManager) {

    describe('ui/localizer-test.js', function() {
        it('should be ok', function() {
            expect(localizer).to.be.ok();
        });
        describe('setLocale()', function() {
            it('should have the setLocale()', function() {
                expect(localizer.setLocale).to.be.a('function');
            });
            it('should have set the locale to hr-HR', function(done) {
                localizer.setLocale('hr-HR');
                binding = eventManager.addLocalizeListener(function(p_locale) {
                    expect(localizer.locale).to.be('hr-HR');
                    binding.detach();
                    done();
                });
            });
            it('should have set the locale to en-US', function(done) {
                localizer.setLocale('en-US');
                binding = eventManager.addLocalizeListener(function(p_locale) {
                    expect(localizer.locale).to.be('en-US');
                    binding.detach();
                    done();
                });
            });
        });
        describe('localize()', function() {
            it('should localize to en-US after event is fired', function(done) {
                binding = eventManager.addLocalizeListener(function(p_locale) {
                    expect(p_locale).to.be('en-US');
                    var localized = localizer.localize('test');
                    expect(localized).to.be('test en-US');
                    binding.detach();
                    done();
                });

                localizer.setLocale('en-US');
            });
            it('should localize to hr-HR after event is fired', function(done) {
                binding = eventManager.addLocalizeListener(function(p_locale) {
                    expect(p_locale).to.be('hr-HR');
                    var localized = localizer.localize('test');
                    expect(localized).to.be('test hr-HR');
                    binding.detach();
                    done();
                });

                localizer.setLocale('hr-HR');
            });
        });
    });
});