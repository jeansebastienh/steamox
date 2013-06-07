(function() {

    const PROTOCOL = Game.config.protocol;
    const HOST     = Game.config.host;
    const PORT     = Game.config.port;

    var init = function init() {
        var btnCreate = document.getElementById('create-party');
        btnCreate.addEventListener('click', function() {
            alert('create');
        });
        var btnJoin = document.getElementById('join');
        btnJoin.addEventListener('click', function() {
            hideHomeScreen();
            displayJoinGameScreen();
        });
    };

    var displayJoinGameScreen = function() {
        var screen = document.getElementById('joinscreen');
        screen.style.display = 'block';

        var form = document.getElementById('partycodeform');
        var partyCode = document.getElementById('partycode');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            joinParty(partyCode.value);
        });
    }
    var hideHomeScreen = function() {
        var screen = document.getElementById('homescreen');
        screen.style.display = 'none';
    }

    var joinParty = function(channel) {

        alert('Trying to join ' + channel);
    }

    if (!document.getElementById('create-party')) {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    var socketIoAutoloader = function() {
        var script = document.createElement('script');
        script.src = PROTOCOL + '://' + HOST + ':' + PORT + '/socket.io/socket.io.js';
        document.body.appendChild(script);
        //script.addEventListener('load', init, false);
    }();
})();
