//首先将定义 3 个状态类，分别是 offLightState 、WeakLightState 、 strongLightState 。这 3个类都有一个原型方法 buttonWasPressed ，代表在各自状态下，按钮被按下时将发生的行为

//OffLightState
OffLightState = function(light) {
    this.light = light;
};

OffLightState.prototype.buttonWasPressed = function() {
    console.log("弱光"); //offLightState对应的行为
    this.light.setState(this.light.weakLightState); // 切换状态到 weakLightState
};

// WeakLightState
var WeakLightState = function(light) {
    this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function() {
    console.log("强光"); // weakLightState 对应的行为
    this.light.setState(this.light.strongLightState); // 切换状态到 strongLightState
};
// StrongLightState:
var StrongLightState = function(light) {
    this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function() {
    console.log("关灯"); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

//接下来改写 Light 类，现在不再使用一个字符串来记录当前的状态，而是使用更加立体化的状态对象。我们在 Light 类的构造函数里为每个状态类都创建一个状态对象，这样一来我们可以很明显地看到电灯一共有多少种状态。
var Light = function() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
};

//在 button 按钮被按下的事件里，Context 也不再直接进行任何实质性的操作，而是通过self.currState.buttonWasPressed() 将请求委托给当前持有的状态对象去执行，

Light.prototype.init = function() {
    var button = document.createElement("button"),
        self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = "开关";
    this.currentState = this.offLightState; // 设置当前状态
    this.button.onclick = function() {
        self.currentState.buttonWasPressed();
    };
};

//最后还要提供一个 Light.prototype.setState 方法，状态对象可以通过这个方法来切换 light对象的状态。

Light.prototype.setState = function(newState) {
    this.currentState = newState;
};

//现在可以进行一些测试
var light = new Light();
light.init();
