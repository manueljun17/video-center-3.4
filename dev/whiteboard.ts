import { VideoCenter as vc } from './videocenter';
import { Element } from './element';
import { Server as server } from './server';
import { User } from './user';
import { Lobby } from './lobby';
import * as de from './declare';
interface mouse {
    click: boolean;
    move: boolean;
    pos: { x:number | string, y:number | string };
    pos_prev: { x: number | string, y: number | string };
}

export class Whiteboard extends vc {    
    mouse : mouse; //mouse settings
    draw_mode : string; // l-line e-erase
    static draw_line_count : number; //how much drawing
    canvas : any; //canvas HTMLCanvasElement
    $canvas:any; //canvas Object
    static canvas_context : CanvasRenderingContext2D; //to enable the drawing of canvas
    
    constructor() {
        super();
        console.log("Whiteboard::constructor()");        
        this.mouse = {
            click: false,
            move: false,
            pos: { x:0, y:0 },
            pos_prev: { x: 0, y: 0 }
        };
        this.canvas = document.getElementById("whiteboard-canvas");       
        Whiteboard.canvas_context = this.canvas.getContext('2d');
        this.set_draw_mode();
        this.$canvas = Element.whiteboard.find('canvas');
        Whiteboard.draw_line_count = 0;
        this.initHandlers();   
    }
    //Show the whiteboard
    static show() : void {
        console.log("Whiteboard::show()");          
    }
   
    private custom_select() {     
        
        $('div.selectBox').each(function(){
            let $selectBox = $(this);         
            let $options = $(this).find( '.options' );
            let $firstOption = $(this).find( '.options option:first' );
            console.log($selectBox);            
            console.log($options);
            console.log($firstOption);
            //select the first option
            $firstOption.attr("selected", "selected");
            let $selected = $selectBox.find( '.selected' );
            //Change the selected option
            $selected
                .html( $firstOption.html() )
                .attr( 'value', $firstOption.attr('value') );
            $selected.click(function(){
                if( $options.css( 'display' ) == 'none' ) {
                    $options.css( 'display','block' );
                }
                else
                {
                    $options.css('display','none');
                }
            });
               
            $selectBox.on('click',".option", function() {    
                let $option = $(this);
                remove_selected();
                $option.attr("selected", "selected");
                display_selected();
            });

            function remove_selected(){
                $selectBox.find( '[selected = selected]' ).each(function(){
                    $(this).removeAttr('selected');
                });
            }
            function display_selected(){
                if( $options.css( 'display' ) == 'none' ) {
                    $options.css( 'display','block' );
                }
                else
                {
                    $options.css('display','none');
                }
            }
            
        });
    }
    //Initialize the whiteboard
    private initHandlers() : void {
        //events         
        this.custom_select();        
        console.log("canvas "+this.canvas );
        console.log("$canvas "+this.$canvas );
        //This event will run if mouse is down     
        this.canvas.onmousedown = ( e ) => {           
            this.mouse.click = true;
            this.mouse.pos_prev = {x: -12345, y: -12345};
            if ( Whiteboard.draw_line_count > 3500 ) {
                alert('Too much draw on whiteboard. Please clear whiteboard before you draw more.');
                this.mouse.click = false;
            }            
            this.draw( e, this.canvas );        
       }
       //This event will run if mouse is up      
       this.canvas.onmouseup = ( e ) => {            
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345};
       }
       //This event will run while the mouse is moving
       this.canvas.onmousemove = ( e ) => {          
           if ( ! this.mouse.click ) return;
               let obj = this.canvas;
               this.draw( e, obj );
       }        
       //This event will run if mouse leave the canvas area
        this.$canvas.mouseleave( () => {           
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345}
        });
       
    } 

    //Set the mode to line or draw mode
    private set_draw_mode() : void {
        console.log("Whiteboard::set_draw_mode()"); 
        this.draw_mode = 'l';
        Element.whiteboard.css( 'cursor', 'pointer' );         
    }

    //Set the mode to erase mode
    private set_erase_mode() : void {
        console.log("Whiteboard::set_erase_mode()"); 
        this.draw_mode = 'e';
        Element.whiteboard.css('cursor', 'pointer'); // apply first
        Element.whiteboard.css('cursor', '-webkit-grab'); // apply web browser can.  
    }  
    
    //Get linesize or radius of drawing
    private getLineSize () {
        return Element.selectbox_linesize_selected.attr('value'); //code#782016 custom select
    }
    //get color of drawing
    private getColor () {
        return Element.selectbox_color_selected.attr('value'); //code#782016 custom select
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
        console.log("e_posx"+e_posx);
        console.log("e_posy"+e_posy);
        let x : number = m_posx-e_posx;
        let y : number = m_posy-e_posy;
        console.log("m_posx"+m_posx);
        console.log("m_posy"+m_posy);
        console.log("x"+x);
        console.log("y"+y);
        let w : number = Element.whiteboard.width();
        let h : number = Element.whiteboard.height();

        let rx : string = (x / w).toFixed(4);
        var ry : string = (y / h).toFixed(4);
        console.log("rx"+rx);
        console.log("ry"+ry);
        this.mouse.pos.x = rx;
        this.mouse.pos.y = ry;

        if ( this.mouse.pos_prev.x == -12345 ) {
            this.mouse.pos_prev.x = this.mouse.pos.x;
            this.mouse.pos_prev.y = this.mouse.pos.y;
        }
        
        let data :any =  { line : [this.mouse.pos, this.mouse.pos_prev] };
        data.lineWidth = this.getLineSize();
        data.color = this.getColor();
        data.room_name = User.getRoomname;
        data.draw_mode = this.draw_mode;        
        server.whiteboard_draw_line( data, ()=>{
            console.log('success');
        });
        Whiteboard.draw_on_canvas( data );
        this.mouse.pos_prev.x = this.mouse.pos.x;
        this.mouse.pos_prev.y = this.mouse.pos.y;      

    }    

    static draw_on_canvas( data ) {
        let w = Element.whiteboard.width();
        let h = Element.whiteboard.height();
        console.log("W"+w);
        console.log("H"+h);
        let line = data.line;
        if ( typeof data.lineJoin == 'undefined' ) data.lineJoin = 'round';
        if ( typeof data.lineWidth == 'undefined' ) data.lineWidth = 3;
        if ( typeof data.color == 'undefined' ) data.color = 'black';
        let ox = line[0].x * w;
        let oy = line[0].y * h;
        let dx = line[1].x * w;
        let dy = line[1].y * h; 
        console.log("ox"+ox);
        console.log("oy"+oy);
        console.log("dx"+dx);
        console.log("dy"+dy);
        let ctx = this.canvas_context;  
        ctx.beginPath();
        ctx.lineJoin = data.lineJoin;
        if ( data.drawMode == 'e' ) {
        ctx.globalCompositeOperation = 'destination-out';
        data.lineWidth = 12;
        }
        else if ( data.drawMode == 'l' ) {
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
            console.log("HIHIHIHI");
        }
        this.draw_line_count ++;
        console.log('whiteboard::draw_line_count:' + this.draw_line_count);
    }
}
