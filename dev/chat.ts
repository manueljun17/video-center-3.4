import { User } from './user';
import { Entrance } from './entrance';
import { Lobby } from './lobby';
import { Room } from './room';
import { Server } from './server';
import { Whiteboard } from './whiteboard';
import { VideoCenter as vc } from './videocenter';
import * as de from './declare';
export class Chat extends vc {
    private user: User;
    private entrance: Entrance;    
    private lobby: Lobby;
    private room: Room;
    private server: Server;
    private whiteboard: Whiteboard;
    private vc: vc;
    
    constructor( url: string ) {
        super();
        console.log("Chat::constructor()");
        super.setSocketUrl( 'http://localhost:9001/' );
        this.user = new User();
        this.entrance = new Entrance();
        this.lobby = new Lobby();
        this.room = new Room();              
        this.server = new Server();
        this.whiteboard = new Whiteboard();
    }

    start() : void {
        console.log('Chat::start() Begins ...');
        this.server.listen();
        this.server.ping( (re : string) => console.log( 'Got: ' + re ) );
        
        if ( this.user.hasUsername() ) {
          let username : string = User.getUsername;
          Server.updateUsername( username, ( user: de.User ) => {
                if( User.hasRoomname() ) {
                    let roomname : string = User.getRoomname;
                    console.log("User has name and roomname already : ", user, roomname);
                    if ( roomname == de.lobbyRoomName ) Lobby.show();
                    else Room.show();
                }
                else {
                    Lobby.show();
                }
          } );
        }
        else {
            Entrance.show();
        }
    }
}

