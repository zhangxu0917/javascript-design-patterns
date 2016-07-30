var getActiveUploadObj = function() {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (e) {
        return 'nextSuccessor';
    }
};
var getFlashUploadObj = function() {
    if (supportFlash()) {
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
    return 'nextSuccessor';
};
var getFormUpladObj = function() {
    return $('<form><input name="file" type="file"/></form>').appendTo($('body'));
};
var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUpladObj);
console.log(getUploadObj());
