define(['util/Queue'], function(Queue) {
    describe('util/Queue-test.js', function() {
        it('should be ok and a constructor', function() {
            expect(Queue).to.be.ok();
            expect(Queue).to.be.a('function');
        });
        var queue;
        describe('init()', function() {
            it('should create a new instance of Queue', function() {
                queue = new Queue();
                expect(queue instanceof Queue).to.be(true);
            });
        });
        describe('size()', function() {
            it('should return the size of the queue (0)', function() {
                expect(queue.size()).to.be(0);
            });
        });
        var firstJobExecuted = false;
        describe('add()', function() {
            it('should add a job to the queue', function() {
                queue.add(function() {
                        firstJobExecuted = true;
                });
                expect(queue.size()).to.be(1);
            });
        });
        describe('next()', function() {
            it('should execute the first in the queue', function() {
                queue.next();
                expect(firstJobExecuted).to.be(true);
                expect(queue.size()).to.be(0);
            });
        });
        describe('add() with context', function() {
            it('should add and run a job with `this` context', function(done) {
                var thisContext = {
                    testVariable: 'test'
                };
                var job = queue.add(function() {
                    expect(this).to.be(thisContext);
                    done();
                }, thisContext);
                expect(job).to.be.ok();
                expect(job.callback).to.be.a('function');
                queue.next();
            });
        });
        describe('clear()', function() {
            before(function() {
                queue.add(function() {});
                queue.add(function() {});
            });
            it('should clear the queue', function() {
                expect(queue.size()).to.be(2);
                queue.clear();
                expect(queue.size()).to.be(0);
            });
        });
        describe('remove()', function() {
            var job1, job2, job3, job4, job5;
            before(function() {
                job1 = queue.add(function() {});
                job2 = queue.add(function() {});
                job3 = queue.add(function() {});
                job4 = queue.add(function() {});
                job5 = queue.add(function() {});
            });
            after(function() {
                queue.clear();
            });
            it('should remove the last added job if no params', function() {
                var removedJob = queue.remove();
                expect(removedJob).to.be(job5);
                expect(queue.size()).to.be(4);
            });
            it('should remove the supplied job', function() {
                var removedJob = queue.remove(job2);
                expect(removedJob).to.be(job2);
                expect(queue.size()).to.be(3);
            });
            it('should return undefined if job not found', function() {
                var removedJob = queue.remove({});
                expect(removedJob).to.be(undefined);
                expect(queue.size()).to.be(3);
                expect(queue._queue[0]).to.be(job1);
                expect(queue._queue[1]).to.be(job3);
                expect(queue._queue[2]).to.be(job4);
            });
        });
        describe('execute()', function() {
            var completed = [];
            before(function() {
                queue.add(function() {
                    completed.push('first');
                });
                queue.add(function() {
                    completed.push('second');
                });
                queue.add(function() {
                    completed.push('third');
                });
            });
            it('should execute all queued jobs in order', function() {
                expect(queue.size()).to.be(3);

                queue.execute();

                expect(queue.size()).to.be(0);
                expect(completed.length).to.be(3);
                expect(completed[0]).to.be('first');
                expect(completed[1]).to.be('second');
                expect(completed[2]).to.be('third');
            });
        });
    });
});