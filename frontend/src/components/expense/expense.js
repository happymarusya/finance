import {HttpUtils} from "../../utils/http-utils";

export class Expense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.expense = [];
        this.getExpense().then();
        this.btnDeleteExpense = document.getElementById('btn-delete-expense');
    }

    async getExpense() {
        const result = await HttpUtils.request('/categories/expense');
        // console.log(result.response);
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
        // console.log(this.expense)
        const expenseCategory = document.getElementById('expense-category');

        for (let i = 0; i < this.expense.length; i++) {
            const that = this;
            let expenseId = this.expense[i].id;
            let expenseTitle = this.expense[i].title;
            // console.log(expenseId, expenseTitle);

            const element = document.createElement('div');
            element.className = 'col';

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
                    that.deleteExpenseCategory(expenseId);
            }

            cardElementBody.appendChild(cardElementTitle);
            cardElementBody.appendChild(editButtonElement);
            cardElementBody.appendChild(deleteButtonElement);
            cardElement.appendChild(cardElementBody);
            element.appendChild(cardElement);
            expenseCategory.appendChild(element);
        }
        const that = this;
        const element = document.createElement('div');
        element.className = 'col';

        const cardElement = document.createElement('div');
        cardElement.className = 'card h-100 rounded-4 py-3';

        const cardBodyElement = document.createElement('div');
        cardBodyElement.className = 'card-body d-flex justify-content-center align-items-center';

        const spanElement = document.createElement('span');
        spanElement.className = 'plus';
        spanElement.innerText = '+';
        spanElement.onclick = function () {
            that.addExpenseCategory();
        }

        cardBodyElement.appendChild(spanElement);
        cardElement.appendChild(cardBodyElement);
        element.appendChild(cardElement);
        expenseCategory.appendChild(element);

    }

    addExpenseCategory() {
        this.openNewRoute('/expense/add');
    }

    editExpenseCategory(id) {
        this.openNewRoute('/expense/edit?id=' + id);
    }

    deleteExpenseCategory(id) {
        // console.log(id);
        this.btnDeleteExpense.addEventListener('click', () => {
            document.getElementById('doNotDelete').addEventListener('click', () => {
                window.location.reload();
            })
            window.location.reload();
            this.openNewRoute('/expense/delete?id=' + id);
        })
    }
}
