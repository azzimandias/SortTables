import Table from "./Modules/Table.js";
import Renderer from "./Modules/Renderer.js";
import Fill from "./Modules/Fill.js"
import { ArrowToFirs, ArrowToLast} from "./Modules/Arrows.js";
import ChooseAndSort from "./Modules/Sort.js";
import Hide from "./Modules/Hide.js";
import Form from "./Modules/Form.js";

const table = new Table();
const renderer = new Renderer();
const fill = new Fill();
const back = new ArrowToFirs(document.querySelector('.page-controllers__back'));
const forward = new ArrowToLast(document.querySelector('.page-controllers__forward'));
const sort = new ChooseAndSort();
const hide = new Hide();
const form = new Form();
renderer.registerObservers(fill);
table.registerObservers(renderer, fill, back, forward, form);
table.getDataFromServer();

document.querySelector('tfoot').addEventListener('click', event => {
    if (event.target.classList[0] === 'page-controllers__back') {
        table.currentPageMinus();
    } else if (event.target.classList[0] === 'page-controllers__forward') {
        table.currentPagePlus();
    }
    if (sort.sortedArray) fill.fillInTable(sort.sortedArray, table.currentPage, hide.hideHash);
    else fill.fillInTable(table.data, table.currentPage, hide.hideHash);
    form.closeForm();
});

document.querySelector('thead').addEventListener('click', event => {
    if (event.target.id.includes('hider')) {
        hide.chooseAction(event);
        form.searchingCell();
        form.closeForm();
    } else if (event.target.id.includes('sort')) {
        fill.fillInTable(sort.chooseAction(table.data, event.target.id[event.target.id.length - 1], event),
            table.currentPage,
            hide.hideHash);
        form.closeForm();
    }
});

document.querySelector('tbody').addEventListener('click', event => {
    form.searchingCell(event, fill.renderedPath, hide.hideHash);
});
document.querySelector('.left-side').addEventListener('click', event => {
    form.actionChoiceForm(event, sort.sortedArray);
});

document.querySelector('tbody').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        form.searchingCell(event, fill.renderedPath, hide.hideHash);
    }
});
document.querySelector('.left-side').addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        form.actionChoiceForm(event, sort.sortedArray);
    }
});
