import {HttpUtils} from "../../utils/http-utils";
import {IncomeExpenseBase} from "./income-expense-base";
import {BalanceUtils} from "../../utils/balance-utils";

export class AddIncomeOperation extends IncomeExpenseBase {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        this.operationTypeElement.value = 'доход';
        this.operationTypeElement.setAttribute('readonly', 'readonly');
        document.getElementById('createOperationButton').addEventListener('click', this.createIncomeOperation.bind(this));
        this.getIncomeCategories().then()
    }

    async createIncomeOperation() {
        if (this.validateForm()) {
            const categoryId = this.operationOptionElement.options.selectedIndex;

            const result = await HttpUtils.request('/operations', 'POST', true, {
                type: "income",
                amount: this.operationAmountElement.value,
                date: this.operationDateElement.value,
                comment: this.operationCommentsElement.value,
                category_id: categoryId
            })
            // console.log(result);

            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при добавлении операции доходов. Обратитесь в поддержку');
            }

            BalanceUtils.receiveBalance().then();
            return this.openNewRoute('/income-expense');
        }
    }
}