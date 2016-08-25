/// <reference path="../d.ts/jquery.d.ts" />
export class Element {


    constructor() {
    }
    /*------Entrance-----*/
    static get entrance() : JQuery {
        return $('#entrance');
    }
    static get entranceUsernameValue () : string {
        return Element.entrance.find('[name="username"]').val();
    }
    static entranceUsernameEmpty () : void {
        Element.entrance.find('[name="username"]').val("");
    }
    /*------Lobby-----*/
    static get lobby() : JQuery {
        return $('#lobby');
    }
    static get lobbyUsernameValue () : string {
        return Element.lobby.find('[name="username"]').val();
    }
    static lobbyUsernameEmpty () : void {
        Element.lobby.find('[name="username"]').val("");
    }   
    static lobbyDisplayUsername( username :string ) : JQuery {
        return Element.lobby.find('.username').text( username );
    }
    static get lobby_form_username () : JQuery {
        return $('#lobby_form_username');
    }
    static get lobby_form_roomname () : JQuery {
        return $('#lobby_form_roomname');
    }

}