import {HttpUtils} from "../../utils/http-utils";

export class IncomeExpenseBase {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.operationTypeElement = document.getElementById('operation-type');
        this.operationOptionElement = document.getElementById('operation-category');
        this.operationAmountElement = document.getElementById('operation-amount');
        this.operationDateElement = document.getElementById('operation-date');
        this.operationCommentsElement = document.getElementById('operation-comments');
    }

    async getExpenseCategories() {
        const result = await HttpUtils.request('/categories/expense');
        // console.log(result.response);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категорий расходов. Обращайтесь в поддержку')
        }
        this.expense = result.response;
        const expenseOption = document.getElementById('operation-category');
        for (let i = 0; i < this.expense.length; i++) {
            let expenseId = this.expense[i].id;
            let expenseTitle = this.expense[i].title
            // console.log(incomeTitle, incomeId)
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', expenseTitle);
            optionElement.setAttribute('data-id', expenseId);
            optionElement.innerText = expenseTitle;
            expenseOption.appendChild(optionElement);
        }
    }

    async getIncomeCategories() {
        const result = await HttpUtils.request('/categories/income');
        // console.log(result.response);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категорий доходов. Обращайтесь в поддержку')
        }
        this.income = result.response;
        const incomeOption = document.getElementById('operation-category');
        for (let i = 0; i < this.income.length; i++) {
            let incomeId = this.income[i].id;
            let incomeTitle = this.income[i].title
            // console.log(incomeTitle, incomeId)
            const optionElement = document.createElement('option');
            optionElement.setAttribute('value', incomeTitle);
            optionElement.setAttribute('data-id', incomeId);
            optionElement.innerText = incomeTitle;
            incomeOption.appendChild(optionElement);
        }
    }

    validateForm() {
        let isValid = true;

        if (this.operationOptionElement.value !== 'Категория...') {
            this.operationOptionElement.classList.remove('is-invalid');
        } else {
            this.operationOptionElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.operationAmountElement.value) {
            this.operationAmountElement.classList.remove('is-invalid');
        } else {
            this.operationAmountElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.operationDateElement.value) {
            this.operationDateElement.classList.remove('is-invalid');
        } else {
            this.operationDateElement.classList.add('is-invalid');
            isValid = false
        }
        if (this.operationCommentsElement.value) {
            this.operationCommentsElement.classList.remove('is-invalid');
        } else {
            this.operationCommentsElement.classList.add('is-invalid');
            isValid = false
        }
        return isValid;
    }
}