import Fill from "./Fill.js";

export default class Hide extends Fill {
    constructor() {
        super();
        this.hideHash = [];
    }

    chooseAction(event) {
        this.column = document.querySelector(`#column-${event.target.id[event.target.id.length - 1]}`);
        this.sortButton = document.querySelector(`#sort-${event.target.id[event.target.id.length - 1]}`)
        if (this.hideHash[event.target.id[event.target.id.length - 1]]) {
            this.hideHash[event.target.id[event.target.id.length - 1]] = false;
            this.showColumn(event, event.target.id[event.target.id.length - 1]);
        } else {
            this.hideHash[event.target.id[event.target.id.length - 1]] = true;
            this.hideColumn(event, event.target.id[event.target.id.length - 1]);
        }
    }

    hideColumn(event, idx) {
        this.column.classList.remove('maximize-column');
        this.column.classList.remove('maximize-column-about');
        if (+idx !== 2) this.column.classList.add('minimize-column');
        else this.column.classList.add('minimize-column-about');
        this.sortButton.disabled = true;
        event.target.style.background = 'url("../../Img/hide.svg") center/20px 20px no-repeat';
        event.target.title = 'show column';
        this.abouts = document.querySelectorAll('.about__text');
        this.rowArray.forEach( (item, index) => {
            item.childNodes[idx].classList.add('hided-column');
            if (+idx === 2) this.abouts[index].classList.add('hided-column-about');
            if (+idx === 3 && item.childNodes[idx].textContent !== `❕`)
                item.childNodes[idx].style.opacity = '0';
        });
    }

    showColumn(event, idx) {
        this.column.classList.remove('minimize-column');
        if (+idx !== 2) this.column.classList.add('maximize-column');
        else this.column.classList.add('maximize-column-about');
        this.sortButton.disabled = false;
        event.target.style.background = 'url("../../Img/unhide.svg") center/20px 20px no-repeat';
        event.target.title = 'hide column';
        this.abouts = document.querySelectorAll('.about__text');
        setTimeout( () => {
            this.rowArray.forEach( (item, index) => {
                item.childNodes[idx].classList.remove('hided-column');
                if (+idx === 2) this.abouts[index].classList.remove('hided-column-about');
                if (+idx === 3 && item.childNodes[idx].textContent !== `❕`)
                    item.childNodes[idx].style.opacity = '1';
            });
        }, 250)
    }
}
