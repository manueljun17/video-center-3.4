import { VideoCenter as vc } from './videocenter';
import { Element, Element as e } from './element';
import { Server as server } from './server';
import { Document } from './document';
import { Room as room } from './room';
import { User } from './user';
import { Lobby } from './lobby';
import * as de from './declare';

export class Whiteboard extends vc {    
    static doneInitHandler: boolean = false;
    private mouse : de.Mouse = de.mouse; //mouse settings
    private draw_line_count : number; //how much drawing
    private canvas_context : CanvasRenderingContext2D; //to enable the drawing of canvas
    /*
    *Sir the reason i use static in draw mode because when calling the set_draw_mode or set_erase_mode
    *the (this) will be the element because it was invoke by using on click so i use static instead
    */
    static draw_mode: string;// l-line e-erase
    constructor() {
        super();
        console.log("Whiteboard::constructor()");
        this.init(); 
        this.initHandlers();
    }
    
    get canvas() {
        return document.getElementsByTagName("canvas")[0];
    }
    get container() : JQuery {
        return $('#whiteboard .container');
    }
    get canvas_size() : JQuery {
        return $('#whiteboard .canvas-size');
    }
    get draw_size() : JQuery {
        return $('#whiteboard .draw-size');
    }
    get draw_color() : JQuery {
        return $('#whiteboard .draw-color');
    }

