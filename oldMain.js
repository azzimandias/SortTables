/*
class OldMain {
    constructor() {
        this.pages = 0;
        this.currentPage = 1;
    }

    currentPagePlus () {
        return this.currentPage + 1;
    }

    currentPageMinus () {
        return this.currentPage - 1;
    }
}

class Table extends OldMain {
    constructor() {
        super();
        fetch('./data.json')
            .then(res => res.json())
            .then(res => {
                this.responseJSON = res;
                this.pages = this.responseJSON.length / 10;
                this.pageControllersElement = document.querySelector('.page-controllers__pages');
            });
    }

    plus() {
        this.currentPage = this.currentPagePlus();
    }
    minus() {
        this.currentPage = this.currentPageMinus();
    }
}

class Fill extends Table {
    constructor() {
        super();
        this.stringArray = this.findStrings();
        this.hideHash = {
            'hider-1': false,
            'hider-2': false,
            'hider-3': false,
            'hider-4': false,
        };
        this.isSortedA_Z = false;
        this.isSortedZ_A = false;
        this.currentColumn = 0;
        this.sortedArray = 0;
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.input__label');
        this.textarea = document.querySelector('.textarea__label');
        this.apply = document.querySelector('.apply');
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
        if (this.isSortedA_Z || this.isSortedZ_A) {
            this.sortedArray = arr;
        }
        return arr;
    }

    findStrings() {
        const arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(document.querySelector(`.row-${i}`))
        }
        return arr;
    }

    fillInTable(array) {
        for (let i = 0; i < this.stringArray.length; i++) {
            let arr = array[this.currentPage - 1][i];
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
            this.renderedPath = array[this.currentPage - 1];
        }
        this.pageControllersElement.innerHTML = `<p>${this.currentPage}</p>`;
    }

    removeChildNodes(children) {
        children = Array.from(children);
        children.forEach( item => {
            item.remove();
        })
    }

    actionChoiceTable(event) {
        if (event.target.id.includes('hider')) {
            this.hiding(event);
        } else if (event.target.id.includes('sort')) {
            this.sorting(event);
        }
        this.closeForm();
    }

    hiding(event) {
        if (this.hideHash[event.target.id]) {
            this.hideHash[event.target.id] = false;
            this.showColumn(event, event.target.id[event.target.id.length - 1] - 1);
        } else {
            this.hideHash[event.target.id] = true;
            this.hideColumn(event, event.target.id[event.target.id.length - 1] - 1);
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

    sorting(event) {
        if (this.currentColumn === event.target.id[event.target.id.length - 1]) {
            if (this.isSortedA_Z) {
                this.isSortedA_Z = false;
                this.isSortedZ_A = true;
                this.fillInTable(this.sortZ_A(this.currentColumn - 1));
            } else if (this.isSortedZ_A) {
                this.isSortedZ_A = false;
                this.sortedArray = 0;
                this.fillInTable(this.data);
            } else {
                this.currentColumn = event.target.id[event.target.id.length - 1]
                this.isSortedA_Z = true;
                this.fillInTable(this.sortA_Z(this.currentColumn - 1));
            }
        } else {
            this.currentColumn = event.target.id[event.target.id.length - 1]
            this.isSortedA_Z = true;
            this.fillInTable(this.sortA_Z(this.currentColumn - 1));
        }
    }

    sortA_Z(idx) {
        return this.splitPages(this.data.flat().sort((a, b) => {
            if (a[idx] > b[idx]) return 1;
            if (a[idx] === b[idx]) return 0;
            if (a[idx] < b[idx]) return -1;
        }));
    }

    sortZ_A(idx) {
        return this.splitPages(this.data.flat().sort((a, b) => {
            if (a[idx] < b[idx]) return 1;
            if (a[idx] === b[idx]) return 0;
            if (a[idx] > b[idx]) return -1;
        }));
    }

    plus() {
        this.closeForm();
        this.currentPage = this.currentPagePlus();
        if (this.sortedArray)
            this.fillInTable(this.sortedArray);
        else
            this.fillInTable(this.data);
    }
    minus() {
        this.closeForm();
        this.currentPage = this.currentPageMinus();
        if (this.sortedArray)
            this.fillInTable(this.sortedArray);
        else
            this.fillInTable(this.data);
    }

    searching(event) {
        let tbody = document.querySelector('tbody');
        let tr = event.target.closest('tr')
        this.selectedCell = event.target.closest('td')
        let i = Array.from(tbody.children).indexOf(tr, 0);
        let j = Array.from(tr.children).indexOf(this.selectedCell, 0);
        this.selectedTableCell = {
            row: i,
            column: j,
            data: this.renderedPath[i][j],
        };

        this.closeForm();
        if (!this.selected) {
            this.selected = this.selectedCell;
            this.selected.classList.add('selected');
        } else if (this.selected === this.selectedCell) {
            this.selected.classList.remove('selected');
            this.selected = undefined;
        } else {
            this.selected.classList.remove('selected');
            this.selected = this.selectedCell;
            this.selected.classList.add('selected');
        }
    }

    actionChoiceForm(event) {
        if (this.selectedTableCell && event.target.className === 'bait') {
            this.openForm();
        } else if (event.target.className === 'apply') {
            this.acceptChanges();
        } else if (event.target.className === 'cancel') {
            this.closeForm();
        }
    }

    openForm() {
        this.form.classList.add('visible');
        if (this.selectedTableCell.column <= 1) {
            this.input.classList.add('visible');
            this.input.control.type = 'text';
            this.input.control.value = this.selectedTableCell.data;
        } else if (this.selectedTableCell.column === 2) {
            this.textarea.classList.add('visible');
            this.textarea.control.value = this.selectedTableCell.data;
        } else if (this.selectedTableCell.column === 3) {
            this.input.classList.add('visible');
            this.input.control.type = 'color';
            this.input.control.value = this.selectedTableCell.data;
        }
    }

    acceptChanges() {
        if (this.sortedArray) {
            this.sortedArray[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column] =
                (this.input.className.includes('visible')) ? this.input.control.value : this.textarea.control.value;
            this.fillInCell(this.sortedArray[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column]);
        } else {
            this.data[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column] =
                (this.input.className.includes('visible')) ? this.input.control.value : this.textarea.control.value;
            this.fillInCell(this.data[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column]);
        }
    }

    fillInCell(cell) {
        this.selectedCell.innerHTML = (cell) ? `${cell}` : ' ';
    }

    closeForm() {
        this.form.classList.remove('visible');
        this.input.classList.remove('visible');
        this.textarea.classList.remove('visible');
    }
}

class Arrow extends Table {
    constructor(elem) {
        super();
        this.elem = elem;
    }

    disable() {
        this.elem.disabled = true;
    }

    enable() {
        this.elem.disabled = false;
    }
}

const fill = new Fill();

fill.thead = document.querySelector('thead');
fill.thead.addEventListener('click', fill.actionChoiceTable.bind(fill))

const interval = setInterval(() => {
    if (fill.responseJSON) {
        fill.data = fill.reTyping();
        fill.fillInTable(fill.data);
        clearInterval(interval);
    }
}, 1);

const back = new Arrow(document.querySelector('.page-controllers__back'));
const forward = new Arrow(document.querySelector('.page-controllers__forward'));

back.elem.addEventListener('click', back.minus.bind(back));
back.elem.addEventListener('click', forward.minus.bind(forward));

forward.elem.addEventListener('click', back.plus.bind(back));
forward.elem.addEventListener('click', forward.plus.bind(forward));

back.elem.addEventListener('click', fill.minus.bind(fill));
forward.elem.addEventListener('click', fill.plus.bind(fill));

const forBack = setInterval(() => {
    if (back.currentPage === 1) {
        back.disable();
    } else {
        back.enable();
    }
    console.log(forward.pages)
    if (forward.currentPage === forward.pages) {
        forward.disable();
    } else {
        forward.enable();
    }
}, 1);

document.querySelector('tbody').addEventListener('click', fill.searching.bind(fill));
document.querySelector('.left-side').addEventListener('click', fill.actionChoiceForm.bind(fill));
*/
