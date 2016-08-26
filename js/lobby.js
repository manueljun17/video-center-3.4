var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server', './entrance', './user'], function (require, exports, videocenter_1, element_1, server_1, entrance_1, user_1) {
    "use strict";
    var Lobby = (function (_super) {
        __extends(Lobby, _super);
        function Lobby() {
            _super.call(this);
            console.log("Lobby::constructor()");
            this.initHandlers();
        }
        Lobby.show = function () {
            console.log("Lobby::show()");
            element_1.Element.entrance.hide();
            element_1.Element.lobby.show();
            element_1.Element.lobby_form_username.hide();
            element_1.Element.lobby_form_roomname.hide();
            var username = user_1.User.getUsername;
            element_1.Element.lobbyDisplayUsername(username);
        };
        Lobby.prototype.initHandlers = function () {
            element_1.Element.lobby_form_username.submit(this.submit_user_name);
            element_1.Element.lobby_onclick_form_username.click(function () {
                element_1.Element.lobby_form_roomname.hide();
                element_1.Element.lobby_form_username.show();
            });
            element_1.Element.lobby_onclick_form_roomname.click(function () {
                element_1.Element.lobby_form_username.hide();
                element_1.Element.lobby_form_roomname.show();
            });
            element_1.Element.lobby_onclick_logout.click(this.on_logout);
        };
        Lobby.prototype.submit_user_name = function (event) {
            event.preventDefault();
            console.log('lobby submit username: ', element_1.Element.lobbyUsernameValue);
            server_1.Server.updateUsername(element_1.Element.lobbyUsernameValue, function (re) {
                console.log("server.updateUsername => username => re: ", re);
                element_1.Element.lobbyDisplayUsername(re);
                user_1.User.save_username(re);
                element_1.Element.lobbyUsernameEmpty();
                element_1.Element.lobby_form_username.hide();
            });
        };
        Lobby.prototype.on_logout = function (event) {
            event.preventDefault();
            console.log("on_logout()");
            server_1.Server.logout(function () {
                user_1.User.delete_username();
                entrance_1.Entrance.show();
            });
        };
        return Lobby;
    }(videocenter_1.VideoCenter));
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map