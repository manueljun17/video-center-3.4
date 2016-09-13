/// <reference path="../d.ts/jquery.d.ts" />
interface JQuery {
    room( id: string ) : JQuery;
    user( x ) : JQuery;
}
(function ($) {
    
    $.fn.room = function ( id ) {
        return $('#' + id );
    };
    $.fn.user = function ( user ) : JQuery {
        return this.find('[socket="'+user.socket+'"]');
    }


    // 
     
    // 
})(jQuery);
var _ = jQuery();
var $lobby = jQuery();


