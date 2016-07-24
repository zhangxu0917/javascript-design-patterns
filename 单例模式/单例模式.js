/*单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

实现单例模式

要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。*/

var Singleton = function(name) {
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function() {
    return this.name;
};
Singleton.getInstance = function(name) {
    if(!this.instance){
        this.instance = new Singleton(name)
    }
    return this.instance;
};
var a = Singleton.getInstance("aaaa");
var b = Singleton.getInstance("bbbb");
alert(a === b) // true;
console.log(a.getName(),b.getName());

//或者

var Singleton = function(name) {
    this.name = name;
};
Singleton.prototype.getName = function() {
    return this.name;
};
Singleton.prototype.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();

/*我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单，但有一个问题，就是增加了这个类的“不透明性”， Singleton 类的使用者必须知道这是一个单例类，跟以往通过 new XXX 的方式来获取对象不同，这里偏要使用 Singleton.getInstance 来获取对象。

透明的单例模式

我们现在的目标是实现一个“透明”的单例类，用户从这个类中创建对象的时候，可以像使用其他任何普通类一样。*/

var CreateDiv = (function() {
    var instance;
    var CreateDiv = function(html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return instance = this;
    }
    CreateDiv.prototype.init = function() {
        var div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return CreateDiv;
})();
var a = new CreateDiv("aaaa");
var b = new CreateDiv("bbbb");
alert(a === b);

/*在这段代码中， CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始化 init 方法，第二是保证只有一个对象。虽然我们目前还没有接触过“单一职责原则”的概念，但可以明确的是，这是一种不好的做法，至少这个构造函数看起来很奇怪。
假设我们某天需要利用这个类，在页面中创建千千万万的 div ，即要让这个类从单例类变成一个普通的可产生多个实例的类，那我们必须得改写 CreateDiv 构造函数，把控制创建唯一对象的那一段去掉，这种修改会给我们带来不必要的烦恼。


用代理实现单例模式

现在我们通过引入代理类的方式，来解决上面提到的问题。*/

var CreateDiv = function(html) {
    this.html = html;
    this.init();
};
Create.prototype.init = function() {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
};
//接下来引入代理类proxySingletonCreateDiv;
var proxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    }
})();


/*JavaScript 中的单例模式

单例模式的核心是确保只有一个实例，并提供全局访问。
全局变量不是单例模式，但在 JavaScript开发中，我们经常会把全局变量当成单例来使用。
例如：

var a = {};
当用这种方式创建对象 a 时，对象 a 确实是独一无二的。如果 a 变量被声明在全局作用域下，则我们可以在代码中的任何位置使用这个变量，全局变量提供给全局访问是理所当然的。这样就满足了单例模式的两个条件。
但是全局变量存在很多问题，它很容易造成命名空间污染。但是全局变量存在很多问题，它很容易造成命名空间污染。


使用命名空间
适当地使用命名空间，并不会杜绝全局变量，但可以减少全局变量的数量。最简单的方法依然是用对象字面量的方式：*/
var namespace1 = {
    a: function() {
        alert(1);
    },
    b: function() {
        alert(2);
    }
};
// 另外我们还可以动态地创建命名空间
var MyApp = {};
MyApp.namespace = function(name) {
    var parts = name.split(".");
    var current = MyApp;
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};
MyApp.namespace("event");
MyApp.namespace("dom.style");
console.log(MyApp);
// 上述代码等价于：
var MyApp = {
    event: {},
    dom: {
        style: {}
    }
};


/*使用闭包封装私有变量
这种方法把一些变量封装在闭包的内部，只暴露一些接口跟外界通信：*/
var user = (function() {
    var __name = "sven",
        __age = 29;
    return {
        getUserInfo: function() {
            reutrn __name + "-" + __age;
        }
    }
})();


/*惰性单例

惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，这种技术在实际开发中非常有用，有用的程度可能超出了我们的想象，实际上在本章开头就使用过这种技术，instance 实例对象总是在我们调用 Singleton.getInstance 的时候才被创建，而不是在页面加载好的时候就创建。*/

Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();

//示例：使用单例创建浮动窗口

var createSingleLoginLayer = (function() {
    var div;
    return function() {
        if (!div) {
            div = document.createElement("div");
            div.innerHTML = "我是登录框";
            div.style.display = "none";
            document.body.appendChild("div");
        }
        return div;
    }
})();
document.getElementById("loginBtn").onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = "block";
}


/*通用的惰性单例

上一节我们完成了一个可用的惰性单例，但是我们发现它还有如下一些问题。

这段代码仍然是违反单一职责原则的，创建对象和管理单例的逻辑都放在 createLoginLayer对象内部。
如果我们下次需要创建页面中唯一的 iframe ，或者 script 标签，用来跨域请求数据，就必须得如法炮制，把 createLoginLayer 函数几乎照抄一遍：
现在我们就把如何管理单例的逻辑从原来的代码中抽离出来，这些逻辑被封装在 getSingle函数内部，创建对象的方法 fn 被当成参数动态传入 getSingle 函数：*/
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};


/*接下来将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle ，我们不仅可以传入createLoginLayer ，还能传入 createScript 、 createIframe 、 createXhr 等。之后再让 getSingle 返回
一个新的函数，并且用一个变量 result 来保存 fn 的计算结果。 result 变量因为身在闭包中，它永远不会被销毁。在将来的请求中，如果 result 已经被赋值，那么它将返回这个值。*/

var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};
var createLoginLayer = function() {
    var div = document.createElement("div");
    div.innerHTML = "我是模态窗口";
    div.style.display = "none";
    document.body.appendChild(div);
    return div;
}
var createSingleLoginLayer = getSingle(createSingleLoginLayer);
document.getElementById("loginBtn").onclick = function() {
        var loginLayer = createSingleLoginLayer();
        loginLayer.style.display = "block";
    }
//下面我们在试试创建唯一的iframe用于动态加载第三方页面
var createSingleIframe = getSingle(function() {
    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    return iframe;
})
document.getElementById("loginBtn").onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = "http://baidu.com";
};


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
