import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { User as user } from './user';
import { Lobby } from './lobby';
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
        let username = e.entranceUsernameValue;
        if ( username == "" ) {
        alert('Username is empty.');
        }
        else {
        server.updateUsername( username , re => {      
            console.log("server.updateUsername => callback => re: ", re);
            user.save_username( username );    
            e.entranceUsernameEmpty();        
            Lobby.show();            
        });
        }

    }
    

}
