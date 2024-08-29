import {AuthUtils} from "../../../utils/auth-utils";
import {HttpUtils} from "../../../utils/http-utils";
import {AuthBase} from "./auth-base";

export class SignUp extends AuthBase {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo('accessToken')) {
            return this.openNewRoute('/');
        }

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validateForm() {
        let isValid = true;

        if (this.nameElement.value && this.nameElement.value.match(/^[А-Я][а-я]+ [А-Я][а-я]+(-[А-Я][а-я]+)?$/)) {
            this.nameElement.classList.remove('is-invalid');
        } else {
            this.nameElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.passwordRepeatElement.value && this.passwordRepeatElement.value === this.passwordElement.value) {
            this.passwordRepeatElement.classList.remove('is-invalid');
        } else {
            this.passwordRepeatElement.classList.add('is-invalid');
            isValid = false
        }
        return isValid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const result = await HttpUtils.request('/signup', 'POST', {
                name: this.nameElement.value.split(' ')[0],
                lastName: this.nameElement.value.split(' ')[1],
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement.value
            })

            if (result.error || !result.response || (result.response && (!result.response.user.name || !result.response.user.lastName || !result.response.user.id || !result.response.user.email))) {
                this.commonErrorElement.style.display = 'block';
                return;
            }
            console.log(result);

            super.login().then();
            this.openNewRoute('/');
        }
    }
}