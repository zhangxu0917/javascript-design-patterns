Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};
来看一个异步职责链的例子：
var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});
var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {
        self.next();
    }, 1000);
});
var fn3 = new Chain(function() {
    console.log(3);
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
