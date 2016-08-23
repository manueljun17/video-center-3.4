define(["require", "exports"], function (require, exports) {
    "use strict";
    var VideoCenterServer = (function () {
        function VideoCenterServer() {
            console.log("VideoCenterServer constructor()");
        }
        VideoCenterServer.prototype.listen = function () {
        };
        VideoCenterServer.prototype.addUser = function (socket, username) {
            var Date;
            this.user.username = username || 'Anonymous';
            this.user.connectedOn = Math.floor(new Date / 1000);
            this.user.socket = socket.id;
            this.user.roomname = "Lobby";
        };
        return VideoCenterServer;
    }());
    exports.VideoCenterServer = VideoCenterServer;
});
//# sourceMappingURL=videocenterserver.js.map