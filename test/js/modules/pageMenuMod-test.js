define(['modules/pageMenuMod', 'ui/MenuItem', 'templates/Bindable', 
    'events/EventManager', 'knockout'], 
    function(pageMenuMod, MenuItem, Bindable, EventManager, ko) {

    var events, context = {};
    var menu = [
        new MenuItem('menu.item.1', function() {

        }),
        new MenuItem('menu.item.2', function() {

        })
    ];
    before(function() {
        events = new EventManager('ui/pageMenuMod-test.js');
    });
    afterEach(function() {
        events.clear();
    });

    describe('ui/pageMenuMod-test.js', function() {
        it('should be an instance of Bindable', function() {
            expect(pageMenuMod instanceof Bindable).to.be(true);
        });
        describe('viewModel', function() {
            var viewModel = pageMenuMod.viewModel;
            it('should be an object', function() {
                expect(viewModel).to.be.an('object');
            });
            it('should have the viewModel.menuItems observable', function() {
                expect(ko.isObservable(viewModel.menuItems)).to.be(true);
            });
            it('should have the viewModel.menuContext observable', function() {
                expect(ko.isObservable(viewModel.menuContext)).to.be(true);
            });
        });
        describe('`page-menu` event', function() {
            it('should set the menu and the context', function() {
                var viewModel = pageMenuMod.viewModel;
                events.dispatch('page-menu', menu, context);
                expect(viewModel.menuItems()).to.be(menu);
                expect(viewModel.menuContext()).to.be(context);
            });
            it('should clear the menu and the context if falsy', function() {
                var viewModel = pageMenuMod.viewModel;
                events.dispatch('page-menu', false);
                expect(viewModel.menuItems().length).to.be(0);
                expect(viewModel.menuContext()).to.be(undefined);
            });
        });
        describe('`page-route-found` event', function() {
            it('should clear the menu and the context', function() {
                var viewModel = pageMenuMod.viewModel;
                viewModel.menuItems([1, 2, 3]);
                viewModel.menuContext({});
                events.dispatch('page-route-found');
                expect(viewModel.menuItems().length).to.be(0);
                expect(viewModel.menuContext()).to.be(undefined);
            });
        });
    });
});