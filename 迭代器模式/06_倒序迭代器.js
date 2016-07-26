var reverseEach = function(ary, callback) {
    for (var l = ary.length - 1; l >= 0; i--) {
        callback(l, ary[i]);
    }
};

reverseEach([0, 1, 2], function(i, n) {
    console.log(n); // 分别输出：2, 1, 0
});
