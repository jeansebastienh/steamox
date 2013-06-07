var Game = Game || {};

Game.config = {
    protocol: 'http',
    host    : 'localhost',
    port    : '4000'
};

var loadGameConfig = function() {
    return Game.config;
}

if (typeof module !== 'undefined') {
    module.exports.loadGameConfig = loadGameConfig;
}
