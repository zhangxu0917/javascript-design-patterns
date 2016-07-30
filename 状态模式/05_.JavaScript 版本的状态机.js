var Light = function() {
    this.currState = FSM.off; //设置当前状态
    this.button = null;
};

Light.prototype.init = function() {
    var button = document.createElement("button"),
        self = this;
    button.innerHTML = "已关灯";
    this.button = document.body.appendChild(button);
    this.button.onclick = function() {
        self.currState.buttonWasPressed.call(self); // 把请求委托给状态机
    };
};
var FSM = {
    off: {
        buttonWasPressed: function() {
            console.log("关灯");
            this.button.innerHTML = "下一次我是开灯";
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function() {
            console.log("开灯");
            this.button.innerHTML = "下一次我是关灯";
            this.currState = FSM.off;
        }
    }
};
var light = new Light();
light.init();
