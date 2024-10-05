import {UrlUtils} from "../../utils/url-utils";
import {IncomeExpense} from "./income-expense";
import {HttpUtils} from "../../utils/http-utils";
import {BalanceUtils} from "../../utils/balance-utils";

export class DeleteIncomeExpense extends IncomeExpense {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/income-expense');
        }
        this.deleteOperationPopup(id);
    }

    deleteOperationPopup(id) {
        document.getElementById('btn-delete-income-expense').addEventListener('click', () => {
            this.deleteOperation(id).then();
        })
        document.getElementById('doNotDeleteIncomeExpense').addEventListener('click', () => {
            this.openNewRoute('/income-expense');
        });
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
        BalanceUtils.receiveBalance().then();
        return this.openNewRoute('/income-expense');
    }
}


