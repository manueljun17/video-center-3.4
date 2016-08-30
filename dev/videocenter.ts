/**
 * 
 * @file videocenter.ts
 * @desc
 *      It is okay for this class to be instantiated multiple times
 *      since the important part of 'socket' is only created once time even if multiple instantiation.
 */
export class VideoCenter {
    static socket: any = false;
    private static connection: any;
    private static socketUrl: string;
    constructor() {        
        VideoCenter.connection = new RTCMultiConnection();
    }

    static version() : string {
        return '3.4';
    }
    
    setSocketUrl( url : string ) : void {
        VideoCenter.socketUrl = url;
    }
    
    /**
     * @desc No matter how many times, this method is called, it will only generate the socket one time.
     */
    getSocket() : any {
        if ( VideoCenter.socket === false ) {
            VideoCenter.connection.socketURL = VideoCenter.socketUrl;
            VideoCenter.socket = VideoCenter.connection.getSocket();
        }
        return VideoCenter.socket;
    }
    static get( key: string ) : any {
        return Lockr.get( key );
    }
    static set( key: string, value: any ) : void {
        Lockr.set( key, value );
    }
}
