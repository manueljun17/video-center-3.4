/// <reference path="../d.ts/jquery.d.ts" />
interface JQuery {
    room( id: string): JQuery;
}
(function ($) {
    $.fn.room = function ( id ) {
        return $('#' + id );
    };
})(jQuery);
var _ = jQuery();