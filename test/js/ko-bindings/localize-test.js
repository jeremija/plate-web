define(['knockout', 'jquery', 'ui/culture', 'events/event-manager',
    'ko-bindings/localize'],
    function(ko, $, culture, EventManager) {

    describe('ko-bindings/localize-test.js', function() {
        var $el, $localize, $tooltip, $date1, $date2, $number1, $number2;
        var vm, events;
        before(function(done) {
            $el = $('<div>').attr('id', 'localize-test')
                .append($('<span>').attr('id', 'localize')
                    .attr('data-bind', 'localize: \'test\''))
                .append($('<span>').attr('id', 'tooltip')
                    .attr('data-bind', 'tooltip: {title: \'test\', ' +
                        'visible: tooltipVisible, delay: 0, animation: false}'))
                .append($('<input>').attr('id', 'date1')
                    .attr('data-bind', 'date: date1, placeholder: \'test\''))
                .append($('<span>').attr('id', 'date2')
                    .attr('data-bind', 'date: date2'))
                .append($('<input>').attr('id', 'number1')
                    .attr('data-bind', 'number: number1'))
                .append($('<span>').attr('id', 'number2')
                    .attr('data-bind', 'number: number2'))
                .appendTo('#test');

            $localize = $el.find('#localize');
            $tooltip = $el.find('#tooltip');
            $date1 = $el.find('#date1');
            $date2 = $el.find('#date2');
            $number1 = $el.find('#number1');
            $number2 = $el.find('#number2');

            vm = {
                tooltipVisible: ko.observable(),
                date1: ko.observable(new Date(1988, 9, 19)),
                date2: ko.observable(new Date(1988, 4, 25)),
                number1: ko.observable(12345.67),
                number2: ko.observable(23456.78)
            };
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
        before(function() {
            ko.applyBindings(vm, $el[0]);
        });
        afterEach(function() {
            events.clear();
        });
        after(function() {
            ko.cleanNode($el[0]);
            $('#test').html('');
        });

        function triggerChangeEvent(element) {
            var event = document.createEvent('UIEvents');
            event.initUIEvent('change', true, true);
            element.dispatchEvent(event);
        }

        describe('locale set to `en-US` and ko.applyBindings()', function() {
            describe('ko.bindingHandlers.localize', function() {
                it('should localize `test` to `test en-US`', function() {
                    expect($localize.text()).to.be('test en-US');
                });
            });
            describe('ko.bindingHandlers.placeholder', function() {
                it('should localize `test` to `test en-US`', function() {
                    expect($date1.attr('placeholder')).to.be('test en-US');
                });
            });
            describe('ko.bindingHandlers.tooltip', function() {
                it('should show localized tooltip', function() {
                    vm.tooltipVisible(true);

                    var $tooltipInner = $el.find('.tooltip-inner');
                    expect($tooltipInner.text()).to.be('test en-US');
                });
                it('should hide tooltip', function() {
                    vm.tooltipVisible(false);

                    expect($el.find('.tooltip-inner').length).to.be(0);
                });
            });
            describe('ko.bindingHandlers.date', function() {
                it('should localize date', function() {
                    expect($date1.val()).to.be('10/19/1988');
                });
                it('should reset the date if the input was invalid', function() {
                    $date1.val('test');

                    // jquery's $date1.change() doesn't work here so we trigger
                    // the event manually
                    triggerChangeEvent($date1[0]);

                    expect($date1.val()).to.not.be.ok();
                });
                it('should parse date from the input field', function() {
                    $date1.val('1/31/2013');
                    triggerChangeEvent($date1[0]);
                    expect($date1.val()).to.be('1/31/2013');
                    // date1 should be an ISO Date String
                    expect(vm.date1()).to.be('2013-01-30T23:00:00.000Z');
                });
                it('should work on non-input elements', function() {
                    expect($date2.text()).to.be('5/25/1988');
                    vm.date2('2013-07-25T00:00:00.000Z');
                    expect($date2.text()).to.be('7/25/2013');
                });
            });
            describe('ko.bindingHandlers.number', function() {
                it('should localize number', function() {
                    expect($number1.val()).to.be('12,345.67');
                });
                it('should reset number if the input was invalid', function() {
                    expect($number1.val()).to.be('12,345.67');
                });
                it('should parse number from the input field', function() {

                });
                it('should work on non-input elements', function() {
                    expect($number2.text()).to.be('23,456.78');
                    vm.number2(12131.41);
                    expect($number2.text()).to.be('12,131.41');
                });
            });
        });

        describe('switch locale to `hr-HR`', function() {
            it('should change culture to `hr-HR`', function(done) {
                events.listen({
                    'locale-changed': function() {
                        done();
                    }
                });
                culture.setLocale('hr-HR');
            });
            it('should localize text', function() {
                expect($localize.text()).to.be('test hr-HR');
            });
            it('should localize placeholer', function() {
                expect($date1[0].placeholder).to.be('test hr-HR');
            });
            it('should localize tooltip', function() {
                vm.tooltipVisible(true);
                expect($('.tooltip-inner').text()).to.be('test hr-HR');
                vm.tooltipVisible(false);
            });
            it('should localize date', function() {
                expect($date1.val()).to.be('31.1.2013.');
                expect($date2.text()).to.be('25.7.2013.');
            });
            it('should localize number', function() {
                expect($number1.val()).to.be('12.345,67');
                expect($number2.text()).to.be('12.131,41');
            });
        });


        // describe('ko.applyBindings()', function() {
        //     it('should apply bindings with no errors', function() {
        //         ko.applyBindings(vm, $el[0]);
        //     });

        //     it('should have localized `test` to `test en-US`', function() {
        //         expect($el.text()).to.be('test en-US');
        //     });
        //     it('should change language to hr-HR', function(done) {
        //         events.listen({
        //             'locale-changed': function(p_locale) {
        //                 expect(p_locale).to.be('hr-HR');
        //                 done();
        //             }
        //         });
        //         culture.setLocale('hr-HR');
        //     });
        //     it('should change locale and relocalize automatically', function() {
        //         expect($el.text()).to.be('test hr-HR');
        //     });
        // });
    });
});