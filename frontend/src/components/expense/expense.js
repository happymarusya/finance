import {HttpUtils} from "../../utils/http-utils";
import {BalanceUtils} from "../../utils/balance-utils";

export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.expense = [];
        this.getExpense().then();
        this.btnDeleteExpense = document.getElementById('btn-delete-expense');
    }

    async getExpense() {
        const result = await HttpUtils.request('/categories/expense');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе категорий расходов. Обращайтесь в поддержку')
        }
        this.expense = result.response
        this.showExpense();
    }

    showExpense() {
        const expenseCategory = document.getElementById('expense-category');

        for (let i = 0; i < this.expense.length; i++) {
            const that = this;
            let expenseId = this.expense[i].id;
            let expenseTitle = this.expense[i].title;

            const element = document.createElement('div');
            element.className = 'col col-card';

            const cardElement = document.createElement('div');
            cardElement.className = 'card h-100 rounded-4';

            const cardElementBody = document.createElement('div');
            cardElementBody.className = 'card-body';

            const cardElementTitle = document.createElement('h3');
            cardElementTitle.className = 'card-title';
            cardElementTitle.innerText = expenseTitle;

            const editButtonElement = document.createElement('a');
            editButtonElement.className = 'btn btn-primary me-2';
            editButtonElement.innerText = 'Редактировать';
            editButtonElement.setAttribute('data-id', expenseId);
            editButtonElement.href = '/expense/edit?id=' + expenseId;
            editButtonElement.onclick = function () {
                that.editExpenseCategory(expenseId);
            }

            const deleteButtonElement = document.createElement('a');
            deleteButtonElement.className = 'btn btn-danger';
            deleteButtonElement.innerText = 'Удалить';
            deleteButtonElement.setAttribute('data-id', expenseId);
            deleteButtonElement.setAttribute('data-bs-target', '#deleteExpense');
            deleteButtonElement.setAttribute('data-bs-toggle', 'modal');
            deleteButtonElement.onclick = function () {
                that.deleteExpenseCategory(expenseTitle, expenseId);
            }

            cardElementBody.appendChild(cardElementTitle);
            cardElementBody.appendChild(editButtonElement);
            cardElementBody.appendChild(deleteButtonElement);
            cardElement.appendChild(cardElementBody);
            element.appendChild(cardElement);
            if (expenseCategory) {
                expenseCategory.appendChild(element);
            }
        }
        const that = this;
        const element = document.createElement('div');
        element.className = 'col col-card';

        const cardElement = document.createElement('div');
        cardElement.className = 'card h-100 rounded-4 py-3 cursor';
        cardElement.onclick = function () {
            that.addExpenseCategory();
        }

        const cardBodyElement = document.createElement('div');
        cardBodyElement.className = 'card-body d-flex justify-content-center align-items-center';

        const spanElement = document.createElement('span');
        spanElement.className = 'plus';
        spanElement.innerText = '+';

        cardBodyElement.appendChild(spanElement);
        cardElement.appendChild(cardBodyElement);
        element.appendChild(cardElement);
        if (expenseCategory) {
            expenseCategory.appendChild(element);
        }
    }

    addExpenseCategory() {
        this.openNewRoute('/expense/add');
    }

    editExpenseCategory(id) {
        this.openNewRoute('/expense/edit?id=' + id);
    }

    deleteExpenseCategory(title, id) {
        document.getElementById('doNotDelete').addEventListener('click', () => {
            document.getElementById('expense-category').innerHTML = '';
            this.openNewRoute('/expense');
        })
        this.btnDeleteExpense.addEventListener('click', () => {
            document.getElementById('expense-category').innerHTML = '';
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
        this.openNewRoute('/expense/delete?id=' + id);
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




