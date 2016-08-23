var VideoCenterServer = (function () {
    function VideoCenterServer() {
        console.log('VideoCenterServer::constructor()');
    }
    VideoCenterServer.prototype.listen = function (socket, io) {
        console.log('VideoCenterServer::start()');
    };
    return VideoCenterServer;
}());
exports = VideoCenterServer;
//# sourceMappingURL=video-center-3.4-server.js.map