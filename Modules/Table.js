export default class Table { // Отвечает за работу с сервером и хранит в себе данные
    constructor() {
        this.pages = 0;
        this.currentPage = 1;
        this.observers = [];
    }

    getDataFromServer() {                                                           // Получаем и преобразуем данные с сервера
        fetch('../SortTables/data.json')
            .then(res => res.json())
            .then(res => {
                this.responseJSON = res;
                this.pages = Math.ceil(this.responseJSON.length / 10);
                this.data = this.reTyping();
                this.checkLastPage();
                this.sendThisToObservers();
            });
    }

    reTyping() {    // Получаем только нужные данные, отбрасываем ненужные
        let resJSON = [...this.responseJSON];
        return this.splitPages(resJSON.map( item => {
            const arr = [];
            arr.push(item.name.firstName, item.name.lastName, item.about, item.eyeColor);
            return arr;
        }));
    }

    splitPages(resJSON) {   // Делим информацию на страницы
        const arr = [];
        let x = this.responseJSON.length / 10;
        for (x; x > 0; x--) {
            arr.push(resJSON.slice(0, 10));
            resJSON.splice(0, 10);
        }
        return arr;
    }

    checkLastPage() {   // Проверяем последнюю страницу на количество 10 строк, дополняем необходимое кол-во, если нехватает
        if (this.data[this.data.length - 1].length !== 10) {    // для корректного отображения страницы
            while(this.data[this.data.length - 1].length < 10) {
                this.data[this.data.length - 1].push([]);
            }
        }
    }

    registerObservers(...args) {    // Сохраняем экземпляры классов наблюдателей
        this.observers.push(...args);
        this.sendThisToObservers();
    }

    sendThisToObservers() {     // Отправляем данные всем наблюядателям
        this.observers.forEach( elem => elem.getThis(this) );
    }

    currentPageMinus () {
        this.currentPage--;
        this.sendThisToObservers();
    }

    currentPagePlus () {
        this.currentPage++;
        this.sendThisToObservers();
    }
}
