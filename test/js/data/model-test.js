define(['data/model', 'singletons'], function(Model, singletons) {
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
                b: 2
            };
            mockedSave = {
                id: 124,
                a: 3,
                b: 4
            };
            ajax.mockGet('/model/load', {
                id :123
            }, mockedGet);
            ajax.mockPost('/model/save', mockedGet, mockedSave);
            //add mocks
        });
        after(function() {
            //remove mocks
        });
        describe('constructor', function() {
            it('should create a new instance', function() {
                model = new Model({
                    getUrl: '/model-wrong-url/load',
                    postUrl: '/model-wrong-url/save',
                    data: initialData
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
                    done();
                });
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
                model.save(function(p_err, p_data) {
                    expect(p_err).to.not.be.ok();
                    expect(p_data).to.be(mockedSave);
                    expect(model.data()).to.be(p_data);
                    done();
                });
            });
        });
    });
});