define(['util/queued-timer', 'util/queue'], function(QueuedTimer, Queue) {
    describe('util/queued-timer-test.js', function() {
        it('should be ok', function() {
            expect(QueuedTimer).to.be.ok();
        });
        var timer;
        describe('init()', function() {
            it('should return a new instance of QueuedTimer', function() {
                expect(QueuedTimer.init).to.be.a('function');

                timer = QueuedTimer.init(25);
                expect(QueuedTimer.isPrototypeOf(timer)).to.be(true);
                expect(Queue.isPrototypeOf(timer)).to.be(true);
            });
        });
        describe('start() and isRunning()', function() {
            it('should be a function', function() {
                expect(timer.start).to.be.a('function');
            });
            it('should start the timer and execute queued fcn', function(done) {
                timer.add(function() {
                    expect(timer.size()).to.be(0);
                    done();
                });
                timer.start();
                expect(timer.isRunning()).to.be(true);
            });
            it('should reset timer if called multiple times', function(done) {
                timer.add(function() {
                    var endTime = new Date().getTime();
                    expect(endTime - startTime >= 35).to.be(true);
                    expect(timer.size()).to.be(0);
                    done();
                });

                var startTime = new Date().getTime();
                timer.start();
                setTimeout(function() {
                    timer.start();
                }, 10);
            });
        });
        describe('stop()', function() {
            it('should be a function', function() {
                expect(timer.stop).to.be.a('function');
            });
            it('should stop a timer after it was started', function() {
                timer.start();
                expect(timer.isRunning()).to.be(true);
                timer.stop();
                expect(timer.isRunning()).to.be(false);
            });
        });
    });
});