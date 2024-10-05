import {HttpUtils} from "../../utils/http-utils";

export class AddExpense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        document.getElementById('createExpenseCategory').addEventListener('click', this.createExpenseCategory.bind(this));
        this.categoryInputElement = document.getElementById('expenseCategoryInput');
    }

    async createExpenseCategory(e){
        e.preventDefault();

        const createData = {
            title: this.categoryInputElement.value,
        }

        const result = await HttpUtils.request('/categories/expense', 'POST', true, createData);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при добавлении категории расходов. Обратитесь в поддержку');
        }
        return this.openNewRoute('/expense');
    }
}