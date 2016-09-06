import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { User as user } from './user';
import { Lobby } from './lobby';
import * as de from './declare';
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
            e.entrance.hide();      
            e.lobby.hide();
            e.room.show();
            let roomname : any = user.getRoomname;
            e.roomDisplayRoomname( roomname );
        });        
    }
    static addMessage( data: de.ChatMessage ) {
        e.room_show_message( data );
    }
    static addMessageJoin( u: de.User ) {
        let roomname : any = user.getRoomname;
        this.addMessage( { name: u.name, message: ' join into ' + u.room });
    }
   static addMessageDisconnect( user: de.User ) {
        this.addMessage( { name: user.name, message: ' disconnect into ' + user.room });
    }
    private send_message( event ) :void {
        event.preventDefault();       
        server.chatMessage( e.room_message.val(), (re)=> { 
            console.log("server.sendMessage => message => re: ", re);              
            e.room_message.val("");       
         } );
    }
    private on_leave( event ) :void {
        event.preventDefault();
        console.log("on_leave()");
        let oldroom :string= user.getRoomname;  
        server.broadcastLeave( oldroom, ()=>{
                console.log("Broadcast that you left the Lobby");
            } );
        server.leaveRoom( () => {          
            e.room_display.empty();
            user.save_roomname( "Lobby" );    
            e.room.hide();  
            Lobby.show();
        });    
    }
    


    /**
     * -------------------------------------------------------
     * 
     * Events from Server
     * 
     * -------------------------------------------------------
     */

    

    
    static on_event_join_room( user: de.User ) {
        Room.addMessageJoin( user );
    }
    static on_event_disconnect_room( user: de.User ) {      
        Room.addMessageDisconnect( user );
    }
}
