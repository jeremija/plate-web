define(['util/traversal'], function(traversal) {
    describe('util/traversal-test.js', function() {
        it('should be ok', function() {
            expect(traversal).to.be.ok();
        });
        describe('copyProperties()', function() {
            it('should be a function', function() {
                expect(traversal.copyProperties).to.be.a('function');
            });
            it('should copy properties from src to dest', function() {
                var src = {
                    a: function() {},
                    b: {
                        c: 3
                    },
                    d: 4
                };
                var dest = {};
                traversal.copyProperties(src, dest);
                expect(dest.a).to.be(src.a);
                expect(dest.b).to.be(src.b);
                expect(dest.c).to.be(src.c);
            });
        });
        var obj;
        before(function() {
            obj = {
                prop1: {
                    prop2: {
                        prop3: {
                            prop4: 1
                        }
                    },
                    prop5: 'prop2'
                },
                prop6: 'prop6'
            };
        });
        describe('getProp()', function() {
            it('should be a function', function() {
                expect(traversal.getProp).to.be.a('function');
            });
            it('should retrieve a property from an object', function() {
                expect(traversal.getProp(obj, 'prop1.prop2.prop3.prop4'))
                    .to.be(1);
            });
            it('should return `undefined` when property not found', function() {
                expect(traversal.getProp(obj, 'prop1.prop3')).to.be(undefined);
                expect(traversal.getProp(obj, 'prop0.prop1')).to.be(undefined);
            });
        });
        describe('setProp()', function() {
            it('should be a function', function() {
                expect(traversal.setProp).to.be.a('function');
            });
            it('should set the property to an object and return previous val',
                function() {

                var prev1 = obj.prop1.prop2;
                var prev2 = traversal.setProp(obj, 'prop1.prop2', 2);
                expect(obj.prop1.prop2).to.be(2);
                expect(obj.prop1.prop5).to.be('prop2');
                expect(prev1).to.be(prev2);
            });
            it('should create subproperties if they don\'t exist', function() {
                var prev = traversal.setProp(obj, 'a.prop', 3);
                expect(obj.a.prop).to.be(3);
                expect(prev).to.be(undefined);

                prev = traversal.setProp(obj, 'prop6.prop7', 4);
                expect(obj.prop6.prop7).to.be(4);
                expect(prev).to.be('prop6');
            });
        });
    });
});