import {AuthBase} from "./auth-base";

export class Login extends AuthBase {

    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
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

    login(error) {
        if (this.validateForm()) {
            super.login().then(() => {
                if (localStorage.length > 0) {
                    this.openNewRoute('/');
                }
            });
        }
    }
}