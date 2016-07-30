var FSM = {
    walk: {
        attack: function() {
            console.log('攻击');
        },
        defense: function() {
            console.log('防御');
        },
        jump: function() {
            console.log('跳跃');
        }
    },
    attack: {
        walk: function() {
            console.log('攻击的时候不能行走');
        },
        defense: function() {
            console.log('攻击的时候不能防御');
        },
        jump: function() {
            console.log('攻击的时候不能跳跃');
        }
    }
}
