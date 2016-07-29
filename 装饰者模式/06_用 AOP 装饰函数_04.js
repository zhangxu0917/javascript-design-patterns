var before = function(fn, beforefn) {
    return function() {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}
var a = before(
    function() {
        alert(3);
    },
    function() {
        alert(2);
    }
);
a = before(a, function() {
    alert(1);
});
a();  // 输出：1，2，3
