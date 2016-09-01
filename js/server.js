var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './lobby', './room'], function (require, exports, videocenter_1, lobby_1, room_1) {
    "use strict";
    var Server = (function (_super) {
        __extends(Server, _super);
        function Server() {
            _super.call(this);
            Server.socket = _super.prototype.getSocket.call(this);
        }
        Server.prototype.listen = function () {
            Server.socket.on('chat-message', function (data) {
                if (data.room == "Lobby") {
                    console.log("Go to Lobby chat.");
                    lobby_1.Lobby.showMessage(data);
                }
                else {
                    console.log("Go to Room chat.");
                    room_1.Room.showMessage(data);
                }
            });
            Server.socket.on('create-room', function (room) {
                lobby_1.Lobby.update_room_list(room);
            });
            Server.socket.on('remove-room', function (room) {
                lobby_1.Lobby.remove_room_list(room);
            });
            Server.socket.on('log-out', function (socket) {
                console.log("socket:" + socket);
            });
            Server.socket.on('disconnect', function (socket) {
                console.log("socket:" + socket);
            });
        };
        Server.emit = function (protocol, data, callback) {
            if (callback === void 0) { callback = false; }
            if (callback) {
                Server.socket.emit(protocol, data, callback);
            }
            else {
                Server.socket.emit(protocol, data);
            }
        };
        Server.prototype.ping = function (callback) {
            Server.emit('ping', function (re) {
                callback(re);
            });
        };
        Server.joinRoom = function (roomname, callback) {
            Server.emit("join-room", roomname, callback);
        };
        Server.updateUsername = function (username, callback) {
            Server.emit('update-username', username, callback);
        };
        Server.createRoom = function (roomname, callback) {
            Server.emit('create-room', roomname, callback);
        };
        Server.chatMessage = function (message, callback) {
            Server.emit('chat-message', message, callback);
        };
        Server.leaveRoom = function (callback) {
            Server.emit('leave-room', callback);
        };
        Server.logout = function (callback) {
            Server.emit('log-out', callback);
        };
        Server.userList = function (roomname, callback) {
            Server.emit('user-list', roomname, callback);
        };
        Server.roomList = function (callback) {
            Server.emit('room-list', callback);
        };
        Server.socket = false;
        return Server;
    }(videocenter_1.VideoCenter));
    exports.Server = Server;
});
//# sourceMappingURL=server.js.map