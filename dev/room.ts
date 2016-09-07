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
    static show() : void {
        let roomname : any = user.getRoomname;
        server.joinRoom( roomname, ()=>{
            console.log("Room::show()");   
            e.entrance.hide();      
            e.lobby.hide();
            e.room.show();
            let roomname : any = user.getRoomname;
            e.roomDisplayRoomname( roomname );
            server.userList( roomname, Room.show_user_list );
        });        
    }
    private initHandlers() : void {
        e.room_send_message.submit( this.send_message ); 
        e.room_onclick_leave.click( this.on_leave );        
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

    

    static show_user_list( users: Array<de.User> ) :void {        
        for( let i in users ) {
            if ( ! users.hasOwnProperty(i) ) continue;
            let user: de.User = users[i]; 
            console.log( "show_user_list() "+user.name );                          
            Room.add_user(user);
        }         
    } 
    static add_user( user : de.User ) : void {        
        e.room_remove_user( user );
        e.room_user_append( user ); // append the user into the room.
    }
    static on_event_join_room( user: de.User ) {
        Room.addMessageJoin( user );
    }
    static on_event_disconnect_room( user: de.User ) {      
        Room.addMessageDisconnect( user );
    }
}
