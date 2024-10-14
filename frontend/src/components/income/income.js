import {HttpUtils} from "../../utils/http-utils";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.income = [];
        this.getIncome().then();
        this.btnDeleteIncome = document.getElementById('btn-delete-income');
    }

    async getIncome() {
        const result = await HttpUtils.request('/categories/income');
        // console.log(result.response);
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
            // console.log(incomeId, incomeTitle);

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
                that.deleteIncomeCategory(incomeId);
            }

            cardElementBody.appendChild(cardElementTitle);
            cardElementBody.appendChild(editButtonElement);
            cardElementBody.appendChild(deleteButtonElement);
            cardElement.appendChild(cardElementBody);
            element.appendChild(cardElement);
            incomeCategory.appendChild(element);
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
        // spanElement.onclick = function () {
        //     that.addIncomeCategory();
        // }

        cardBodyElement.appendChild(spanElement);
        cardElement.appendChild(cardBodyElement);
        element.appendChild(cardElement);
        incomeCategory.appendChild(element);
    }

    addIncomeCategory() {
        this.openNewRoute('/income/add');
    }

    editIncomeCategory(id) {
        this.openNewRoute('/income/edit?id=' + id);
    }

    deleteIncomeCategory(id) {
        // console.log(id);
        this.btnDeleteIncome.addEventListener('click', () => {
            document.getElementById('doNotDeleteIncome').addEventListener('click', () => {
                window.location.reload();
            })
            window.location.reload();
            this.openNewRoute('/income/delete?id=' + id);
        })
    }
}
