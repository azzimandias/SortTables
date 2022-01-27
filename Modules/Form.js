export default class Form {
    constructor() {
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.input__label');
        this.textarea = document.querySelector('.textarea__label');
        this.apply = document.querySelector('.apply');
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

    getThis(context) {
        this.data = context.data;
        this.currentPage = context.currentPage;
    }
}
