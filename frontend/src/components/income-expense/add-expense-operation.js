import {HttpUtils} from "../../utils/http-utils";
import {IncomeExpenseBase} from "./income-expense-base";
import {BalanceUtils} from "../../utils/balance-utils";

export class AddExpenseOperation extends IncomeExpenseBase {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        this.operationTypeElement.value = 'расход';
        this.operationTypeElement.setAttribute('readonly', 'readonly');
        document.getElementById('createOperationButton').addEventListener('click', this.createExpenseOperation.bind(this));
        this.getExpenseCategories().then()
    }

    async createExpenseOperation() {
        if (this.validateForm()) {
            const expenseOption = document.getElementById('operation-category');
            const categoryId = expenseOption.options[expenseOption.selectedIndex].getAttribute('data-id');

            const result = await HttpUtils.request('/operations', 'POST', true, {
                type: "expense",
                amount: Number(this.operationAmountElement.value),
                date: this.operationDateElement.value,
                comment: this.operationCommentsElement.value,
                category_id: Number(categoryId)
            })
            // console.log(result);

            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при добавлении операции расходов. Обратитесь в поддержку');
            }

            BalanceUtils.receiveBalance().then();
            return this.openNewRoute('/income-expense');
        }
    }
}