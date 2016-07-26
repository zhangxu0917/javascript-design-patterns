var performanceS = function() {};
performanceS.prototype.calculate = function(salary) {
    return salary * 4;
};
var performanceA = function() {};
performanceA.prototype.calculate = function(salary) {
    return salary * 3;
};
var performanceB = function() {};
performanceB.prototype.calculate = function(salary) {
    return salary * 2;
};
//接下来定义奖金类 Bonus：
var Bonus = function() {
    this.salary = null; // 原始工资
    this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function(salary) {
    this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function() { // 取得奖金数额
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};

var bonus = new Bonus;
var performance = new performanceS;
bonus.setSalary(10000);
bonus.setStrategy(performance);
console.log(bonus.getBonus());