    // Initialize the whiteboard
    //
    /**
     * There is no harm calling twice on this init() over.
     */
    private init() {

        this.canvas_context = this.canvas.getContext('2d');
        this.set_draw_mode();
        this.draw_line_count = 0;
        this.clear_my_canvas();
        e.whiteboard.hide();
        this.test();
    }
    private test() {
        this.show();
    }
    /**
     * 
     * Event handlers. This must be initialized only once.
     */
    private initHandlers() : void {

        if ( Whiteboard.doneInitHandler ) return;
        Whiteboard.doneInitHandler = true;

        //events         
        e.body.on('click', 'button.eraser', this.set_erase_mode );
        e.body.on('click', 'button.clear', this.clear );       
        e.body.on('click', 'button.draw', this.set_draw_mode );
        e.body.on('change', '.canvas-size', () => this.on_change_canvas_size() );
       
        //This event will run if mouse is down        
        //this.canvas.onmousedown = e => this.on_canvas_mousedown( e );
        $('body').on('mousedown', 'canvas', e => this.on_canvas_mouse_down(e) );
        $('body').on('mousemove', 'canvas', e => this.on_canvas_mouse_move(e) );
        $('body').on('mouseup', 'canvas', e => this.on_canvas_mouse_up(e) );
        $('body').on('mouseleave', 'canvas', e => this.on_canvas_mouse_leave(e) );
        
       //This event will run if mouse is up      
       /*this.canvas.onmouseup = ( e ) => {            
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345};
       }
       */
       /*
       
       this.canvas.onmousemove = e => {          
           if ( ! this.mouse.click ) return;
               let obj = this.canvas;
               this.draw( e, obj );
       }        
       */

       //This event will run if mouse leave the canvas area
/*        this.canvas.onmouseleave = e => {
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345}
        };
        */
       
    }
    on_canvas_mouse_down( e ) { 
        this.mouse.click = true;
        this.mouse.pos_prev = {x: -12345, y: -12345};
        if ( this.draw_line_count > 3500 ) {
            alert('Too much draw on whiteboard. Please clear whiteboard before you draw more.');
            this.mouse.click = false;
        }            
        this.draw( e, this.canvas );
    } 
    on_canvas_mouse_leave( e ) {
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345}
    }
    on_canvas_mouse_up( e ) {
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345};
    }
    on_canvas_mouse_move( e ) {
        if ( ! this.mouse.click ) return;
            let obj = this.canvas;
            this.draw( e, obj );
    }        
    on_change_canvas_size() {
        let size = this.canvas_size.val();
        let w, h;
        if ( size == 'small' ) {
            w = '340';
            h = '400';
        }
        else if ( size == 'medium' ) {
            w = '480';
            h = '600';
        }
        else if ( size == 'large' ) {
            w = '600';
            h = '720';
        }
        let newCanvas = `<canvas width="${w}" height="${h}"></canvas>`;
        $( this.canvas ).replaceWith( newCanvas );       
        this.canvas_context = this.canvas.getContext('2d');
        this.container.addClass(size);
    }
   
    

    //Set the mode to line or draw mode
    private set_draw_mode() : void {
        Whiteboard.draw_mode = 'l';
        Element.whiteboard.css( 'cursor', 'pointer' );         
    }

    //Set the mode to erase mode
    private set_erase_mode() : void {
        Whiteboard.draw_mode = 'e';
        Element.whiteboard.css('cursor', 'pointer'); // apply first
        Element.whiteboard.css('cursor', '-webkit-grab'); // apply web browser can.
    }  
    
    //Get linesize or radius of drawing
    private getLineSize () {
        return this.draw_size.val(); //code#782016 custom select
    }
    //get color of drawing
    private getColor () {
        // return Element.selectbox_color_selected.attr('value');
        return this.draw_color.val(); //code#782016 custom select
    }
    //Set Drawing data
    private draw( e, obj) : void {
        var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0;
        //get mouse position on document crossbrowser        
        if ( ! e ) e = window.event;
        if (e.pageX || e.pageY){
            m_posx = e.pageX;
            m_posy = e.pageY;
        } else if (e.clientX || e.clientY){
            m_posx = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            m_posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        //get parent element position in document
        if ( obj.offsetParent){
            do {
                e_posx += obj.offsetLeft;
                e_posy += obj.offsetTop;
            } while ( obj = obj.offsetParent);
        }
        let x : number = m_posx-e_posx;
        let y : number = m_posy-e_posy;
        this.mouse.pos.x = x;
        this.mouse.pos.y = y;

        if ( this.mouse.pos_prev.x == -12345 ) {
            this.mouse.pos_prev.x = this.mouse.pos.x;
            this.mouse.pos_prev.y = this.mouse.pos.y;
        }
        let data :any =  { line : [this.mouse.pos, this.mouse.pos_prev] };
        data.lineWidth = this.getLineSize();
        data.color = this.getColor();
        data.room_name = User.getRoomname;
        data.draw_mode = Whiteboard.draw_mode;  
        data.command = "draw";      
        server.whiteboard( data, ()=>{
            console.log('success');
        });
        this.draw_on_canvas( data );
        this.mouse.pos_prev.x = this.mouse.pos.x;
        this.mouse.pos_prev.y = this.mouse.pos.y;      
    }    

    draw_on_canvas( data ) {
        
        let line = data.line;
        if ( typeof data.lineJoin == 'undefined' ) data.lineJoin = 'round';
        if ( typeof data.lineWidth == 'undefined' ) data.lineWidth = 3;
        if ( typeof data.color == 'undefined' ) data.color = 'black';
        let ox = line[0].x;
        let oy = line[0].y;
        let dx = line[1].x;
        let dy = line[1].y; 
        let ctx = this.canvas_context;  
        ctx.beginPath();
        ctx.lineJoin = data.lineJoin;
        if ( data.draw_mode == 'e' ) {       
        ctx.globalCompositeOperation = 'destination-out';
            data.lineWidth = 12;
        }
        else if ( data.draw_mode == 'l' ) {
            ctx.globalCompositeOperation = 'source-over';
        }
        // console.log("ox:%s dx:%s oy:%s ox:%s",ox,dx,oy,dy);
        // if x and y are equal, then just put a dot.
        if ( ox == dx && oy == dy ) {           
            ctx.fillStyle = data.color;
            ctx.arc( dx, dy, data.lineWidth * 0.5, 0, Math.PI*2, false);            
            ctx.closePath();
            ctx.fill();
        }
        else {
            ctx.strokeStyle = data.color;
            ctx.lineWidth = data.lineWidth;
            ctx.moveTo( ox, oy);
            ctx.lineTo( dx, dy);
            ctx.stroke();
            ctx.fillStyle = data.color;
            ctx.arc( dx, dy, data.lineWidth * 0.5, 0, Math.PI*2, false);            
            ctx.closePath();
            ctx.fill();
          
        }
        this.draw_line_count ++;
        // console.log('whiteboard::draw_line_count: ' + this.draw_line_count);
    }

    /**
     * clears my canvas only. does not broadcast.
     * @usage use it when you enter a new room ( pecifically on a new instantiation. )
     */
    clear_my_canvas() {
        //get the canvas context
        let ctx = this.canvas_context; 
        let canvas = this.canvas; 
        // Store the current transformation matrix
        ctx.save(); 
        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Restore the transform
        ctx.restore();
        // clear drawing history count
        this.draw_line_count = 0;
    }

    /**
     * Clear whiteboard and broadcast to all room users.
     */
    clear() {
        let data :any = { room_name : User.getRoomname };
        data.command = "clear";
            server.whiteboard( data, ()=>{
                console.log('clear whiteboard');
            });
    }

    isOpen() : boolean {
        return e.whiteboard.css('display') != 'none';
    }
    show() {
        e.whiteboard.removeClass('hide').addClass('show');
        e.users.removeClass('hide').addClass('show');
    }
    hide() {
        e.whiteboard.removeClass('show').addClass('hide');
        e.users.removeClass('show').addClass('hide');
    }
    socket_on_from_server (data) {
        if ( data.command == 'draw' ) {
                 this.draw_on_canvas(data);
        }
        else if ( data.command == 'history' ) { 
                 this.draw_on_canvas(data);
        }     
        else if ( data.command == 'clear' ) {
            this.clear_my_canvas();        
        }
        else if ( data.command == 'show-whiteboard' ) {
            console.log('socket_on_from_server() : command = ' + data.command );
            this.show();
        }
        else if ( data.command == 'hide-whiteboard' ) {
            console.log('socket_on_from_server() : command = ' + data.command );
            this.hide();
        }
    }
    image ( url: string ) {
        e.book.prop( 'src', url);
    }
}

