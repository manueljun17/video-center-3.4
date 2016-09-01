import { VideoCenter as vc } from './videocenter';
import { Chat as chat } from './chat';
import { Lobby as lobby } from './lobby';
import { Room as room } from './room';
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
           lobby.update_user_list( user );
        });
        Server.socket.on('create-room', ( room )=>{
           lobby.update_room_list( room );
        });
        Server.socket.on('remove-room', ( room )=>{
           lobby.remove_room_list( room );
        });       
        Server.socket.on('log-out', ( socket )=>{
           console.log("socket:"+socket)
           lobby.remove_user_list( socket );
        });
        Server.socket.on('disconnect', ( socket )=>{
           console.log("socket:"+socket)
           lobby.remove_user_list( socket );
        });

    }
    static emit( protocol: string, data?: any, callback = false) {
        if ( callback ) {
            // console.log('Server.emit() protocol: ' + protocol + ', data:  ' + data + ', callback: ', callback);
            Server.socket.emit( protocol, data, callback );
        }
        else {
            // console.log('Server.emit() protocol: ' + protocol + ', data:  ', data);
            Server.socket.emit( protocol, data );
        }
    }
    
    public ping(callback) : void {
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
    static updateUsername( username: string, callback: any ) : void {
        Server.emit( 'update-username', username, callback );
    }
    static createRoom( roomname: string, callback: any ) : void {
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
}