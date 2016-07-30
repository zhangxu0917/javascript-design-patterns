// 500 元订单
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log("500 元定金预购，得到100优惠卷");
    } else {
        order200(orderType, pay, stock); // 将请求传递给200 元订单
    }
};

// 200 元订单
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log("200元定金预购，得到50优惠卷");
    } else {
        orderNormal(orderType, pay, stock); // 将请求传递给普通订单
    }
};
// 普通购买订单
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log("普通购买，无优惠卷");
    } else {
        console.log("手机库存不足");
    }
}

// 测试结果：
order500(1, true, 500); // 输出：500 元定金预购, 得到 100 优惠券
order500(1, false, 500); // 输出：普通购买, 无优惠券
order500(2, true, 500); // 输出：200 元定金预购, 得到 500 优惠券
order500(3, false, 500); // 输出：普通购买, 无优惠券
order500(3, false, 0); // 输出：手机库存不足
