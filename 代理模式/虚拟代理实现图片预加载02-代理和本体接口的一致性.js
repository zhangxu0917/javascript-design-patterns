//如果代理对象和本体对象都为一个函数（函数也是对象），函数必然都能被执行，则可以认为它们也具有一致的“接口”
var myImage = (function() {
    var imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return function(src) {
        imgNode.src = src;
    }
})();
var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
        myImage(this.src);
    }
    return function(src) {
        myImage("./loading.gif");
        img.src = src;
    }
})();
proxyImage("./realImg.jpg");
