define(['templates/TemplateLoader', 'jquery'],
    function(TemplateLoader, $) {

    describe('templates/TemplateLoader-test.js', function() {
        var templateLoader;
        before(function() {
            $('<div>').attr('id', 'pages').appendTo('#test');
        });

        after(function() {
            $('#test').html('');
        });

        describe('constructor', function() {
            it('should create a new instance', function() {
                templateLoader = new TemplateLoader({
                    name: 'TemplateLoader-test',
                    selector: 'pages',
                });
            });
        });
        describe('load()', function() {
            it('should load the html', function(done) {
                templateLoader.load('pages/test-page.html',
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