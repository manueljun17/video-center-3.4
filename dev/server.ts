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

    }
    static emit( protocol: string, data?: any, callback = false) {
        console.log('Server.emit() protocol: ' + protocol + ', data: ' + data );
        if ( callback ) Server.socket.emit( protocol, data, callback );
        else Server.socket.emit( protocol, data );
    }
    
    public ping(callback) : void {
        Server.emit( 'ping', (re) => {
            // this;
            callback( re );
        });
    }
    static joinLobby( callback : any ) {
        Server.emit("join-lobby", callback );
    }
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
   
}