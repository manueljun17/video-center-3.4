import { VideoCenter as vc } from './videocenter';
import { Element as e } from './element';
import { Server as server } from './server';
import { Room as room } from './room';
import { Entrance } from './entrance';
import { User } from './user';
import './default';
export class Lobby extends vc {    
    constructor() {
        super();
        console.log("Lobby::constructor()");     
        this.initHandlers();
    }

    static show() :void {        
        server.joinLobby(lobbyRoomName, (re)=>{
            console.log("Lobby::show()=>re",re );
            e.entrance.hide();
            e.lobby.show();
            e.lobby_form_username.hide();
            e.lobby_form_roomname.hide();
            e.lobbyDisplayUsername( User.getUsername );
            server.userList( lobbyRoomName, function( users:any ) { 
                console.log(users);
                Lobby.show_user_list( users );
            } );
            server.roomList( function( rooms:any ) { 
                console.log(rooms);
                Lobby.show_room_list( rooms );
            } );
        });
    }
    
    static showMessage( data : any ) : void {
        e.lobby_display.append(e.markup_chat_message( data ));
        e.lobby_display.animate({scrollTop: e.lobby_display.prop('scrollHeight')});     
    }

    private initHandlers() : void {
        e.body.on('click', '.roomlistname', this.on_join_room );
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
        server.logout( () => {            
            User.delete_username();   
            e.lobby_display.empty();
            Entrance.show();
        });    
    }
    private on_join_room( event ) :void {
        event.preventDefault();      
        var room_id = $(this).attr('id');
        console.log(room_id);
        if(room_id=="Lobby") {
            alert('You cannot join Lobby.')
        }
        else {
            server.joinRoom( room_id, (data)=>{
                User.save_roomname( data );                
                room.show()
           
            } );
        }        
    }
    static show_user_list( users : any ) :void {
        for( let i in users ) {        
            if ( ! users.hasOwnProperty(i) ) continue;
            let user = users[i];
            let $user = e.lobby_user_list.find('[socket="'+user.socket+'"]');
            if ( $user.length ) $user.text(user.name);
            else e.appendUser( user );
        }
    }
    static update_user_list( user : any ) :void {         
       if ( e.lobby_user_list.length ) {        
            var $user = e.lobby_user_list.find('[socket="'+user.socket+'"]');
            if ( $user.length ) $user.text(user.name);
            else e.appendUser( user );
        }
    }  
    static remove_user_list( socket : any ) :void {
        e.lobby_user_list.find('[socket="'+socket+'"]').remove();     
    }   
    static show_room_list( rooms : any ) :void {
        for( let i in rooms ) {        
            if ( ! rooms.hasOwnProperty(i) ) continue;
            let room:any = rooms[i];
            let $rooms:any = e.lobby_room_list.find('[id="'+room+'"]');
            if ( $rooms.length ) $rooms.text(room);
            else e.appendRoom( room );
        }         
    } 
    static update_room_list( room : any ) :void {         
       if ( e.lobby_room_list.length ) {        
            var $room = e.lobby_room_list.find('[id="'+room.room+'"]');
            if ( $room.length ) $room.text(room.room);
            else e.appendRoom( room.room );
        }
    }  
    static remove_room_list( room : any ) :void {
        e.lobby_room_list.find('[id="'+room+'"]').remove();     
    }  
       
}