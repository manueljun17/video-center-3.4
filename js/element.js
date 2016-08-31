define(["require", "exports"], function (require, exports) {
    "use strict";
    var Element = (function () {
        function Element() {
        }
        Object.defineProperty(Element, "entrance", {
            get: function () {
                return $('#entrance');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "entranceUsername", {
            get: function () {
                return Element.entrance.find('[name="username"]');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby", {
            get: function () {
                return $('#lobby');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_display", {
            get: function () {
                return Element.lobby.find('.display');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobbyUsername", {
            get: function () {
                return Element.lobby.find('[name="username"]');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobbyRoomname", {
            get: function () {
                return Element.lobby.find('[name="roomname"]');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_send_message", {
            get: function () {
                return Element.lobby.find('.chat form');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_message", {
            get: function () {
                return Element.lobby.find('[name="message"]');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_onclick_form_username", {
            get: function () {
                return Element.lobby.find('.update-username');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_onclick_form_roomname", {
            get: function () {
                return Element.lobby.find('.create-room');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_onclick_logout", {
            get: function () {
                return Element.lobby.find('.logout');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_form_username", {
            get: function () {
                return $('#lobby_form_username');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_form_roomname", {
            get: function () {
                return $('#lobby_form_roomname');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_user_list", {
            get: function () {
                return Element.lobby.find(".user-list");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_room_list", {
            get: function () {
                return Element.lobby.find(".room-list");
            },
            enumerable: true,
            configurable: true
        });
        Element.lobbyDisplayUsername = function (username) {
            return Element.lobby.find('.username').text(username);
        };
        Object.defineProperty(Element, "room", {
            get: function () {
                return $('#room');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "room_send_message", {
            get: function () {
                return Element.room.find('.chat form');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "room_message", {
            get: function () {
                return Element.room.find('[name="message"]');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "room_onclick_leave", {
            get: function () {
                return Element.room.find('.room-leave');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "room_display", {
            get: function () {
                return Element.room.find('.display');
            },
            enumerable: true,
            configurable: true
        });
        Element.roomDisplayRoomname = function (roomname) {
            return Element.room.find('.roomname').text(roomname);
        };
        Element.appendUser = function (user) {
            return Element.lobby_user_list.append(Element.markup_username(user));
        };
        Element.appendRoom = function (room) {
            return Element.lobby_room_list.append(Element.markup_room(room));
        };
        Element.markup_username = function (user) {
            return '<div socket="' + user.socket + '">' + user.name + '</div>';
        };
        Element.markup_room = function (room) {
            return '' +
                '<div class="room">' +
                '   <div class="roomname" id="' + room.room + '">' + room.room + '</div>' +
                '   <div class="users"></div>' +
                '</div>';
        };
        Element.markup_chat_message = function (data) {
            return '<div><strong>' + data.name + ': </strong>' + data.message + '</div>';
        };
        return Element;
    }());
    exports.Element = Element;
});
//# sourceMappingURL=element.js.map