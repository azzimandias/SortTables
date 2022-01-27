import { Table, Fill } from "./Modules/Table.js";
import { ArrowToFirs, ArrowToLast} from "./Modules/Arrows.js";
import ChooseAndSort from "./Modules/Sort.js";
import Hide from "./Modules/Hide.js";
import Form from "./Modules/Form.js";

const table = new Table();
const fill = new Fill();
const back = new ArrowToFirs(document.querySelector('.page-controllers__back'));
const forward = new ArrowToLast(document.querySelector('.page-controllers__forward'));
const sort = new ChooseAndSort();
const hide = new Hide();
const form = new Form();
table.registerObservers(fill, back, forward, form);
table.getDataFromServer();

document.querySelector('tfoot').addEventListener('click', event => {
    if (event.target.classList[0] === 'page-controllers__back') {
        table.currentPageMinus();
    } else if (event.target.classList[0] === 'page-controllers__forward') {
        table.currentPagePlus();
    }
    if (sort.sortedArray) fill.fillInTable(sort.sortedArray, table.currentPage)
    else fill.fillInTable(table.data, table.currentPage)
});

document.querySelector('thead').addEventListener('click', event => {
    if (event.target.id.includes('hider')) {
        hide.choose(event);
    } else if (event.target.id.includes('sort')) {
        fill.fillInTable(sort.choose(table.data, event.target.id[event.target.id.length - 1]), table.currentPage);
    }
});

document.querySelector('tbody').addEventListener('click', event => {
    form.renderedPath = fill.renderedPath;
    form.searching(event);
});
document.querySelector('.left-side').addEventListener('click', event => {
    form.sortedArray = sort.sortedArray;
    form.actionChoiceForm(event);
});
