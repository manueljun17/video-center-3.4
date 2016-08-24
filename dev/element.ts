/// <reference path="../d.ts/jquery.d.ts" />
export class Element {


    constructor() {
    }

    static get entrance() : JQuery {
        return $('#entrance');
    }
    static get entranceUsernameValue () : string {
        return Element.entrance.find('[name="username"]').val();
    }
    static get lobby() : JQuery {
        return $('#lobby');
    }

}