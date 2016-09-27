/// <reference path="../d.ts/jquery.d.ts" />
import { VideoCenter as vc } from './videocenter';
import { Element, Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
import { User } from './user';
import { Lobby } from './lobby';
import { Whiteboard } from './whiteboard';
import * as de from './declare';

export class Document extends vc {    
    private whiteboard: Whiteboard;
    constructor() {
        super();
        console.log("Document::constructor()");
        this.whiteboard = new Whiteboard();
        this.init_handlers(); 
        e.document.find('form').prop('action', de.uploadUrl);
    }
    //Initialize the Document
    private init_handlers() : void {
        console.log("Document::init_handlers() - this must be called only once.");
        window.addEventListener('message', res => {
            console.log("Document::init_handlers() >> message event >> ");
            console.log( res );
            let data = res.data;
            if ( data.success ) {
                this.whiteboard.image( data.url );
            }
            else {
                alert( data.error );
            }
        });
    }
}

