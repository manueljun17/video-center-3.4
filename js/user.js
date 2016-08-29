var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter'], function (require, exports, videocenter_1) {
    "use strict";
    var const_username = "username_key";
    var const_roomname = "roomname_key";
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            _super.call(this);
            console.log("User::constructor()");
        }
        User.prototype.hasUsername = function () {
            var username = Lockr.get(const_username);
            if (username == undefined || username == "" || username == null) {
                return false;
            }
            else {
                return true;
            }
        };
        Object.defineProperty(User, "getUsername", {
            get: function () {
                var username = Lockr.get(const_username);
                return username;
            },
            enumerable: true,
            configurable: true
        });
        User.save_username = function (username) {
            Lockr.set(const_username, username);
            console.log("User update it's name to:", username);
            return username;
        };
        User.delete_username = function () {
            Lockr.set(const_username, '');
        };
        Object.defineProperty(User, "getRoomname", {
            get: function () {
                var roomname = Lockr.get(const_roomname);
                return roomname;
            },
            enumerable: true,
            configurable: true
        });
        User.save_roomname = function (roomname) {
            Lockr.set(const_roomname, roomname);
            console.log("User update it's roomname to:", roomname);
            return roomname;
        };
        User.delete_roomname = function () {
            Lockr.set(const_roomname, '');
        };
        return User;
    }(videocenter_1.VideoCenter));
    exports.User = User;
});
//# sourceMappingURL=user.js.map