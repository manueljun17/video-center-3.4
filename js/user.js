var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter'], function (require, exports, videocenter_1) {
    "use strict";
    var const_username = "username_key";
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            _super.call(this);
            console.log("User::constructor()");
        }
        User.prototype.hasUsername = function () {
            return false;
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
        return User;
    }(videocenter_1.VideoCenter));
    exports.User = User;
});
//# sourceMappingURL=user.js.map