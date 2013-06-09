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
