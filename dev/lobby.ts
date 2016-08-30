import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
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
            e.lobbyDisplayUsername( User.getUsername );
            server.userList( (users : any ) => {
                console.log(users);
            } );
        });
    }
    static showMessage( data : any ) : void {
        e.lobby_display.append(e.markup_chat_message( data ));
        e.lobby_display.animate({scrollTop: e.lobby_display.prop('scrollHeight')});     
    }

    private initHandlers() : void {
        e.lobby_form_username.submit( this.submit_user_name ); 
        e.lobby_form_roomname.submit( this.submit_room_name );   
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
        let username = e.lobbyUsername.val();
        if ( username == "" ) {
            alert('Username is empty.');
        }
        else {
            console.log('lobby submit username: ',  username );
            server.updateUsername( username, function(re) { 
                console.log("server.updateUsername => username => re: ", re);
                e.lobbyDisplayUsername( re );
                User.save_username( re );    
                e.lobbyUsername.val("");
                e.lobby_form_username.hide();
            } );
        }
    }
    private submit_room_name( event ) :void {
        event.preventDefault();
        let roomname = e.lobbyRoomname.val();
        if ( roomname == "" ) {
            alert('Roomname is empty.');
        }
        else {
        console.log('lobby submit roomname: ',  roomname );
        server.createRoom( roomname, function(re) { 
            console.log("server.createRoom => roomname => re: ", re);          
            User.save_roomname( re );    
            e.lobbyRoomname.val("");
            e.lobby_form_roomname.hide();
            room.show()
         } );
        }
    }
    private send_message( event ) :void {
        event.preventDefault();       
        server.chatMessage( e.lobby_message.val(), (re)=> { 
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