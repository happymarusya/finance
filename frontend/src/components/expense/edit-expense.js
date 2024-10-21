import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class EditExpense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/expense');
        }
        this.getCategory(id).then();
    }

    async getCategory(id) {
        const result = await HttpUtils.request('/categories/expense/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе категории расходов. Обратитесь в поддержку');
        }
        // console.log(result.response);

        this.expenseCategoryOriginalData = result.response;
        document.getElementById('saveExpenseCategory').addEventListener('click', this.changeExpenseCategory.bind(this));
        this.showExpenseCategory(result.response);
    }

    showExpenseCategory(category) {
        this.expenseCategoryInputElement = document.getElementById('expenseToChange');
        this.expenseCategoryInputElement.value = category.title;
    }

    async changeExpenseCategory() {
        const changedData = {};

        if (this.expenseCategoryInputElement.value !== this.expenseCategoryOriginalData.title) {
            changedData.title = this.expenseCategoryInputElement.value
        }
        // console.log(changedData);
        if (Object.keys(changedData).length > 0) {
            const result = await HttpUtils.request('/categories/expense/' + this.expenseCategoryOriginalData.id,
                'PUT', true, changedData);
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при редактировании категории расходов. Обратитесь в поддержку');
            }
            // window.location.reload();
            if (document.getElementById('expense-category')) {
                document.getElementById('expense-category').innerHTML = '';
                return this.openNewRoute('/expense');
            }
        }
    }
}

