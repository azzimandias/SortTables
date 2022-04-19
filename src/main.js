import Table from "./Modules/Table.js";
import Renderer from "./Modules/Renderer.js";
import Fill from "./Modules/Fill.js"
import { ArrowToFirs, ArrowToLast} from "./Modules/Arrows.js";
import ChooseAndSort from "./Modules/Sort.js";
import Hide from "./Modules/Hide.js";
import Pointer from "./Modules/Pointer.js";
import Form from "./Modules/Form.js";

/* Создание экземпляров классов */
const table = new Table();
const renderer = new Renderer();
const fill = new Fill();
const back = new ArrowToFirs(document.querySelector('.page-controllers__back'));
const forward = new ArrowToLast(document.querySelector('.page-controllers__forward'));
const sort = new ChooseAndSort();
const hide = new Hide();
const pointer = new Pointer();
const form = new Form();

/* Устанавливаем связь между экземплярами классов, чтобы одни реагировали на изменения в других */
renderer.registerObservers(fill);
table.registerObservers(renderer, back, forward, form);
/* Подгружаем данные с "сервера" */
table.getDataFromServer();

/* Устанавливаем слушатели для пользовательских событий */
document.querySelector('.info-table__foot').addEventListener('click', event => {
    if (event.target.className.includes('page-controllers__back')) {                                        // C помощью делегирования событий
        table.currentPageMinus();                                                                           // узнаем на какую из кнопок нажал пользователь
    } else if (event.target.className.includes('page-controllers__forward')) {
        table.currentPagePlus();
    }
    if (sort.sortedArray) fill.fillInTable(sort.sortedArray, table.currentPage, hide.hideHash);             // Проверяем отсортирован ли массив,
    else fill.fillInTable(table.data, table.currentPage, hide.hideHash);                                    // чтобы праильно отрисовать страницу таблицы
    pointer.clearSelection(); // Сброс выбранной пользователем ячейки
    form.closeForm();         // Закрываем форму
});

document.querySelector('.info-table__body').addEventListener('click', event => {
    pointer.searchingCell(event, fill.renderedPath, hide.hideHash);                                         // Ищем и запоминаем нажатую пользователем ячейку таблицы
    form.closeForm();
});
document.querySelector('.info-table__body').addEventListener('keydown', event => {
    if (event.key === 'Enter') {                                                                            // Тоже самое только при нажатии клавиши Enter
        pointer.searchingCell(event, fill.renderedPath, hide.hideHash);
        form.closeForm();
    }
});

document.querySelector('.info-table__head').addEventListener('click', event => {
    if (event.target.id.includes('hider')) {                                                    // Узнаем что нужно делать
        hide.chooseAction(event);                                                                           // Скрыть столбец
        pointer.searchingCell();
        form.closeForm();
    } else if (event.target.id.includes('sort')) {
        fill.fillInTable(sort.chooseAction(table.data, event.target.id[event.target.id.length - 1], event), // Или выполнить сортировку по столбцу
            table.currentPage,
            hide.hideHash);
        pointer.clearSelection();
        form.closeForm();
    }
});

document.querySelector('.left-side').addEventListener('click', event => {
    event.preventDefault();         // Отключем перезагрузку страницы
    if (form.actionChoiceForm(event, sort.sortedArray, pointer.pointer))                                    // Реакция на закрытие или заполнение формы
        pointer.clearSelection();
});
document.querySelector('.left-side__body').addEventListener('keypress', event => {
    if (event.key === 'Enter') {                                                                            // Открыть форму при нажатии клавиши Enter
        if (form.actionChoiceForm(event, sort.sortedArray, pointer.pointer))
            pointer.clearSelection();
    }
});
