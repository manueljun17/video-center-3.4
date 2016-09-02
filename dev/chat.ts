import { User } from './user';
import { Lobby } from './lobby';
import { Entrance } from './entrance';
import { Room } from './room';
import { Server } from './server';
import { VideoCenter as vc } from './videocenter';
export class Chat extends vc {
    private entrance: Entrance;
    private user: User;
    private lobby: Lobby;
    private room: Room;
    private vc: vc;
    private server: Server;
    constructor( url: string ) {
        super();
        console.log("Chat::constructor()");
        super.setSocketUrl( 'http://localhost:9001/' );
        this.user = new User();
        this.entrance = new Entrance();
        this.room = new Room();
        this.server = new Server();
        this.lobby = new Lobby();
    }

    start() : void {
        console.log('Chat::start() Begins ...');
        this.server.listen();
        this.server.ping( (re : string) => console.log( 'Got: ' + re ) );
        
        if ( this.user.hasUsername() ) {
            let username : string = User.getUsername;
            Server.updateUsername( username, function(re : string) { 
                console.log("User has name already : " + re);
                Lobby.show();
            } );
        }
        else {
            Entrance.show();
        }
    }
}

