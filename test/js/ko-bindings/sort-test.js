define(['knockout', 'jquery', 'ko-bindings/sort'], function(ko, $) {
    describe('ko-bindings/sort-test', function() {
        var john = {
            name: 'john'
        };
        var andrew = {
            name: 'andrew'
        };
        var zaz = {
            name: 'zaz'
        };
        var $el, list = [john, andrew, zaz];
        before(function() {
            $el = $('<div>').attr('id', 'sort-test')
                .attr('data-bind', 'sort: {arr: list, prop: \'name\' }')
                .appendTo('#test');
            var vm = {
                list: ko.observableArray(list)
            };
            ko.applyBindings(vm, $el[0]);
        });
        after(function() {
            ko.cleanNode('sort-test');
            $('#test').html('');
        });

        function triggerClick() {
            // var event = document.createEvent('UIEvents');
            // event.initUIEvent('click', true, true);
            // $el[0].dispatchEvent(event);
            $el.click();
        }

        describe('first click', function() {
            it('should sort descending', function() {
                triggerClick();
                expect(list[0]).to.be(andrew);
                expect(list[1]).to.be(john);
                expect(list[2]).to.be(zaz);
            });
            it('should add caret', function() {
                expect($el.find('.caret').length).to.be(1);
                expect($el.find('.caret.up').length).to.be(1);
            });
        });
        describe('second click', function() {
            it('should sort ascending', function() {
                triggerClick();
                expect(list[0]).to.be(zaz);
                expect(list[1]).to.be(john);
                expect(list[2]).to.be(andrew);
            });
            it('should reverse caret', function() {
                expect($el.find('.caret').length).to.be(1);
                expect($el.find('.caret.up').length).to.be(0);
            });
        });
        describe('third click', function() {
            it('should sort descending', function() {
                triggerClick();
                expect(list[0]).to.be(andrew);
                expect(list[1]).to.be(john);
                expect(list[2]).to.be(zaz);
            });
            it('should add caret', function() {
                expect($el.find('.caret').length).to.be(1);
                expect($el.find('.caret.up').length).to.be(1);
            });
        });
    });
});