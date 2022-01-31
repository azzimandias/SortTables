import Renderer from "./Renderer.js";
export default class Fill extends Renderer {
    fillInTable(array, currentPage, hidehash=[]) {
            this.aboutsInTable = document.querySelectorAll('.about__text');
            for (let i = 0; i < this.rowArray.length; i++) {
                let arr = array[currentPage - 1][i];
                if (arr.length) {
                    if (Array.from(this.rowArray[i].classList).includes('empty')) {
                        this.removeEmptyRow(this.rowArray[i], hidehash);
                        this.aboutsInTable = document.querySelectorAll('.about__text');
                    }
                    arr.forEach((item, index) => {
                        if (index === 2) this.aboutsInTable[i].innerHTML = `${item}`;
                        else if (index === 3) Array.from(this.rowArray[i].childNodes)[index].style.backgroundColor = `${item}`;
                        else Array.from(this.rowArray[i].childNodes)[index].innerHTML = `${item}`;
                    })
                } else this.fillEmptyRow(this.rowArray[i], hidehash);
            }
            this.renderedPath = array[currentPage - 1];
            this.pageControllersElement.innerHTML = `<div>${currentPage}</div>`;
    }

    getThis(context) {
        if (context.isRendered) this.isRendered = context.isRendered;
        if (context.data && this.isRendered) this.fillInTable(context.data, context.currentPage);
    }
}
