import {HttpUtils} from "../../utils/http-utils";

export class AddIncome {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        document.getElementById('createIncomeCategory').addEventListener('click', this.createIncomeCategory.bind(this));
        this.categoryInputElement = document.getElementById('incomeCategoryInput');
    }

    async createIncomeCategory(e){
        e.preventDefault();

        const createData = {
            title: this.categoryInputElement.value,
        }

        const result = await HttpUtils.request('/categories/income', 'POST', true, createData);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при добавлении категории доходов. Обратитесь в поддержку');
        }
        return this.openNewRoute('/income');
    }
}