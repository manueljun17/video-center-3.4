import { VideoCenter as vc } from './videocenter';
export class Server extends vc {

    private socket: any;
    constructor() {
        super();
        this.socket = super.getSocket();
    }

    private emit( protocol: string, data: any ) {
        this.socket.emit( protocol, data );
    }
    
    ping(callback) : void {
        this.emit( 'ping', (re) => {
            // this;
            callback( re );
        });
    }
}