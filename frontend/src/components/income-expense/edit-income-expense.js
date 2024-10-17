import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";
import {IncomeExpenseBase} from "./income-expense-base";
import {BalanceUtils} from "../../utils/balance-utils";

export class EditIncomeExpense extends IncomeExpenseBase {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/income-expense');
        }
        this.operationTypeElement.setAttribute('readonly', 'readonly');
        document.getElementById('saveOperation').addEventListener('click', this.changeOperation.bind(this));
        this.getOperation(id).then();
    }

    async getOperation(id) {
        const result = await HttpUtils.request('/operations/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при запросе операции доходов/расходов. Обратитесь в поддержку');
        }
        this.operationOriginalData = result.response;
        this.operationTypeElement.setAttribute('readonly', 'readonly');
        if (result.response.type === 'expense') {
            this.operationTypeElement.value = 'расход';
            await this.getExpenseCategories();
        } else if (result.response.type === 'income') {
            this.operationTypeElement.value = 'доход';
            await this.getIncomeCategories();
        }
        this.showOperation(result.response);
    }

    showOperation(operation) {
        this.operationAmountElement.value = operation.amount;
        this.operationDateElement.value = operation.date;
        this.operationCommentsElement.value = operation.comment;
        this.operationOptionElement.value = operation.category;
    }

    async changeOperation() {
        const changedData = {};
        if (this.operationTypeElement.value === 'доход') {
            changedData.type = 'income';
        } else {
            changedData.type = 'expense';
        }
        changedData.amount = Number(this.operationAmountElement.value);
        changedData.date = this.operationDateElement.value;
        changedData.comment = this.operationCommentsElement.value;
        const operationOption = document.getElementById('operation-category');
        changedData.category_id = Number(operationOption.options[operationOption.selectedIndex].getAttribute('data-id'));

        if (this.validateForm()) {
            const result = await HttpUtils.request('/operations/' + this.operationOriginalData.id,
                'PUT', true, changedData);
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }
            if (result.error || !result.response || (result.response && result.response.error)) {
                console.log(result.response.message);
                return alert('Возникла ошибка при редактировании категории доходов/расходов. Обратитесь в поддержку');
            }
            BalanceUtils.receiveBalance().then();
            return this.openNewRoute('/income-expense');
        }
    }
}