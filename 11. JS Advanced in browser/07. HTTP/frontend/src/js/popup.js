export default class Popup {
    constructor() {
        this.popupBg = document.querySelector('.popup__bg');
        this.popup = document.querySelector('.popup');
    }

    close() {
        this.popupBg.classList.remove('active');
        this.popup.classList.remove('active');
    }

    open() {
        this.popupBg.classList.add('active');
        this.popup.classList.add('active');
    }
}
