import { Fill } from "./Table.js";

export default class Hide extends Fill {
    constructor() {
        super();
        this.hideHash = {
            'hider-0': false,
            'hider-1': false,
            'hider-2': false,
            'hider-3': false,
        };
    }

    choose(event) {
        if (this.hideHash[event.target.id]) {
            this.hideHash[event.target.id] = false;
            this.showColumn(event, event.target.id[event.target.id.length - 1]);
        } else {
            this.hideHash[event.target.id] = true;
            this.hideColumn(event, event.target.id[event.target.id.length - 1]);
        }
    }

    hideColumn(event, idx) {
        event.target.parentNode.parentNode.classList.add('hide');
        this.stringArray.forEach( item => {
            (Array.from(item.childNodes))[idx].classList.add('hide');
        });
    }

    showColumn(event, idx) {
        event.target.parentNode.parentNode.classList.add('hide');
        this.stringArray.forEach( item => {
            (Array.from(item.childNodes))[idx].classList.add('hide');
        });
    }
}
