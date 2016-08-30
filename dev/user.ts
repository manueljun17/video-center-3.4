import { VideoCenter as vc } from './videocenter';
const const_username:string = "username_key";
const const_roomname:string = "roomname_key";
export class User extends vc {
    constructor() {
        super();
        console.log("User::constructor()");

    }
    public hasUsername() : boolean {
        return !! vc.get( const_username );
    }
    static get getUsername() : string {     
        let username = vc.get( const_username );
        return username;
    }
    static save_username( username : string ) : string {
        vc.set(const_username, username);
        console.log("User update it's name to:", username);
        return  username;
    }
    static delete_username() : void {
        vc.set(const_username, '');
    }
    static get getRoomname() : string {     
        let roomname = vc.get( const_roomname );
        return roomname;
    }
    static save_roomname( roomname : string ) : string {
        vc.set(const_roomname, roomname);
        console.log("User update it's roomname to:", roomname);
        return  roomname;
    }
    static delete_roomname() : void {
        vc.set(const_roomname, '');
    }
}