import { VideoCenter as vc } from './videocenter';
export class Lobby extends vc {
    
    constructor() {
        super();
        console.log("Lobby::constructor()");
    }


    show() : void {
        console.log("Lobby::show()");
    }
}