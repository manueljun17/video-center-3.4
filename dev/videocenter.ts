/**
 * 
 * @file videocenter.ts
 * @desc
 *      It is okay for this class to be instantiated multiple times
 *      since the important part of 'socket' is only created once time even if multiple instantiation.
 */
export class VideoCenter {
    private static connection: any;
    private static socket: any = false;
    private static socketUrl: string;
    static _this: VideoCenter;
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
}
