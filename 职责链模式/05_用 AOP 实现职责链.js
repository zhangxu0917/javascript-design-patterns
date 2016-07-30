Function.prototype.after = function(fn) {
    var self = this;
    return function() {
        var ret = self.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
};
var order = order500yuan.after(order200yuan).after(orderNormal);
order(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
order(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
order(1, false, 500); // 输出：普通购买，无优惠券
