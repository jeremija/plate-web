define(['knockout', 'jquery'], function(ko, $) {
    ko.bindingHandlers.sort = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var asc = false;
            // element.style.cursor = 'pointer';
            element.className += ' link';

            ko.utils.registerEventHandler(element, 'click', function(event) {
                var value = valueAccessor();
                var prop = value.prop;
                var data = value.arr;

                asc = !asc;

                var $element = $(element);
                $element.find('span.caret').remove();
                $element.siblings().find('span.caret').remove();
                $('<span>').addClass('caret').addClass(asc ? 'up' : '')
                    .appendTo($element);

                if (asc) {
                    data.sort(function(left, right) {
                        return left[prop] == right[prop] ? 0 : left[prop] < right[prop] ? -1 : 1;
                    });
                } else {
                    data.sort(function(left, right) {
                        return left[prop] == right[prop] ? 0 : left[prop] > right[prop] ? -1 : 1;
                    });
                }
            });
        }
    };
});