export default class Renderer {
    constructor() {
        this.rowArray = this.findStrings();
        this.pageControllersElement = document.querySelector('.page-controllers__pages');
        this.renderedPath = [];
        this.isRendered = false;
        this.observers = [];
    }

    findStrings() {
        const arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(document.querySelector(`#row-${i}`))
        }
        return arr;
    }

    renderTable(array, currentPage, hidehash=[]) {
        for (let i = 0; i < this.rowArray.length; i++) {
            let arr = array[currentPage - 1][i];
            if (arr.length) {
                arr.forEach((item, index) => {
                    this.saveHTML(item);
                    this.render(item, index, this.rowArray[i]);
                })
            } else this.fillEmptyRow(this.rowArray[i], hidehash);
        }
        document.querySelector('.info-table__body').classList.add('appearance');
        this.renderedPath = array[currentPage - 1];
        this.pageControllersElement.innerHTML = `<div>${currentPage}</div>`;
    }

    render(item, index, row) {
        if (index === 2) {
            row.innerHTML += (item && item !== 'There is no data') ? this.about : this.emptyAbout;
        } else if (index === 3) {
            row.innerHTML += (item) ? this.eyeColor : this.emptyEyeColor;
        } else {
            row.innerHTML += (item) ? this.regular : this.emptyRegular;
        }
    }

    fillEmptyRow(row, hidehash) {
        row.classList.add('empty');
        this.removeChildNodes(row.childNodes);
        this.saveHTML('');
        for (let j = 0; j < 4; j++) {
            if (!hidehash[j]) {
                if (j === 2)
                    row.innerHTML += this.emptyCellAbout;
                else row.innerHTML += this.emptyCell;
            } else {
                if (j === 2)
                    row.innerHTML += this.hidedEmptyCellAbout;
                else row.innerHTML += this.hidedEmptyCell;
            }
        }
    }

    fillRow(row, hidehash) {
        for (let j = 0; j < 4; j++) {
            if (!hidehash[j]) {
                if (j === 2) row.innerHTML += this.about;
                else if (j === 3) row.innerHTML += this.eyeColor;
                else row.innerHTML += this.regular;
            } else {
                if (j === 2) row.innerHTML += this.hidedAbout;
                else if (j === 3) row.innerHTML += this.hidedEyeColor;
                else row.innerHTML += this.hidedRegular;
            }
        }
    }

    removeEmptyRow(row, hidehash) {
        row.classList.remove('empty');
        this.removeChildNodes(row.childNodes);
        this.saveHTML('');
        this.fillRow(row, hidehash);
    }

    removeChildNodes(children) {
        children = Array.from(children);
        children.forEach( item => {
            item.remove();
        })
    }

    getThis(context) {
        if (context.data && !this.isRendered) {
            this.renderTable(context.data, context.currentPage);
            this.isRendered = true;
        }
    }

    registerObservers(...args) {
        this.observers.push(...args);
        this.sendThisToObservers();
    }

    sendThisToObservers() {
        this.observers.forEach( elem => elem.getThis(this) );
    }

    saveHTML(item) {
        this.about = `<td class="info-table__cell" tabindex="0">
                            <div class="about">
                                <span class="about__text">${item}</span>
                                <span class="about__ellipsis">...</span>
                            </div>
                        </td>`;
        this.emptyAbout = `<td tabindex="0" class="info-table__cell blurred">
                                <div class="about-blurred">
                                    <p class="about__text-blurred">There is no data</p>
                                </div>
                             </td>`;
        this.hidedAbout = `<td tabindex="0" class="info-table__cell hided-column">
                                <div class="about">
                                    <span class="about__text hided-column-about">${item}</span>
                                    <span class="about__ellipsis">...</span>
                                </div>
                             </td>`;
        this.eyeColor = `<td class="info-table__cell" tabindex="0" style="background-color: ${item}; opacity: .7;"></td>`;
        this.emptyEyeColor = `<td class="info-table__cell blurred" tabindex="0">There is no data</td>`;
        this.hidedEyeColor = `<td class="info-table__cell" tabindex="0" style="background-color: ${item}; opacity: 0;"></td>`;
        this.regular = `<td class="info-table__cell" tabindex="0">${item}</td>`;
        this.emptyRegular = `<td class="info-table__cell blurred" tabindex="0">There is no data</td>`;
        this.hidedRegular = `<td class="info-table__cell hided-column" tabindex="0">${item}</td>`;
        this.emptyCellAbout = `<td tabindex="0" class="info-table__cell blurred">
                                    <div class="about-blurred">
                                        <p class="about__text about__text-blurred">&#10069</p>
                                    </div>
                               </td>`;
        this.hidedEmptyCellAbout = `<td tabindex="0" class="info-table__cell blurred hided-column">
                                        <div class="about-blurred">
                                            <p class="about__text about__text-blurred hided-column-about">&#10069</p>
                                        </div>
                                   </td>`;
        this.emptyCell = `<td class="info-table__cell blurred" tabindex="0">&#10069</td>`;
        this.hidedEmptyCell = `<td class="info-table__cell blurred hided-column" tabindex="0">&#10069</td>`;
    }
}
