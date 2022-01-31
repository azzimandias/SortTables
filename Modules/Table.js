export default class Table {
    constructor() {
        this.pages = 0;
        this.currentPage = 1;
        this.observers = [];
    }

    getDataFromServer() {
        fetch('../data.json')
            .then(res => res.json())
            .then(res => {
                this.responseJSON = res;
                this.pages = Math.ceil(this.responseJSON.length / 10);
                this.data = this.reTyping();
                this.checkLastPage();
                this.sendThisToObservers();
            });
    }

    reTyping() {
        let resJSON = [...this.responseJSON];
        return this.splitPages(resJSON.map( item => {
            const arr = [];
            arr.push(item.name.firstName, item.name.lastName, item.about, item.eyeColor);
            return arr;
        }));
    }

    splitPages(resJSON) {
        const arr = [];
        let x = this.responseJSON.length / 10;
        for (x; x > 0; x--) {
            arr.push(resJSON.slice(0, 10));
            resJSON.splice(0, 10);
        }
        return arr;
    }

    checkLastPage() {
        if (this.data[this.data.length - 1].length !== 10) {
            while(this.data[this.data.length - 1].length < 10) {
                this.data[this.data.length - 1].push([]);
            }
        }
    }

    registerObservers(...args) {
        this.observers.push(...args);
        this.sendThisToObservers();
    }

    sendThisToObservers() {
        this.observers.forEach( elem => elem.getThis(this) );
    }

    currentPageMinus () {
        this.currentPage--;
        this.sendThisToObservers();
    }

    currentPagePlus () {
        this.currentPage++;
        this.sendThisToObservers();
    }
}
