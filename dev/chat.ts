import { User } from './user';
import { Lobby } from './lobby';
import { Entrance } from './entrance';
import { VideoCenter as vc } from './videocenter';
export class Chat extends vc {
    private _entrance: Entrance;
    private _user: User;
    private _lobby: Lobby;
    constructor() {
        super();
        this._user = new User();
        this._entrance = new Entrance();
        console.log("chat constructor()");
    }
    start() : void {
        console.log('Chat::start() begins ...');
        if ( this._user.hasUsername() ) this._lobby.show();
        else this._entrance.show();
    }
}

