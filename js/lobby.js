var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server', './room', './entrance', './user'], function (require, exports, videocenter_1, element_1, server_1, room_1, entrance_1, user_1) {
    "use strict";
    var Lobby = (function (_super) {
        __extends(Lobby, _super);
        function Lobby() {
            _super.call(this);
            console.log("Lobby::constructor()");
            this.initHandlers();
        }
        Lobby.show = function () {
            server_1.Server.joinLobby(function () {
                console.log("Lobby::show()");
                element_1.Element.entrance.hide();
                element_1.Element.lobby.show();
                element_1.Element.lobby_form_username.hide();
                element_1.Element.lobby_form_roomname.hide();
                var username = user_1.User.getUsername;
                element_1.Element.lobbyDisplayUsername(username);
            });
        };
        Lobby.showMessage = function (data) {
            element_1.Element.lobby_display.append(element_1.Element.markup_chat_message(data));
            element_1.Element.lobby_display.animate({ scrollTop: element_1.Element.lobby_display.prop('scrollHeight') });
        };
        Lobby.prototype.initHandlers = function () {
            element_1.Element.lobby_form_username.submit(this.submit_user_name);
            element_1.Element.lobby_form_roomname.submit(this.submit_room_name);
            element_1.Element.lobby_send_message.submit(this.send_message);
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
            console.log('lobby submit username: ', element_1.Element.lobbyUsername.val());
            server_1.Server.updateUsername(element_1.Element.lobbyUsername.val(), function (re) {
                console.log("server.updateUsername => username => re: ", re);
                element_1.Element.lobbyDisplayUsername(re);
                user_1.User.save_username(re);
                element_1.Element.lobbyUsername.val("");
                element_1.Element.lobby_form_username.hide();
            });
        };
        Lobby.prototype.submit_room_name = function (event) {
            event.preventDefault();
            console.log('lobby submit roomname: ', element_1.Element.lobbyRoomname.val());
            server_1.Server.createRoom(element_1.Element.lobbyRoomname.val(), function (re) {
                console.log("server.createRoom => roomname => re: ", re);
                user_1.User.save_roomname(re);
                element_1.Element.lobbyRoomname.val("");
                element_1.Element.lobby_form_roomname.hide();
                room_1.Room.show();
            });
        };
        Lobby.prototype.send_message = function (event) {
            event.preventDefault();
            server_1.Server.sendMessage(element_1.Element.lobby_message.val(), function (re) {
                console.log("server.sendMessage => message => re: ", re);
                element_1.Element.lobby_message.val("");
            });
        };
        Lobby.prototype.on_logout = function (event) {
            event.preventDefault();
            console.log("on_logout()");
            server_1.Server.logout(function () {
                user_1.User.delete_username();
                element_1.Element.lobby_display.empty();
                entrance_1.Entrance.show();
            });
        };
        return Lobby;
    }(videocenter_1.VideoCenter));
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map