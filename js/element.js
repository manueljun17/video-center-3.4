define(["require", "exports"], function (require, exports) {
    "use strict";
    var Element = (function () {
        function Element() {
        }
        Object.defineProperty(Element, "entrance", {
            get: function () {
                return $('#entrance');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "entranceUsernameValue", {
            get: function () {
                return Element.entrance.find('[name="username"]').val();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby", {
            get: function () {
                return $('#lobby');
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    }());
    exports.Element = Element;
});
//# sourceMappingURL=element.js.map