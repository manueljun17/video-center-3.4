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
    static onWhiteboard;
    constructor() {
        super();
        console.log("Document::constructor()");
        this.load_book();  
        this.init_handlers(); 
    }     
    //Initialize the Document
    private init_handlers() : void {
        var $content = $('.document-content');
        e.body.on('click', '.file-name', function() {
            var $this = $(this);
            var dec = ($this.attr('data-file'));
            var url = dec;
            Document.onWhiteboard.image( url );
        });
    }
    private load_book() : void {
        //Sample of dispplaying an image on canvas
        let $content = $('.document-content');
        let data = new Array();
        data["img/white.jpg"] = "white";
        data["img/whiteboard.jpg"] = "whiteboard";
        data["img/whiteboard2.jpg"] = "whiteboard2";
        data["img/001.jpg"] = "001";
        data["img/002.jpg"] = "002";
        data["img/003.jpg"] = "003";
        data["img/004.jpg"] = "004";
        data["img/005.jpg"] = "005";
        var m = '<ul class="dirs">';
            for ( var i in data ) {
                let dir = data[i];
                m += '<li class="file-name" data-file="'+i+'">' + dir + '</li>';
            }
            m += '</ul>';
            $content.html(m);
    }
}

