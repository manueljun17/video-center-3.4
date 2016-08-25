var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter'], function (require, exports, videocenter_1) {
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
        };
        return Lobby;
    }(videocenter_1.VideoCenter));
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map