define(['modules/breadcrumbs-mod', 'knockout', 'templates/bindable'],
    function(breadcrumbsMod, ko, Bindable) {

    describe('modules/breadcrumbs-mod-test.js', function() {
        var breadcrumbsArray;
        after(function() {
            breadcrumbsMod.events.clear();
        });
        describe('Bindable', function() {
            it('should be an instance of Bindable', function() {
                expect(breadcrumbsMod instanceof Bindable).to.be(true);
                breadcrumbsArray = breadcrumbsMod.viewModel.breadcrumbs();
            });
        });
        var bc1 = {}, bc2 = {};
        describe('`breadcrumb-add` event', function() {
            it('should add breadcrumb', function() {
                events.dispatch('breadcrumb-add', bc1);
                expect(breadcrumbsArray.length).to.be(1);
                expect(breadcrumbsArray[0]).to.be(bc1);

                events.dispatch('breadcrumb-add', bc2);
                expect(breadcrumbsArray.length).to.be(2);
                expect(breadcrumbsArray[1]).to.be(bc2);
            });
        });
        describe('`breadcrumb-remove` event', function() {
            it('should remove breadcrumb', function() {
                events.dispatch('breadcrumb-remove', bc1);
                expect(breadcrumbsArray.length).to.be(1);
                expect(breadcrumbsArray[0]).to.be(bc2);

                events.dispatch('breadcrumb-remove', bc2);
                expect(breadcrumbsArray.length).to.be(0);
            });
        });
    });

});