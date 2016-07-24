//使用闭包封装私有变量——这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信
var user = (function() {
    var __name = "John",
        __age = 29;

    return {
        getUserInfo: function() {
            return __name + "-" + __age;
        }
    }
})();
