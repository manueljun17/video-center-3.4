define(["require", "exports"], function (require, exports) {
    "use strict";
    var VideoCenter = (function () {
        function VideoCenter() {
            console.log("VideoCenter constructor()");
            VideoCenter.connection = new RTCMultiConnection();
        }
        VideoCenter.version = function () {
            return '3.4';
        };
        VideoCenter.prototype.setSocketUrl = function (url) {
            VideoCenter.socketUrl = url;
        };
        VideoCenter.prototype.getSocket = function () {
            if (VideoCenter.socket === false) {
                VideoCenter.connection.socketURL = VideoCenter.socketUrl;
                VideoCenter.socket = VideoCenter.connection.getSocket();
            }
            return VideoCenter.socket;
        };
        VideoCenter.socket = false;
        return VideoCenter;
    }());
    exports.VideoCenter = VideoCenter;
});
//# sourceMappingURL=videocenter.js.map