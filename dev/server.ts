import { VideoCenter as vc } from './videocenter';
import { Chat as chat } from './chat';
import { Lobby } from './lobby';
import { Room as room } from './room';
import { User } from './user';
import { Whiteboard} from './whiteboard';
import * as de from './declare';
export class Server extends vc {
    static socket: any = false;   
    private whiteboard: Whiteboard;
    constructor() {
        super();
        this.whiteboard = new Whiteboard();
        Server.socket = super.getSocket();  
    }
    public listen( ) : void {

        Server.socket.on('chatMessage', ( data )=>{
           if ( data.room == "Lobby"){
                console.log("Go to Lobby chat.");
                Lobby.addMessage( data );
            }
            else {
                console.log("Go to Room chat.");
                room.addMessage( data );
            }
        });     
        Server.socket.on('chat-private-message', ( data )=>{     
           if ( User.getRoomname == "Lobby"){
                console.log("Go to Lobby chat.");
                Lobby.add_private_message( data );
            }
            else {
                console.log("Go to Room chat.");
                room.add_private_message( data );
            }
        });      
        Server.socket.on('update-username', Lobby.on_event_update_username);
        Server.socket.on('join-room', (user: de.User) => {
            if(user.type != de.admin_type) {
                if ( User.getRoomname == de.lobbyRoomName ) Lobby.on_event_join_room( user );
                else room.on_event_join_room( user );
            }
        });
        Server.socket.on('remove-user', ( user )=>{           
           room.remove_room_list( user );
        }); 
        Server.socket.on('leave-room', ( room )=>{           
           Lobby.remove_room_list( room );
        });       
        Server.socket.on('log-out', ( user )=>{
           console.log("socket:"+user)
           Lobby.remove_user( user );
        });
        
        Server.socket.on('disconnect', ( user )=>{
            console.log("socket ?? : ");
            if ( user.name == User.getUsername ) return;            
            if ( typeof user.socket == 'undefined' ) return; // @todo tricky. Do not add message on my chat display box IF i am the one who leave the room.
            if ( user.type != de.admin_type ) {                
                if ( User.getRoomname == de.lobbyRoomName ) {
                    if(user.room != "")Lobby.on_event_disconnect_room( user );//send only if the user.room is not empty
                    Lobby.remove_user( user );
                }
                else {
                    if(user.room != "")room.on_event_disconnect_room( user );
                }
            }    
        });
        Server.socket.on('disconnect-private-message', ( user ) => {
            Lobby.add_private_message_disconnect( user );
            room.add_private_message_disconnect( user );
        });     

        Server.socket.on('whiteboard', ( data ) => {
                this.whiteboard.socket_on_from_server( data );
        });
        Server.socket.on('room-cast', ( data ) => {
                console.info( 'socket.on("room-cast")', data );
                if ( data['command'] == 'whiteboard-show' ) this.whiteboard.show();
                // else if ( data['command'] == 'whiteboard-hide' ) wb.hide();
                else if ( data['command'] == 'whiteboard-image' ) this.whiteboard.image( data['url'] );
        });

        Server.socket.on('error', ( data ) => {
            let message = 'Server error\nPlease notify this error message to administrator\n\n[ ERROR MESSAGE ] ' + data;
            console.log(message);
        });        
    }
    /**
     * @edited by JaeHo. Put better signature. 2016-09-02.
     */
    static emit( protocol: string, data?: any, callback?: boolean | any ) {
        if ( callback ) {
            Server.socket.emit( protocol, data, callback );
        }
        else {
            Server.socket.emit( protocol, data );
        }
    }
    


    /**
     * Pings to the server.
     * @add Type on signature. Sep 2, 2016 by JaeHo Song.
     */
    public ping( callback: ( re: string) => void ) : void {
        Server.emit( 'ping', (re) => {
            callback( re );
        });
    }    
    static joinRoom( roomname:string, callback : any ) {
        Server.emit("join-room", roomname, callback );
    }


    /**
     * @edited give proper signature. 2016-09-02 JaeHo Song.
     */
    static updateUsername( username: string, callback: (user:de.User) => void ) {
        Server.emit( 'update-username', username, (user: de.User) => {
            callback( user );
        } );
    }

    static sign_as_admin( username: string, callback: (user:de.User) => void ) {
        Server.emit( 'sign-as-admin', username, (user: de.User) => {
            callback( user );
        } );
    }


    /**
     * @edited give proper signature. 2016-09-02 JaeHo Song.
     */
    static createRoom( roomname: string, callback: de.S ) : void {
        Server.emit( 'create-room', roomname, callback );
    }
    static chat_message( message: string, callback: any ) : void {
        Server.emit( 'chat-message', message, callback );
    }
    static chat_private_message( data, callback: any ) : void {
        Server.emit( 'chat-private-message', data, callback );
    }   
    static leaveRoom(callback : any ) : void {
        Server.emit('leave-room', callback );
    }
    static logout(callback : any ) : void {
        Server.emit('log-out', callback );
    }
    static userList( roomname: string, callback : any ) : void {
        Server.emit('user-list', roomname, callback);
    }    
    static roomList( callback : any ) : void {
        Server.emit('room-list', callback);
    }
    static broadcastLeave( roomname: string, callback : any ) : void {
        Server.emit('broadcast-leave', roomname, callback);
    }   
    //Whiteboard
    static whiteboard( data, callback: de.S ) : void {
        Server.emit( 'whiteboard', data, callback );
    }
    //Roomcast
    static roomcast( data, callback: de.S ) : void {        
        Server.emit( 'room-cast', data, callback );
    }
  
}