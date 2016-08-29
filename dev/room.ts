import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { User as user } from './user';
import { Lobby } from './lobby';
export class Room extends vc {    
    constructor() {
        super();
        console.log("Room::constructor()");
        this.initHandlers();   
    }

    private initHandlers() : void {
             
    } 

    static show() : void {
        console.log("Entrance::show()");          
        e.lobby.hide();
        e.room.show();
        let roomname : any = user.getRoomname;
        e.roomDisplayRoomname( roomname );
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
