import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class DeleteExpense {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/expense');
        }
        this.deleteExpenseCategory(id).then();
    }

    async deleteExpenseCategory(id) {
        const result = await HttpUtils.request('/categories/expense/' + id, 'DELETE');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при удалении категории расходов. Обратитесь в поддержку');
        }
        return this.openNewRoute('/expense');
    }
}



