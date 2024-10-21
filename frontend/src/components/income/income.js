import {HttpUtils} from "../../utils/http-utils";
import {BalanceUtils} from "../../utils/balance-utils";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.income = [];
        this.getIncome().then();
        this.btnDeleteIncome = document.getElementById('btn-delete-income');
    }

    async getIncome() {
        const result = await HttpUtils.request('/categories/income');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категорий доходов. Обращайтесь в поддержку')
        }
        this.income = result.response;
        this.showIncome();
    }

    showIncome() {
        const incomeCategory = document.getElementById('income-category');

        for (let i = 0; i < this.income.length; i++) {
            const that = this;
            let incomeId = this.income[i].id;
            let incomeTitle = this.income[i].title;

            const element = document.createElement('div');
            element.className = 'col col-card';

            const cardElement = document.createElement('div');
            cardElement.className = 'card h-100 rounded-4';

            const cardElementBody = document.createElement('div');
            cardElementBody.className = 'card-body';

            const cardElementTitle = document.createElement('h3');
            cardElementTitle.className = 'card-title';
            cardElementTitle.innerText = incomeTitle;

            const editButtonElement = document.createElement('a');
            editButtonElement.className = 'btn btn-primary me-2';
            editButtonElement.href = '/income/edit?id=' + incomeId;
            editButtonElement.innerText = 'Редактировать';
            editButtonElement.setAttribute('data-id', incomeId);
            editButtonElement.onclick = function () {
                that.editIncomeCategory(incomeId);
            }

            const deleteButtonElement = document.createElement('a');
            deleteButtonElement.className = 'btn btn-danger';
            deleteButtonElement.innerText = 'Удалить';
            deleteButtonElement.setAttribute('data-id', incomeId);
            deleteButtonElement.setAttribute('data-bs-target', '#deleteIncome');
            deleteButtonElement.setAttribute('data-bs-toggle', 'modal');
            deleteButtonElement.onclick = function () {
                that.deleteIncomeCategory(incomeTitle, incomeId);
            }

            cardElementBody.appendChild(cardElementTitle);
            cardElementBody.appendChild(editButtonElement);
            cardElementBody.appendChild(deleteButtonElement);
            cardElement.appendChild(cardElementBody);
            element.appendChild(cardElement);
            if (incomeCategory) {
                incomeCategory.appendChild(element);
            }
        }
        const that = this;
        const element = document.createElement('div');
        element.className = 'col col-card';

        const cardElement = document.createElement('div');
        cardElement.className = 'card h-100 rounded-4 py-3 cursor';
        cardElement.onclick = function () {
            that.addIncomeCategory();
        }

        const cardBodyElement = document.createElement('div');
        cardBodyElement.className = 'card-body d-flex justify-content-center align-items-center';

        const spanElement = document.createElement('span');
        spanElement.className = 'plus';
        spanElement.innerText = '+';

        cardBodyElement.appendChild(spanElement);
        cardElement.appendChild(cardBodyElement);
        element.appendChild(cardElement);
        if (incomeCategory) {
            incomeCategory.appendChild(element);
        }
    }

    addIncomeCategory() {
        this.openNewRoute('/income/add');
    }

    editIncomeCategory(id) {
        this.openNewRoute('/income/edit?id=' + id);
    }

    deleteIncomeCategory(title, id) {
        document.getElementById('doNotDeleteIncome').addEventListener('click', () => {
            document.getElementById('income-category').innerHTML = '';
            return this.openNewRoute('/income');
        })
        this.btnDeleteIncome.addEventListener('click', () => {
            document.getElementById('income-category').innerHTML = '';
            this.getIncomeExpense(title, id).then();
        })
    }

    async getIncomeExpense(title, id) {
        const result = await HttpUtils.request('/operations?period=all');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов. Обращайтесь в поддержку')
        }
        for (let i = 0; i < result.response.length; i++) {
            if (result.response[i].category === title) {
                this.deleteOperation(result.response[i].id).then();
            }
        }
        this.openNewRoute('/income/delete?id=' + id);
    }

    async deleteOperation(id) {
        const result = await HttpUtils.request('/operations/' + id, 'DELETE');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при удалении операции доходов/расходов. Обратитесь в поддержку');
        }
        BalanceUtils.receiveBalance().then();
    }
}
