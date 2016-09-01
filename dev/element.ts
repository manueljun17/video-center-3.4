/// <reference path="../d.ts/jquery.d.ts" />
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
    
    /*------Lobby-----*/
    static get lobby() : JQuery {
        return $('#lobby');
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
    static get lobby_user_list( ) : JQuery {       
        return Element.lobby.find(".user-list");     
    }
    static get lobby_room_list( ) : JQuery {       
        return Element.lobby.find(".room-list");     
    }
    static get body() : JQuery {
        return $("body");
    }
    static lobbyDisplayUsername( username :string ) : JQuery {
        return Element.lobby.find('.username').text( username );
    }
    
       
     /*------Room-----*/
    static get room() : JQuery {
        return $('#room');
    }     
    static get room_send_message () : JQuery {
        return Element.room.find('.chat form');
    }  
    static get room_message () : JQuery {
        return Element.room.find('[name="message"]');
    }  
    static get room_onclick_leave() : JQuery {
        return Element.room.find('.room-leave');
    }
    static get room_display() : JQuery {
        return Element.room.find('.display');
    }  
    static roomDisplayRoomname( roomname :string ) : JQuery {
        return Element.room.find('.roomname').text( roomname );
    }
    /*------Dom Handlers------*/
    // static appendUser( user:any ) : JQuery {       
    //     return Element.lobby_user_list.append( Element.markup_username( user ) );       
    // }
    
    static appendUser( room_id: string, username:string ) : void {       
        // return Element.lobby_user_list.append( Element.markup_username( user ) );
        let $room = Element.lobby_room_list.find('[id="'+room_id+'"]');
        $room.find('.users').append(',' + username);

    }

    static appendRoom( roomname:string, room_id: string ) : JQuery {       
        return Element.lobby_room_list.append( Element.markup_room( roomname, room_id ) );       
    }

    /*------Markup------*/
    static markup_username( user:any ) : any {
      return '<div class="userlistname" socket="'+user.socket+'">' + user.name + '</div>';       
    }
    static markup_room( roomname:string, room_id: string ) : string {
      return '' +
        '<div class="room" id="'+room_id+'">' +
        '   <span class="roomname">'+roomname+'</span>' +
        '   <span class="users"></span>' +
        '</div>';      
    }
    static markup_chat_message( data :any ) : string {
        return '<div><strong>'+data.name+': </strong>'+data.message+'</div>';
    }

}