GameConfig = require('../js/config').loadGameConfig();

var io = require('socket.io').listen(parseInt(GameConfig.port, 10));

io.set('log level', 2);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);


var clients = {};

io.sockets.on('connection', function(socket) {

    socket.on('createParty', function(data) {
        socket.join(data.room);
//        socket.set('username', data.username, function() {
            clients[socket.id] = {'username': data.username, 'room': data.room, 'score': 0};
            io.sockets.in(data.room).emit('serverResponse', {'type': 'createParty', 'message': data.username + ' has joined' + ' #' + data.room, 'count': io.sockets.clients(data.room).length/*, 'count': io.sockets.clients(data.room).length*/});
 //       });
    });

    socket.on('joinParty', function(data) {
        socket.join(data.room);
//        socket.set('username', data.username, function() {
            clients[socket.id] = {'username': data.username, 'room': data.room, 'score': 0};
            io.sockets.in(data.room).emit('serverResponse', {'type': 'joinParty', 'message': data.username + ' has joined' + ' #' + data.room, 'count': io.sockets.clients(data.room).length/*, 'count': io.sockets.clients(data.room).length*/});
//        });
    });
});
