define(['data/model', 'singletons', 'knockout'],
    function(Model, singletons, ko) {

    describe('data/model-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Model).to.be.ok();
            expect(Model).to.be.a('function');
        });
        var ajax;
        var model, mockedGet, initialData;
        before(function() {
            ajax = singletons.ajax;
            initialData = {
                a: 'initial-data'
            };
            mockedGet = {
                id: 123,
                a: 1,
                b: 2,
                c: {
                    d: 3
                }
            };
            ajax.mockGet('/model/load', {
                id :123
            }, mockedGet);
            //add mocks
        });
        after(function() {
            //remove mocks
            ajax.clearMocks();
        });
        describe('constructor', function() {
            it('should create a new instance', function() {
                model = new Model({
                    getUrl: '/model-wrong-url/load',
                    postUrl: '/model-wrong-url/save',
                    data: initialData,
                    form: {
                        cd: new Model.FormElement({
                            value: ko.observable(),
                            path: 'c.d'
                        })
                    }
                });
                expect(model instanceof Model).to.be(true);
                expect(model.getUrl).to.be('/model-wrong-url/load');
                expect(model.postUrl).to.be('/model-wrong-url/save');
                expect(model.data).to.be.a('function');
                expect(model.data()).to.be(initialData);
            });
        });
        describe('load()', function() {
            it('should be a function', function() {
                expect(model.load).to.be.a('function');
            });
            it('should fail to load data', function(done) {
                model.load({
                    id: 123,
                }, function(p_err, p_data) {
                    expect(p_err instanceof Error).to.be(true);
                    expect(p_data).to.not.be.ok();
                    expect(model.data()).to.be(initialData);
                    done();
                });
            });
            it('should load data', function(done) {
                model.getUrl = '/model/load';
                model.load({
                    id: 123
                }, function(p_err, p_data) {
                    expect(p_err).to.not.be.ok();
                    expect(p_data).to.be.an('object');
                    expect(p_data).to.be(mockedGet);
                    expect(model.data()).to.be(p_data);
                    expect(model.form.cd.value()).to.be(3);
                    done();
                });
            });
        });
        describe('change form data', function() {
            it('should change data variables when form is changed', function() {
                expect(model.data().c.d).to.be(3);
                expect(model.form.cd.value()).to.be(model.data().c.d);

                model.form.cd.value(4);
                expect(model.data().c.d).to.be(4);
            });
        });
        describe('save()', function() {
            it('should be a function', function() {
                expect(model.save).to.be.a('function');
            });
            it('should fail to save data', function(done) {
                var previousData = model.data();
                model.save(function(p_err, p_data) {
                    expect(p_err instanceof Error).to.be(true);
                    expect(p_data).to.not.be.ok();
                    // not changed
                    expect(model.data()).to.be(previousData);
                    done();
                });
            });
            it('should save data and update model', function(done) {
                model.postUrl = '/model/save';

                model.form.cd.value(4);

                ajax.mockPost('/model/save', model.data(), model.data());

                model.save(function(p_err, p_data) {
                    expect(p_err).to.not.be.ok();
                    expect(p_data).to.be(mockedGet);
                    expect(model.data()).to.be(p_data);
                    expect(p_data.c.d).to.be(4);
                    done();
                });
            });
        });
    });
});