import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { User as user } from './user';
import { Lobby } from './lobby';
import * as de from './declare';
interface mouse {
    click: boolean;
    move: boolean;
    pos: { x:number, y:number };
    pos_prev: { x: number, y: number };
}
export class Whiteboard extends vc {    
    mouse : mouse;
    constructor() {
        super();
        console.log("Whiteboard::constructor()");
        this.mouse = {
            click: false,
            move: false,
            pos: { x:0, y:0 },
            pos_prev: { x: 0, y: 0 }
        };
        this.initHandlers();   
    }

    private initHandlers() : void {
        //events      
       
    } 

    static show() : void {
        console.log("Whiteboard::show()");          
    }    
}
