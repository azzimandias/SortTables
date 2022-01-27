class Table {
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
                this.pages = this.responseJSON.length / 10;
                this.data = this.reTyping();
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

class Fill {
    constructor() {
        this.stringArray = this.findStrings();
        this.pageControllersElement = document.querySelector('.page-controllers__pages');
    }

    findStrings() {
        const arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(document.querySelector(`.row-${i}`))
        }
        return arr;
    }

    fillInTable(array, currentPage) {
        for (let i = 0; i < this.stringArray.length; i++) {
            let arr = array[currentPage - 1][i];
            this.removeChildNodes(this.stringArray[i].childNodes);
            arr.forEach( (item, index) => {
                if (index === 2) {
                    this.stringArray[i].innerHTML += (item) ? `<td class="about">
                                                                <div class="about__body">
                                                                    <p class="about__text">${item}</p>
                                                                    <p class="about__ellipsis">...</p>
                                                                </div>
                                                               </td>` : `<td></td>`;
                } else if (index === 3) {
                    this.stringArray[i].innerHTML +=  (item) ? `<td style="background-color: ${item}"></td>` : `<td></td>`;
                } else {
                    this.stringArray[i].innerHTML += (item) ? `<td>${item}</td>` : `<td></td>`;
                }
            })
            this.renderedPath = array[currentPage - 1];
        }
        this.pageControllersElement.innerHTML = `<div>${currentPage}</div>`;
    }

    removeChildNodes(children) {
        children = Array.from(children);
        children.forEach( item => {
            item.remove();
        })
    }

    getThis(context) {
        if (context.data) this.fillInTable(context.data, context.currentPage);
    }
}

export { Table, Fill };
