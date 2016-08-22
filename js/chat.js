var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './user', './entrance', './videocenter'], function (require, exports, user_1, entrance_1, videocenter_1) {
    "use strict";
    var Chat = (function (_super) {
        __extends(Chat, _super);
        function Chat() {
            _super.call(this);
            this._user = new user_1.User();
            this._entrance = new entrance_1.Entrance();
            console.log("chat constructor()");
        }
        Chat.prototype.start = function () {
            console.log('Chat::start() begins ...');
            if (this._user.hasUsername())
                this._lobby.show();
            else
                this._entrance.show();
        };
        return Chat;
    }(videocenter_1.VideoCenter));
    exports.Chat = Chat;
});
//# sourceMappingURL=chat.js.map