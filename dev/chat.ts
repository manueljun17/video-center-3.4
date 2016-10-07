import { User } from './user';
import { Entrance } from './entrance';
import { Lobby } from './lobby';
import { Room } from './room';
import { Server } from './server';
import { Document } from './document';
import { VideoCenter as vc } from './videocenter';
import { Element } from './element';
import * as de from './declare';
export class Chat extends vc {
    private user: User;
    private entrance: Entrance;
    private lobby: Lobby;
    private room: Room;
    private server: Server;
    private document: Document;
    private vc: vc;
    private element: Element;
    
    constructor( url: string ) {
        super();
        console.log("Chat::constructor() : ", url);
        super.setSocketUrl( url );
        this.user = new User();
        this.entrance = new Entrance();
        this.server = new Server();
        this.document = new Document();
        this.room = new Room();
        this.lobby = new Lobby();
        this.element = new Element();
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
                    if ( roomname == de.lobbyRoomName ) this.lobby.show();
                    else this.room.show();
                }
                else {
                    this.lobby.show();
                }
          } );
        }
        else {
            this.entrance.show();
        }
    }
}

