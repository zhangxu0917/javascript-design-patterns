//首先给出不用状态模式的电灯程序实现：
var Light = function() {
    this.state = "off"; // 给点灯设置初始状态off
    this.button = null; // 点灯开关按钮
};

Light.prototype.init = function() {
    var button = document.createElement("button"),
        self = this;
    button.innerHTML = "开关";
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
        self.buttonWasPressed();
    }
}
Light.prototype.buttonWasPressed = function() {
    if (this.state === "off") {
        console.log("开灯");
        this.state = "on";
    } else if (this.state === "on") {
        console.log("关灯");
        this.state = "off";
    }
};
var light = new Light();
light.init();
