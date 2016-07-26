var each = function(ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i]);
        // 把下标和值当做参数传递给callback函数
    }
};

each([1, 2, 3], function(i, n) {
    console.log(i, n);
})
