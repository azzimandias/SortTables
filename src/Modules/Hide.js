import Fill from "./Fill.js";
export default class Hide extends Fill {    // Отвечает за установки стилей сокытия-появления столбцов
    constructor() {
        super();
        this.hideHash = [];     // будет содержать в себе сокрытые столбцы, необходим для правильной отрисовки в Fill
    }

    chooseAction(event) {
        this.column = document.querySelector(`#column-${event.target.id[event.target.id.length - 1]}`); // Необходимо для получения нужного столбца
        this.sortButton = document.querySelector(`#sort-${event.target.id[event.target.id.length - 1]}`);   // Необходимо для получения нужного столбца
        if (this.hideHash[event.target.id[event.target.id.length - 1]]) {
            this.hideHash[event.target.id[event.target.id.length - 1]] = false;
            this.showColumn(event, event.target.id[event.target.id.length - 1]);
        } else {
            this.hideHash[event.target.id[event.target.id.length - 1]] = true;
            this.hideColumn(event, event.target.id[event.target.id.length - 1]);
        }
    }

    hideColumn(event, idx) {    // Добавляем стили и анимации для скрытия столбца
        this.column.classList.remove('maximize-column');
        this.column.classList.remove('maximize-column-about');
        if (+idx !== 2) this.column.classList.add('minimize-column');
        else this.column.classList.add('minimize-column-about');
        this.sortButton.disabled = true;    // Убираем возможность сортировки данного столбца
        event.target.style.background = 'url("../../../SortTables/src/Img/hide.svg") center/20px 20px no-repeat';     // изменение иконки кнопки, для разработки нужно менять путь к файлу
        event.target.title = 'show column';
        this.abouts = document.querySelectorAll('.about__text, .about__text-blurred');
        this.rowArray.forEach( (item, index) => {
            item.childNodes[idx].classList.add('hided-column');
            if (+idx === 2) this.abouts[index].classList.add('hided-column-about');
            if (+idx === 3)
                item.childNodes[idx].style.opacity = '0';
        });
    }

    showColumn(event, idx) {    // Добавляем стили и анимации для появления столбца
        this.column.classList.remove('minimize-column');
        if (+idx !== 2) this.column.classList.add('maximize-column');
        else this.column.classList.add('maximize-column-about');
        this.sortButton.disabled = false;   // Возвращаем возможность сортировки
        event.target.style.background = 'url("../../../SortTables/src/Img/unhide.svg") center/20px 20px no-repeat';   // изменение иконки кнопки, для разработки нужно менять путь к файлу
        event.target.title = 'hide column';
        this.abouts = document.querySelectorAll('.about__text, .about__text-blurred');
        setTimeout( () => {     // Применение после проигрывания анимаций
            this.rowArray.forEach( (item, index) => {
                item.childNodes[idx].classList.remove('hided-column');
                if (+idx === 2) this.abouts[index].classList.remove('hided-column-about');
                if (+idx === 3 && item.childNodes[idx].textContent !== `❕`) {
                    this.setInlineOpacity(item.childNodes[idx]);
                    this.fillEyeColor();
                }
            });
        }, 250)
    }

    setInlineOpacity(cell) {    // Стили для столбца eye color
        if (cell.className.includes('blurred')) cell.style.opacity = '.5';
        else cell.style.opacity = '1';
    }
}
