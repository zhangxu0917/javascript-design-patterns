//我们定义一个数组 players 来保存所有的玩家，在创建玩家之后，循环 players 来给每个玩家设置队友和敌人:
var players = [];
//再改写构造函数 Player ，使每个玩家对象都增加一些属性，分别是队友列表、敌人列表、玩家当前状态、 角色名字以及玩家所在的队伍颜色：
function Player(name, teamColor) {
    this.partners = []; // 队友列表
    this.enemies = []; // 敌人列表
    this.state = 'live'; // 玩家状态
    this.name = name; // 角色名字
    this.teamColor = teamColor; // 队伍颜色
};
//玩家胜利和失败之后的展现依然很简单，只是在每个玩家的屏幕上简单地弹出提示：
Player.prototype.win = function() { // 玩家团队胜利
    console.log('winner: ' + this.name);
};
Player.prototype.lose = function() { // 玩家团队失败
    console.log('loser: ' + this.name);
};
//玩家死亡的方法要变得稍微复杂一点，我们需要在每个玩家死亡的时候，都遍历其他队友的生存状况， 如果队友全部死亡， 则这局游戏失败， 同时敌人队伍的所有玩家都取得胜利， 代码如下：
Player.prototype.die = function() { // 玩家死亡
    var all_dead = true;
    this.state = 'dead'; // 设置玩家状态为死亡
    for (var i = 0, partner; partner = this.partners[i++];) { // 遍历队友列表
        if (partner.state !== 'dead') { // 如果还有一个队友没有死亡，则游戏还未失败
            all_dead = false;
            break;
        }
    }
    if (all_dead === true) { // 如果队友全部死亡
        this.lose(); // 通知自己游戏失败
        for (var i = 0, partner; partner = this.partners[i++];) { // 通知所有队友玩家游戏失败
            partner.lose();
        }
        for (var i = 0, enemy; enemy = this.enemies[i++];) { // 通知所有敌人游戏胜利
            enemy.win();
        }
    }
};
//最后定义一个工厂来创建玩家：
var playerFactory = function(name, teamColor) {
    var newPlayer = new Player(name, teamColor); // 创建新玩家
    for (var i = 0, player; player = players[i++];) { // 通知所有的玩家，有新角色加入
        if (player.teamColor === newPlayer.teamColor) { // 如果是同一队的玩家
            player.partners.push(newPlayer); // 相互添加到队友列表
            newPlayer.partners.push(player);
        } else {
            player.enemies.push(newPlayer); // 相互添加到敌人列表
            newPlayer.enemies.push(player);
        }
    }
    players.push(newPlayer);
    return newPlayer;
};
//现在来感受一下, 用这段代码创建 8个玩家：
//红队：
var player1 = playerFactory('皮蛋', 'red'),
    player2 = playerFactory('小乖', 'red'),
    player3 = playerFactory('宝宝', 'red'),
    player4 = playerFactory('小强', 'red');
//蓝队：
var player5 = playerFactory('黑妞', 'blue'),
    player6 = playerFactory('葱头', 'blue'),
    player7 = playerFactory('胖墩', 'blue'),
    player8 = playerFactory('海盗', 'blue');
//让红队玩家全部死亡：
player1.die();
player2.die();
player4.die();
player3.die();
