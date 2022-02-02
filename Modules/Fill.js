import Renderer from "./Renderer.js";
export default class Fill extends Renderer {    // Отвечает за заполнение отрисовонной таблицы, или за переотрисовку строк, ячеек
    fillInTable(array, currentPage, hideHash=[]) {      // Заполенение таблицы, нужно для изменения выводимых данных, при изменения пользователем страницы
        this.aboutsInTable = document.querySelectorAll('.about__text');
        for (let i = 0; i < this.rowArray.length; i++) {
            let row = array[currentPage - 1][i];
            if (row.length) {
                if (Array.from(this.rowArray[i].classList).includes('empty')) {
                    this.removeEmptyRow(this.rowArray[i], hideHash);
                    this.aboutsInTable = document.querySelectorAll('.about__text');
                }
                row.forEach((item, index) => {
                    if (this.rowArray[i].childNodes[index].className.includes('blurred')) {
                        this.replaceNoDataCell(i, index, hideHash);
                        this.aboutsInTable = document.querySelectorAll('.about__text');
                    }
                    if (!item) this.renderNoDataCell(i, index, hideHash);
                    else if (index === 2) this.aboutsInTable[i].innerHTML = `${item}`;
                    else if (index === 3 && !hideHash[index]) {
                        Array.from(this.rowArray[i].childNodes)[index].style.backgroundColor = `${item}`;
                        Array.from(this.rowArray[i].childNodes)[index].style.opacity = '.7';
                    }
                    else Array.from(this.rowArray[i].childNodes)[index].innerHTML = `${item}`;
                })
            } else this.fillEmptyRow(this.rowArray[i], hideHash);
        }
        this.renderedPath = array[currentPage - 1];
        this.pageControllersElement.innerHTML = `<div>${currentPage}</div>`;
    }

    fillEyeColor() {
        this.rowArray.forEach(item => {
            let color = item.childNodes[3].textContent;
            if (color) {
                if (item.childNodes[3].textContent !== '❕' && item.childNodes[3].textContent !== 'There is no data')
                    item.childNodes[3].textContent = '';
                item.childNodes[3].style.backgroundColor = color;
                item.childNodes[3].style.opacity = '.7';
            }
        });
    }

    getThis(context, data, currentPage) {   // Получает данные от Renderer один раз, чтобы
        this.fillInTable(data, currentPage);    // запустить функцию заполнения только что отрисованной таблицы
    }
}
