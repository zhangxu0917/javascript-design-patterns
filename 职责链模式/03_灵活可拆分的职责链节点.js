//首先需要改写一下分别表示 3种购买模式的节点函数，我们约定，如果某个节点不能处理请求，则返回一个特定的字符串  'nextSuccessor' 来表示该请求需要继续往后面传递：
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log("500元定金预购，得到100优惠卷")
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log("200元定金预购，得到50元优惠卷")
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后传递
    }
};
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log("普通购买，无优惠卷");
    } else {
        console.log("手机库存不足");
    }
};
//接下来需要把函数包装进职责链节点，我们定义一个构造函数 Chain ，在 new  Chain 的时候传递的参数即为需要被包装的函数， 同时它还拥有一个实例属性this.successor ，表示在链中的下一个节点。
//此外 Chain 的 prototype 中还有两个函数，它们的作用如下所示：
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);
    if (ref === "nextSuccessor") {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
};

//现在我们把 3个订单函数分别包装成职责链的节点：
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
然后指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
最后把请求传递给第一个节点：
chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足
通过改进， 我们可以自由灵活地增加、 移除和修改链中的节点顺序， 假如某天网站运营人员
又想出了支持 300 元定金购买， 那我们就在该链中增加一个节点即可：
var order300 = function() {
    // 具体实现略
};
chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
chainOrder300.setNextSuccessor(chainOrder200);
