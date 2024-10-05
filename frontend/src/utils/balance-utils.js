import {HttpUtils} from "./http-utils";
import {AuthUtils} from "./auth-utils";
import {Sidebar} from "../components/sidebar";

export class BalanceUtils {
    static async receiveBalance() {
        const balance = await HttpUtils.request('/balance');
        if (balance.error || !balance.response) {
            alert('Невозможно получить данные о балансе')
        }
        if (balance) {
            AuthUtils.removeUserBalanceInfo();
            AuthUtils.setUserBalanceInfo(balance.response.balance);
            new Sidebar();
        }
    }
}