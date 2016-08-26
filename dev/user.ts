import { VideoCenter as vc } from './videocenter';
const const_username:string = "username_key";
export class User extends vc {
    constructor() {
        super();
        console.log("User::constructor()");

    }
    hasUsername() : boolean {
        return false;
    }
    static getUsername() : string {     
        let username = Lockr.get( const_username );
        return username;
    }
    static save_username( username : string ) : string {
        Lockr.set(const_username, username);      
        return  username;
    }
}