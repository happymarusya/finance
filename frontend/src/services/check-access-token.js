import {AuthUtils} from "../utils/auth-utils";

export class CheckAccessToken {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.init();
    }

    init() {
        const accessToken = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);
        if (!accessToken) {
            this.openNewRoute('/login');
        }
    }
}