var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter'], function (require, exports, videocenter_1) {
    "use strict";
    var Server = (function (_super) {
        __extends(Server, _super);
        function Server() {
            _super.call(this);
            this.socket = _super.prototype.getSocket.call(this);
        }
        Server.prototype.emit = function (protocol, data) {
            this.socket.emit(protocol, data);
        };
        Server.prototype.ping = function (callback) {
            this.emit('ping', function (re) {
                callback(re);
            });
        };
        Server.updateUsername = function (username, callback) {
            var _this = new this;
            _this.socket.emit('update-username', username, callback);
        };
        return Server;
    }(videocenter_1.VideoCenter));
    exports.Server = Server;
});
//# sourceMappingURL=server.js.map