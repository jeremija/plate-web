define(['knockout', 'jquery', 'ui/culture', 'events/event-manager',
    'ko-bindings/localize'],
    function(ko, $, culture, EventManager) {

    describe('ko-bindings/localize-test.js', function() {
        var $el, vm, events;
        before(function(done) {
            $el = $('<div>').attr('id', 'localize')
                .attr('data-bind', 'localize: \'test\'')
                .appendTo('#test');
            vm = {};
            events = new EventManager('ko-bindings/localize-test');
            // change locale to en-US before tests
            events.listen({
                'locale-changed': function(p_locale) {
                    expect(p_locale).to.be('en-US');
                    done();
                }
            });
            culture.setLocale('en-US');
        });
        afterEach(function() {
            events.clear();
        });
        after(function() {
            ko.cleanNode($el[0]);
            $('#test').html('');
        });

        describe('ko.applyBindings()', function() {
            it('should apply bindings with no errors', function() {
                ko.applyBindings(vm, $el[0]);
            });

            it('should have localized `test` to `test en-US`', function() {
                expect($el.text()).to.be('test en-US');
            });
            it('should change language to hr-HR', function(done) {
                events.listen({
                    'locale-changed': function(p_locale) {
                        expect(p_locale).to.be('hr-HR');
                        done();
                    }
                });
                culture.setLocale('hr-HR');
            });
            it('should change locale and relocalize automatically', function() {
                expect($el.text()).to.be('test hr-HR');
            });
        });
    });
});