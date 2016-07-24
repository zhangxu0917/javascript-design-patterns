//利用 getSingle 函数，可以给指定的元素只绑定一次事件处理函数，避免重复绑定
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};

var bindEvent = getSingle(function() {
    document.getElementById("loginBtn").onclick = function() {
        alert("click");
    };
    console.log(111);
    return true;
});

var render = function() {
    console.log("开始渲染列表");
    bindEvent();
    //第一次执行bindEvent函数的时候，执行getSingle方法中的参数函数，创建局部变量result，并将函数的运行结果"true"赋值给result，后面依次返回true，不执行“fn.apply(this,arguments)”
};

render();
render();
render();
