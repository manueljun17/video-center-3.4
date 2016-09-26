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
            server.roomcast({ 'command' : 'whiteboard-image', 'roomname' : User.getRoomname, 'url': url }, function{
                console.log("hello");
            });
        });
    }
    private load_book() : void {        
        $.ajax({
            url: "getimage.php",
            dataType: "json",
            success: function (data) {
                let $content = $('.document-content');
                let m = '<ul class="dirs">';
                    $.each(data, function(i,filename) {
                        let removeimg = filename.replace('img\/','');
                        let newname = removeimg;
                        if( removeimg.includes("jpg") || removeimg.includes("jpeg")) newname = removeimg.replace('.jpg','');
                        if( removeimg.includes("png")) newname = removeimg.replace('.png','');
                         
                        console.log("Filename: " + newname + " img src: " + filename );
                        m += '<li class="file-name" data-file="'+filename+'">' + newname + '</li>';                       
                    });
                m += '</ul>';    
                $content.html(m);
            }
        });

        
        
    }
}

