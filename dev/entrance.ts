import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';

export class Entrance extends vc {

    constructor() {
        super();
        console.log("Entrance::constructor()");
        this.initHandlers();
    }

    show() {
        console.log("Entrance::show()");
    }


    private initHandlers() : void {

        e.entrance.submit( this.submit );
        
    }

    submit( event ) {
        event.preventDefault();
        console.log('entrance submit username: ',  e.entranceUsernameValue );
        server.updateUsername( e.entranceUsernameValue, function(re) { 
            console.log("server.updateUsername => callback => re: ", re);
            e.lobbyDisplayUsername( re );
            e.entranceUsernameEmpty();
         } );
    }
    

}
