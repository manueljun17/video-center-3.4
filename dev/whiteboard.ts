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
    mouse : mouse; //mouse settings
    draw_mode : string; // l-line e-erase
    draw_line_count : number; //how much drawing
    canvas : any; //canvas HTMLCanvasElement
    $canvas:any; //canvas Object
    canvas_context : CanvasRenderingContext2D; //to enable the drawing of canvas
    
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
        this.canvas_context = this.canvas.getContext('2d');
        this.set_draw_mode();
        this.$canvas = e.whiteboard.find('canvas');
        this.initHandlers();   
    }
    //Show the whiteboard
    static show() : void {
        console.log("Whiteboard::show()");          
    }
    //Initialize the whiteboard
    private initHandlers() : void {
        //events        
        console.log("canvas "+this.canvas );
        console.log("$canvas "+this.$canvas );
        //This event will run if mouse is down      
        this.canvas.onmousedown = ( e ) => {
            this.mouse.click = true;
            this.mouse.pos_prev = {x: -12345, y: -12345};
            if ( this.draw_line_count > 3500 ) {
                alert('Too much draw on whiteboard. Please clear whiteboard before you draw more.');
                this.mouse.click = false;
            }
            this.draw( e, this );        
       }
       //This event will run if mouse is up      
       this.canvas.onmousedown = ( e ) => {
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345};
       }
       //This event will run while the mouse is moving
       this.canvas.onmousemove = ( e ) => {
           if ( ! this.mouse.click ) return;
            this.draw( e, this );
            this.mouse.pos_prev = {x: -12345, y: -12345};
       }        
       //This event will run if mouse leave the canvas area
        this.$canvas.mouseleave( () => {
            this.mouse.click = false;
            this.mouse.pos_prev = {x: -12345, y: -12345}
        });
       
    } 
    //Set it to line or draw mode
    private set_draw_mode() : void {
        console.log("Whiteboard::set_draw_mode()"); 
        this.draw_mode = 'l';
        e.whiteboard.css( 'cursor', 'pointer' );         
    }  

    private draw( e, obj) : void {
        console.log("Whiteboard::draw()");          
    }    

}
