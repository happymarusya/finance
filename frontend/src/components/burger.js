export class Burger {

    constructor() {
        this.init();
    }

    init() {
        document.querySelector('.burger').addEventListener('click', function () {
            this.classList.toggle('active');
            document.body.classList.toggle('menu-opened');
            document.querySelector('.sidebar').classList.toggle('open');
            document.querySelector('.sidebar').classList.toggle('border-end-0');
        })
    }
}