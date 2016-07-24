//我们就把如何管理单例的逻辑从原来的代码中抽离出来，这些逻辑被封装在 getSingle函数内部，创建对象的方法 fn 被当成参数动态传入 getSingle 函数：

var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};

var createLoginLayer = function() {
    var div = document.createElement("div");
    div.innerHTML = "我是登录窗口";
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById("loginBtn").onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = "block";
};

//下面我们再试试创建唯一的 iframe 用于动态加载第三方页面：
var createSingleIframe = getSingle(function() {
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    return iframe;
});

document.getElementById("loginBtn").onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = "http://baidu.com";
};
