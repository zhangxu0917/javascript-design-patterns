var objectPoolFactory = function(createObjFn) {
    var objectPool = [];
    return {
        create: function() {
            var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
            return obj;
        },
        recover: function(obj) {
            objectPool.push(obj);
        }
    }
};

//现在利用objectPoolFactory来创建一个装载一些iframe的对象池：
var iframeFactory = objectPoolFactory(function() {
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.onload = function() {
        iframe.onload = null; // 防止iframe重复加载的bug;
        iframeFactory.recover(iframe); // iframe加载完成之后回收节点;
    }
    return iframe;
});

var iframe1 = iframeFactory.create();
iframe1.src = "http://baidu.com";
var iframe2 = iframeFactory.create();
iframe2.src = "http://QQ.com";
setTimeout(function() {
    var iframe3 = iframeFactory.create();
    iframe3.src = "http://163.com";
}, 3000);
