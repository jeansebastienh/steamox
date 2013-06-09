GameConfig = require('../js/config').loadGameConfig();

var io = require('socket.io').listen(parseInt(GameConfig.port, 10));

io.set('log level', 3);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);


var clients = {};

var size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            ++size;
        }
    }
    return size;
};


io.sockets.on('connection', function(socket) {

    socket.on('createParty', function(data) {
        socket.join(data.room);

        // Room is empty, let's create a new one
        if (size(clients[data.room]) === 0) {
            clients[data.room] = [];
        }

        clients[data.room].push({'username': data.username, 'room': data.room, 'score': 0});

        
        clients[socket.id] = {'username': data.username, 'room': data.room, 'score': 0};
        var response = {
            'type':    'updateParty',
            'message': data.username + ' has joined #' + data.room,
            'count':   io.sockets.clients(data.room).length,
            'users':   clients[data.room],
            'debug':   ''
        };
        io.sockets.in(data.room).emit('serverResponse', response);

    });

    socket.on('joinParty', function(data) {
        socket.join(data.room);
        clients[data.room].push({'username': data.username, 'room': data.room, 'score': 0});
        var response = {
            'type':    'udpateParty',
            'message': data.username + ' has joined #' + data.room,
            'count':   io.sockets.clients(data.room).length,
            'users':   clients[data.room],
            'debug':   ''
        };
        io.sockets.in(data.room).emit('serverResponse', response);
    });
});
