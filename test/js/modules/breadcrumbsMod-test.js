define(['modules/breadcrumbsMod', 'knockout', 'templates/Bindable'],
    function(breadcrumbsMod, ko, Bindable) {

    describe('modules/breadcrumbsMod-test.js', function() {
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
        var routes = [{
            literal: 'route/1',
            abstract: 'route/{id}'
        }, {
            literal: 'route2',
            abstract: 'route2'
        }, {
            literal: 'route/3/4',
            abstract: 'route/{page1}/{page2}'
        }];
        describe('`set-breadcrumbs` event', function() {
            it('should add breadcrumb', function() {
                events.dispatch('set-breadcrumbs', routes);
                expect(breadcrumbsArray.length).to.be(3);

                expect(breadcrumbsArray[0].href).to.be('#/route/1');
                expect(breadcrumbsArray[0].title).to.be('bc.route/{id}');

                expect(breadcrumbsArray[1].href).to.be('#/route/1#route2');
                expect(breadcrumbsArray[1].title).to.be('bc.route2');

                expect(breadcrumbsArray[2].href)
                    .to.be('#/route/1#route2#route/3/4');
                expect(breadcrumbsArray[2].title)
                    .to.be('bc.route/{page1}/{page2}');
            });
        });
    });

});