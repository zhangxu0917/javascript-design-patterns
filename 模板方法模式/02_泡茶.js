var Tea = function() {};
Tea.prototype.boilWater = function() {
    console.log("把水煮沸");
};
Tea.prototype.steepTeaBag = function() {
    console.log("用沸水浸泡茶叶");
};
Tea.prototype.pourInCup = function() {
    console.log("把茶水倒进杯子");
};
Tea.prototype.addLemon = function() {
    console.log("加柠檬");
};
Tea.prototype.init = function() {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
};
var tea = new Tea();
tea.init();
