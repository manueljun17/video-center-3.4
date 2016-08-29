import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Entrance } from './entrance';
import { User } from './user';

export class Lobby extends vc {    
    constructor() {
        super();
        console.log("Lobby::constructor()");     
        this.initHandlers();
    }

    static show() :void {        
        server.joinLobby(()=>{
            console.log("Lobby::show()");
            e.entrance.hide();
            e.lobby.show();
            e.lobby_form_username.hide();
            e.lobby_form_roomname.hide();
            let username : any = User.getUsername;
            e.lobbyDisplayUsername( username );
        });        
    }
    static showMessage( data : any ) : void {
        e.lobby_display.append(e.chat_message( data ));
        e.lobby_display.animate({scrollTop: e.lobby_display.prop('scrollHeight')});
        // lobbyDisplay().append( markup.chatMessage( message ) );
        // lobbyDisplay().animate({scrollTop: lobbyDisplay().prop('scrollHeight')});
    }

    private initHandlers() : void {
        e.lobby_form_username.submit( this.submit_user_name );   
        e.lobby_send_message.submit( this.send_message );      
        e.lobby_onclick_form_username.click( ()=>{
            e.lobby_form_roomname.hide();
            e.lobby_form_username.show();
        } );
        e.lobby_onclick_form_roomname.click( ()=>{
            e.lobby_form_username.hide();
            e.lobby_form_roomname.show();
        } );
        e.lobby_onclick_logout.click( this.on_logout );   
             
    }
    private submit_user_name( event ) :void {
        event.preventDefault();
        console.log('lobby submit username: ',  e.lobbyUsername.val() );
        server.updateUsername( e.lobbyUsername.val(), function(re) { 
            console.log("server.updateUsername => username => re: ", re);
            e.lobbyDisplayUsername( re );
            User.save_username( re );    
            e.lobbyUsername.val("");
            e.lobby_form_username.hide();
         } );
    }
    private send_message( event ) :void {
        event.preventDefault();       
        server.sendMessage( e.lobby_message.val(), (re)=> { 
            console.log("server.sendMessage => message => re: ", re);              
            e.lobby_message.val("");       
         } );
    }
    private on_logout( event ) :void {
        event.preventDefault();
        console.log("on_logout()");
        server.logout( () => {            
            User.delete_username();   
            e.lobby_display.empty();
            Entrance.show();
        });    
    }
       
}