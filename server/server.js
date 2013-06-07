var io = require('socket.io').listen(4000);

io.set('log level', 2);
io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);

io.sockets.on('connection', function(socket) {
	
	socket.on('create', function(data) {
		
		socket.join(data.room);
		
		clients = io.sockets.clients(data.room)
		
		io.sockets.in(data.room).emit('updateUserlist', {'count': clients.length});
	})
});
