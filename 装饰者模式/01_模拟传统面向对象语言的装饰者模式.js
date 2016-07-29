//首先是原始的飞机类：
var Plane = function() {}
Plane.prototype.fire = function() {
        console.log('发射普通子弹');
    }
    //接下来增加两个装饰类， 分别是导弹和原子弹：
var MissileDecorator = function(plane) {
    this.plane = plane;
}
MissileDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射导弹');
}
var AtomDecorator = function(plane) {
    this.plane = plane;
}
AtomDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射原子弹');
}

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire(); // 分别输出： 发射普通子弹、发射导弹、发射原子弹
