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
User.prototype.waitForResponse = function()
{

    var list = document.getElementById('room-list-players');
    var listItem = document.createElement('li');
    listItem.innerHTML = this.name;
    list.appendChild(listItem);

    this.socket.on('serverResponse', function(response) {
        this.processResponse(response);
    });
};
User.prototype.startGame = function(game)
{
    console.log('Trying to start a party of "' + game + '"');
    this.socket.emit('startGame', {type: game});
    this.socket.on('serverResponse', function(response) {
        this.processResponse(response);
    });
}
User.prototype.processResponse = function(response)
{
        console.log('Server responds : ');
        console.log(response);
        switch(response.type) {
            case 'updateParty':
                list.innerHTML = '';
                for (var i = 0; i< response.count; i++) {
                    var listItem = document.createElement('li');
                    listItem.innerHTML = '[' + i + '] ' + response.users[i].username;
                    list.appendChild(listItem);
                }
                break;
            case 'demineur':
                console.log('Grid :');
                console.log(response.data);
                break;
        }

}
