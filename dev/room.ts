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
        e.room_onclick_leave.click( this.on_leave );        
    } 

    static show() : void {
        console.log("Entrance::show()");          
        e.lobby.hide();
        e.room.show();
        let roomname : any = user.getRoomname;
        e.roomDisplayRoomname( roomname );
    }
   
    private on_leave( event ) :void {
        event.preventDefault();
        console.log("on_leave()");
        server.leaveRoom( () => {          
            e.room_display.empty();
            user.save_roomname( "Lobby" );    
            e.room.hide();  
            Lobby.show();
        });    
    }
    
}
