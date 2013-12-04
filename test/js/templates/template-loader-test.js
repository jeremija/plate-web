define(['templates/template-loader', 'jquery'],
    function(TemplateLoader, $) {


    describe('templates/template-loader-test.js', function() {
        var templateLoader;
        before(function() {
            $('<div>').attr('id', 'pages').appendTo('#test');
        });

        after(function() {
            $('#test').html('');
            templateLoader.events.clear();
        });

        describe('constructor', function() {
            it('should create a new instance', function() {
                templateLoader = new TemplateLoader({
                    name: 'template-loader',
                    selector: 'pages',
                });
            });
        });
        describe('load()', function() {
            it('should load the html', function(done) {
                templateLoader.load('../src/pages/login.html',
                    function(err, el) {

                    expect(err).to.not.be.ok();
                    expect(el instanceof HTMLElement).to.be(true);
                    expect($('#pages').children()[0]).to.be(el);
                    done();
                });
            });
        });
    });
});