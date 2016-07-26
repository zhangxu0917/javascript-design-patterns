var Event = {
    clientList: {},
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    remove: function(key, fn) {
        var fns = this.clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }

            }
        }
    }
};

var installEvent = function(obj) {
    for (var i in Event) {
        obj[i] = Event[i];
    }
}

var login = {};
installEvent(login);
console.log(login);

$.ajax("./users.json").success(function(data) {
    login.trigger("loginSucc", data);
});

var header = (function() { // header 模块
    login.listen("loginSucc", function(data) {
        header.setAvatar(data.username);
    });
    return {
        setAvatar: function(data) {
            console.log("设置header模块的头像" + data);
        }
    }
})();

var nav = (function() { // nav 模块
    login.listen("loginSucc", function(data) {
        nav.setAvatar(data.username);
    });
    return {
        setAvatar: function(data) {
            console.log("设置nav模块的头像" + data);
        }
    }
})();
