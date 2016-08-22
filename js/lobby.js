define(["require", "exports"], function (require, exports) {
    "use strict";
    var Lobby = (function () {
        function Lobby() {
        }
        Lobby.prototype.show = function () {
            console.log("Lobby::show()");
        };
        return Lobby;
    }());
    exports.Lobby = Lobby;
});
//# sourceMappingURL=lobby.js.map