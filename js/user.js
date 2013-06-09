function User(name) {
    this.name = name;
}
User.prototype.setConnection = function(io)
{
    this.socket = io;
};

User.prototype.joinParty = function(room)
{
    console.log('User "'+this.name+'" is trying to join "'+ room +'"');
    this.socket.emit('joinParty', {username: this.name, room: room});
};
User.prototype.createParty = function(room)
{
    console.log('User "'+this.name+'" is trying to create a party "'+ room +'"');
    this.socket.emit('createParty', {username: this.name, room: room});
};
User.prototype.waitForResponse = function(room)
{
    this.socket.on('serverResponse', function(response) {
        console.log('Server respond ' + response.message);
        console.dir(response);
    });
};
