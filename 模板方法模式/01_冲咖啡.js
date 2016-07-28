var Coffee = function() {};
Coffee.prototype.boilWater = function() {
    console.log("把水煮沸");
};
Coffee.prototype.brewCoffeeGriends = function() {
    console.log("用沸水冲泡咖啡");
};
Coffee.prototype.pourInCup = function() {
    console.log("把冲好的咖啡倒进杯子");
};
Coffee.prototype.addSugarAndMilk = function() {
    console.log("加糖和牛奶");
};
Coffee.prototype.init = function() {
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
};
var coffee = new Coffee();
coffee.init();
