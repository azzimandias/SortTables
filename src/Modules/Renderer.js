export default class Renderer {     // Отвечает за отрисовку таблицы, строк, ячеек
    constructor() {
        this.rowArray = this.findStrings();
        this.pageControllersElement = document.querySelector('.page-controllers__pages');
        this.renderedPath = [];
        this.isRendered = false;
        this.observers = [];
        this.saveHTML();
    }

    findStrings() {
        const arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(document.querySelector(`#row-${i}`))
        }
        return arr;
    }

    renderTable(array, currentPage, hideHash=[]) {  // Запускается один раз, асинхронно
        for (let i = 0; i < this.rowArray.length; i++) {  // сразу после получения и преобразования данных в Table
            let row = array[currentPage - 1][i];    // Выбираем данные только для нужной страницы
            if (row.length) {
                row.forEach((item, index) => {  // Построчно заполняем страницу таблицы ячейками
                    this.render(item, index, this.rowArray[i]);
                })
            } else this.fillEmptyRow(this.rowArray[i], hideHash);   // Пустые строки заполняются пустыми элементами
        }
    }

    render(item, index, row) {      // Рендер таблицы, либо обычными, либо пустыми ячейками
        if (index === 2) {
            row.innerHTML += (item && item !== 'There is no data') ? this.about : this.noDataAbout;
        } else if (index === 3) {
            row.innerHTML += (item) ? this.eyeColor : this.noDataEyeColor;
        } else {
            row.innerHTML += (item) ? this.regular : this.noDataRegular;
        }
    }

    renderNoDataCell(rowIdx, columnIdx, hideHash) {   // Замена обычной ячейки на пустую, при переключении страницы
        this.noDataCell(rowIdx, columnIdx, hideHash);
    }

    replaceNoDataCell(rowIdx, columnIdx, hideHash) {  // Замена пустой ячейки на обычную, при переключении страницы
        this.noDataCell(rowIdx, columnIdx, hideHash, true);
    }

    noDataCell(rowIdx, columnIdx, hideHash, replace) {                                                          // В зависимости от столбца вставляет разные виды ячеек
        let noDataCell = ``;                                                                                    // чтобы не нарушать уже примененные пользователем стили, например
        if (columnIdx === 2) noDataCell = (replace && hideHash[columnIdx]) ? this.hidedAbout :                  // в скрытый столбец нужно вставить такую же скрытую ячейку
            (replace) ? this.about : (hideHash[columnIdx]) ? this.hidedNoDataAbout : this.noDataAbout;
        else if (columnIdx === 3) {
            console.log(replace && hideHash[columnIdx])
            noDataCell = (replace && hideHash[columnIdx]) ? this.hidedEyeColor :
                (replace) ? this.eyeColor : (hideHash[columnIdx]) ? this.hidedNoDataEyeColor : this.noDataEyeColor;
            this.rowArray[rowIdx].childNodes[columnIdx].style.opacity = (replace && hideHash[columnIdx]) ? '0' :
                (replace) ? '.7' : (hideHash[columnIdx]) ? '0' : '.5';
            this.rowArray[rowIdx].childNodes[columnIdx].style.backgroundColor = (replace) ? '' : 'lavender';
        }
        else noDataCell = (replace) ? this.regular : this.noDataRegular;

        this.rowArray[rowIdx].childNodes[columnIdx].innerHTML = noDataCell;

        if (replace) this.rowArray[rowIdx].childNodes[columnIdx].classList.remove('blurred');
        else this.rowArray[rowIdx].childNodes[columnIdx].classList.add('blurred');
    }

    fillEmptyRow(row, hideHash) {   // Заполнить строку только пустыми ячейками
        row.classList.add('empty');
        this.removeChildNodes(row.childNodes);
        this.saveHTML();
        for (let j = 0; j < 4; j++) {
            if (!hideHash[j]) {     // Проверка на то, не является ли столбец скрытым пользователем
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

    fillRow(row, hideHash) {    // Заполнение строки нормальными ячейками после пустых
        for (let j = 0; j < 4; j++) {
            if (!hideHash[j]) {     // Проверка на то, не является ли столбец скрытым пользователем
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

    removeEmptyRow(row, hideHash) {     // Необходима для очищения строки от пустых ячеек
        row.classList.remove('empty');
        this.removeChildNodes(row.childNodes);
        this.saveHTML();
        this.fillRow(row, hideHash);
    }

    removeChildNodes(children) {    // Необходима для очицения строки от ячеек с предидущей стр.
        children = Array.from(children);
        children.forEach( item => {
            item.remove();
        })
    }

    getThis(context) {      // Полуяаем данные от наблюдаемого класса
        if (context.data && !this.isRendered) {
            this.renderTable(context.data, context.currentPage);
            this.isRendered = true;
            this.sendThisToObservers(context.data, context.currentPage);
        }
    }

    registerObservers(...args) {    // Сохраняем экземпляры классов наблюдателей
        this.observers.push(...args);
    }

    sendThisToObservers(data, currentPage) {    // Отправляем данные всем наблюядателям
        this.observers.forEach( elem => elem.getThis(this, data, currentPage) );
    }

    saveHTML() {    // Сохранение разных видов ячеек
        //Regular
        this.regular = `<td class="info-table__cell" tabindex="0"></td>`;
        this.about = `<td class="info-table__cell" tabindex="0">
                            <div class="about">
                                <span class="about__text"></span>
                                <span class="about__ellipsis">...</span>
                            </div>
                        </td>`;
        this.eyeColor = `<td class="info-table__cell" tabindex="0" style="background-color: ; opacity: .7;"></td>`;

        //Hided
        this.hidedRegular = `<td class="info-table__cell hided-column" tabindex="0"></td>`;
        this.hidedAbout = `<td tabindex="0" class="info-table__cell hided-column">
                                <div class="about">
                                    <span class="about__text hided-column-about"></span>
                                    <span class="about__ellipsis">...</span>
                                </div>
                             </td>`;
        this.hidedEyeColor = `<td class="info-table__cell" tabindex="0" style="background-color: transparent; opacity: 0;"></td>`;

        //No data
        this.noDataRegular = `<td class="info-table__cell" tabindex="0">There is no data</td>`;
        this.noDataAbout = `<td tabindex="0" class="info-table__cell">
                                <div class="about-blurred">
                                    <span class="about__text about__text-blurred">There is no data</span>
                                </div>
                             </td>`;
        this.noDataEyeColor = `<td class="info-table__cell hided-column" tabindex="0">There is no data</td>`;

        //No data hided
        this.hidedNoDataAbout = `<td tabindex="0" class="info-table__cell hided-column">
                                <div class="about-blurred">
                                    <span class="about__text about__text-blurred hided-column-about">There is no data</span>
                                </div>
                             </td>`;
        this.hidedNoDataEyeColor = `<td class="info-table__cell" tabindex="0">There is no data</td>`;

        //Empty
        this.emptyCell = `<td class="info-table__cell blurred" tabindex="0">&#10069</td>`;
        this.emptyCellAbout = `<td tabindex="0" class="info-table__cell blurred">
                                    <div class="about-blurred">
                                        <p class="about__text about__text-blurred">&#10069</p>
                                    </div>
                               </td>`;

        //Empty hided
        this.hidedEmptyCell = `<td class="info-table__cell blurred hided-column" tabindex="0">&#10069</td>`;
        this.hidedEmptyCellAbout = `<td tabindex="0" class="info-table__cell blurred hided-column">
                                        <div class="about-blurred">
                                            <p class="about__text about__text-blurred hided-column-about">&#10069</p>
                                        </div>
                                   </td>`;
    }
}
