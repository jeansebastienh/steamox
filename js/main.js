(function() {
    
    var init = function init() {
        var btnCreate = document.getElementById('create-party');
        btnCreate.addEventListener('click', function() {
            alert('create');
        });
        var btnJoin = document.getElementById('join');
        btnJoin.addEventListener('click', function() {
        	alert('join');
        });
    };
    
    if(!document.getElementById('create-party')) {
        document.addEventListener('DOMContentLoaded', init);
    }
    else {
        init();
    }
   
})();