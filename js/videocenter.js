define(["require", "exports"], function (require, exports) {
    "use strict";
    var VideoCenter = (function () {
        function VideoCenter() {
            console.log("VideoCenter constructor()");
        }
        VideoCenter.version = function () {
            return '3.4';
        };
        return VideoCenter;
    }());
    exports.VideoCenter = VideoCenter;
});
//# sourceMappingURL=videocenter.js.map