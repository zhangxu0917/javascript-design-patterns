var CreateDiv = (function() {
    var instance;
    var CreateDiv = function(html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    };
    CreateDiv.prototype.init = function() {
        var div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    return CreateDiv;
})();

var a = new CreateDiv("sven1");
var b = new CreateDiv("sven2");
console.log(a === b);

/*在这段代码中， CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始
化 init 方法，第二是保证只有一个对象。虽然我们目前还没有接触过“单一职责原则”的概念，
但可以明确的是，这是一种不好的做法，至少这个构造函数看起来很奇怪。
假设我们某天需要利用这个类，在页面中创建千千万万的 div ，即要让这个类从单例类变成
一个普通的可产生多个实例的类，那我们必须得改写 CreateDiv 构造函数，把控制创建唯一对象
的那一段去掉，这种修改会给我们带来不必要的烦恼。*/
