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
        Element.entranceUsernameEmpty = function () {
            Element.entrance.find('[name="username"]').val("");
        };
        Object.defineProperty(Element, "lobby", {
            get: function () {
                return $('#lobby');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobbyUsernameValue", {
            get: function () {
                return Element.lobby.find('[name="username"]').val();
            },
            enumerable: true,
            configurable: true
        });
        Element.lobbyUsernameEmpty = function () {
            Element.lobby.find('[name="username"]').val("");
        };
        Element.lobbyDisplayUsername = function (username) {
            return Element.lobby.find('.username').text(username);
        };
        Object.defineProperty(Element, "lobby_click_form_username", {
            get: function () {
                return $('#lobby').find('.update-username');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_click_form_roomname", {
            get: function () {
                return $("#lobby").find('.create-room');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_form_username", {
            get: function () {
                return $('#lobby_form_username');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element, "lobby_form_roomname", {
            get: function () {
                return $('#lobby_form_roomname');
            },
            enumerable: true,
            configurable: true
        });
        return Element;
    }());
    exports.Element = Element;
});
//# sourceMappingURL=element.js.map