define(['jquery', 'knockout', 'templates/page-binder', 'events/event-manager',
    'templates/page'],
    function($, ko, PageBinder, EventManager, Page) {

    describe('templates/page-binder-test.js', function() {
        var pageBinder, events, templateLoaderMock, loadUrl, el1, el2,
        page1, page1stateHandlerArgs, page2, page2stateHandlerArgs, error;

        before(function() {
            el1 = $('<div>').attr('id', 'page1').appendTo('#test')[0];
            el2 = $('<div>').attr('id', 'page2').appendTo('#test')[0];
            error = new Error('123');

            templateLoaderMock = {
                load: function(p_url, p_callback) {
                    loadUrl = p_url;
                    if (this.generateError) {
                        p_callback(error);
                    }
                    else {
                        p_callback(undefined, el1);
                    }
                },
                generateError: false
            };

            page1 = new Page({
                name: 'page1',
                states: {
                    'page1/state1': function() {
                        page1stateHandlerArgs = arguments;
                    }
                }
            });

            page2 = new Page({
                name: 'page2',
                states: {
                    'page2/state1': function() {
                        page2stateHandlerArgs = arguments;
                    }
                }
            });
            page2.bind(el2);

            events = new EventManager({
                name: 'page-binder-test-event-manager'
            });
        });
        afterEach(function() {
            events.clear();
        });
        after(function() {
            pageBinder.events.clear();
            ko.cleanNode(el1);
            ko.cleanNode(el2);
            $('#test').html('');
        });
        describe('constructor', function() {
            it('create instance', function() {
                pageBinder = new PageBinder({
                    name: 'page-biner-test',
                    errorRoute: 'errRoute',
                    templateLoader: templateLoaderMock,
                    templatePath: '/templates-path',
                    templateExtension: '.ext',
                });
            });
        });
        describe('`page-route-found` event', function() {
            it('should attempt to load the page template', function(done) {
                var startCount = 0;
                events.listen({
                    'page-loading-start': function() {
                        startCount++;
                    },
                    'page-loading-end': function(err, page) {
                        expect(loadUrl).to.be('/templates-path/page1.ext');
                        expect(startCount).to.be(1);

                        expect(err).to.be(undefined);
                        expect(page).to.be(page1);
                        expect(page.element).to.be(el1);
                        expect(page1stateHandlerArgs).to.be.ok();
                        expect(page1stateHandlerArgs[0]).to.be(1);
                        expect(page1stateHandlerArgs[1]).to.be(2);
                        expect($(el1).is(':visible')).to.be(true);
                        done();
                    },
                });

                events.dispatch('page-route-found', {
                    page: page1,
                    stateUrl: 'page1/state1',
                    stateArgs: [1, 2]
                });
            });
            it('page1: should attempt to hide the page2', function(done) {
                var startCount = 0;
                events.listen({
                    'page-loading-start': function() {
                        startCount++;
                    },
                    'page-loading-end': function(err, page) {
                        expect(loadUrl).to.be('/templates-path/page1.ext');
                        expect(startCount).to.be(1);

                        expect(err).to.be(undefined);
                        expect(page).to.be(page2);
                        expect(page2stateHandlerArgs).to.be.ok();
                        expect(page2stateHandlerArgs[0]).to.be(3);
                        expect($(el1).is(':visible')).to.be(false);
                        expect($(el2).is(':visible')).to.be(true);
                        done();
                    }
                });

                events.dispatch('page-route-found', {
                    page: page2,
                    stateUrl: 'page2/state1',
                    stateArgs: [3]
                });
            });
            it('should redirect to error page on error', function(done) {
                ko.cleanNode(el1);
                page1.element = undefined;
                page1.bindingsApplied = false;
                page1stateHandlerArgs = undefined;
                templateLoaderMock.generateError = true;

                var pageLoadingEnd, startCount = 0;
                events.listen({
                    'redirect': function(p_where) {
                        expect(p_where).to.be('errRoute');
                        expect(pageLoadingEnd).to.be(true);
                        done();
                    },
                    'page-loading-start': function() {
                        startCount++;
                    },
                    'page-loading-end': function(err, page) {
                        expect(err).to.be.ok();
                        expect(err).to.be(error);

                        expect($(el2).is(':visible')).to.be(false);
                        expect(page).to.be(undefined);
                        expect(page1.bindingsApplied).to.be(false);
                        expect(page1.element).to.be(undefined);
                        expect(page1stateHandlerArgs).to.be(undefined);
                        pageLoadingEnd = true;
                    }
                });

                events.dispatch('page-route-found', {
                    page: page1,
                    stateUrl: 'page1/state1',
                    stateArgs: [4]
                });
            });
        });
    });
});