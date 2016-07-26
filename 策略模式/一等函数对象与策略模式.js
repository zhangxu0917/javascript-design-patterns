var S = function(salary){
  return salary * 4;
};
var A = function(salary){
  return salary * 3;
}
var B = function(salary){
  return salary * 2;
};
var calculateBonus = function(func,salary){
  return func(salary);
};
calculateBonus(S,10000); // 输出：40000
