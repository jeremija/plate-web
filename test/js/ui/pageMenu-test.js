define(['ui/pageMenu', 'ui/MenuItem', 'templates/Bindable', 
    'events/EventManager', 'knockout'], 
    function(pageMenu, MenuItem, Bindable, EventManager, ko) {

    var events, context = {};
    var menu = [
        new MenuItem('menu.item.1', function() {

        }),
        new MenuItem('menu.item.2', function() {

        })
    ];
    before(function() {
        events = new EventManager('ui/pageMenu-test.js');
    });
    afterEach(function() {
        events.clear();
    });

    describe('ui/pageMenu-test.js', function() {
        it('should be an instance of Bindable', function() {
            expect(pageMenu instanceof Bindable).to.be(true);
        });
        describe('viewModel', function() {
            var viewModel = pageMenu.viewModel;
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
                events.dispatch('page-menu', menu, context);
                expect(pageMenu.viewModel.menuItems()).to.be(menu);
                expect(pageMenu.viewModel.menuContext()).to.be(context);
            });
            it('should clear the menu and the context if falsy', function() {
                events.dispatch('page-menu', false);
                expect(pageMenu.viewModel.menuItems()).to.be(undefined);
                expect(pageMenu.viewModel.menuContext()).to.be(undefined);
            });
        });
    });
});