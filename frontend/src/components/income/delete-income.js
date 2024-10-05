import {UrlUtils} from "../../utils/url-utils";
import {HttpUtils} from "../../utils/http-utils";

export class DeleteIncome {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        // console.log(id);
        if (!id) {
            return this.openNewRoute('/income');
        }
        this.deleteIncomeCategory(id).then();
    }

    async deleteIncomeCategory(id) {
        const result = await HttpUtils.request('/categories/income/' + id, 'DELETE');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при удалении категории доходов. Обратитесь в поддержку');
        }
        return this.openNewRoute('/income');
    }
}
