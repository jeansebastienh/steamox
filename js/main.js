var user;


//(function() {


    const PROTOCOL = Game.config.protocol;
    const HOST     = Game.config.host;
    const PORT     = Game.config.port;

    var init = function() {
        screenManager().init();

        var username = localStorage.getItem('username') || 'Firefox';
        user = new User(username);
        user.setConnection(io.connect(PROTOCOL + '://' + HOST  + ':' + PORT));

        var btnCreate = document.getElementById('create-party');
        btnCreate.addEventListener('click', function() {
            displayCreateScreen();
        });
        
        var btnJoin = document.getElementById('join');
        btnJoin.addEventListener('click', function() {
            displayJoinGameScreen();
        });

        
        var btnSettings = document.getElementById('settings');
        btnSettings.addEventListener('click', function() {
            displaySettingsScreen();
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
        var form = document.getElementById('join-room-form');
        var partyCode = document.getElementById('join-room-name');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            user.joinParty(partyCode.value);
            displayWaitingScreen();
        });
    };

    var displayCreateScreen = function() {
        screenManager().show('createscreen');
        var btnCreate = document.querySelector('#createscreen button');
        btnCreate.addEventListener('click', function() {
            user.createParty(document.querySelector('#create-room-name').value);
            displayWaitingScreen();
        }, false);
    };

    var displayWaitingScreen = function() {
        screenManager().show('waitingscreen');
        user.waitForResponse();
        var btnStart = document.getElementById('startgame');
        btnStart.addEventListener('click', function() {
           user.startGame('demineur');
        }, false);
    };

    var displaySettingsScreen = function() {
        screenManager().show('settings-screen');

        document.querySelector('#setting-username').value = localStorage.getItem('username');
        
        var formSettings = document.getElementById('settings-form');
        formSettings.addEventListener('submit', function(event) {
            event.preventDefault();
            localStorage.setItem('username', document.querySelector('#setting-username').value);
            screenManager().show('homescreen');
        }, false);
    };


    var socketIoAutoloader = function() {
        var script = document.createElement('script');
        script.src = PROTOCOL + '://' + HOST + ':' + PORT + '/socket.io/socket.io.js';
        document.body.appendChild(script);
        script.addEventListener('load', init, false);
    }();
//})();
