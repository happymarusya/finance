import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class EditIncome {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/income');
        }
        this.getCategory(id).then();
    }

    async getCategory(id) {
        const result = await HttpUtils.request('/categories/income/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе категории доходов. Обратитесь в поддержку');
        }
        // console.log(result.response);

        this.incomeCategoryOriginalData = result.response;
        document.getElementById('saveIncomeCategory').addEventListener('click', this.changeIncomeCategory.bind(this));
        this.showIncomeCategory(result.response);
    }

    showIncomeCategory(category) {
        this.incomeCategoryInputElement = document.getElementById('incomeToChange');
        this.incomeCategoryInputElement.value = category.title;
    }

    async changeIncomeCategory() {
        const changedData = {};

        if (this.incomeCategoryInputElement.value !== this.incomeCategoryOriginalData.title) {
            changedData.title = this.incomeCategoryInputElement.value
        }
        // console.log(changedData);
        if (Object.keys(changedData).length > 0) {
            const result = await HttpUtils.request('/categories/income/' + this.incomeCategoryOriginalData.id,
                'PUT', true, changedData);
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при редактировании категории доходов. Обратитесь в поддержку');
            }

            if (document.getElementById('income-category')) {
                document.getElementById('income-category').innerHTML = '';
                return this.openNewRoute('/income');
            }
        }
    }
}

