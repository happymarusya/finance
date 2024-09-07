import {AuthUtils} from "../utils/auth-utils";

export class Sidebar {

    constructor() {
        this.init();
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
}