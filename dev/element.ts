/// <reference path="../d.ts/jquery.d.ts" />

import './jquery-helper';
import * as de from './declare';
export class Element {
    constructor() {
    }
    /*------Entrance-----*/
    static get entrance() : JQuery {
        return $('#entrance');
    }
    static get entranceUsername () : JQuery {
        return Element.entrance.find('[name="username"]');
    }
    static get entrance_loginadmin() : JQuery {
        return Element.entrance.find('.login-admin');
    }
    
    /*------Lobby-----*/
    static get lobby() : JQuery {
        return $('#lobby');
    }
     static get lobby_chat_history() : JQuery {
        return $('.chat-history')
    }
    static lobby_show() : void {
            Element.lobby.show();  
            Element.entrance.hide();            
            Element.lobby_form_username.hide();
            Element.lobby_form_roomname.hide();
    }
    static lobby_show_message( data ) {
         Element.lobby_display.append( Element.markup_chat_message( data ) );
         Element.lobby_display.animate( { scrollTop: Element.lobby_display.prop('scrollHeight') } );
         Element.lobby_chat_history.append( Element.markup_private_chat_message( data ) );
         Element.lobby_chat_history.animate( { scrollTop: Element.lobby_chat_history.prop('scrollHeight') } );
    }
    static lobby_show_form_roomname() : void {
         Element.lobby_form_roomname.show();
    }
    static lobby_show_form_username() : void {
         Element.lobby_form_username.show();
    }
    static lobby_hide_form_roomname() : void {     
         Element.lobby_form_roomname.hide();
    }
    static lobby_hide_form_username() : void {     
         Element.lobby_form_username.hide();
    }
    static lobbyUsernameEmpty () : void {
        Element.lobby.find('[name="username"]').val("");
    }
    static lobby_user( user: de.User ) {
        return this.lobby.find('[socket="'+user.socket+'"]');
    }
    static lobby_remove_user( user: de.User ) {
        this.lobby_user( user ).remove();
    }
    static lobby_update_username( user: de.User ) {
        this.lobby_user( user ).text( user.name  );
    }
    static get lobbyUsernameValue () : string {
        return Element.lobby.find('[name="username"]').val();
    }
    static lobbyRoomnameEmpty () : void {
        Element.lobby.find('[name="roomname"]').val("");
    }
    static get lobbyRoomnameValue () : string {
        return Element.lobby.find('[name="roomname"]').val();
    }
    static get  lobby_message_value () : string {
        return Element.lobby.find('[name="message"]').val();
    } 
    static lobby_message_empty () : void {
        Element.lobby.find('[name="message"]').val("");
    } 
    static lobby_display_empty() : void {
         Element.lobby_display.empty();
    }   
    static get lobby_display() : JQuery {
        return Element.lobby.find('.display');
    }   
    static get lobbyUsername () : JQuery {
        return Element.lobby.find('[name="username"]');
    }
    static get lobbyRoomname () : JQuery {
        return Element.lobby.find('[name="roomname"]');
    }
    static get lobby_send_message () : JQuery {
        return Element.lobby.find('.chat form');
    }   
    static get lobby_message () : JQuery {
        return Element.lobby.find('[name="message"]');
    }          
    static get lobby_onclick_form_username() : JQuery {
        return Element.lobby.find('.update-username');
    }
    static get lobby_onclick_form_roomname() : JQuery {
        return Element.lobby.find('.create-room');
    }
    static get lobby_onclick_logout() : JQuery {
        return Element.lobby.find('.logout');
    }     
    static get lobby_form_username () : JQuery {
        return $('#lobby_form_username');
    }
    static get lobby_form_roomname () : JQuery {
        return $('#lobby_form_roomname');
    }   
    static get lobby_room_list( ) : JQuery {       
        return Element.lobby.find(".room-list");     
    }
    static lobby_room( room_id ) : JQuery {
        return Element.lobby_room_list.find('[id="'+room_id+'"]');
    }
    static get body() : JQuery {
        return $("body");
    }

    static get document() : JQuery {
        return $('#document');
    }

    // static lobbyDisplayUsername( user : de.User ) : JQuery {
    //     return Element.lobby.find('.username').text( user.name );
    // }
    

    /**
     *
     * Lobby helpers.
     *  
     */    
       
     /*------Room-----*/
    static get room() : JQuery {
        return $('#room');
    }
    
