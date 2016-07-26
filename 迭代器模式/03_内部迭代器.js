var compare = function(ary1, ary2) {
    if (ary1.length != ary2.length) {
        throw new Error("ary1 和 ary2 不相等");
    };
    each(ary1, function(i, n) {
        if (n !== ary2[i]) {
            throw new Error("ary1 和 ary2 不相等");
        }
    });
    alert("ary1 和 ary2 相等");
};

compare([1, 2, 3], [1, 2, 4]); // throw new Error( 'ary1 和 ary2 不相等' );
