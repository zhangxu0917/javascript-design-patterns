var Singleton = function(name) {
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function() {
    return this.name;
};
Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance("aaaa");
var b = Singleton.getInstance("bbbb");
console.log(a === b);
console.log(a.getName(), b.getName());
