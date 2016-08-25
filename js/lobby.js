var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server'], function (require, exports, videocenter_1, element_1, server_1) {
    "use strict";
    var Lobby = (function (_super) {
        __extends(Lobby, _super);
        function Lobby() {
            _super.call(this);
            console.log("Lobby::constructor()");
            this.initHandlers();
        }
        Lobby.prototype.show = function () {
            console.log("Lobby::show()");
        };
        Lobby.prototype.initHandlers = function () {
            element_1.Element.lobby_form_username.submit(this.submit_user_name);
        };
        Lobby.prototype.submit_user_name = function (event) {
            event.preventDefault();
            console.log('lobby submit username: ', element_1.Element.lobbyUsernameValue);
            server_1.Server.updateUsername(element_1.Element.lobbyUsernameValue, function (re) {
                console.log("server.updateUsername => username => re: ", re);
                element_1.Element.lobbyDisplayUsername(re);
                element_1.Element.lobbyUsernameEmpty();
            });
        };
        return Lobby;
    }(videocenter_1.VideoCenter));
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map