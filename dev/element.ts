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
    static lobbyDisplayUsername( username :string ) : JQuery {
        return Element.lobby.find('.username').text( username );
    }
    static markup_chat_message( data :any ) : string {
        return '<div><strong>'+data.name+': </strong>'+data.message+'</div>';
    }

     /*------Room-----*/
    static get room() : JQuery {
        return $('#room');
    }  
    static roomDisplayRoomname( roomname :string ) : JQuery {
        return Element.room.find('.roomname').text( roomname );
    }

}