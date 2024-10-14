import {HttpUtils} from "../../utils/http-utils";
import {ShowOperationsUtils} from "../../utils/show-operations-utils";

export class IncomeExpense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getIncomeExpense().then();
    }

    async getIncomeExpense() {
        const result = await HttpUtils.request('/operations?period=today');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов. Обращайтесь в поддержку')
        }
        ShowOperationsUtils.showRecords(result.response);
    }
}

