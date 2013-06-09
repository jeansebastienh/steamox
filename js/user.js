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
User.prototype.waitForResponse = function(dom)
{

    var list = dom.getElementById('room-list-players');
    var listItem = dom.createElement('li');
    listItem.innerHTML = this.name;
    list.appendChild(listItem);

    this.socket.on('serverResponse', function(response) {
        console.log('Server responds : ');
        console.log(response);
        switch(response.type) {
            case 'updateParty':
                list.innerHTML = '';
                for (var i = 0; i<= response.count; i++) {
                    var listItem = dom.createElement('li');
                    listItem.innerHTML = 'User i';
                    list.appendChild(listItem);
                }
        }
    });
};
