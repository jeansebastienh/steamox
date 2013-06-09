GameConfig = require('../js/config').loadGameConfig();

var io = require('socket.io').listen(parseInt(GameConfig.port, 10));

io.set('log level', 2);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.sockets.on('connection', function(socket) {

    socket.on('createParty', function(data) {
        socket.join(data.room);
        clients = io.sockets.clients(data.room)
        io.sockets.in(data.room).emit('serverResponse', {'count': clients.length});
    });

    socket.on('joinParty', function(data) {
        socket.join(data.room);
        clients = io.sockets.clients(data.room)
        io.sockets.in(data.room).emit('serverResponse', {'count': clients.length});
    });
});
