define(['ui/culture', 'events/event-manager'],
    function(culture, EventManager) {


    describe('ui/culture-test.js', function() {
        var events = new EventManager('ui/culture-test');

        it('should be ok', function() {
            expect(culture).to.be.ok();
        });
        after(function() {
            events.clear();
        });
        describe('setLocale()', function() {
            it('should have the setLocale()', function() {
                expect(culture.setLocale).to.be.a('function');
            });
            it('should have set the locale to hr-HR', function(done) {
                events.listen({
                    'locale-changed': function(p_locale) {
                        expect(culture.locale).to.be('hr-HR');
                        done();
                    }
                });
                culture.setLocale('hr-HR');
            });
            it('should have set the locale to en-US', function(done) {
                events.listen({
                    'locale-changed': function(p_locale) {
                        expect(culture.locale).to.be('en-US');
                        done();
                    }
                });
                culture.setLocale('en-US');
            });
        });
        describe('localize()', function() {
            it('should localize to en-US after event is fired', function(done) {
                events.listen({
                    'locale-changed': function(p_locale) {
                        expect(p_locale).to.be('en-US');
                        var localized = culture.localize('test');
                        expect(localized).to.be('test en-US');
                        done();
                    }
                });

                culture.setLocale('en-US');
            });
            it('should localize to hr-HR after event is fired', function(done) {
                events.listen({
                    'locale-changed': function(p_locale) {
                        expect(p_locale).to.be('hr-HR');
                        var localized = culture.localize('test');
                        expect(localized).to.be('test hr-HR');
                        done();
                    }
                });

                culture.setLocale('hr-HR');
            });
        });
    });
});