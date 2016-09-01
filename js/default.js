define(["require", "exports"], function (require, exports) {
    "use strict";
    var Default = (function () {
        function Default() {
            console.log("Lobby::constructor()");
            Default.lobbyRoomName = "Lobby";
        }
        return Default;
    }());
    exports.Default = Default;
});
//# sourceMappingURL=default.js.map