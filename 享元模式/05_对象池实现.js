/*** 先定义一个获取小气泡节点的工厂， 作为对象池的数组成为私有属性被包含在工厂闭包里，这个工厂有两个暴露对外的方法， create 表示获取一个 div 节点，recover 表示回收一个 div 节点： ***/
var toolTipFactory = (function() {
    var toolTipPool = []; // toolTip 对象池
    return {
        create: function() {
            if (toolTipPool.length === 0) {
                //如果对象池为空
                var div = document.createElement("div");
                // 创建一个dom
                document.body.appendChild(div);
                return div;
            } else { // 如果对象池部位空
                return toolTipPool.shift();
                则从对象池中取出一个dom
            }
        },
        recover: function(tooltipDom) {
            return toolTipPool.push(tooltipDom);
            // 对象池回收dom
        }
    }
})();

//现在把时钟拨回进行第一次搜索的时刻，目前需要创建 2 个小气泡节点，为了方便回收，用一个数组ary来记录它们：

var ary = [];
for (var i = 0, str; str = ["A", "B"][i++]) {
    var toolTIp = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push(toolTip);
}

//如果你愿意稍稍测试一下， 可以看到页面中出现了innerHTML 分别为 A和 B的两个 div 节点。接下来假设地图需要开始重新绘制， 在此之前要把这两个节点回收进对象池：

for (var i = 0, toolTip; toolTip = ary[i++];) {
    toolTipFactory.recover(toolTip);
};
//再创建6个小气泡
for (var i = 0, str; str = ["A", "B", "C", "D", "E", "F"][i++];) {
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
};

//现在再测试一番， 页面中出现了内容分别为 A、 B、 C、 D、 E、 F 的 6 个节点， 上一次创建好的节点被共享给了下一次操作。 对象池跟享元模式的思想有点相似， 虽然 innerHTML 的值 A、 B、C、 D等也可以看成节点的外部状态， 但在这里我们并没有主动分离内部状态和外部状态的过程。c
