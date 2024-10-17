import {Main} from "./components/main.js";
import {Logout} from "./components/auth/logout.js";
import {Login} from "./components/auth/login.js";
import {SignUp} from "./components/auth/sign-up.js";
import {Expense} from "./components/expense/expense.js";
import {AddExpense} from "./components/expense/add-expense.js";
import {EditExpense} from "./components/expense/edit-expense.js";
import {Income} from "./components/income/income.js";
import {AddIncome} from "./components/income/add-income.js";
import {EditIncome} from "./components/income/edit-income.js";
import {IncomeExpense} from "./components/income-expense/income-expense.js";
import {AddExpenseOperation} from "./components/income-expense/add-expense-operation.js";
import {EditIncomeExpense} from "./components/income-expense/edit-income-expense.js";
import {Sidebar} from "./components/sidebar";
import {CheckAccessToken} from "./services/check-access-token";
import {DeleteIncome} from "./components/income/delete-income";
import {DeleteExpense} from "./components/expense/delete-expense";
import {DeleteIncomeExpense} from "./components/income-expense/delete-income-expense";
import {AddIncomeOperation} from "./components/income-expense/add-income-operation";
import {AuthBase} from "./components/auth/auth-base";
import {IncomeExpenseBase} from "./components/income-expense/income-expense-base";
import {OperationsFilters} from "./components/operations-filters";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new Sidebar();
                    new Main(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expense/expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new Expense(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/expense/add',
                title: 'Добавить категорию расходов',
                filePathTemplate: '/templates/pages/expense/add-expense-category.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new AddExpense(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/expense/edit',
                title: 'Изменить категорию расходов',
                filePathTemplate: '/templates/pages/expense/edit-expense-category.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new EditExpense(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/expense/delete',
                title: 'Удалить категорию расходов',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new DeleteExpense(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new Income(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income/add',
                title: 'Добавить категорию доходов',
                filePathTemplate: '/templates/pages/income/add-income-category.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new AddIncome(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income/edit',
                title: 'Изменить категорию доходов',
                filePathTemplate: '/templates/pages/income/edit-income-category.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new EditIncome(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income/delete',
                title: 'Удалить категорию доходов',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new DeleteIncome(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income-expense',
                title: 'Доходы/расходы',
                filePathTemplate: '/templates/pages/income-expense/income-expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new IncomeExpense(this.openNewRoute.bind(this));
                    new Sidebar();
                    new IncomeExpenseBase(this.openNewRoute.bind(this));
                    if (document.readyState === "loading") {
                        document.addEventListener("DOMContentLoaded", () => {
                            new OperationsFilters(this.openNewRoute.bind(this));
                        });
                    } else {
                        new OperationsFilters(this.openNewRoute.bind(this));
                    }
                },
            },
            {
                route: '/income-expense/add-income',
                title: 'Добавить доходы',
                filePathTemplate: '/templates/pages/income-expense/add-income-expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new AddIncomeOperation(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income-expense/add-expense',
                title: 'Добавить расходы',
                filePathTemplate: '/templates/pages/income-expense/add-income-expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new AddExpenseOperation(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income-expense/edit',
                title: 'Изменить доходы/расходы',
                filePathTemplate: '/templates/pages/income-expense/edit-income-expense.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new EditIncomeExpense(this.openNewRoute.bind(this));
                    new Sidebar();
                },
            },
            {
                route: '/income-expense/delete',
                title: 'Удалить доходы/расходы',
                load: () => {
                    new CheckAccessToken(this.openNewRoute.bind(this));
                    new DeleteIncomeExpense(this.openNewRoute.bind(this));
                },
            },
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        // console.log(e.target);

        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            e.preventDefault();
            const url = element.href.replace(window.location.origin, '');
            if (!url || url === '#' || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            console.log(currentRoute);
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);
        if (newRoute) {

            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Freelance Studio';
            }
            if (newRoute.filePathTemplate) {

                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then
                    (response => response.text());
                    contentBlock = document.getElementById('content-layout');
                }

                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then
                (response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        }
    }
}