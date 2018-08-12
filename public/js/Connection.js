var Connection = (function() {

    function Connection(username, chatWindowId, url) {
        this.username = username;
        this.chatwindow = document.getElementById(chatWindowId);

        this.open = false;

        this.socket = new WebSocket("wss://" + url);
        this.setupConnectionEvents();
    }

    Connection.prototype = {
        updateUsername: function() {
            this.socket.send(JSON.stringify({
                action: 'setname',
                username: this.username
            }));
        },

        addChatMessage: function(name, msg) {
            this.chatwindow.innerHTML += '<p>' + name + ': ' + msg + '</p>';
        },

        addSystemMessage: function(msg) {
            
        },

        setupConnectionEvents: function() {
            var self = this;

            self.socket.onopen = function(evt) { self.connectionOpen(evt); };
            self.socket.onmessage = function(evt) { self.connectionMessage(evt); };
            self.socket.onclose = function(evt) { self.connectionClose(evt); };
        },

        connectionOpen: function(evt) {
            this.open = true;
            this.addSystemMessage("Connected");
            this.updateUsername();
			this.sendMsg("Connected","haw");
        },

        connectionMessage: function(evt) {
            if (!this.open) return;
            var data = JSON.parse(evt.data);
			
            if (data.action == 'test_result') {
				toastr['info']('Your test result is now available', "Test result");
				showNotification("Details edited", 'You account details were edited', "/", "/images/not.jpg");
				
                
            } else if (data.action == 'Connected') {
				
               
            }else if (data.action == 'Connected') {
				
               
            }
			
        },

        connectionClose: function(evt) {
            this.open = false;
            this.addSystemMessage("Disconnected");
        },

        sendMsg: function(action,data,to) {
            if (this.open) {
                this.socket.send(JSON.stringify({
                    action: action,
					data: data,
					to:to
                }));
				
            } else {
                this.addSystemMessage("You are not connected to the server.");
            }
        }
    };

    return Connection;

})();
