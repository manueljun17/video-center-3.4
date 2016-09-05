import { VideoCenter as vc } from './videocenter';
import { Chat as chat } from './chat';
import { Lobby as lobby } from './lobby';
import { Room as room } from './room';
import { User } from './user';
import * as dec from './declare';
export class Server extends vc {
    static socket: any = false;
    constructor() {
        super();
        Server.socket = super.getSocket();  
    }
    public listen( ) : void {

        Server.socket.on('chat-message', ( data )=>{
           if ( data.room == "Lobby"){
                console.log("Go to Lobby chat.");
                lobby.showMessage( data );
            }
            else {
                console.log("Go to Room chat.");
                room.showMessage( data );
            }
        });
        Server.socket.on('update-username', ( user )=>{
            console.log("user:",user);
            lobby.update_user_list( user );
        });
        Server.socket.on('join-room', ( user )=>{
           lobby.remove_user_list( user );
           lobby.update_room_list( user );
        });
        Server.socket.on('remove-room', ( room )=>{
           lobby.remove_room_list( room );
        });       
        Server.socket.on('log-out', ( user )=>{
           console.log("socket:"+user)
           lobby.remove_user_list( user );
        });
        Server.socket.on('disconnect', ( user )=>{
           console.log("socket:"+user)
           lobby.remove_user_list( user );             
        });

    }
    /**
     * @edited by JaeHo. Put better signature. 2016-09-02.
     */
    static emit( protocol: string, data?: any, callback?: boolean | any ) {
        if ( callback ) {
            // console.log('Server.emit() protocol: ' + protocol + ', data:  ' + data + ', callback: ', callback);
            Server.socket.emit( protocol, data, callback );
        }
        else {
            // console.log('Server.emit() protocol: ' + protocol + ', data:  ', data);
            Server.socket.emit( protocol, data );
        }
    }
    


    /**
     * Pings to the server.
     * @add Type on signature. Sep 2, 2016 by JaeHo Song.
     */
    public ping( callback: ( re: string) => void ) : void {
        Server.emit( 'ping', (re) => {
            // this;
            callback( re );
        });
    }

    /**
    static joinLobby( roomname:string, callback : any ) {
        Server.emit("join-room", roomname, callback );
    }
    */
    static joinRoom( roomname:string, callback : any ) {
        Server.emit("join-room", roomname, callback );
    }


    /**
     * @edited give proper signature. 2016-09-02 JaeHo Song.
     */
    static updateUsername( username: string, callback: dec.S ) : void {
        Server.emit( 'update-username', username, callback );
    }


    /**
     * @edited give proper signature. 2016-09-02 JaeHo Song.
     */
    static createRoom( roomname: string, callback: dec.S ) : void {
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