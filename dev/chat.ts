import { User } from './user';
import { Entrance } from './entrance';
import { Lobby } from './lobby';
import { Room } from './room';
import { Server } from './server';
import { Whiteboard } from './whiteboard';
import { Document } from './document';
import { VideoCenter as vc } from './videocenter';
import * as de from './declare';
export class Chat extends vc {
    private user: User;
    private entrance: Entrance;    
    private lobby: Lobby;
    private room: Room;
    private server: Server;
    private whiteboard: Whiteboard;
    private document: Document;
    private vc: vc;
    
    constructor( url: string ) {
        super();
        console.log("Chat::constructor() : ", url);
        super.setSocketUrl( url );
        this.user = new User();
        this.entrance = new Entrance();
        this.lobby = new Lobby();
        this.room = new Room();              
        this.server = new Server();
        this.whiteboard = new Whiteboard();
        this.document = new Document();
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

