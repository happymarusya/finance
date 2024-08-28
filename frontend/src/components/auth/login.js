import {AuthUtils} from "../../../utils/auth-utils";
import {HttpUtils} from "../../../utils/http-utils";

export class Login {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;

        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.passwordElement.value) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false
        }
        return isValid;
    }

    async login() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {

            const result = await HttpUtils.request('/login', 'POST', {
                email: this.emailElement.value,   //test@itlogia.ru
                password: this.passwordElement.value,   //12345678Qq
                rememberMe: this.rememberMeElement.checked
            })

            if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user.name || !result.response.user.lastName || !result.response.user.id))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }
            console.log(result);

            AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, {
                id: result.response.user.id,
                name: result.response.user.name + ' ' + result.response.user.lastName
            })

            this.openNewRoute('/');
        }
    }
}