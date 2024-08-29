import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Router } from "./router.js";

export class App {

    constructor() {
       new Router()
    }
}
(new App());