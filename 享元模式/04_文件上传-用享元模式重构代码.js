//明确了 uploadType 作为内部状态之后， 我们再把其他的外部状态从构造函数中抽离出来， Upload 构造函数中只保留 uploadType 参数：
var Upload = function(uploadType) {
        this.uploadType = uploadType;
    }
    //Upload.prototype.init 函数也不再需要， 因为 upload 对象初始化的工作被放在upload - Manager.add 函数里面， 接下来只需要定义 Upload.prototype.del 函数即可：
Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm("确定要删除该文件吗？" + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};
//接下来定义一个工厂来创建 upload 对象， 如果某种内部状态对应的共享对象已经被创建过， 那么直接返回这个对象， 否则创建一个新的对象：
var UploadFactory = (function() {
    var createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();
//现在我们来完善前面提到的 uploadManager 对象，它负责向 UploadFactory 提交创建对象的请求， 并用一个uploadDatabase 对象保存所有 upload 对象的外部状态， 以便在程序运行过程中给upload 共享对象设置外部状态。
var uploadManager = (function() {
    var uploadDatabase = {};
    return {
        add: function(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement("div");
            dom.innerHTML = "<span>文件名称：" + fileName + "，文件大小：" + fileSize + "</span>" + "<button class='delFile'>删除</button>";
            dom.querySelector(".delFile").onclick = function() {
                flyWeightObj.delFile(id);
            };
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return flyWeightObj;
        },
        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

//然后是开始触发上传动作的startUpload函数：
var id = 0;
window.startUpload = function(uploadType, files) {
    for (var i = 0, file; file = files[i++];) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fifileName, file.fileSize);
    }
};

//最后是测试时间，运行下面的代码后可以发现运行结果跟用享元模式重构之前一致：
startUpload("plugin", [{
    fileName: '1.txt',
    fileSize: 1000
}, {
    fileName: '2.html',
    fileSize: 3000
}, {
    fileName: '3.txt',
    fileSize: 5000
}]);

startUpload("flash", [{
    fileName: '4.txt',
    fileSize: 1000
}, {
    fileName: '5.html',
    fileSize: 3000
}, {
    fileName: '6.txt',
    fileSize: 5000
}]);
