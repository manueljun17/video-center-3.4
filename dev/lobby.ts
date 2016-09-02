import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
import { Entrance } from './entrance';
import { User } from './user';
import * as dec from './declare';

export class Lobby extends vc {    
    constructor() {
        super();
        console.log("Lobby::constructor()");     
        this.initHandlers();
    }

    static show() : void {        
        server.joinRoom(dec.lobbyRoomName, (re)=>{
            console.log("Lobby::show()=>re",re );
            User.save_roomname( dec.lobbyRoomName );    
            e.entrance.hide();
            e.lobby.show();
            e.lobby_form_username.hide();
            e.lobby_form_roomname.hide();
            e.lobbyDisplayUsername( User.getUsername );
            server.userList( '', Lobby.show_room_list );
        });
    }
    
    static showMessage( data : any ) : void {
        e.lobby_display.append(e.markup_chat_message( data ));
        e.lobby_display.animate({scrollTop: e.lobby_display.prop('scrollHeight')});     
    }

    private initHandlers() : void {
        e.body.on('click', '.roomnames', this.on_join_room );
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
        console.log('Lobby create room. roomname: ' +  roomname );
        let oldroom :string= User.getRoomname;  
        server.broadcastLeave( oldroom, ()=>{
                console.log("Broadcast that you left the Lobby");
            } );   
        server.createRoom( roomname, function(re) { 
            console.log("server.createRoom => request roomname: " + roomname + ", response roomname: => re: " + re);
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
        let oldroom :string= User.getRoomname;  
        server.broadcastLeave( oldroom, ()=>{
                console.log("Broadcast that you left the Lobby");
            } );  
        server.logout( () => {            
            User.delete_username();   
            e.lobby_display.empty();
            Entrance.show();
        });    
    }
    private on_join_room( event ) :void {
        event.preventDefault();      
        var room_id = $(this).text();      
        console.log(room_id);
        if(room_id=="Lobby") {
            alert('You cannot join Lobby.')
        }
        else {     
            let oldroom :string= User.getRoomname;  
            server.broadcastLeave( oldroom, ()=>{
                console.log("Broadcast that you left the Lobby");
            } );   
            User.save_roomname( room_id );                
            room.show()           
        }        
    }
 
      
    static show_room_list( users ) :void {
        for( let i in users ) {
            if ( ! users.hasOwnProperty(i) ) continue;
            let user = users[i];
            console.log(room);
            let room_id = MD5(user.room);
            console.log("room id:" + room_id);
            let $room = e.lobby_room_list.find('[id="'+room_id+'"]');
            if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
             Lobby.update_user_list(user);
        }         
    }
    /*------fix this one---------*/
    static update_room_list( user ) :void {         
       if ( e.lobby_room_list.length ) {     
            let room_id = MD5(user.room);
            console.log("room id:" + room_id);   
            var $room = e.lobby_room_list.find('[id="'+room_id+'"]');
            if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
            Lobby.update_user_list(user);
        }
    }  
    static remove_room_list( room ) :void {
        let room_id = MD5( room );
        e.lobby_room_list.find('[id="'+room_id+'"]').remove();
    }  
    static remove_user_list( user ) :void {
        e.lobby_room_list.find('[socket="'+user.socket+'"]').remove();     
    }  
     static update_user_list( users : any ) :void {
         console.log( users);     
            let userobj = users;
            if(userobj.room){
                let room_id = MD5(userobj.room);
                console.log("room id:" + room_id);
                let $user =  e.lobby_room_list.find('[socket="'+userobj.socket+'"]');
                console.log("Useruser"+$user);           
                if ( $user.length ) $user.text(", "+userobj.name);
                else e.appendUser( room_id ,userobj.name,userobj.socket );
            }
                
    }
       
}