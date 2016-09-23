import { VideoCenter as vc } from './videocenter';
import { Element, Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
import { User } from './user';
import { Lobby } from './lobby';
import * as de from './declare';

export class Document extends vc {    
  
    constructor() {
        super();
        console.log("Document::constructor()");  
        this.initHandlers(); 
    }     
    //Initialize the Document
    private initHandlers() : void {
        
    }
}

