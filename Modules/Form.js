export default class Form {
    constructor() {
        this.bait = document.querySelector('.bait');
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.input__label');
        this.textarea = document.querySelector('.textarea__label');
    }

    searchingCell(event, renderedPath, hideHash) {
        if (event) {
            let tbody = document.querySelector('tbody');
            let tr = event.target.closest('tr')
            this.selectedCell = event.target.closest('td')
            let i = Array.from(tbody.children).indexOf(tr, 0);
            let j = Array.from(tr.children).indexOf(this.selectedCell, 0);
            this.selectedTableCell = {
                row: i,
                column: j,
                data: renderedPath[i][j],
            };
            this.closeForm();
            if (!hideHash[this.selectedTableCell.column] && this.selectedTableCell.data !== undefined) {
                if (!this.selected) {
                    this.selected = this.selectedCell;
                    this.selected.classList.add('selected');
                } else if (this.selected === this.selectedCell) {
                    this.clearSelection();
                } else {
                    this.selected.classList.remove('selected');
                    this.selected = this.selectedCell;
                    this.selected.classList.add('selected');
                }
            } else this.clearSelection();
        } else this.clearSelection();
    }

    actionChoiceForm(event, sortedArray) {
        if (this.selectedTableCell && event.target.className === 'bait') {
            this.openForm();
        } else if (event.target.className === 'apply') {
            this.acceptChanges(sortedArray);
            this.clearSelection();
            this.closeForm();
        } else if (event.target.className === 'cancel') {
            this.closeForm();
        }
    }

    openForm() {
        this.bait.classList.add('hidee');
        this.form.classList.add('visible');
        if (this.selectedTableCell.column !== 2) {
            this.input.classList.add('visible');
            this.input.control.type = 'text';
            this.input.control.value = this.selectedTableCell.data;
        } else {
            this.textarea.classList.add('visible');
            this.textarea.control.value = this.selectedTableCell.data;
        }
    }

    acceptChanges(sortedArray) {
        if (sortedArray) {
            sortedArray[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column] =
                (this.input.className.includes('visible')) ? this.input.control.value : this.textarea.control.value;
            this.fillInCell(sortedArray[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column]);
        } else {
            this.data[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column] =
                (this.input.className.includes('visible')) ? this.input.control.value : this.textarea.control.value;
            this.fillInCell(this.data[this.currentPage - 1][this.selectedTableCell.row][this.selectedTableCell.column]);
        }
    }

    fillInCell(cell) {
        if (cell) {
            if (this.selectedTableCell.column === 3) {
                this.selectedCell.style.backgroundColor = `lavender`;
                this.selectedCell.style.backgroundColor = `${cell}`;
                this.selectedCell.innerHTML = ``;
            } else if (this.selectedTableCell.column === 2) {
                document.querySelectorAll('.about__text')[this.selectedTableCell.row].innerHTML = `${cell}`;
            } else {
                this.selectedCell.innerHTML = `${cell}`;
                this.selectedCell.classList.remove('blurred');
            }
        } else {
            if (this.selectedTableCell.column === 3) {
                this.selectedCell.style.backgroundColor = `lavender`;
                this.selectedCell.style.opacity = `.5`;
                this.selectedCell.innerHTML = `There is no data`;
            } else if (this.selectedTableCell.column === 2) {
                this.selectedCell.innerHTML = `<td tabindex="0" class="info-table__cell blurred">
                                                    <div class="about-blurred">
                                                        <p class="about__text-blurred">There is no data</p>
                                                    </div>
                                                </td>`;
            } else {
                this.selectedCell.innerHTML = `There is no data`;
            }
            this.selectedCell.classList.add('blurred');
        }
    }

    clearSelection() {
        if (this.selected)  this.selected.classList.remove('selected');
        if (this.selectedCell) this.selectedCell.blur();
        this.selected = undefined;
        this.selectedTableCell = undefined;
    }

    closeForm() {
        this.bait.classList.remove('hidee');
        this.form.classList.remove('visible');
        this.input.classList.remove('visible');
        this.textarea.classList.remove('visible');
    }

    getThis(context) {
        this.data = context.data;
        this.currentPage = context.currentPage;
    }
}
