var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server', './room', './entrance', './user', './default'], function (require, exports, videocenter_1, element_1, server_1, room_1, entrance_1, user_1, default_1) {
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
                element_1.Element.lobbyDisplayUsername(user_1.User.getUsername);
                server_1.Server.userList(default_1.Default.lobbyRoomName, function (users) {
                    console.log(users);
                    Lobby.show_user_list(users);
                });
                server_1.Server.roomList(function (rooms) {
                    console.log(rooms);
                    Lobby.show_room_list(rooms);
                });
            });
        };
        Lobby.showMessage = function (data) {
            element_1.Element.lobby_display.append(element_1.Element.markup_chat_message(data));
            element_1.Element.lobby_display.animate({ scrollTop: element_1.Element.lobby_display.prop('scrollHeight') });
        };
        Lobby.prototype.initHandlers = function () {
            element_1.Element.body.on('click', '.roomlistname', this.on_join_room);
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
            var username = element_1.Element.lobbyUsername.val();
            if (username == "") {
                alert('Username is empty.');
            }
            else {
                console.log('lobby submit username: ', username);
                server_1.Server.updateUsername(username, function (re) {
                    console.log("server.updateUsername => username => re: ", re);
                    element_1.Element.lobbyDisplayUsername(re);
                    user_1.User.save_username(re);
                    element_1.Element.lobbyUsername.val("");
                    element_1.Element.lobby_form_username.hide();
                });
            }
        };
        Lobby.prototype.submit_room_name = function (event) {
            event.preventDefault();
            var roomname = element_1.Element.lobbyRoomname.val();
            if (roomname == "") {
                alert('Roomname is empty.');
            }
            else {
                console.log('Lobby create room. roomname: ' + roomname);
                server_1.Server.createRoom(roomname, function (re) {
                    console.log("server.createRoom => request roomname: " + roomname + ", response roomname: => re: " + re);
                    user_1.User.save_roomname(re);
                    element_1.Element.lobbyRoomname.val("");
                    element_1.Element.lobby_form_roomname.hide();
                    room_1.Room.show();
                });
            }
        };
        Lobby.prototype.send_message = function (event) {
            event.preventDefault();
            server_1.Server.chatMessage(element_1.Element.lobby_message.val(), function (re) {
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
        Lobby.prototype.on_join_room = function (event) {
            event.preventDefault();
            var room_id = $(this).attr('id');
            console.log(room_id);
            if (room_id == "Lobby") {
                alert('You cannot join Lobby.');
            }
            else {
                server_1.Server.joinRoom(room_id, function (data) {
                    user_1.User.save_roomname(data);
                    room_1.Room.show();
                });
            }
        };
        Lobby.show_user_list = function (users) {
            for (var i in users) {
                if (!users.hasOwnProperty(i))
                    continue;
                var user = users[i];
                var $user = element_1.Element.lobby_user_list.find('[socket="' + user.socket + '"]');
                if ($user.length)
                    $user.text(user.name);
                else
                    element_1.Element.appendUser(user);
            }
        };
        Lobby.update_user_list = function (user) {
            if (element_1.Element.lobby_user_list.length) {
                var $user = element_1.Element.lobby_user_list.find('[socket="' + user.socket + '"]');
                if ($user.length)
                    $user.text(user.name);
                else
                    element_1.Element.appendUser(user);
            }
        };
        Lobby.remove_user_list = function (socket) {
            element_1.Element.lobby_user_list.find('[socket="' + socket + '"]').remove();
        };
        Lobby.show_room_list = function (rooms) {
            for (var i in rooms) {
                if (!rooms.hasOwnProperty(i))
                    continue;
                var room_2 = rooms[i];
                var $rooms = element_1.Element.lobby_room_list.find('[id="' + room_2 + '"]');
                if ($rooms.length)
                    $rooms.text(room_2);
                else
                    element_1.Element.appendRoom(room_2);
            }
        };
        Lobby.update_room_list = function (room) {
            if (element_1.Element.lobby_room_list.length) {
                var $room = element_1.Element.lobby_room_list.find('[id="' + room.room + '"]');
                if ($room.length)
                    $room.text(room.room);
                else
                    element_1.Element.appendRoom(room.room);
            }
        };
        Lobby.remove_room_list = function (room) {
            element_1.Element.lobby_room_list.find('[id="' + room + '"]').remove();
        };
        return Lobby;
    }(videocenter_1.VideoCenter));
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map