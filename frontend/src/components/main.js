import Chart from 'chart.js/auto';
import {HttpUtils} from "../utils/http-utils";
import {OperationsFilters} from "./operations-filters";
import {ButtonsActiveUtils} from "../utils/buttons-active-utils";

export class Main extends OperationsFilters {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;
        this.showOperationsToday().then();
    }

    async showOperationsToday() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnToday.classList.add('active');
        const result = await HttpUtils.request('/operations?period=today');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за сегодня. Обращайтесь в поддержку')
        }
        await this.showIncomeExpenseOperations(result.response);
    }

    async showOperationsWeek() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnWeek.classList.add('active');
        const result = await HttpUtils.request('/operations?period=week');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за неделю. Обращайтесь в поддержку')
        }
        await this.showIncomeExpenseOperations(result.response);
    }

    async showOperationsMonth() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnMonth.classList.add('active');
        const result = await HttpUtils.request('/operations?period=month');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за месяц. Обращайтесь в поддержку')
        }
        await this.showIncomeExpenseOperations(result.response);
    }

    async showOperationsYear() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnYear.classList.add('active');
        const result = await HttpUtils.request('/operations?period=year');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за год. Обращайтесь в поддержку')
        }
        await this.showIncomeExpenseOperations(result.response);
    }

    async showOperationsAll() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnAll.classList.add('active');
        const result = await HttpUtils.request('/operations?period=all');

        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе доходов и расходов за весь период. Обращайтесь в поддержку')
        }
        await this.showIncomeExpenseOperations(result.response);
    }

    chooseDateFrom() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.dateFromInputElement.addEventListener('change', () => {
            this.dateFrom = this.dateFromInputElement.value;
            // console.log(this.dateFrom)
            this.btnFrom.innerText = this.dateFrom.split('-').reverse().join('-');
            this.dateFromInputElement.classList.remove('show')
        })
    }

    chooseDateTill() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.dateTillInputElement.addEventListener('change', () => {
            this.dateTill = this.dateTillInputElement.value;
            // console.log(this.dateTill)
            this.btnTill.innerText = this.dateTill.split('-').reverse().join('-');
            this.dateTillInputElement.classList.remove('show')
        })
    }

    async showOperationsInterval() {
        ButtonsActiveUtils.buttonsActive(this.buttons);
        this.btnInterval.classList.add('active');
        if (this.dateFrom && this.dateTill) {
            const result = await HttpUtils.request('/operations?period=interval&dateFrom=' + this.dateFrom + '&dateTo=' + this.dateTill)
            // console.log(result);
            if (result.error || !result.response || (result.response && result.response.error)) {
                return alert('Возникла ошибка при добавлении операции расходов. Обратитесь в поддержку');
            }
            await this.showIncomeExpenseOperations(result.response);
        }
    }

    showIncomeExpenseOperations(result) {
        this.expenseOperations = [];
        this.incomeOperations = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].type === 'income') {
                this.incomeOperations.push({
                    'category': result[i].category,
                    'amount': result[i].amount
                });
            } else {
                this.expenseOperations.push({
                    'category': result[i].category,
                    'amount': result[i].amount
                });
            }
        }

        this.incomeOperationsResult = Object.entries(this.incomeOperations.reduce((acc, entry) => {
            const category = entry.category;
            if (acc[category] !== undefined) acc[category] += entry.amount;
            else acc[category] = entry.amount;
            return acc;
        }, {})).map(([category, amount]) => ({category, amount }));
        // console.log(this.incomeOperationsResult);

        this.expenseOperationsResult = Object.entries(this.expenseOperations.reduce((acc, entry) => {
            const category = entry.category;
            if (acc[category] !== undefined) acc[category] += entry.amount;
            else acc[category] = entry.amount;
            return acc;
        }, {})).map(([category, amount]) => ({category, amount }));
        // console.log(this.expenseOperationsResult);

        this.showChart();
    }

    showChart() {
        let xValuesIncome = [];
        let xValuesExpense = [];
        let yValuesIncome = [];
        let yValuesExpense = [];

        for (let i = 0; i < this.incomeOperationsResult.length; i++) {
            xValuesIncome.push(this.incomeOperationsResult[i].category);
            yValuesIncome.push(this.incomeOperationsResult[i].amount);
        }
        for (let i = 0; i < this.expenseOperationsResult.length; i++) {
            xValuesExpense.push(this.expenseOperationsResult[i].category);
            yValuesExpense.push(this.expenseOperationsResult[i].amount);
        }

        let barColors = [
            "#DC3545",
            "#FD7E14",
            "#FFC107",
            "#20C997",
            "#0D6EFD",
            "#0D07DF"
        ];
        if (Chart.getChart("chartIncome")) {
            Chart.getChart("chartIncome")?.destroy()
        }
        new Chart("chartIncome", {
            type: "pie",
            data: {
                labels: xValuesIncome,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesIncome
                }]
            },
            options: {
                title: {
                    display: true,
                    text: ""
                }
            }
        });
        if (Chart.getChart("chartExpense")) {
            Chart.getChart("chartExpense")?.destroy()
        }
        new Chart("chartExpense", {
            type: "pie",
            data: {
                labels: xValuesExpense,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesExpense
                }]
            },
            options: {
                title: {
                    display: true,
                    text: ""
                }
            }
        });
    }
}