import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';

export class Lobby extends vc {
    
    constructor() {
        super();
        console.log("Lobby::constructor()");
        this.initHandlers();
    }

    show() : void {
        console.log("Lobby::show()");
    }

    private initHandlers() : void {
        e.lobby_form_username.submit( this.submit_user_name );
        // e.entrance.submit( this.submit );
        
    }
    private submit_user_name( event ) {
        event.preventDefault();
        console.log('lobby submit username: ',  e.lobbyUsernameValue );
        server.updateUsername( e.lobbyUsernameValue, function(re) { 
            console.log("server.updateUsername => username => re: ", re);
            e.lobbyDisplayUsername( re );
            e.lobbyUsernameEmpty();
         } );

    }
       
}