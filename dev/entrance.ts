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

    private initHandlers() : void {
        e.entrance.submit( this.submit );        
    } 

    static show() : void {
        console.log("Entrance::show()");          
        e.lobby.hide();
        e.entrance.show();
    }
   
    submit( event ) : void {
        event.preventDefault();
        let username = e.entranceUsername.val();
        if ( username == "" ) {
        alert('Username is empty.');
        }
        else {
        server.updateUsername( username , re => {      
            console.log("server.updateUsername => callback => re: ", re);
            user.save_username( username );    
            e.entranceUsername.val("");
            e.entrance.hide();        
            Lobby.show();            
        });
        }
    }
    
}
