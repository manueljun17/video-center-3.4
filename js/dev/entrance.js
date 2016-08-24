var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './videocenter'], function (require, exports, videocenter_1) {
    "use strict";
    var Entrance = (function (_super) {
        __extends(Entrance, _super);
        function Entrance() {
            _super.call(this);
            console.log("Entrance::constructor()");
        }
        Entrance.prototype.show = function () {
            console.log("Entrance::show()");
            var m = $('#entrance-template').html();
            console.log(m);
            $('#content').html(m);
        };
        return Entrance;
    }(videocenter_1.VideoCenter));
    exports.Entrance = Entrance;
});
//# sourceMappingURL=entrance.js.map