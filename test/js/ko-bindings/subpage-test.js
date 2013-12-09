define(['knockout', 'events/event-manager', 'jquery', 'ko-bindings/subpage'],
    function(ko, EventManager, $) {

    describe('ko-bindings/subpage-test.js', function() {
        var events, el;
        before(function() {
            events = new EventManager('ko-bindings/subpage-test');
            var $el = $('<div>').attr('id', 'subpage')
                .attr('data-bind', 'subpage: \'test123\'')
                .appendTo('#test');
            el = $el[0];
            var vm = {};
            ko.applyBindings(vm, el);
        });

        afterEach(function() {
            events.clear();
        });

        after(function() {
            ko.cleanNode(el);
            $('#test').html('');
        });

        describe('on click', function() {
            it('should dispatch the `subpage` event on click', function(done) {
                events.listen({
                    'subpage': function(p_url) {
                        expect(p_url).to.be('test123');
                        done();
                    }
                });
                console.log(el.click);
                $(el).click();
            });
        });
    });
});