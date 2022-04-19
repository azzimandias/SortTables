export default class ChooseAndSort {    // Отвечает за портировку данных по выбранному столбцу
    constructor() {
        this.currentColumn = -1;
        this.sortedArray = 0;
    }

    chooseAction(data, idx, event) {
        if (this.currentColumn !== idx) {
            this.currentColumn = idx;
            this.goSortA_Z = true;
            event.target.title = 'sort from Z to A';
            return this.chooseAction(data, idx);    // рекурсия нужна при первом выполнении, чтобы заново запустить
        } else {                                    // проверку для выбора метода сортировки
            if (this.goSortA_Z) {
                this.goSortA_Z = false;
                this.goSortZ_A = true;
                return this.sortedArray = this.sortA_Z(data, idx);
            } else if (this.goSortZ_A) {
                this.goSortZ_A = false;
                event.target.title = 'disable sorting ';
                return this.sortedArray = this.sortZ_A(data, idx);
            } else {
                this.currentColumn = -1;
                this.sortedArray = 0;
                event.target.title = 'sort from A to Z';
                return data;
            }
        }
    }

    sortA_Z(data, idx) {    // Метод быстрой сортировки по алфавиту
        return this.splitPages(data, data.flat().sort((a, b) => {
            if (a[idx] > b[idx]) return 1;
            if (a[idx] === b[idx]) return 0;
            if (a[idx] < b[idx]) return -1;
        }));
    }

    sortZ_A(data, idx) {    // Метод быстрой сортировки в противоположном порядке
        return this.splitPages(data, data.flat().sort((a, b) => {
            if (a[idx] < b[idx]) return 1;
            if (a[idx] === b[idx]) return 0;
            if (a[idx] > b[idx]) return -1;
        }));
    }

    splitPages(data, sort) {    // Заново создает постраничную вложенность, т к она теряется при сортировке
        const arr = [];
        let x = data.flat().length / 10;
        for (x; x > 0; x--) {
            arr.push(sort.slice(0, 10));
            sort.splice(0, 10);
        }
        return arr;
    }
}
