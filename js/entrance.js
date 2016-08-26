var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server', './user', './lobby'], function (require, exports, videocenter_1, element_1, server_1, user_1, lobby_1) {
    "use strict";
    var Entrance = (function (_super) {
        __extends(Entrance, _super);
        function Entrance() {
            _super.call(this);
            console.log("Entrance::constructor()");
            this.initHandlers();
        }
        Entrance.prototype.initHandlers = function () {
            element_1.Element.entrance.submit(this.submit);
        };
        Entrance.prototype.show = function () {
            console.log("Entrance::show()");
        };
        Entrance.prototype.submit = function (event) {
            event.preventDefault();
            var username = element_1.Element.entranceUsernameValue;
            if (username == "") {
                alert('Username is empty.');
            }
            else {
                server_1.Server.updateUsername(username, function (re) {
                    console.log("server.updateUsername => callback => re: ", re);
                    user_1.User.save_username(username);
                    element_1.Element.entranceUsernameEmpty();
                    element_1.Element.entrance.hide();
                    lobby_1.Lobby.show();
                });
            }
        };
        return Entrance;
    }(videocenter_1.VideoCenter));
    exports.Entrance = Entrance;
});
//# sourceMappingURL=entrance.js.map