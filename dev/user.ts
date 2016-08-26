import { VideoCenter as vc } from './videocenter';
const const_username:string = "username_key";
export class User extends vc {
    constructor() {
        super();
        console.log("User::constructor()");

    }
    hasUsername() : boolean {
        let username = Lockr.get( const_username );
        if ( typeof username === undefined || username === "" || typeof username === "null" || username.length == 0 ) {         
            console.log(username.length);  
            return false;
        }
        else {            
            console.log(username.length);
            return true;
        }    
    }
    static get getUsername() : string {     
        let username = Lockr.get( const_username );
        return username;
    }
    static save_username( username : string ) : string {
        Lockr.set(const_username, username);
        console.log("User update it's name to:", username);
        return  username;
    }
    static delete_username() : void {
        Lockr.set(const_username, '');
    }
}