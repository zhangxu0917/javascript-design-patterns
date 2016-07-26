var event = {
    clientList: [],
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); // arguments 是 trigger时带上的参数
        }
    }
};
// 再定义一个installEevent 函数，这个函数一个给所有的对象都动态安装发布- 订阅功能
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
};

//再来测试一番，我们给售楼处对象 salesOffices动态增加分布- 订阅功能：
var salesOffices = {};
installEvent(salesOffices);
salesOffices.listen("squareMeter88", function(price) { // 小明订阅消息
    console.log("价格= " + price);
});
salesOffices.listen("squareMeter100", function(price) { // 小红订阅消息
    console.log("价格= " + price);
});
salesOffices.trigger("squareMeter88", 2000000);
salesOffices.trigger("squareMeter100", 3000000); // 输出：3000000