    static get room_send_message () : JQuery {
        return Element.room.find('.chat form');
    } 
     static room_show_message( data ) {
         Element.room_display.append( Element.markup_chat_message( data ) );
         Element.room_display.animate( { scrollTop: Element.room_display.prop('scrollHeight') } );        
    } 
    static get room_message () : JQuery {
        return Element.room.find('[name="message"]');
    }  
    static get room_onclick_leave() : JQuery {
        return Element.room.find('.room-leave');
    }
    static get room_whiteboard_button() : JQuery {
        return Element.room.find('button.whiteboard');
    }
    static get room_tile_layout() : JQuery {
        return Element.room.find('button.tile-layout');
    }
    static get room_list_layout() : JQuery {
        return Element.room.find('button.list-layout');
    }
    static get room_overlap_layout() : JQuery {
        return Element.room.find('button.overlap-layout');
    }
    static get room_display() : JQuery {
        return Element.room.find('.display');
    }  
    static roomDisplayRoomname( roomname :string ) : JQuery {
        return Element.room.find('.roomname').text( roomname );
    }
    static get room_user_list( ) : JQuery {       
        return Element.room.find(".user-list");     
    }

    /*------Whiteboard-----*/
    static get whiteboard() : JQuery {
        return $('#whiteboard');
    }
    static get selectbox_color() : JQuery {
        return Element.whiteboard.find('.colors.selectBox');        
    }
    static get selectbox_color_selected() : JQuery {        
        return Element.selectbox_color.find('[selected = selected]');
    }
    static get selectbox_linesize() : JQuery {
        return Element.whiteboard.find('.line-size.selectBox');        
    }
    static get selectbox_linesize_selected() : JQuery {        
        return Element.selectbox_linesize.find('[selected = selected]');
    }
    static get book() : JQuery {        
        return $(".book");
    }
    static get users() : JQuery {        
        return Element.room.find('.users');
    }
    static get users_overlap() : JQuery {        
        return Element.room.find('.users.overlap');
    }
    static get user() : JQuery {        
        return Element.room.find('.user');
    }
    

    /*------Dom Handlers------*/
    // static appendUser( user:any ) : JQuery {       
    //     return Element.lobby_user_list.append( Element.markup_username( user ) );       
    // }
    
    static appendUser( room_id: string, user: de.User ) : void {       
        let $room = this.lobby_room( room_id );
        $room.find('.users').append( Element.markup_username( user.name, user.socket));
    }
    static room_user_append( user: de.User ) : void {       
  
        this.room_user_list.append( Element.markup_username( user.name, user.socket));
    }
    
    static updateUser( room_id: string, user: de.User ) : void {       
        this.lobby_user( user ).text( user.name );
    }

    static appendRoom( roomname:string, room_id: string ) {       
        Element.lobby_room_list.append( Element.markup_room( roomname, room_id ) );       
    }
    static room_remove_user( user: de.User ) {
        this.room_user( user ).remove();
    }
    static room_user( user: de.User ) {
        return this.room.find('[socket="'+user.socket+'"]');
    }
    /*------Markup------*/
    static lobby_add_private_chat( username ){
            return '<div class="private-chat">'
            +'<header class="private-chat-header">'			
			+'<a href="#" class="chat-close">x</a>'
			+'<h4>'+username+'</h4>'
            +'</header>'
            +'<div class="chat">'
            +'<div class="chat-history">'//chat history         
            +'</div>'//chat-history	
            +'<form action="#" method="post">'
			+'<fieldset>'					
			+'<input type="text" placeholder="Type your message…" autofocus>'
			+'<input type="hidden">'
			+'</fieldset>'            
			+'</form>'
            +'</div>'//chat	
            +"</div>"//private-chat   
    }
    static markup_username(  username:string, socket:string ) : any {
      return '<span class="name" socket="'+socket+'">'+ username + '</span>';       
    }
    static markup_room( roomname:string, room_id: string ) : string {
      return '' +
        '<div class="room" id="'+room_id+'">' +
        '   <span class="roomname">'+roomname+'</span>' +
        '   <span class="users"></span>' +
        '</div>';      
    }
    
    
    static markup_chat_message( data : de.ChatMessage ) : string {
        return '<div><i>'+data.name+' </i><span>'+data.message+'<span></div>';
    }
    static markup_private_chat_message( data : de.ChatMessage ) : string {      
        var hour = de.get_hours();
        var min = de.get_minutes();        
        return '<div class="chat-message clearfix">'
			+'<img src="tmp/'+de.get_rand_int(1,8)+'.png" alt="" width="32" height="32">'
			+'<div class="chat-message-content clearfix">'
			+'<span class="chat-time">'+ hour + ':' + min +'</span>'
			+'<h5>'+data.name+'</h5>'
			+'<p>'+data.message+'</p>'
		    +'</div> <!-- end chat-message-content -->'
			+'</div> <!-- end chat-message -->'
			+'<hr>'
    }

    static updateMyName( name: string ) {
        $('.my-name').text( name );
    }

}