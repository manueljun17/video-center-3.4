import { User } from './user';
import { Lobby } from './lobby';
import { Entrance } from './entrance';
import { Server } from './server';
import { VideoCenter as vc } from './videocenter';
export class Chat extends vc {
    private _entrance: Entrance;
    private _user: User;
    private _lobby: Lobby;
    private _vc: vc;
    private _server: Server;
    constructor( url: string ) {
        super();
        super.setSocketUrl( 'http://localhost:9001/' );
        this._user = new User();
        this._entrance = new Entrance();
        this._server = new Server();
        this._lobby = new Lobby();
        console.log("chat constructor()");
    }
    start() : void {
        console.log('Chat::start() Begins ...');
        this._server.ping( (re) => console.log( re ) );
        let checkUser : boolean = this._user.hasUsername();        
        if ( checkUser === true ) {
            let username : any = User.getUsername;
            Server.updateUsername( username, function(re) { 
            console.log("User change it's name to " + re);
         } );
            Lobby.show();
        }
        else {
            Entrance.show();
        }
    }
}

