/// <reference path="../d.ts/jquery.d.ts" />
interface JQuery {
    room( id: string ) : JQuery;
    private_chat( socket: string ) : JQuery;
    user( x ) : JQuery;
}
(function ($) {
    
    $.fn.room = function ( id ) {
        return $('#' + id );
    };
    $.fn.private_chat = function ( socket ) {
        return this.find('[pmsocket="'+ socket +'"]');
    };
    $.fn.user = function ( user ) : JQuery {
        return this.find('[socket="'+user.socket+'"]');
    }


    // 
     
    // 
})(jQuery);
var _ = jQuery();
var $lobby = jQuery();


