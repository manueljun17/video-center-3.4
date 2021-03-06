import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Room } from './room';
import { Entrance } from './entrance';
import { User } from './user';
import * as de from './declare';
import './jquery-helper';

export class Lobby extends vc {    
    static doneInit: boolean = false;
    constructor() {
        super();
        console.log("Lobby::constructor()");
        this.initHandlers();
    }

    show() : void {
        server.joinRoom(de.lobbyRoomName, (re)=>{
            console.log("Lobby::show()=>re",re );
            User.save_roomname( de.lobbyRoomName );  
            e.lobby_show();           
            e.updateMyName( User.getUsername );
            server.userList( '', Lobby.show_room_list );
        });
    }    
    static addMessage( data: de.ChatMessage ) {
        e.lobby_show_message( data );
    }
    static add_private_message( data ) {    
        if ( e.lobby.private_chat( data.pmsocket ).length == 0 ) e.lobby_append_private_chat(data);
        e.lobby_add_private_chat( data );
    }
    static addMessageJoin( user: de.User ) {
        this.addMessage( { name: user.name, message: ' joins into ' + user.room });
    }
    static addMessageDisconnect( user: de.User ) {
        this.addMessage( { name: user.name, message: ' disconnect into ' + user.room });
    }
    static add_private_message_disconnect( user: de.User ) {
        let data = {name:user.name, pmsocket:user.socket,  message: ' disconnect into ' + user.room}
        e.lobby_add_private_chat( data );
    }
    

    private initHandlers() : void {
        if ( Lobby.doneInit ) return;
        Lobby.doneInit = true;
        e.lobby.on('click', '.roomname',this.on_join_room );
        e.lobby.on('click', '.name',this.on_private_message );      
        e.lobby.on('submit', '.private-chat', this.send_private_message );
        e.lobby_private_chat_container.on('click', '.private-chat-header', ( event ) => this.private_chat_slide( event ));       
        e.lobby_private_chat_container.on('click', '.chat-close', ( event ) => this.private_chat_close( event ) );          
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
    private private_chat_slide( event ){
        let chat = event.currentTarget.nextElementSibling.parentElement;            
        let socket = $(chat).attr('pmsocket')
        e.lobby.private_chat( socket ).find(".chat").slideToggle(300, 'swing');
    }   
    private private_chat_close( event ){
        event.preventDefault();           
        let chatdivider = $(event.target).parent().parent().parent();          
        // chatdivider.remove();   
        chatdivider.fadeOut(300,() => {
            chatdivider.remove();
        })
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
                User.save_username( user );
                let username : string = user.name;
                e.updateMyName( username );
                e.lobbyUsernameEmpty();
                e.lobby_hide_form_username();
            } );
        }
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
            new Room().show()
         } );
        }
    }
   
    private send_private_message( event ) :void {
        event.preventDefault();
        console.log($(this).find('[name="private-message"]'));
        let data = { message: $(this).find('[name="private-message"]').val(), pmsocket : $(this).attr('pmsocket'), name : User.getUsername }
        server.chat_private_message( data , (re)=> { 
            // console.log("server.chat_private_message => message => re: ", re);           
            $(this).find('[name="private-message"]').val("");     
         } );
    }    
    private send_message( event ) :void {
        event.preventDefault();       
        server.chat_message( e.lobby_message_value, (re)=> { 
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
            new Entrance().show();
        });    
    }
    
    private on_private_message( event ) : void {        
        console.log(this);
        let data = { name : $(this).html(), pmsocket : $(this).attr('socket') };
        if ( e.lobby.private_chat( data.pmsocket ).length == 0 ) {
            let currentuser = User.getUsername;     
            if( data.name == currentuser ) return;  
            e.lobby_append_private_chat( data );
        }    
    }
    private on_join_room( event ) : void {
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
            let room = new Room();
            room.show()           
        }        
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
    static remove_user( user: de.User ) {
        e.lobby_remove_user( user );
        //Lobby.user.remove();
        // lobby.user( user ).remove();
        $lobby.user( user ).remove();
    }

    /**
     * 
     * 
     */
    static add_user( user : de.User ) : void {
        let room_id = MD5( user.room );
        if ( $lobby.room( room_id ).length == 0 ) e.appendRoom( user.room, room_id ); // create room if it does not exist.
        e.lobby_remove_user(user); // remove the user.
        e.appendUser( room_id, user ); // append the user into the room.
    }
    static show_room_list( users: Array<de.User> ) :void {
        for( let i in users ) {
            if ( ! users.hasOwnProperty(i) ) continue;
            let user: de.User = users[i];   
            if(user.type != de.admin_type){      
                let room_id = MD5(user.room);
                let $room = e.lobby_room_list.find('[id="'+room_id+'"]');
                if ( $room.length == 0 ) e.appendRoom( user.room, room_id );            
                Lobby.add_user(user);
            }  
        }         
    }        
    static remove_room_list( room ) :void {
        let room_id = MD5( room );
        e.lobby_room_list.find('[id="'+room_id+'"]').remove();
    }  


    /**
     * -------------------------------------------------------
     * 
     * Events from Server
     * 
     * -------------------------------------------------------
     */

    
    static on_event_update_username ( user: de.User ) {
        e.lobby_update_username(user);
    }
    static on_event_join_room( user: de.User ) {
        Lobby.add_user( user );
        Lobby.addMessageJoin( user );
    }
    static on_event_disconnect_room( user: de.User ) {      
        Lobby.addMessageDisconnect( user );
        
    }

       
}