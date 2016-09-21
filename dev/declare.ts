export const lobbyRoomName:string = 'Lobby';
export const socket_server_url:string = 'http://dev.withcenter.com:9001/';
// export const socket_server_url:string = 'http://localhost:9001';
export interface S {
    ( str: string ) : void;
}
export interface ChatMessage {
    name: string;
    room?: string;
    message: string;
}
export interface User {
    name: string;
    room: string;
    socket: string; // socket id
}