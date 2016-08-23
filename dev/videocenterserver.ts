// Settings
interface userInterface {
    username: string;
    connectedOn: any;
    socket: string;
    roomname: string;
}
export class VideoCenterServer {
 

    user : userInterface;
    constructor() {
        console.log("VideoCenterServer constructor()");
    }

    listen() : void {
        //Socket Events Will go here
    }

    addUser(socket : any , username : string) : void { 
        let Date: any;   
        this.user.username = username || 'Anonymous';
        this.user.connectedOn = Math.floor(new Date / 1000 );
        this.user.socket = socket.id;
        this.user.roomname = "Lobby";
    } 

}