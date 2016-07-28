/*** 分离出共同点 ***/
var Beverage = function() {};
Beverage.prototype.boilWater = function() {
    console.log("把水煮沸");
};
Beverage.prototype.brew = function() {}; // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function() {}; // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function() {}; // 空方法，应该由子类重写
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
};

/*** 接下来我们要创建咖啡类和茶类，并让它们
继承饮料类 ***/
var Coffee = function() {};
Coffee.prototype = new Beverage();
/*** 接下来要重写抽象父类中的一些方法， 只有“ 把水煮沸” 这个行为可以直接使用父类 Beverage
中的 boilWater 方法， 其他方法都需要在 Coffee 子类中重写， 代码如下： ***/
Coffee.prototype.brew = function() {
    console.log("用沸水冲泡咖啡");
};
Coffee.prototype.pourInCup = function() {
    console.log("把冲好的咖啡倒进杯子");
};
Coffee.prototype.addCondiments = function() {
    console.log("加糖和牛奶");
};
var Coffee = new Coffee();
Coffee.init();

var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
    console.log("用沸水冲泡茶叶");
};
Tea.prototype.pourInCup = function() {
    console.log("把冲好的茶水倒进杯子");
};
Tea.prototype.addCondiments = function() {
    console.log("加柠檬");
};
var tea = new Tea();
tea.init();
