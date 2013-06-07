(function() {

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

})();