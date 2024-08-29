import {HttpUtils} from "../../../utils/http-utils";
import {AuthUtils} from "../../../utils/auth-utils";

export class AuthBase {
    constructor() {
        this.nameElement = document.getElementById('name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');
    }

    async login() {
        this.commonErrorElement.style.display = 'none';

        const result = await HttpUtils.request('/login', 'POST', {
            email: this.emailElement.value,   //test@itlogia.ru
            password: this.passwordElement.value,   //12345678Qq
            // rememberMe: this.rememberMeElement.checked
        })

        if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user.name || !result.response.user.lastName || !result.response.user.id))) {
            this.commonErrorElement.style.display = 'block';
            return;
        }
        console.log(result);
        document.getElementById('profile-name').innerText = result.response.user.name + ' ' + result.response.user.lastName;

        AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, {
            id: result.response.user.id,
            name: result.response.user.name + ' ' + result.response.user.lastName
        })
    }
}