import {Chat} from './chat';
import * as de from './declare';
let chat = new Chat( de.socket_server_url );
chat.start();
