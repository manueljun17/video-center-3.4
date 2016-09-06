import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
import { Entrance } from './entrance';
import { User } from './user';
import * as de from './declare';
export class Lobby extends vc {    
    constructor() {
        super();
        console.log("Lobby::constructor()");     
        this.initHandlers();
    }

    static show() : void {        
        server.joinRoom(de.lobbyRoomName, (re)=>{
            console.log("Lobby::show()=>re",re );
            User.save_roomname( de.lobbyRoomName );  
            e.lobby_show();           
            // e.lobbyDisplayUsername( User.getUsername );
            server.userList( '', Lobby.show_room_list );
        });
    }
    
    static showMessage( data: de.ChatMessage ) {
        this.addMessage( data );        
    }
    static addMessage( data: de.ChatMessage ) {
        e.lobby_show_message( data );
    }
    static addMessageJoin( user: de.User ) {
        this.addMessage( { name: user.name, message: ' join into ' + user.room });
    }

    private initHandlers() : void {
        e.body.on('click', '.roomname', this.on_join_room );
        e.lobby_form_username.submit( this.update_username ); 
        e.lobby_form_roomname.submit( this.create_join_room );   
        e.lobby_send_message.submit( this.send_message );      
        e.lobby_onclick_form_username.click( ()=> {
            e.lobby_hide_form_roomname();                  
            e.lobby_show_form_username();            
        } );
        e.lobby_onclick_form_roomname.click( ()=> {
            e.lobby_hide_form_username();  
            e.lobby_show_form_roomname();         
        } );
        e.lobby_onclick_logout.click( this.on_logout );
    }
    private update_username( event ) :void {
        event.preventDefault();
        let username = e.lobbyUsernameValue;
        if ( username == "" ) {
            alert('Username is empty.');
        }
        else {
            console.log('lobby submit username: ',  username );
            server.updateUsername( username, function( user: de.User ) {
                console.log("server.updateUsername => username => re: ", user);
                // e.lobbyDisplayUsername( user );
                User.save_username( user );    
                e.lobbyUsernameEmpty();
                e.lobby_hide_form_username();
            } );
        }
    }
    static on_event_update_username ( user: de.User ) {
        e.lobby_update_username(user);
    }
    private create_join_room( event ) :void {
        event.preventDefault();
        let roomname = e.lobbyRoomnameValue;
        if ( roomname == "" ) {
            alert('Roomname is empty.');
        }
        else {
        console.log('Lobby create room. roomname: ' +  roomname );
        let oldroom :string= User.getRoomname;  
      
        server.createRoom( roomname, function(re) { 
            console.log("server.createRoom => request roomname: " + roomname + ", response roomname: => re: " + re);
            User.save_roomname( re );
            e.lobbyRoomnameEmpty();
            e.lobby_hide_form_roomname();
            room.show()
         } );
        }
    }
    private send_message( event ) :void {
        event.preventDefault();       
        server.chatMessage( e.lobby_message_value, (re)=> { 
            console.log("server.sendMessage => message => re: ", re);           
            e.lobby_message_empty();      
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
           
            e.lobby_display_empty();
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
            let room_id = MD5(user.room);
            console.log("room id:" + room_id);
            let $room = e.lobby_room_list.find('[id="'+room_id+'"]');
            if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
            Lobby.add_user(user);
        }         
    }
    /*------fix this one---------*/
    static update_room_list( user ) :void {         
       if ( e.lobby_room_list.length ) {     
            let room_id = MD5(user.room);
            console.log("room id:" + room_id);   
            var $room = e.lobby_room_list.find('[id="'+room_id+'"]');
            if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
            Lobby.add_user(user);
        }
    }  
    static remove_room_list( room ) :void {
        let room_id = MD5( room );
        e.lobby_room_list.find('[id="'+room_id+'"]').remove();
    }  
    /**
     * This method will be called
     *      When : a user leave a lobby
     *      To :
     *              - USER himself.
     *              - Members in lobby.
     *              - Member of the room that the USER want to join.
     *          
     */
    static remove_user_list( user ) :void {
        // don't care about lobby is visible or not.
        e.lobby_room_list.find('[socket="'+user.socket+'"]').remove();     
    }

    static add_user( user : any ) : void {
        if ( typeof user.room != 'undefined' && user.room ) {
            let room_id = MD5( user.room );           
            let $user =  e.lobby_room_list.find('[socket="'+user.socket+'"]');  
            if ( $user.length == 0 ) e.appendUser( room_id ,user.name, user.socket );           
        }
    }
       
}