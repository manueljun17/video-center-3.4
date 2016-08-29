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
        e.room_send_message.submit( this.send_message ); 
        e.room_onclick_leave.click( this.on_leave );        
    } 

    static show() : void {
        let roomname : any = user.getRoomname;
        server.joinRoom( roomname, ()=>{
            console.log("Room::show()");          
            e.lobby.hide();
            e.room.show();
            let roomname : any = user.getRoomname;
            e.roomDisplayRoomname( roomname );
        });        
    }
    static showMessage( data : any ) : void {
        let roomname : any = user.getRoomname;
        if( roomname == data.room ){
            e.room_display.append(e.markup_chat_message( data ));
            e.room_display.animate({scrollTop: e.room_display.prop('scrollHeight')});  
        }   
    }
    private send_message( event ) :void {
        event.preventDefault();       
        server.sendMessage( e.room_message.val(), (re)=> { 
            console.log("server.sendMessage => message => re: ", re);              
            e.room_message.val("");       
         } );
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
