import {AuthUtils} from "../utils/auth-utils";

export class Sidebar {

    constructor() {
        this.links = document.querySelectorAll('.sidebar .nav-link');
        this.init();
        this.activateMenuItem();
    }

    init() {
        const userInfo = JSON.parse(AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey));
        if (userInfo) {
            document.getElementById('profile-name').innerText = userInfo.name;
        }

        const userBalance = AuthUtils.getUserBalanceInfo();
        if (userBalance) {
            document.getElementById('balance').innerText = userBalance;
        }


        document.querySelector('.burger').addEventListener('click', function () {
            this.classList.toggle('active');
            document.body.classList.toggle('menu-opened');
            document.querySelector('.sidebar').classList.toggle('open');
            document.querySelector('.sidebar').classList.toggle('border-end-0');
        })
    }

    activateMenuItem() {
        const categoryMenu = document.getElementById('home-collapse');
        const categoryButton = document.getElementById('collapsed');

        let currentLink = window.location.pathname;
        this.links.forEach(item => {
            let linkHref = item.getAttribute('href');
            if (currentLink === linkHref) {
                item.classList.add('active');
                if (window.location.pathname === '/income' || window.location.pathname === '/expense') {
                    categoryMenu.classList.add('show');
                    categoryButton.classList.remove('collapsed');
                    categoryButton.classList.add('btn-toggle-active');
                }
            }
        })
    }
}