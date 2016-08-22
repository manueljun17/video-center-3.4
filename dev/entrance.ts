/// <reference path="../d.ts/jquery.d.ts" />
import { VideoCenter } from './videocenter';

export class Entrance extends VideoCenter {

    constructor() {
        super();
        console.log("Entrance::constructor()");
    }


    show() {
        console.log("Entrance::show()");

        let m = $('#entrance-template').html();
        console.log( m );
        $('#content').html( m );

    }


}
