export const lobbyRoomName:string = 'Lobby';
export const user_type:string = 'User';
export const admin_type:string = 'Admin';
declare var _serverUrl;
declare var _uploadUrl;
export const uploadUrl = _uploadUrl;
export const socket_server_url:string = _serverUrl;
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
    socket: string
    type: string;
}
export interface Mouse {
    click: boolean;
    move: boolean;
    pos: { x:number | string, y:number | string };
    pos_prev: { x: number | string, y: number | string };
}
export let mouse: Mouse = {
        click: false,
        move: false,
        pos: { x:0, y: 0},
        pos_prev: { x: 0, y: 0 }
}