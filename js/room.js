var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter', './element', './server', './user', './lobby'], function (require, exports, videocenter_1, element_1, server_1, user_1, lobby_1) {
    "use strict";
    var Room = (function (_super) {
        __extends(Room, _super);
        function Room() {
            _super.call(this);
            console.log("Room::constructor()");
            this.initHandlers();
        }
        Room.prototype.initHandlers = function () {
            element_1.Element.room_onclick_leave.click(this.on_leave);
        };
        Room.show = function () {
            console.log("Entrance::show()");
            element_1.Element.lobby.hide();
            element_1.Element.room.show();
            var roomname = user_1.User.getRoomname;
            element_1.Element.roomDisplayRoomname(roomname);
        };
        Room.prototype.on_leave = function (event) {
            event.preventDefault();
            console.log("on_leave()");
            server_1.Server.leaveRoom(function () {
                element_1.Element.room_display.empty();
                user_1.User.save_roomname("Lobby");
                element_1.Element.room.hide();
                lobby_1.Lobby.show();
            });
        };
        return Room;
    }(videocenter_1.VideoCenter));
    exports.Room = Room;
});
//# sourceMappingURL=room.js.map