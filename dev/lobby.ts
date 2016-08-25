import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';

export class Lobby extends vc {
    
    constructor() {
        super();
        console.log("Lobby::constructor()");
        this.initHandlers();
    }

    show() : void {
        console.log("Lobby::show()");
    }

    private initHandlers() : void {

        // e.entrance.submit( this.submit );
        
    }
}