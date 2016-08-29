var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './lobby'], function (require, exports, videocenter_1, lobby_1) {
    "use strict";
    var Server = (function (_super) {
        __extends(Server, _super);
        function Server() {
            _super.call(this);
            this.socket = _super.prototype.getSocket.call(this);
        }
        Server.prototype.listen = function () {
            var _this = this;
            this.socket.on('get-message', function (data) {
                _this.getMessage(data);
            });
        };
        Server.prototype.emit = function (protocol, data) {
            this.socket.emit(protocol, data);
        };
        Server.prototype.ping = function (callback) {
            this.emit('ping', function (re) {
                callback(re);
            });
        };
        Server.prototype.getMessage = function (data) {
            if (data.room == "Lobby") {
                lobby_1.Lobby.showMessage(data);
            }
            else {
                console.log("Go to Room chat.");
            }
        };
        Server.joinLobby = function (callback) {
            var _this = new this;
            _this.socket.emit("join-lobby", callback);
        };
        Server.updateUsername = function (username, callback) {
            var _this = new this;
            _this.socket.emit('update-username', username, callback);
        };
        Server.createRoom = function (roomname, callback) {
            var _this = new this;
            _this.socket.emit('create-room', roomname, callback);
        };
        Server.sendMessage = function (message, callback) {
            var _this = new this;
            _this.socket.emit('send-message', message, callback);
        };
        Server.leaveRoom = function (callback) {
            var _this = new this;
            _this.socket.emit('leave-room', callback);
        };
        Server.logout = function (callback) {
            var _this = new this;
            _this.socket.emit('log-out', callback);
        };
        return Server;
    }(videocenter_1.VideoCenter));
    exports.Server = Server;
});
//# sourceMappingURL=server.js.map