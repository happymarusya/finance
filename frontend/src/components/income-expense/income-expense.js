import {HttpUtils} from "../../utils/http-utils";
import {ShowOperationsUtils} from "../../utils/show-operations-utils";
import {BalanceUtils} from "../../utils/balance-utils";

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
        this.operations = [];
        for (let i = 0; i < result.response.length; i++) {
            if (result.response[i].category && result.response[i].category !== 'undefined') {
                if (result.response[i].type === 'income') {
                    result.response[i].type = 'доход';
                } else {
                    result.response[i].type = 'расход';
                }
                const data = result.response[i].date;
                const splitData = data.split("-");
                result.response[i].date = splitData[2] + '.' + splitData[1] + '.' + splitData[0];

                this.operations.push({
                    'category': result.response[i].category,
                    'amount': result.response[i].amount,
                    'id': result.response[i].id,
                    'type': result.response[i].type,
                    'date': result.response[i].date,
                    'comment': result.response[i].comment,
                })
            } else {
                this.deleteOperation(result.response[i].id).then();
            }
        }
        ShowOperationsUtils.showRecords(this.operations);
        BalanceUtils.receiveBalance().then();
    }

    async deleteOperation(id) {
        const result = await HttpUtils.request('/operations/' + id, 'DELETE');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при удалении операции доходов/расходов. Обратитесь в поддержку');
        }
        // BalanceUtils.receiveBalance().then();
        return this.openNewRoute('/income-expense');
    }
}
