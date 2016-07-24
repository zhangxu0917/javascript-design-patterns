//适当地使用命名空间，并不会杜绝全局变量，但可以减少全局变量的数量。
var namespace1 = {
    a: function() {
        alert(1);
    },
    b: function() {
        alert(2);
    }
};

//另外我们还可以动态地创建命名空间
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
console.dir(MyApp);
//上述代码等价于
var MyApp = {
    event: {},
    dom: {
        style: {}
    }
};s
