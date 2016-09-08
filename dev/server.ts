import { VideoCenter as vc } from './videocenter';
import { Chat as chat } from './chat';
import { Lobby } from './lobby';
import { Room as room } from './room';
import { User } from './user';
import * as de from './declare';
export class Server extends vc {
    static socket: any = false;
    constructor() {
        super();
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
        Server.socket.on('update-username', Lobby.on_event_update_username);
        Server.socket.on('join-room', (user: de.User) => {
            
            if ( User.getRoomname == de.lobbyRoomName ) Lobby.on_event_join_room( user );
            else room.on_event_join_room( user );

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
            console.log("socket ?? : " + user)
            if ( user.name == User.getUsername ) return;
            if ( typeof user.socket == 'undefined' ) return; // @todo tricky. Do not add message on my chat display box IF i am the one who leave the room.
            if ( User.getRoomname == de.lobbyRoomName ) {
                if(user.room != "")Lobby.on_event_disconnect_room( user );//send only if the user.room is not empty
                Lobby.remove_user( user );
            }
            else {
                room.on_event_disconnect_room( user );
            }
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
    static updateUsername( username: string, callback: (x:de.User) => void ) {
        Server.emit( 'update-username', username, (x: de.User) => {
            console.log('server.updateUsername callback: ',  x );
            callback( x );
        } );
    }


    /**
     * @edited give proper signature. 2016-09-02 JaeHo Song.
     */
    static createRoom( roomname: string, callback: de.S ) : void {
        Server.emit( 'create-room', roomname, callback );
    }
    static chatMessage( message: string, callback: any ) : void {
        Server.emit( 'chat-message', message, callback );
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
}