var clientApi = function() {
    var socket = io.connect('http://localhost');

    var joinRoom = function(room) {
        console.log('Joining room "' + room + '"');
        socket.emit('join', {
            room : room
        });
    }
}