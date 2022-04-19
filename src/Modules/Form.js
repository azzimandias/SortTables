export default class Form {     // Отвечает за работу с формой
    constructor() {
        this.bait = document.querySelector('.bait');
        this.form = document.querySelector('.form');
        this.input = document.querySelector('.form__input');
        this.textarea = document.querySelector('.form__textarea');
    }

    actionChoiceForm(event, sortedArray, pointer) {     // В зависимости от нажатого элемента выполнить действие
        if (pointer && event.target.className.includes('bait')) {
            this.openForm(pointer);
        } else if (event.target.className.includes('apply')) {
            this.saveChanges(sortedArray, pointer);
            return this.closeForm();
        } else if (event.target.className.includes('cancel')) {
            return this.closeForm();
        }
    }

    openForm(pointer) {     // Отобразить форму на странице
        this.bait.classList.add('hided');
        this.form.classList.add('visible');
        if (pointer.column !== 2) {
            this.input.classList.add('visible');
            this.input.children['input'].value = pointer.data;
        } else {    // Для колонки about отобразить textarea
            this.textarea.classList.add('visible');
            this.textarea.querySelector('#textarea').value = pointer.data;
        }
    }

    saveChanges(sortedArray, pointer) {
        const inputClName = this.input.className;
        if (sortedArray) {
            let sortedCell = (inputClName.includes('visible')) ? this.input.children['input'].value :
                this.textarea.querySelector('#textarea').value;
            sortedArray[this.currentPage][pointer.row][pointer.column] = sortedCell;
            this.fillInCell(sortedCell, pointer);
        } else {
            let dataCell = (inputClName.includes('visible')) ? this.input.children['input'].value :
                this.textarea.querySelector('#textarea').value;
            this.data[this.currentPage][pointer.row][pointer.column] = dataCell;
            this.fillInCell(dataCell, pointer);
        }
    }

    fillInCell(value, pointer) {    // Записать изменение в ячейку
        const aboutText = document.querySelectorAll('.about__text');
        if (value) {    // Отображение новых данных в ячейке
            if (pointer.column === 3) {
                pointer.elemHTML.style.backgroundColor = `lavender`;
                pointer.elemHTML.style.backgroundColor = `${value}`;
                pointer.elemHTML.innerHTML = ``;
            } else if (pointer.column === 2) {
                aboutText[pointer.row].innerHTML = `${value}`;
            } else {
                pointer.elemHTML.innerHTML = `${value}`;
                pointer.elemHTML.classList.remove('blurred');
            }
        } else {    // Отображение пустой ячейки в зависимости от столбца
            if (pointer.column === 3) {
                pointer.elemHTML.style.backgroundColor = `lavender`;
                pointer.elemHTML.style.opacity = `.5`;
                pointer.elemHTML.innerHTML = `There is no data`;
            } else if (pointer.column === 2) {
                pointer.elemHTML.innerHTML = `<td tabindex="0" class="info-table__cell blurred">
                                                    <div class="about-blurred">
                                                        <p class="about__text-blurred">There is no data</p>
                                                    </div>
                                                </td>`;
            } else {
                pointer.elemHTML.innerHTML = `There is no data`;
            }
            pointer.elemHTML.classList.add('blurred');
        }
    }

    closeForm() {       // Скрыть отображение формы на страницк
        this.bait.classList.remove('hided');
        this.form.classList.remove('visible');
        this.input.classList.remove('visible');
        this.textarea.classList.remove('visible');
        return 'closed';
    }

    getThis(context) {
        this.data = context.data;
        this.currentPage = context.currentPage - 1;
    }
}
