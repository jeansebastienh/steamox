(function() {

    const PROTOCOL = Game.config.protocol;
    const HOST     = Game.config.host;
    const PORT     = Game.config.port;

    var init = function () {
        screenManager().init();
        var btnCreate = document.getElementById('create-party');
        btnCreate.addEventListener('click', function() {
            alert('create');
        });
        var btnJoin = document.getElementById('join');
        btnJoin.addEventListener('click', function() {
            displayJoinGameScreen();
        });
    };

    /**
     * Screen Manager
     */
    var screenManager = function() {
        //< @var HTMLNode
        var currentScreen;

        //< @var HTMLNodeList
        var screens = document.querySelectorAll('.screen');

        /**
         * Hides every screen and only shows the first one
         */
        var init = function() {
            hideAll();
            currentScreen = screens[0];
            show(currentScreen.id);
        };

        /**
         * Hides all screens
         */
        var hideAll = function() {
            for (var i = 0, len = screens.length; i < len; ++i) {
                screens[i].style.display = 'none';
            }
        };

        /**
         * Displays a screen by its id
         */
        var show = function(screenId) {
            var screen = document.querySelector('#' + screenId + '.screen');
            if (screen !== undefined) {
                hideAll();
                screen.style.display = 'block';
            }
        };

        /**
         * @return HTMLNode currentScreen
         */
        var getCurrentScreen = function() {
            return currentScreen;
        }

        return {
            'init':             init,
            'show':             show,
            'getCurrentScreen': getCurrentScreen
        };
    };

    var displayJoinGameScreen = function() {
        screenManager().show('joinscreen');
        var form = document.getElementById('partycodeform');
        var partyCode = document.getElementById('partycode');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            joinParty(partyCode.value);
        });
    }

    var joinParty = function(channel) {
        alert('Trying to join ' + channel);
    }

    var socketIoAutoloader = function() {
        var script = document.createElement('script');
        script.src = PROTOCOL + '://' + HOST + ':' + PORT + '/socket.io/socket.io.js';
        document.body.appendChild(script);
        script.addEventListener('load', init, false);
    }();
})();
