export const lobbyRoomName:string = 'Lobby';
export interface S {
    ( str: string ) : void;
}
export interface ChatMessage {
    name: string;
    message: string;
}
export interface User {
    name: string;
    room: string;
    socket: string; // socket id
}