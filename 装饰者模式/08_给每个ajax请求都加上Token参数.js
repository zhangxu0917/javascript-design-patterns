Function.prototype.before = function(beforefn) {
    var __self = this; // 保存原函数的引用
    return function() { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments);
        // 执行新函数，且保证 this 不被劫持，新函数接受的参数
        // 也会被原封不动地传入原函数，新函数在原函数之前执行
        return __self.apply(this, arguments);
        // 执行原函数并返回原函数的执行结果，
        // 并且保证 this 不被劫持
    }
};

var ajax = function(type, url, param) {
    console.log(param); // 发送 ajax 请求的代码略
};

//然后把 Token 参数通过 Function.prototyte.before 装饰到 ajax 函数的参数 param 对象中
var getToken = function() {
    return "Token";
};

ajax = ajax.before(function(type, url, param) {
    param.Token = getToken();
});

ajax("get", "http://xxx.com/userinfo", {
    name: "sven"
});
