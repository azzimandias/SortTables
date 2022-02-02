export default class Pointer {      // Отвечает за поиск и созранение указанной пользователем ячейки
    searchingCell(event, renderedPath, hideHash) {
        if (event) {
            this.findTarget(event, renderedPath);
            if (!hideHash[this.pointer.column] && this.pointer.data !== undefined) {
                this.putPointer();
            } else this.clearSelection();
        } else this.clearSelection();
    }

    findTarget(event, renderedPath) {   // Сохранение информации о ячейке в pointer
        let tbody = document.querySelector('tbody');
        let tr = event.target.closest('tr')
        this.selectedCell = event.target.closest('td')
        let i = Array.from(tbody.children).indexOf(tr, 0);
        let j = Array.from(tr.children).indexOf(this.selectedCell, 0);
        this.pointer = {
            row: i,
            column: j,
            data: renderedPath[i][j],
            elemHTML: this.selectedCell,
        };
    }

    putPointer() {      // Установка стилей указателя на ячейку
        if (!this.selected) {
            this.selected = this.selectedCell;
            this.selected.classList.add('selected');
        } else if (this.selected === this.selectedCell) {
            this.clearSelection();  // если указана таже ячейка, то сбросить указатель
        } else {
            this.selected.classList.remove('selected');
            this.selected = this.selectedCell;
            this.selected.classList.add('selected');
        }
    }

    clearSelection() {      // Забываем выбранную ячейку
        if (this.selected)  this.selected.classList.remove('selected');
        if (this.selectedCell) this.selectedCell.blur();
        this.selected = undefined;
        this.pointer = undefined;
    }
}
