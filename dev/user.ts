import { VideoCenter as vc } from './videocenter';
export class User extends vc {
    constructor() {
        super();
        console.log("User::constructor()");

    }
    hasUsername() : boolean {
        return false;
    }
    static getUsername() : string {
        return '';
    }
}